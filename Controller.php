<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Container\StaticContainer;
use Piwik\Http\JsonResponse;
use Piwik\Log\LoggerInterface;
use Piwik\Piwik;
use Piwik\Plugin\ControllerAdmin;
use Piwik\Plugins\AIProviders\Exception\AIProviderException;
use Piwik\Plugins\ChatGPT\Agent\McpAgent;
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\Services\ChatRequestParser;
use Piwik\Plugins\ChatGPT\Services\InsightNotAvailableException;
use Piwik\Plugins\ChatGPT\Services\InsightReport;
use Piwik\Plugins\ChatGPT\Services\RateLimiter;
use Piwik\Plugins\ChatGPT\Services\SafeErrorMessage;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Plugins\ChatGPT\Settings\ModelUpgradeNotice;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;
use Piwik\Plugins\ChatGPT\Settings\SystemSettingsForm;
use Piwik\Request;
use Piwik\Session;
use Piwik\Url;
use Piwik\View;

class Controller extends \Piwik\Plugin\Controller
{
    public function index()
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = Request::fromRequest()->getIntegerParameter('idSite');
        $settings = EffectiveSettings::forSite($idSite);

        return $this->renderTemplate('index', [
            // any one key is enough: website key, AI Providers or general key
            'is_configured' => $settings->isConfigured(),
            'is_custom_host' => $settings->isCustomHost(),
            'settings_url' => Piwik::hasUserSuperUserAccess() ? SystemSettingsForm::getUrl(['idSite' => $idSite]) : '',
            // with AI Providers, the model of the plugin settings is not used
            'model_notice' => !$settings->usesAiProviders() && $settings->isPluginConfigured()
                ? ModelUpgradeNotice::forOutdatedModel($settings)
                : null,
        ]);
    }

    /**
     * ChatGPT settings of a site, in Administration > Websites > ChatGPT.
     */
    public function manage(): string
    {
        $idSite = Request::fromRequest()->getIntegerParameter('idSite', 0);
        Piwik::checkUserHasAdminAccess($idSite);

        $generalSettingsUrl = '';
        if (Piwik::hasUserSuperUserAccess()) {
            $generalSettingsUrl = 'index.php' . Url::getCurrentQueryStringWithParametersModified([
                'module' => SiteSettingsStorage::PLUGIN_NAME,
                'action' => SystemSettingsForm::ACTION,
            ]);
        }

        $values = SiteSettingsStorage::read($idSite);
        if ($values['apiKey'] !== '') {
            $values['apiKey'] = SiteSettingsStorage::API_KEY_PLACEHOLDER;
        }

        $systemSettings = new SystemSettings();

        return $this->renderTemplate('manage', [
            'idSite' => $idSite,
            'fields' => $this->getSiteSettingsFields($values['modelPreset']),
            'values' => $values,
            'generalSettingsUrl' => $generalSettingsUrl,
            'aiProvidersConnected' => StaticContainer::get(PluginDependencies::class)->isAiProvidersConnected(),
            'aiProvidersLink' => SystemSettings::getAiProvidersLink(),
            // an empty website prompt follows the general prompt
            'generalPrompts' => [
                'chatBasePrompt' => $systemSettings->getChatBasePrompt(),
                'insightBasePrompt' => $systemSettings->getInsightBasePrompt(),
            ],
        ]);
    }

    /**
     * General settings of the plugin, in Administration > System > ChatGPT.
     */
    public function settings(): string
    {
        Piwik::checkUserHasSuperUserAccess();

        $form = new SystemSettingsForm();

        // this controller is not a ControllerAdmin, the admin layout needs its variables even without idSite
        $view = new View('@ChatGPT/settings');
        $this->setBasicVariablesView($view);
        ControllerAdmin::setBasicVariablesAdminView($view);
        $view->fields = $form->getFields();
        $view->values = $form->getValues();
        $view->aiProvidersNotice = $form->getAiProvidersNotice();
        $view->defaultPrompts = SystemSettingsForm::getDefaultPrompts();

        return $view->render();
    }

    /**
     * Whether the chat can run as an agent using the Matomo tools, and why not otherwise
     */
    #[JsonResponse]
    public function agentStatus(): string
    {
        Piwik::checkUserHasSomeViewAccess();

        $request = Request::fromRequest();
        $idSite = $request->getIntegerParameter('idSite', 0);
        if ($idSite > 0) {
            Piwik::checkUserHasViewAccess($idSite);
        }

        return (string) json_encode($this->getAgent()->getStatus($idSite, [
            'idSite' => $idSite > 0 ? $idSite : '',
            'period' => $request->getStringParameter('period', 'day'),
            'date' => $request->getStringParameter('date', 'yesterday'),
        ]));
    }

    /**
     * Runs the agent and streams its events (text, tool calls, errors) as Server-Sent Events.
     *
     * A controller action rather than an API method: the McpServer plugin only accepts internal
     * tool calls when the root request is not an API request.
     */
    public function agent(): void
    {
        Piwik::checkUserIsNotAnonymous();
        Piwik::checkUserHasSomeViewAccess();
        $this->checkTokenInUrl();

        $request = Request::fromRequest();
        $idSite = $request->getIntegerParameter('idSite');
        Piwik::checkUserHasViewAccess($idSite);

        $period = $request->getStringParameter('period', 'day');
        $date = $request->getStringParameter('date', 'today');
        $conversationId = (string) preg_replace('/[^a-zA-Z0-9_-]/', '', $request->getStringParameter('conversationId', ''));
        $sessionKey = Piwik::getCurrentUserLogin() . '-' . $conversationId;

        // the agent can run for a while, do not block the other requests of the user meanwhile
        Session::close();

        $this->streamEvents(function (callable $emit) use ($idSite, $period, $date, $sessionKey) {
            StaticContainer::get(RateLimiter::class)->check($idSite);

            $parser = StaticContainer::get(ChatRequestParser::class);
            $messages = $parser->sanitizeConversation($parser->parseMessages([]), ['user', 'assistant']);
            $widgetParams = $parser->parseWidgetParams([]);

            $settings = EffectiveSettings::forSite($idSite);
            // a key set for the website overrides AI Providers, its requests go through the API methods
            if (!$settings->usesAiProviders()) {
                $emit('error', ['message' => Piwik::translate('ChatGPT_AgentAiProvidersNotUsed')]);
                return;
            }

            $insightReport = StaticContainer::get(InsightReport::class);
            $agent = $this->getAgent();
            $withTools = $agent->hasTools();

            if ($insightReport->isInsightRequest($widgetParams)) {
                $basePrompt = $settings->getInsightBasePrompt();
                $reportData = $insightReport->fetch($widgetParams, $idSite, $date, $period);

                // the insights panel starts the conversation without a message: ask for the analysis
                if ($messages === [] || $messages[0]['role'] !== 'user') {
                    array_unshift($messages, ['role' => 'user', 'content' => Piwik::translate('ChatGPT_InsightAgentPrompt')]);
                }
                $systemPrompt = $agent->buildSystemPrompt((string) $basePrompt, $idSite, $period, $date, $reportData, $withTools);
                $featureKey = 'insights';
            } else {
                $basePrompt = $settings->getChatBasePrompt();
                $systemPrompt = $agent->buildSystemPrompt((string) $basePrompt, $idSite, $period, $date, null, $withTools);
                $featureKey = 'chat';
            }

            $agent->run($messages, $systemPrompt, $featureKey, $sessionKey, $emit);
        });
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function getSiteSettingsFields(string $currentModelPreset): array
    {
        $systemModel = (new SystemSettings())->getConfiguredModel();
        $systemModelLabel = $systemModel === Config::LATEST_RECOMMENDED_MODEL
            ? Config::getModelLabel(Config::RECOMMENDED_MODEL)
            : Config::getModelLabel($systemModel);

        $modelOptions = [['key' => '', 'value' => Piwik::translate('ChatGPT_UseSystemDefault') . ' ' . $systemModelLabel]];
        foreach (SystemSettings::getModelPresetOptions($currentModelPreset) as $key => $label) {
            $modelOptions[] = ['key' => $key, 'value' => $label];
        }

        return [
            [
                'name' => 'host',
                'uicontrol' => 'text',
                'title' => Piwik::translate('ChatGPT_Host'),
                'description' => Piwik::translate('ChatGPT_HostDescription'),
            ],
            [
                'name' => 'apiKey',
                'uicontrol' => 'password',
                'title' => Piwik::translate('ChatGPT_ApiKey'),
                'description' => Piwik::translate('ChatGPT_ApiKeyDescription'),
            ],
            [
                'name' => 'modelPreset',
                'uicontrol' => 'select',
                'title' => Piwik::translate('ChatGPT_ModelPreset'),
                'description' => Piwik::translate('ChatGPT_ModelPresetDescriptionMeasurable'),
                'options' => $modelOptions,
            ],
            [
                'name' => 'modelCustom',
                'uicontrol' => 'text',
                'title' => Piwik::translate('ChatGPT_ModelCustom'),
                'description' => Piwik::translate('ChatGPT_ModelCustomDescriptionMeasurable'),
            ],
            [
                'name' => 'chatBasePrompt',
                'uicontrol' => 'textarea',
                'title' => Piwik::translate('ChatGPT_ChatBasePrompt'),
                'description' => Piwik::translate('ChatGPT_ChatBasePromptDescription'),
            ],
            [
                'name' => 'insightBasePrompt',
                'uicontrol' => 'textarea',
                'title' => Piwik::translate('ChatGPT_InsightBasePrompt'),
                'description' => Piwik::translate('ChatGPT_InsightBasePromptDescription'),
            ],
        ];
    }

    private function getAgent(): McpAgent
    {
        return StaticContainer::get(McpAgent::class);
    }

    /**
     * @param callable(callable(string, array<string, mixed>): void): void $producer
     */
    private function streamEvents(callable $producer): void
    {
        // Disable all output buffering for streaming
        while (ob_get_level()) {
            ob_end_clean();
        }

        set_time_limit(0);

        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');
        header('Connection: keep-alive');
        header('X-Accel-Buffering: no'); // Nginx
        header('X-Content-Type-Options: nosniff');
        flush();

        $emit = static function (string $type, array $data = []): void {
            echo 'data: ' . json_encode(['type' => $type] + $data) . "\n\n";
            flush();
        };

        try {
            $producer($emit);
        } catch (AIProviderException | InsightNotAvailableException $e) {
            $emit('error', ['message' => SafeErrorMessage::fromThrowable($e)]);
        } catch (\Throwable $e) {
            StaticContainer::get(LoggerInterface::class)->error('ChatGPT agent error: {message}', [
                'message' => $e->getMessage(),
                'exception' => $e,
            ]);
            $emit('error', ['message' => SafeErrorMessage::fromThrowable($e)]);
        }

        echo "data: [DONE]\n\n";
        flush();
    }
}
