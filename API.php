<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\Agent\McpAgent;
use Piwik\Plugins\ChatGPT\Services\ApiConnection;
use Piwik\Plugins\ChatGPT\Services\ChatRequestParser;
use Piwik\Plugins\ChatGPT\Services\InsightNotAvailableException;
use Piwik\Plugins\ChatGPT\Services\InsightReport;
use Piwik\Plugins\ChatGPT\Services\RateLimiter;
use Piwik\Plugins\ChatGPT\Services\SafeErrorMessage;
use Piwik\Plugins\ChatGPT\Settings\DefaultPrompts;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Plugins\ChatGPT\Settings\ModelUpgradeNotice;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;
use Piwik\Plugins\ChatGPT\Settings\SystemSettingsForm;
use Exception;

/**
 * API for plugin ChatGPT
 *
 * @method static \Piwik\Plugins\ChatGPT\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    private $logger;

    /**
     * @var ChatRequestParser
     */
    private $requestParser;

    /**
     * @var InsightReport
     */
    private $insightReport;

    /**
     * @var RateLimiter
     */
    private $rateLimiter;

    /**
     * Request timeout in seconds
     */
    private const REQUEST_TIMEOUT = 60;

    public function __construct(
        \Piwik\Log\LoggerInterface $logger,
        ChatRequestParser $requestParser,
        InsightReport $insightReport,
        RateLimiter $rateLimiter
    ) {
        $this->logger = $logger;
        $this->requestParser = $requestParser;
        $this->insightReport = $insightReport;
        $this->rateLimiter = $rateLimiter;
    }

    public function getResponse(int $idSite, string $period, string $date, $messages = []): array
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = (int) Common::getRequestVar('idSite');
        Piwik::checkUserHasViewAccess($idSite);

        // Get messages from request if not passed or if passed as JSON string
        $messages = $this->requestParser->parseMessages($messages);

        $this->rateLimiter->check($idSite);

        $settings = EffectiveSettings::forSite($idSite);
        $chatBasePrompt = $settings->getChatBasePrompt();

        if ($settings->usesAiProviders()) {
            return $this->answerWithAiProviders($messages, $chatBasePrompt, 'chat');
        }

        $conversationBase = [
            [
                "role" => "system",
                "name" => "AI",
                "content" => $chatBasePrompt,
            ]
        ];

        return $this->fetchModelAi(array_merge($conversationBase, $messages), $settings);
    }

    public function getInsights(int $idSite, string $period, string $date, $messages = [], $widgetParams = []): array
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = (int) Common::getRequestVar('idSite');
        Piwik::checkUserHasViewAccess($idSite);

        // Parse messages and widgetParams from POST
        $messages = $this->requestParser->parseMessages($messages);
        $widgetParams = $this->requestParser->parseWidgetParams($widgetParams);

        $this->rateLimiter->check($idSite);

        $settings = EffectiveSettings::forSite($idSite);
        $insightBasePrompt = $settings->getInsightBasePrompt();

        $insight = $this->fetchInsightData($widgetParams, $idSite, $date, $period);
        if (isset($insight['error'])) {
            return ['error' => $insight['error']];
        }
        $data = $insight['data'];

        if ($settings->usesAiProviders()) {
            return $this->answerWithAiProviders($messages, "$insightBasePrompt $data", 'insights', true);
        }

        $conversationBase = [
            [
                "role" => "system",
                "name" => "AI",
                "content" => "$insightBasePrompt $data",
            ]
        ];

        return $this->fetchModelAi(array_merge($conversationBase, $messages), $settings);
    }

    /**
     * Streams a response from the AI model using Server-Sent Events
     * If widgetParams are present, fetches report data first (insight mode)
     */
    public function getStreamingResponse(int $idSite, string $period, string $date, $messages = [], $widgetParams = []): void
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = (int) Common::getRequestVar('idSite');
        Piwik::checkUserHasViewAccess($idSite);

        // Parse messages and widgetParams from POST
        $messages = $this->requestParser->parseMessages($messages);
        $widgetParams = $this->requestParser->parseWidgetParams($widgetParams);

        $this->rateLimiter->check($idSite);

        $settings = EffectiveSettings::forSite($idSite);

        if ($settings->usesAiProviders()) {
            if ($this->insightReport->isInsightRequest($widgetParams)) {
                $insight = $this->fetchInsightData($widgetParams, $idSite, $date, $period);
                $answer = isset($insight['error'])
                    ? ['error' => $insight['error']]
                    : $this->answerWithAiProviders($messages, $settings->getInsightBasePrompt() . ' ' . $insight['data'], 'insights', true);
            } else {
                $answer = $this->answerWithAiProviders($messages, $settings->getChatBasePrompt(), 'chat');
            }
            $this->streamAnswer($answer);
            return;
        }

        if ($this->insightReport->isInsightRequest($widgetParams)) {
            // Insight mode: fetch report data and use insight prompt
            $insightBasePrompt = $settings->getInsightBasePrompt();
            $insight = $this->fetchInsightData($widgetParams, $idSite, $date, $period);
            if (isset($insight['error'])) {
                $this->streamAnswer(['error' => $insight['error']]);
                return;
            }
            $data = $insight['data'];

            $conversationBase = [
                [
                    "role" => "system",
                    "name" => "AI",
                    "content" => "$insightBasePrompt $data",
                ]
            ];
        } else {
            // Regular chat mode
            $chatBasePrompt = $settings->getChatBasePrompt();

            $conversationBase = [
                [
                    "role" => "system",
                    "name" => "AI",
                    "content" => $chatBasePrompt,
                ]
            ];
        }

        $this->streamModelAi(array_merge($conversationBase, $messages), $settings);
    }

    /**
     * Settings of a website, empty values use the general settings. The API key is replaced by a placeholder.
     *
     * @return array<string, string>
     */
    public function getSiteSettings(int $idSite): array
    {
        Piwik::checkUserHasAdminAccess($idSite);

        $values = SiteSettingsStorage::read($idSite);
        if ($values['apiKey'] !== '') {
            $values['apiKey'] = SiteSettingsStorage::API_KEY_PLACEHOLDER;
        }

        return $values;
    }

    /**
     * Sets the settings of a website, empty values use the general settings. A parameter left out keeps its saved
     * value, so each card of the settings page saves only its own fields.
     *
     * A prompt equal to the general prompt, or to a default while the general prompt is a default too, is saved empty:
     * the website then follows the general prompt.
     *
     * @param string|null $apiKey the placeholder returned by getSiteSettings or an empty value keeps the saved key
     * @param string|null $modelPreset empty, "latest-recommended" or a model of the preset list
     * @param bool $deleteApiKey removes the API key of the website, the only way to remove it
     */
    public function setSiteSettings(
        int $idSite,
        ?string $host = null,
        ?string $apiKey = null,
        ?string $modelPreset = null,
        ?string $modelCustom = null,
        ?string $chatBasePrompt = null,
        ?string $insightBasePrompt = null,
        bool $deleteApiKey = false
    ): bool {
        Piwik::checkUserHasAdminAccess($idSite);

        $values = [];
        foreach ([
            'host' => $host,
            'apiKey' => $apiKey,
            'modelPreset' => $modelPreset,
            'modelCustom' => $modelCustom,
            'chatBasePrompt' => $chatBasePrompt,
            'insightBasePrompt' => $insightBasePrompt,
        ] as $name => $value) {
            if ($value !== null) {
                $values[$name] = trim(Common::unsanitizeInputValue($value));
            }
        }

        // only an explicit request deletes the key of the website, an empty value keeps it
        if ($deleteApiKey) {
            $values['apiKey'] = '';
        } elseif (isset($values['apiKey']) && $values['apiKey'] === '') {
            unset($values['apiKey']);
        }

        if (($values['host'] ?? '') !== '' && !$this->isValidApiUrl($values['host'])) {
            throw new Exception(Piwik::translate('ChatGPT_InvalidApiUrl'));
        }

        // a saved model that is no longer listed can be kept, so the other settings can still be saved
        $modelPresetValue = $values['modelPreset'] ?? '';
        if ($modelPresetValue !== '' && $modelPresetValue !== SiteSettingsStorage::read($idSite)['modelPreset'] && !Config::isAvailableModel($modelPresetValue)) {
            throw new Exception(Piwik::translate('ChatGPT_InvalidModel', [$modelPresetValue]));
        }

        if (isset($values['modelCustom']) && !preg_match('/^[A-Za-z0-9._:\/@-]{0,200}$/', $values['modelCustom'])) {
            throw new Exception(Piwik::translate('ChatGPT_InvalidModel', [$values['modelCustom']]));
        }

        $generalPrompts = null;
        foreach (DefaultPrompts::SETTING_NAMES as $name => $kind) {
            if (!isset($values[$name]) || $values[$name] === '') {
                continue;
            }
            if ($generalPrompts === null) {
                $systemSettings = new SystemSettings();
                $generalPrompts = [
                    'chatBasePrompt' => $systemSettings->getChatBasePrompt(),
                    'insightBasePrompt' => $systemSettings->getInsightBasePrompt(),
                ];
            }
            $values[$name] = DefaultPrompts::toStoredSitePrompt($kind, $values[$name], $generalPrompts[$name]);
        }

        SiteSettingsStorage::save($idSite, $values);

        return true;
    }

    /**
     * Sets the general settings, edited on the ChatGPT page of the System administration. A parameter left out keeps
     * its saved value.
     *
     * @param string|null $apiKey the placeholder of the settings page keeps the saved key, like an empty value
     * @param bool $deleteApiKey removes the saved API key, the only way to remove it
     */
    public function setSystemSettings(
        ?string $host = null,
        ?string $apiKey = null,
        ?string $modelPreset = null,
        ?string $modelCustom = null,
        ?string $chatBasePrompt = null,
        ?string $insightBasePrompt = null,
        bool $deleteApiKey = false
    ): bool {
        Piwik::checkUserHasSuperUserAccess();

        $values = [
            'host' => $host,
            'apiKey' => $apiKey,
            'modelPreset' => $modelPreset,
            'modelCustom' => $modelCustom,
            'chatBasePrompt' => $chatBasePrompt,
            'insightBasePrompt' => $insightBasePrompt,
        ];
        foreach ($values as $name => $value) {
            if ($value !== null) {
                $values[$name] = Common::unsanitizeInputValue($value);
            }
        }

        (new SystemSettingsForm())->save($values, $deleteApiKey);

        return true;
    }

    /**
     * Validates that the URL is a valid HTTPS API endpoint, with the rule of the general settings
     */
    private function isValidApiUrl(?string $url): bool
    {
        return SystemSettings::isHttpsUrl((string) $url);
    }

    /**
     * Sends a conversation to the AI model and returns the response
     *
     * @throws Exception if configuration is missing or API call fails
     */
    private function fetchModelAi(array $conversation, EffectiveSettings $settings): array
    {
        $config = ApiConnection::fromSettings($settings);

        $data = [
            "model" => $config['model'],
            "messages" => $this->requestParser->sanitizeConversation($conversation),
        ];

        $headers = ApiConnection::headers($config['apiKey']);

        $ch = curl_init($config['host']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_TIMEOUT, self::REQUEST_TIMEOUT);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        $this->logger->info('ChatGPT API request to model: ' . $config['model']);

        if ($curlError) {
            $this->logger->error('ChatGPT API curl error: ' . $curlError);
            throw new Exception('Connection error: ' . $curlError);
        }

        if (empty($response)) {
            throw new Exception('Empty response from ChatGPT API');
        }

        if ($httpCode !== 200) {
            $reason = ModelUpgradeNotice::classifyApiError($httpCode, (string) $response);
            if ($reason !== null) {
                $this->logger->warning('ChatGPT API model error (HTTP ' . $httpCode . ') for model ' . $config['model'] . ': ' . substr($response, 0, 500));
                return ['error' => ModelUpgradeNotice::build($reason, $settings)];
            }
        }

        $result = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON response from ChatGPT API');
        }

        if (isset($result['error'])) {
            $errorMessage = $result['error']['message'] ?? 'Unknown API error';
            $this->logger->warning('ChatGPT API error: ' . $errorMessage);
            return ['error' => ['message' => $errorMessage]];
        }

        if ($httpCode !== 200) {
            throw new Exception('ChatGPT API returned HTTP ' . $httpCode);
        }

        return $result;
    }

    /**
     * Streams a conversation response using Server-Sent Events
     * This method outputs directly to the response stream
     */
    private function streamModelAi(array $conversation, EffectiveSettings $settings): void
    {
        $config = ApiConnection::fromSettings($settings);

        $data = [
            "model" => $config['model'],
            "messages" => $this->requestParser->sanitizeConversation($conversation),
            "stream" => true,
        ];

        $this->startEventStream();

        $ch = curl_init($config['host']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ApiConnection::headers($config['apiKey'], 'text/event-stream'));
        curl_setopt($ch, CURLOPT_TIMEOUT, 0); // No timeout for streaming
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);

        // Track whether the upstream is actually streaming SSE; if not (e.g. error
        // responses are returned as plain JSON), buffer the body so we can surface
        // the error to the client instead of letting it fall through silently.
        $isStream = null;
        $errorBuffer = '';

        curl_setopt($ch, CURLOPT_HEADERFUNCTION, function ($ch, $header) use (&$isStream) {
            if ($isStream === null && stripos($header, 'Content-Type:') === 0) {
                $isStream = stripos($header, 'text/event-stream') !== false;
            }
            return strlen($header);
        });

        curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($ch, $chunk) use (&$isStream, &$errorBuffer) {
            if ($isStream) {
                echo $chunk;
                flush();
            } else {
                // Non-SSE response (typically an error JSON). Buffer it so we can
                // forward the message as a structured SSE error event below.
                $errorBuffer .= $chunk;
            }
            return strlen($chunk);
        });

        curl_exec($ch);
        $error = curl_error($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($error) {
            $this->logger->error('ChatGPT streaming curl error: ' . $error);
            echo "data: " . json_encode(['error' => ['message' => 'Connection error: ' . $error]]) . "\n\n";
            flush();
        } elseif ($errorBuffer !== '' || ($httpCode !== 0 && $httpCode !== 200)) {
            $reason = ModelUpgradeNotice::classifyApiError((int) $httpCode, $errorBuffer);
            if ($reason !== null) {
                $error = ModelUpgradeNotice::build($reason, $settings);
            } else {
                $error = ['message' => $this->extractApiErrorMessage($errorBuffer, $httpCode, $config['model'])];
            }
            $this->logger->warning('ChatGPT streaming API error (HTTP ' . $httpCode . '): ' . $error['message']);
            echo "data: " . json_encode(['error' => $error]) . "\n\n";
            flush();
        }

        echo "data: [DONE]\n\n";
        flush();
    }

    /**
     * Answer of the AI provider configured in Matomo (AIProviders plugin), in the response format of the chat
     * completions API so the clients handle both engines the same way
     *
     * @param bool $isInsight the insights panel starts the conversation without a message: ask for the analysis
     * @return array{choices?: list<array<string, mixed>>, error?: array{message: string}}
     */
    private function answerWithAiProviders(array $messages, string $systemPrompt, string $featureKey, bool $isInsight = false): array
    {
        $messages = $this->requestParser->sanitizeConversation($messages, ['user', 'assistant']);
        if ($isInsight && ($messages === [] || $messages[0]['role'] !== 'user')) {
            array_unshift($messages, ['role' => 'user', 'content' => Piwik::translate('ChatGPT_InsightAgentPrompt')]);
        }

        try {
            $content = StaticContainer::get(McpAgent::class)->answer($messages, $systemPrompt, $featureKey);
        } catch (\Throwable $e) {
            $this->logger->warning('ChatGPT AI Providers error: ' . $e->getMessage());
            return ['error' => ['message' => $e->getMessage()]];
        }

        return ['choices' => [['message' => ['role' => 'assistant', 'content' => $content]]]];
    }

    /**
     * The compact report payload of an insight, or the error to answer with instead: never a backtrace
     *
     * @return array{data?: string, error?: array{message: string}}
     */
    private function fetchInsightData(array $widgetParams, int $idSite, string $date, string $period): array
    {
        try {
            return ['data' => $this->insightReport->fetch($widgetParams, $idSite, $date, $period)];
        } catch (InsightNotAvailableException $e) {
            return ['error' => ['message' => $e->getMessage()]];
        } catch (\Throwable $e) {
            $this->logger->error('ChatGPT insight error: {message}', ['message' => $e->getMessage(), 'exception' => $e]);
            return ['error' => ['message' => SafeErrorMessage::fromThrowable($e)]];
        }
    }

    /**
     * Sends a complete answer as Server-Sent Events, in the chunk format of the streamed chat completions
     *
     * @param array{choices?: list<array<string, mixed>>, error?: array{message: string}} $answer
     */
    private function streamAnswer(array $answer): void
    {
        $this->startEventStream();

        if (isset($answer['error'])) {
            echo "data: " . json_encode(['error' => $answer['error']]) . "\n\n";
        } else {
            $content = (string) ($answer['choices'][0]['message']['content'] ?? '');
            echo "data: " . json_encode(['choices' => [['delta' => ['role' => 'assistant', 'content' => $content]]]]) . "\n\n";
        }
        echo "data: [DONE]\n\n";
        flush();
    }

    private function startEventStream(): void
    {
        // Disable all output buffering for streaming
        while (ob_get_level()) {
            ob_end_clean();
        }

        // Disable PHP time limit for long streams
        set_time_limit(0);

        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');
        header('Connection: keep-alive');
        header('X-Accel-Buffering: no'); // Nginx
        header('X-Content-Type-Options: nosniff');

        // Immediately flush headers
        flush();
    }

    /**
     * Extracts a human-readable error message from a non-SSE upstream response body
     */
    private function extractApiErrorMessage(string $body, int $httpCode, string $model): string
    {
        $body = trim($body);
        if ($body !== '') {
            $decoded = json_decode($body, true);
            if (is_array($decoded) && isset($decoded['error'])) {
                if (is_array($decoded['error']) && !empty($decoded['error']['message'])) {
                    return (string) $decoded['error']['message'];
                }
                if (is_string($decoded['error']) && $decoded['error'] !== '') {
                    return $decoded['error'];
                }
            }
            // Non-JSON error body (e.g. HTML from a proxy) — return a truncated snippet
            $snippet = preg_replace('/\s+/', ' ', $body);
            if (mb_strlen($snippet) > 300) {
                $snippet = mb_substr($snippet, 0, 300) . '...';
            }
            return 'API error (HTTP ' . $httpCode . ') for model "' . $model . '": ' . $snippet;
        }

        return 'API request failed (HTTP ' . $httpCode . ') for model "' . $model . '" with no response body';
    }

}
