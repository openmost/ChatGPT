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
        $requestParams = $this->buildRequestParams($widgetParams, $idSite, $date, $period);
        $apiMethod = $this->resolveReportMethod($requestParams['_apiMethod'], $widgetParams);
        unset($requestParams['_apiMethod']);

        // Validate API method format (Module.action)
        if (!preg_match('/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/', $apiMethod)) {
            throw new Exception('Invalid API method format');
        }

        // Matomo's Request::processRequest handles permission checks internally
        $data = Request::processRequest($apiMethod, $requestParams);

        return is_string($data) ? $data : (string) json_encode($data);
    }

    private function buildRequestParams(array $widgetParams, int $idSite, string $date, string $period): array
    {
        $action = isset($widgetParams['action']) ? (string) $widgetParams['action'] : '';

        // For evolution graphs, use day period with last90 to get multiple data points
        if (in_array($action, self::EVOLUTION_ACTIONS, true)) {
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
        $module = isset($widgetParams['module']) ? preg_replace('/[^a-zA-Z0-9]/', '', (string) $widgetParams['module']) : '';
        $action = preg_replace('/[^a-zA-Z0-9]/', '', $action);
        $requestParams['_apiMethod'] = $module . '.' . $action;

        foreach (self::SUPPORTED_PARAMS as $param => $type) {
            if (isset($widgetParams[$param]) && $widgetParams[$param] !== '') {
                $requestParams[$param] = $this->sanitizeParam($widgetParams[$param], $type);
            }
        }

        return $requestParams;
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
