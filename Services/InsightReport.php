<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Exception;
use Piwik\API\Request;
use Piwik\Common;

/**
 * Fetches the data of the report widget an insight is requested for
 */
class InsightReport
{
    private const EVOLUTION_ACTIONS = ['getEvolutionGraph', 'getEvolutionOverview', 'getRowEvolution'];

    /**
     * Supported widget parameters forwarded to the report API, with their validation rule
     */
    private const SUPPORTED_PARAMS = [
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

    public function isInsightRequest(array $widgetParams): bool
    {
        return !empty($widgetParams) && (isset($widgetParams['module']) || isset($widgetParams['action']));
    }

    /**
     * @throws Exception if the widget does not map to a valid report API method
     */
    public function fetch(array $widgetParams, int $idSite, string $date, string $period): string
    {
        $reportRequest = $this->buildReportRequest($widgetParams, $idSite, $date, $period);

        // Matomo's Request::processRequest handles permission checks internally
        $data = Request::processRequest($reportRequest['method'], $reportRequest['parameters']);
        $data = is_string($data) ? $data : (string) json_encode($data);

        // with format=json, API errors (eg no access) are rendered instead of thrown: do not send
        // them to the model as if they were the report data
        $decoded = json_decode($data, true);
        if (is_array($decoded) && ($decoded['result'] ?? null) === 'error') {
            throw new Exception((string) ($decoded['message'] ?? 'The report data could not be fetched'));
        }

        return $data;
    }

    /**
     * Maps the widget parameters to the report API method and its validated parameters
     *
     * @return array{method: string, parameters: array<string, mixed>}
     * @throws Exception if the widget does not map to a valid report API method
     */
    public function buildReportRequest(array $widgetParams, int $idSite, string $date, string $period): array
    {
        $action = isset($widgetParams['action']) ? (string) $widgetParams['action'] : '';

        // For evolution graphs, use day period with last90 to get multiple data points
        if (in_array($action, self::EVOLUTION_ACTIONS, true)) {
            $period = 'day';
            $date = 'last90';
        }

        $parameters = [
            'idSite' => $idSite,
            'date' => $this->sanitizeDate($date),
            'period' => $this->sanitizePeriod($period),
            'format' => 'json',
        ];

        // Sanitize module and action (alphanumeric only)
        $module = isset($widgetParams['module']) ? preg_replace('/[^a-zA-Z0-9]/', '', (string) $widgetParams['module']) : '';
        $action = preg_replace('/[^a-zA-Z0-9]/', '', $action);

        foreach (self::SUPPORTED_PARAMS as $param => $type) {
            if (isset($widgetParams[$param]) && $widgetParams[$param] !== '') {
                $parameters[$param] = $this->sanitizeParam($widgetParams[$param], $type);
            }
        }

        $method = $this->resolveReportMethod($module . '.' . $action, $widgetParams);

        // Validate API method format (Module.action)
        if (!preg_match('/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/', $method)) {
            throw new Exception('Invalid API method format');
        }

        return ['method' => $method, 'parameters' => $parameters];
    }

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

    private function sanitizeDate(string $date): string
    {
        if (preg_match('/^(today|yesterday|last\d+|previous\d+|\d{4}-\d{2}-\d{2}(,\d{4}-\d{2}-\d{2})?)$/', $date)) {
            return $date;
        }
        return 'today';
    }

    private function sanitizePeriod(string $period): string
    {
        $allowedPeriods = ['day', 'week', 'month', 'year', 'range'];
        return in_array($period, $allowedPeriods, true) ? $period : 'day';
    }

    /**
     * Handles evolution graph controller actions by extracting the real API method
     */
    private function resolveReportMethod(string $reportId, array $widgetParams = []): string
    {
        $parts = explode('.', $reportId, 2);
        if (count($parts) !== 2) {
            return $reportId;
        }

        [$module, $action] = $parts;

        if (in_array($action, self::EVOLUTION_ACTIONS, true)) {
            if (!empty($widgetParams['apiMethod'])) {
                return (string) $widgetParams['apiMethod'];
            }
            if (!empty($widgetParams['method'])) {
                return (string) $widgetParams['method'];
            }

            // CustomReports doesn't have a 'get' method, always use getCustomReport
            if ($module === 'CustomReports') {
                return 'CustomReports.getCustomReport';
            }

            return $module . '.get';
        }

        return $reportId;
    }
}
