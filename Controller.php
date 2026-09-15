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
use Piwik\Plugins\AIProviders\Exception\AIProviderException;
use Piwik\Plugins\ChatGPT\Agent\McpAgent;
use Piwik\Plugins\ChatGPT\Services\ChatRequestParser;
use Piwik\Plugins\ChatGPT\Services\InsightReport;
use Piwik\Plugins\ChatGPT\Services\RateLimiter;
use Piwik\Request;
use Piwik\Session;

class Controller extends \Piwik\Plugin\Controller
{
    public function index()
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = Request::fromRequest()->getIntegerParameter('idSite');
        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);

        $host = $measurableSettings->host->getValue() ?: $systemSettings->host->getValue();
        $apiKey = $measurableSettings->apiKey->getValue() ?: $systemSettings->apiKey->getValue();
        $isCustomHost = $host !== Config::DEFAULT_HOST;

        // Plugin is configured if: custom host (API key optional) OR default host with API key,
        // or the agent can run on the AI provider configured in Matomo
        $isConfigured = (!empty($host) && ($isCustomHost || !empty($apiKey))) || McpAgent::isAvailable();

        return $this->renderTemplate('index', [
            'is_configured' => $isConfigured,
            'is_custom_host' => $isCustomHost,
        ]);
    }

    /**
     * Whether the chat can run as an agent using the Matomo tools, and why not otherwise
     */
    #[JsonResponse]
    public function agentStatus(): string
    {
        Piwik::checkUserHasSomeViewAccess();

        return (string) json_encode($this->getAgent()->getStatus());
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

            $systemSettings = new SystemSettings();
            $measurableSettings = new MeasurableSettings($idSite);
            $insightReport = StaticContainer::get(InsightReport::class);
            $agent = $this->getAgent();

            if ($insightReport->isInsightRequest($widgetParams)) {
                $basePrompt = $measurableSettings->insightBasePrompt->getValue() ?: $systemSettings->insightBasePrompt->getValue();
                $reportData = $insightReport->fetch($widgetParams, $idSite, $date, $period);

                // the insights panel starts the conversation without a message: ask for the analysis
                if ($messages === [] || $messages[0]['role'] !== 'user') {
                    array_unshift($messages, ['role' => 'user', 'content' => Piwik::translate('ChatGPT_InsightAgentPrompt')]);
                }
                $systemPrompt = $agent->buildSystemPrompt((string) $basePrompt, $idSite, $period, $date, $reportData);
                $featureKey = 'insights';
            } else {
                $basePrompt = $measurableSettings->chatBasePrompt->getValue() ?: $systemSettings->chatBasePrompt->getValue();
                $systemPrompt = $agent->buildSystemPrompt((string) $basePrompt, $idSite, $period, $date);
                $featureKey = 'chat';
            }

            $agent->run($messages, $systemPrompt, $featureKey, $sessionKey, $emit);
        });
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
        } catch (AIProviderException $e) {
            $emit('error', ['message' => $e->getMessage()]);
        } catch (\Throwable $e) {
            StaticContainer::get(LoggerInterface::class)->error('ChatGPT agent error: {message}', [
                'message' => $e->getMessage(),
                'exception' => $e,
            ]);
            $emit('error', ['message' => $e->getMessage()]);
        }

        echo "data: [DONE]\n\n";
        flush();
    }
}
