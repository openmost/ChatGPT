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
    private const CURL_TIMEOUT = 60;
    private const CURL_CONNECT_TIMEOUT = 10;

    public function __construct(\Piwik\Log\LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function getResponse($idSite, $period, $date, $messages = [])
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = (int) Common::getRequestVar('idSite');
        Piwik::checkUserHasViewAccess($idSite);

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

        return $this->fetchModelAi(array_merge($conversationBase, $messages));
    }

    public function getInsights($idSite, $period, $date, $messages = [], $widgetParams = [])
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = (int) Common::getRequestVar('idSite');
        Piwik::checkUserHasViewAccess($idSite);

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

        return $this->fetchModelAi(array_merge($conversationBase, $messages));
    }

    /**
     * Builds request parameters from widget parameters with proper validation
     */
    private function buildRequestParams($widgetParams, $idSite, $date, $period)
    {
        // Validate and sanitize base parameters
        $requestParams = [
            'idSite' => (int) $idSite,
            'date' => $this->sanitizeDate($date),
            'period' => $this->sanitizePeriod($period),
            'format' => 'json',
        ];

        // Sanitize module and action (alphanumeric only)
        $module = isset($widgetParams['module']) ? preg_replace('/[^a-zA-Z0-9]/', '', $widgetParams['module']) : '';
        $action = isset($widgetParams['action']) ? preg_replace('/[^a-zA-Z0-9]/', '', $widgetParams['action']) : '';
        $requestParams['_apiMethod'] = $module . '.' . $action;

        // Define supported parameters with their validation rules
        $supportedParams = [
            'idDimension' => 'int',
            'idCustomReport' => 'int',
            'idGoal' => 'int',
            'segment' => 'segment',
            'idSubtable' => 'int',
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
    private function sanitizeParam($value, $type)
    {
        switch ($type) {
            case 'int':
                return (int) $value;
            case 'bool':
                return (bool) $value ? 1 : 0;
            case 'segment':
                // Allow Matomo segment syntax but remove potential injection characters
                return Common::unsanitizeInputValue($value);
            default:
                return Common::sanitizeInputValue($value);
        }
    }

    /**
     * Validates and sanitizes date parameter
     */
    private function sanitizeDate($date)
    {
        // Allow common Matomo date formats
        if (preg_match('/^(today|yesterday|last\d+|previous\d+|\d{4}-\d{2}-\d{2}(,\d{4}-\d{2}-\d{2})?)$/', $date)) {
            return $date;
        }
        return 'today';
    }

    /**
     * Validates and sanitizes period parameter
     */
    private function sanitizePeriod($period)
    {
        $allowedPeriods = ['day', 'week', 'month', 'year', 'range'];
        return in_array($period, $allowedPeriods, true) ? $period : 'day';
    }

    /**
     * Resolves the API method from widget parameters
     * Handles evolution graph controller actions by extracting the real API method
     */
    private function resolveReportMethod($reportId, $widgetParams = [])
    {
        // Evolution graph actions are controller actions, not API methods
        // They typically have an 'apiMethod' or 'method' param specifying the real API
        $evolutionActions = ['getEvolutionGraph', 'getEvolutionOverview', 'getRowEvolution'];

        $parts = explode('.', $reportId, 2);
        if (count($parts) !== 2) {
            return $reportId;
        }

        $module = $parts[0];
        $action = $parts[1];

        if (in_array($action, $evolutionActions, true)) {
            // Check if widgetParams contains the actual API method
            if (!empty($widgetParams['apiMethod'])) {
                return $widgetParams['apiMethod'];
            }
            if (!empty($widgetParams['method'])) {
                return $widgetParams['method'];
            }
            // Fallback: use the module's default 'get' method for summary modules
            return $module . '.get';
        }

        return $reportId;
    }

    /**
     * Retrieves the list of available models from the OpenAI API
     * @param string|null $host API base URL (optional, uses default settings)
     * @param string|null $apiKey API Key (optional, uses default settings)
     * @return array List of available models
     */
    public function getAvailableModels($host = null, $apiKey = null)
    {
        Piwik::checkUserHasSomeViewAccess();

        $systemSettings = new SystemSettings();

        $configuredHost = $host ?: $systemSettings->host->getValue();
        $configuredApiKey = $apiKey ?: $systemSettings->apiKey->getValue();

        if (!$configuredHost || !$configuredApiKey) {
            return ['error' => 'Host and API Key must be configured first', 'models' => []];
        }

        // Validate host URL
        if (!$this->isValidApiUrl($configuredHost)) {
            return ['error' => 'Invalid API host URL', 'models' => []];
        }

        $baseUrl = preg_replace('#/v1/.*$#', '/v1', $configuredHost);
        $modelsUrl = $baseUrl . '/models';

        $headers = [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $configuredApiKey,
        ];

        $ch = curl_init($modelsUrl);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, self::CURL_CONNECT_TIMEOUT);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($curlError) {
            $this->logger->warning('ChatGPT API curl error: ' . $curlError);
            return ['error' => 'Connection error: ' . $curlError, 'models' => []];
        }

        if (!$response || $httpCode !== 200) {
            return ['error' => 'Failed to fetch models from API (HTTP ' . $httpCode . ')', 'models' => []];
        }

        $data = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return ['error' => 'Invalid JSON response from API', 'models' => []];
        }

        if (!isset($data['data']) || !is_array($data['data'])) {
            return ['error' => 'Invalid response structure from API', 'models' => []];
        }

        $models = [];
        foreach ($data['data'] as $model) {
            if (!isset($model['id']) || !is_string($model['id'])) {
                continue;
            }
            $modelId = $model['id'];
            if (preg_match('/^(gpt|o1|o3|chatgpt|claude)/i', $modelId)) {
                $models[$modelId] = $modelId;
            }
        }

        ksort($models);
        return ['models' => $models, 'error' => null];
    }

    /**
     * Validates that the URL is a valid HTTPS API endpoint
     */
    private function isValidApiUrl($url)
    {
        if (empty($url)) {
            return false;
        }
        $parsed = parse_url($url);
        return isset($parsed['scheme']) && $parsed['scheme'] === 'https' && isset($parsed['host']);
    }

    /**
     * Sends a conversation to the AI model and returns the response
     * @throws Exception if configuration is missing or API call fails
     */
    private function fetchModelAi($conversation)
    {
        $idSite = (int) Common::getRequestVar('idSite');
        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);

        $host = $measurableSettings->host->getValue() ?: $systemSettings->host->getValue();
        $apiKey = $measurableSettings->apiKey->getValue() ?: $systemSettings->apiKey->getValue();
        $model = $systemSettings->model->getValue();

        $measurableModel = $measurableSettings->model->getValue();
        if (is_array($measurableModel) && !empty($measurableModel[0])) {
            $model = $measurableModel;
        }

        // Validate configuration
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

        // Sanitize conversation messages
        $sanitizedConversation = $this->sanitizeConversation($conversation);

        $modelName = is_array($model) ? $model[0] : $model;
        $data = [
            "model" => $modelName,
            "messages" => $sanitizedConversation,
        ];

        $headers = [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $apiKey,
        ];

        $ch = curl_init($host);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_TIMEOUT, self::CURL_TIMEOUT);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, self::CURL_CONNECT_TIMEOUT);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        // Log request (without sensitive data)
        $this->logger->info('ChatGPT API request to model: ' . $modelName);

        if ($curlError) {
            $this->logger->error('ChatGPT API curl error: ' . $curlError);
            throw new Exception('Connection error: ' . $curlError);
        }

        if (!$response) {
            throw new Exception('Empty response from ChatGPT API');
        }

        $result = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON response from ChatGPT API');
        }

        // Handle API error responses
        if (isset($result['error'])) {
            $errorMessage = isset($result['error']['message']) ? $result['error']['message'] : 'Unknown API error';
            $this->logger->warning('ChatGPT API error: ' . $errorMessage);
            return ['error' => ['message' => $errorMessage]];
        }

        if ($httpCode !== 200) {
            throw new Exception('ChatGPT API returned HTTP ' . $httpCode);
        }

        return $result;
    }

    /**
     * Sanitizes conversation messages to prevent injection
     */
    private function sanitizeConversation($conversation)
    {
        $sanitized = [];
        $allowedRoles = ['system', 'user', 'assistant'];

        foreach ($conversation as $message) {
            if (!is_array($message)) {
                continue;
            }

            $role = isset($message['role']) ? $message['role'] : '';
            if (!in_array($role, $allowedRoles, true)) {
                continue;
            }

            $sanitizedMessage = [
                'role' => $role,
                'content' => isset($message['content']) ? (string) $message['content'] : '',
            ];

            // Only include name if present and valid
            if (isset($message['name']) && preg_match('/^[a-zA-Z0-9_-]+$/', $message['name'])) {
                $sanitizedMessage['name'] = $message['name'];
            }

            $sanitized[] = $sanitizedMessage;
        }

        return $sanitized;
    }
}
