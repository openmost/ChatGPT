<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\API\Request;
use Piwik\Common;
use Piwik\Option;
use Piwik\Piwik;
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

    /**
     * Rate limit settings
     */
    private const RATE_LIMIT_REQUESTS = 30;
    private const RATE_LIMIT_WINDOW = 3600; // 1 hour

    public function __construct(\Piwik\Log\LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function getResponse(int $idSite, string $period, string $date, $messages = []): array
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = (int) Common::getRequestVar('idSite');
        Piwik::checkUserHasViewAccess($idSite);

        // Get messages from request if not passed or if passed as JSON string
        $messages = $this->parseMessagesParam($messages);

        // Check rate limit
        $this->checkRateLimit($idSite);

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
        $messages = $this->parseMessagesParam($messages);
        $widgetParams = $this->parseWidgetParams($widgetParams);

        // Check rate limit
        $this->checkRateLimit($idSite);

        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);
        $insightBasePrompt = $measurableSettings->insightBasePrompt->getValue() ?: $systemSettings->insightBasePrompt->getValue();

        $requestParams = $this->buildRequestParams($widgetParams, $idSite, $date, $period);
        $apiMethod = $this->resolveReportMethod($requestParams['_apiMethod'], $widgetParams);
        unset($requestParams['_apiMethod']);

        // Validate API method format (Module.action)
        if (!preg_match('/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/', $apiMethod)) {
            throw new Exception('Invalid API method format');
        }

        // Matomo's Request::processRequest handles permission checks internally
        $data = Request::processRequest($apiMethod, $requestParams);

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
        $messages = $this->parseMessagesParam($messages);
        $widgetParams = $this->parseWidgetParams($widgetParams);

        $this->checkRateLimit($idSite);

        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);

        // Check if this is an insight request (has widgetParams with module/action)
        $isInsight = !empty($widgetParams) && (isset($widgetParams['module']) || isset($widgetParams['action']));

        if ($isInsight) {
            // Insight mode: fetch report data and use insight prompt
            $insightBasePrompt = $measurableSettings->insightBasePrompt->getValue() ?: $systemSettings->insightBasePrompt->getValue();

            $requestParams = $this->buildRequestParams($widgetParams, $idSite, $date, $period);
            $apiMethod = $this->resolveReportMethod($requestParams['_apiMethod'], $widgetParams);
            unset($requestParams['_apiMethod']);

            // Validate API method format (Module.action)
            if (!preg_match('/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/', $apiMethod)) {
                throw new Exception('Invalid API method format');
            }

            // Fetch report data
            $data = Request::processRequest($apiMethod, $requestParams);

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
     * Check and enforce rate limits per site
     * @throws Exception if rate limit exceeded
     */
    private function checkRateLimit(int $idSite): void
    {
        $userLogin = Piwik::getCurrentUserLogin();
        $rateLimitKey = 'ChatGPT_ratelimit_' . $idSite . '_' . $userLogin;

        $currentTime = time();
        $rateData = Option::get($rateLimitKey);

        if ($rateData) {
            $rateData = json_decode($rateData, true);
            $windowStart = $rateData['window_start'] ?? 0;
            $requestCount = $rateData['count'] ?? 0;

            // Reset window if expired
            if ($currentTime - $windowStart > self::RATE_LIMIT_WINDOW) {
                $rateData = ['window_start' => $currentTime, 'count' => 0];
            }

            // Check limit
            if ($rateData['count'] >= self::RATE_LIMIT_REQUESTS) {
                $resetTime = $windowStart + self::RATE_LIMIT_WINDOW - $currentTime;
                throw new Exception("Rate limit exceeded. Please wait {$resetTime} seconds before making another request.");
            }
        } else {
            $rateData = ['window_start' => $currentTime, 'count' => 0];
        }

        // Increment counter
        $rateData['count']++;
        Option::set($rateLimitKey, json_encode($rateData));
    }

    /**
     * Builds request parameters from widget parameters with proper validation
     */
    private function buildRequestParams(array $widgetParams, int $idSite, string $date, string $period): array
    {
        // Check if this is an evolution graph that needs multiple data points
        $action = isset($widgetParams['action']) ? $widgetParams['action'] : '';
        $isEvolutionGraph = in_array($action, ['getEvolutionGraph', 'getEvolutionOverview', 'getRowEvolution'], true);

        // For evolution graphs, use day period with last90 to get multiple data points
        if ($isEvolutionGraph) {
            $period = 'day';
            $date = 'last90';
        }

        $requestParams = [
            'idSite' => $idSite,
            'date' => $this->sanitizeDate($date),
            'period' => $this->sanitizePeriod($period),
            'format' => 'json',
        ];

        // Sanitize module and action (alphanumeric only)
        $module = isset($widgetParams['module']) ? preg_replace('/[^a-zA-Z0-9]/', '', $widgetParams['module']) : '';
        $action = preg_replace('/[^a-zA-Z0-9]/', '', $action);
        $requestParams['_apiMethod'] = $module . '.' . $action;

        // Define supported parameters with their validation rules
        $supportedParams = [
            // Standard Matomo API parameters
            'idSubtable' => 'int',
            'idAlert' => 'int',
            'idGoal' => 'int',
            'idDimension' => 'int',
            'idNote' => 'int',
            'idExperiment' => 'int',
            'idCustomReport' => 'int',
            'idExport' => 'int',
            'idLogCrash' => 'int',
            'idFailure' => 'int',
            // Premium plugin parameters
            'idForm' => 'int',
            'idFunnel' => 'int',
            'idHeatmap' => 'int',
            'idSessionRecording' => 'int',
            // Common parameters
            'segment' => 'segment',
            'flat' => 'bool',
            'expanded' => 'bool',
            'filter_limit' => 'int',
            'filter_offset' => 'int',
        ];

        foreach ($supportedParams as $param => $type) {
            if (isset($widgetParams[$param]) && $widgetParams[$param] !== '') {
                $requestParams[$param] = $this->sanitizeParam($widgetParams[$param], $type);
            }
        }

        return $requestParams;
    }

    /**
     * Sanitizes a parameter value based on its type
     */
    private function sanitizeParam($value, string $type)
    {
        switch ($type) {
            case 'int':
                return (int) $value;
            case 'bool':
                return $value ? 1 : 0;
            case 'segment':
                return Common::unsanitizeInputValue($value);
            default:
                return Common::sanitizeInputValue($value);
        }
    }

    /**
     * Validates and sanitizes date parameter
     */
    private function sanitizeDate(string $date): string
    {
        if (preg_match('/^(today|yesterday|last\d+|previous\d+|\d{4}-\d{2}-\d{2}(,\d{4}-\d{2}-\d{2})?)$/', $date)) {
            return $date;
        }
        return 'today';
    }

    /**
     * Validates and sanitizes period parameter
     */
    private function sanitizePeriod(string $period): string
    {
        $allowedPeriods = ['day', 'week', 'month', 'year', 'range'];
        return in_array($period, $allowedPeriods, true) ? $period : 'day';
    }

    /**
     * Resolves the API method from widget parameters
     * Handles evolution graph controller actions by extracting the real API method
     */
    private function resolveReportMethod(string $reportId, array $widgetParams = []): string
    {
        $evolutionActions = ['getEvolutionGraph', 'getEvolutionOverview', 'getRowEvolution'];

        $parts = explode('.', $reportId, 2);
        if (count($parts) !== 2) {
            return $reportId;
        }

        $module = $parts[0];
        $action = $parts[1];

        if (in_array($action, $evolutionActions, true)) {
            if (!empty($widgetParams['apiMethod'])) {
                return $widgetParams['apiMethod'];
            }
            if (!empty($widgetParams['method'])) {
                return $widgetParams['method'];
            }

            // Special handling for CustomReports evolution graphs
            // CustomReports doesn't have a 'get' method, always use getCustomReport
            if ($module === 'CustomReports') {
                return 'CustomReports.getCustomReport';
            }

            return $module . '.get';
        }

        return $reportId;
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

        // Sanitize conversation messages
        $sanitizedConversation = $this->sanitizeConversation($conversation);

        $data = [
            "model" => $config['model'],
            "messages" => $sanitizedConversation,
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
        $sanitizedConversation = $this->sanitizeConversation($conversation);

        $data = [
            "model" => $config['model'],
            "messages" => $sanitizedConversation,
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

    /**
     * Parses the messages parameter from POST request
     * Handles both array and JSON string formats
     */
    private function parseMessagesParam($messages): array
    {
        // First check $_POST directly
        if (isset($_POST['messages']) && !empty($_POST['messages'])) {
            $postMessages = $_POST['messages'];
            if (is_string($postMessages)) {
                $decoded = json_decode($postMessages, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    return $decoded;
                }
            } elseif (is_array($postMessages)) {
                return $postMessages;
            }
        }

        // Fallback to Common::getRequestVar
        if (empty($messages) || !is_array($messages)) {
            $postMessages = Common::getRequestVar('messages', '', 'string', $_POST);
            if (!empty($postMessages)) {
                if (is_string($postMessages)) {
                    $decoded = json_decode($postMessages, true);
                    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                        return $decoded;
                    }
                } elseif (is_array($postMessages)) {
                    return $postMessages;
                }
            }
        }

        // If messages is a JSON string, decode it
        if (is_string($messages)) {
            $decoded = json_decode($messages, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return $decoded;
            }
            return [];
        }

        return is_array($messages) ? $messages : [];
    }

    /**
     * Parses the widgetParams parameter from POST request
     * Handles both array and JSON string formats
     */
    private function parseWidgetParams($widgetParams): array
    {
        // First check $_POST directly
        if (isset($_POST['widgetParams']) && !empty($_POST['widgetParams'])) {
            $postParams = $_POST['widgetParams'];
            if (is_string($postParams)) {
                $decoded = json_decode($postParams, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    return $decoded;
                }
            } elseif (is_array($postParams)) {
                return $postParams;
            }
        }

        // Fallback to Common::getRequestVar
        if (empty($widgetParams) || !is_array($widgetParams)) {
            $postParams = Common::getRequestVar('widgetParams', '', 'string', $_POST);
            if (!empty($postParams)) {
                if (is_string($postParams)) {
                    $decoded = json_decode($postParams, true);
                    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                        return $decoded;
                    }
                } elseif (is_array($postParams)) {
                    return $postParams;
                }
            }
        }

        // If widgetParams is a JSON string, decode it
        if (is_string($widgetParams)) {
            $decoded = json_decode($widgetParams, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return $decoded;
            }
            return [];
        }

        return is_array($widgetParams) ? $widgetParams : [];
    }

    /**
     * Sanitizes conversation messages to prevent injection
     */
    private function sanitizeConversation(array $conversation): array
    {
        $sanitized = [];
        $allowedRoles = ['system', 'user', 'assistant'];

        foreach ($conversation as $message) {
            if (!is_array($message)) {
                continue;
            }

            $role = $message['role'] ?? '';
            if (!in_array($role, $allowedRoles, true)) {
                continue;
            }

            $sanitizedMessage = [
                'role' => $role,
                'content' => (string) ($message['content'] ?? ''),
            ];

            if (isset($message['name']) && preg_match('/^[a-zA-Z0-9_-]+$/', $message['name'])) {
                $sanitizedMessage['name'] = $message['name'];
            }

            $sanitized[] = $sanitizedMessage;
        }

        return $sanitized;
    }
}
