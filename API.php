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
use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\Services\ChatRequestParser;
use Piwik\Plugins\ChatGPT\Services\InsightReport;
use Piwik\Plugins\ChatGPT\Services\RateLimiter;
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
     * Request timeout in seconds
     */
    private const REQUEST_TIMEOUT = 60;

    public function __construct(
        \Piwik\Log\LoggerInterface $logger,
        private ChatRequestParser $requestParser,
        private InsightReport $insightReport,
        private RateLimiter $rateLimiter
    ) {
        $this->logger = $logger;
    }

    public function getResponse(int $idSite, string $period, string $date, $messages = []): array
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = (int) Common::getRequestVar('idSite');
        Piwik::checkUserHasViewAccess($idSite);

        // Get messages from request if not passed or if passed as JSON string
        $messages = $this->requestParser->parseMessages($messages);

        $this->rateLimiter->check($idSite);

        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);
        $chatBasePrompt = $measurableSettings->chatBasePrompt->getValue() ?: $systemSettings->chatBasePrompt->getValue();

        $conversationBase = [
            [
                "role" => "system",
                "name" => "AI",
                "content" => $chatBasePrompt,
            ]
        ];

        return $this->fetchModelAi(array_merge($conversationBase, $messages), $idSite);
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

        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);
        $insightBasePrompt = $measurableSettings->insightBasePrompt->getValue() ?: $systemSettings->insightBasePrompt->getValue();

        $data = $this->insightReport->fetch($widgetParams, $idSite, $date, $period);

        $conversationBase = [
            [
                "role" => "system",
                "name" => "AI",
                "content" => "$insightBasePrompt $data",
            ]
        ];

        return $this->fetchModelAi(array_merge($conversationBase, $messages), $idSite);
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

        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);

        if ($this->insightReport->isInsightRequest($widgetParams)) {
            // Insight mode: fetch report data and use insight prompt
            $insightBasePrompt = $measurableSettings->insightBasePrompt->getValue() ?: $systemSettings->insightBasePrompt->getValue();
            $data = $this->insightReport->fetch($widgetParams, $idSite, $date, $period);

            $conversationBase = [
                [
                    "role" => "system",
                    "name" => "AI",
                    "content" => "$insightBasePrompt $data",
                ]
            ];
        } else {
            // Regular chat mode
            $chatBasePrompt = $measurableSettings->chatBasePrompt->getValue() ?: $systemSettings->chatBasePrompt->getValue();

            $conversationBase = [
                [
                    "role" => "system",
                    "name" => "AI",
                    "content" => $chatBasePrompt,
                ]
            ];
        }

        $this->streamModelAi(array_merge($conversationBase, $messages), $idSite);
    }

    /**
     * Validates that the URL is a valid HTTPS API endpoint
     */
    private function isValidApiUrl(?string $url): bool
    {
        if (empty($url)) {
            return false;
        }
        $parsed = parse_url($url);
        return isset($parsed['scheme']) && $parsed['scheme'] === 'https' && isset($parsed['host']);
    }

    /**
     * Sends a conversation to the AI model and returns the response
     *
     * @throws Exception if configuration is missing or API call fails
     */
    private function fetchModelAi(array $conversation, int $idSite): array
    {
        $config = $this->getAiConfig($idSite);

        $data = [
            "model" => $config['model'],
            "messages" => $this->requestParser->sanitizeConversation($conversation),
        ];

        $headers = [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $config['apiKey'],
        ];

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
    private function streamModelAi(array $conversation, int $idSite): void
    {
        $config = $this->getAiConfig($idSite);

        $data = [
            "model" => $config['model'],
            "messages" => $this->requestParser->sanitizeConversation($conversation),
            "stream" => true,
        ];

        // Disable all output buffering for streaming
        while (ob_get_level()) {
            ob_end_clean();
        }

        // Disable PHP time limit for long streams
        set_time_limit(0);

        // Set SSE headers
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');
        header('Connection: keep-alive');
        header('X-Accel-Buffering: no'); // Nginx
        header('X-Content-Type-Options: nosniff');

        // Immediately flush headers
        flush();

        $ch = curl_init($config['host']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $config['apiKey'],
            'Content-Type: application/json',
            'Accept: text/event-stream',
        ]);
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
            $message = $this->extractApiErrorMessage($errorBuffer, $httpCode, $config['model']);
            $this->logger->warning('ChatGPT streaming API error (HTTP ' . $httpCode . '): ' . $message);
            echo "data: " . json_encode(['error' => ['message' => $message]]) . "\n\n";
            flush();
        }

        echo "data: [DONE]\n\n";
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

    /**
     * Gets AI configuration for a site
     * @throws Exception if configuration is invalid
     */
    private function getAiConfig(int $idSite): array
    {
        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);

        $host = $measurableSettings->host->getValue() ?: $systemSettings->host->getValue();
        $apiKey = $measurableSettings->apiKey->getValue() ?: $systemSettings->apiKey->getValue();

        // Get model: prefer custom model if set, otherwise use preset
        $model = $systemSettings->modelCustom->getValue();
        if (empty($model)) {
            $model = $systemSettings->modelPreset->getValue();
        }

        // Check measurable settings override
        $measurableModelCustom = $measurableSettings->modelCustom->getValue();
        $measurableModelPreset = $measurableSettings->modelPreset->getValue();
        if (!empty($measurableModelCustom)) {
            $model = $measurableModelCustom;
        } elseif (!empty($measurableModelPreset)) {
            $model = $measurableModelPreset;
        }

        if (empty($host)) {
            throw new Exception('ChatGPT host is not configured');
        }

        if (empty($apiKey)) {
            throw new Exception('ChatGPT API key is not configured');
        }

        if (empty($model) || (is_array($model) && empty($model[0]))) {
            throw new Exception('ChatGPT model is not configured');
        }

        if (!$this->isValidApiUrl($host)) {
            throw new Exception('Invalid API host URL - HTTPS required');
        }

        return [
            'host' => $host,
            'apiKey' => $apiKey,
            'model' => is_array($model) ? $model[0] : $model,
        ];
    }
}
