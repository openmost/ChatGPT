<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use DateTimeImmutable;
use Exception;
use InvalidArgumentException;
use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\DataTable;
use Piwik\Log\LoggerInterface;
use Piwik\Piwik;

/**
 * Fetches the data of the report widget an insight is requested for, as a compact payload for the model
 */
class InsightReport
{
    /**
     * Widget parameters forwarded to the report API, with their validation rule. The search and the sort of the
     * table are kept, paging and visualization are left out: every row matching the search is analysed.
     */
    public const PARAMETER_RULES = [
        'idSubtable' => 'int',
        'idGoal' => 'goal',
        'idDimension' => 'int',
        'idCustomReport' => 'int',
        'idFunnel' => 'int',
        'idForm' => 'int',
        'idSiteHsr' => 'int',
        'idLogHsr' => 'int',
        'idHeatmap' => 'int',
        'idSessionRecording' => 'int',
        'idExperiment' => 'int',
        'idAlert' => 'int',
        'idNote' => 'int',
        'idExport' => 'int',
        'idLogCrash' => 'int',
        'idFailure' => 'int',
        'flat' => 'bool',
        'expanded' => 'bool',
        'topPaths' => 'bool',
        'lastMinutes' => 'int',
        'secondaryDimension' => 'name',
        'dataSource' => 'name',
        'eventDimensionType' => 'name',
        'columns' => 'columns',
        'label' => 'label',
        'filter_column' => 'name',
        'filter_pattern' => 'label',
        'filter_column_recursive' => 'name',
        'filter_pattern_recursive' => 'label',
        'filter_sort_column' => 'name',
        'filter_sort_order' => 'order',
    ];

    /**
     * Rows the user expanded in the table, their subtables are added to the payload
     */
    public const EXPANDED_SUBTABLES_PARAMETER = 'expandedSubtables';

    public const MAX_EXPANDED_SUBTABLES = 5;

    /**
     * Payload size shared by the expanded subtables, on top of the report itself
     */
    private const EXPANDED_SUBTABLES_MAX_BYTES = 30000;

    /**
     * Parameters of the table the subtables do not inherit, as Matomo resets them when it loads a subtable
     */
    private const PARENT_ONLY_PARAMETERS = ['filter_column', 'filter_pattern', 'filter_column_recursive', 'filter_pattern_recursive', 'filter_sort_column', 'filter_sort_order', 'flat', 'expanded', 'idSubtable', 'label'];

    /**
     * Points of an evolution graph, Matomo's default (graphs_default_evolution_graph_last_days_amount)
     */
    private const EVOLUTION_POINTS = 30;

    /**
     * Methods returning one row per visit: a whole period can hold millions of rows
     */
    private const ROW_LIMITED_METHODS = ['Live.getLastVisitsDetails' => 100];

    private const DEFAULT_LAST_MINUTES = 30;
    private const MAX_COMPARISONS = 5;
    private const MAX_SEGMENT_LENGTH = 4096;
    private const MAX_LABEL_LENGTH = 500;
    private const GOAL_KEYWORDS = ['ecommerceOrder', 'ecommerceAbandonedCart'];
    private const PERIODS = ['day', 'week', 'month', 'year', 'range'];

    /**
     * @var ReportMethodResolver
     */
    private $resolver;

    /**
     * @var ReportPayload
     */
    private $payload;

    public function __construct(?ReportMethodResolver $resolver = null, ?ReportPayload $payload = null)
    {
        $this->resolver = $resolver ?: new ReportMethodResolver();
        $this->payload = $payload ?: new ReportPayload();
    }

    public function isInsightRequest(array $widgetParams): bool
    {
        return !empty($widgetParams) && (isset($widgetParams['module']) || isset($widgetParams['action']));
    }

    /**
     * The compact JSON payload of the widget's report
     *
     * @param string|null $segment the active segment, read from the request when null
     * @param array|null $comparisons the compared periods and segments, read from the request when null
     * @throws InsightNotAvailableException if the widget has no report data
     * @throws Exception if a parameter is invalid or the report cannot be fetched
     */
    public function fetch(array $widgetParams, int $idSite, string $date, string $period, ?string $segment = null, ?array $comparisons = null): string
    {
        try {
            $request = $this->buildReportRequest(
                $widgetParams,
                $idSite,
                $date,
                $period,
                $segment ?? self::getSegmentFromRequest(),
                $comparisons ?? self::getComparisonsFromRequest()
            );
        } catch (InsightNotAvailableException $e) {
            StaticContainer::get(LoggerInterface::class)->warning('ChatGPT insight not available for the widget {widget}', [
                'widget' => json_encode(array_intersect_key($widgetParams, array_flip(array_merge(['module', 'action', 'apiMethod', 'viewDataTable'], array_keys(self::PARAMETER_RULES))))),
            ]);
            throw new InsightNotAvailableException(Piwik::translate('ChatGPT_InsightNotAvailable'));
        }

        $privacy = StaticContainer::get(DataPrivacy::class);
        $apiModule = is_string($request['parameters']['apiModule'] ?? null) ? $request['parameters']['apiModule'] : '';
        if ($privacy->isMethodExcluded($request['method']) || ($apiModule !== '' && $privacy->isMethodExcluded($apiModule))) {
            throw new InsightNotAvailableException(Piwik::translate('ChatGPT_VisitorDataExcluded'));
        }

        // an empty default request: nothing of the current request (limit, offset, segment) leaks into the report
        $data = Request::processRequest($request['method'], $request['parameters'] + [
            'format' => 'original',
            'format_metrics' => 'bc',
        ], []);

        $metadata = $this->getReportMetadata($request);
        $payload = $this->payload->build($data, $metadata, $this->describe($request));

        $subtables = $this->fetchExpandedSubtables($request, $this->getExpandedSubtableIds($widgetParams), $data, $metadata);
        if ($subtables !== []) {
            $payload['expandedRows'] = $subtables;
        }

        return $this->payload->encode($privacy->redactValue($payload));
    }

    /**
     * The validated ids of the subtables the user expanded, at most MAX_EXPANDED_SUBTABLES
     *
     * @return int[]
     * @throws InvalidArgumentException if an id is invalid
     */
    public function getExpandedSubtableIds(array $widgetParams): array
    {
        $ids = $widgetParams[self::EXPANDED_SUBTABLES_PARAMETER] ?? [];
        if (!is_array($ids)) {
            throw new InvalidArgumentException(sprintf('Invalid value for the parameter %s', self::EXPANDED_SUBTABLES_PARAMETER));
        }

        $checked = [];
        foreach (array_slice(array_values($ids), 0, self::MAX_EXPANDED_SUBTABLES) as $id) {
            $checked[] = $this->sanitizeParam(self::EXPANDED_SUBTABLES_PARAMETER, $id, 'int');
        }

        return array_values(array_unique(array_filter($checked, function ($id) {
            return $id > 0;
        })));
    }

    /**
     * The subtable request of an expanded row: the report's subtable method, without the search and sort of the table
     *
     * @return array{method: string, parameters: array<string, mixed>}|null null when the report has no subtables
     */
    public function buildSubtableRequest(array $request, ?array $metadata, int $idSubtable): ?array
    {
        $subtableAction = is_array($metadata) && is_string($metadata['actionToLoadSubTables'] ?? null) ? $metadata['actionToLoadSubTables'] : '';
        if (!preg_match('/^[A-Za-z0-9_]{1,64}$/', $subtableAction) || $request['evolution'] || !empty($request['comparisons'])) {
            return null;
        }

        [$module] = explode('.', $request['method'], 2);
        $parameters = array_diff_key($request['parameters'], array_flip(self::PARENT_ONLY_PARAMETERS));
        $parameters['idSubtable'] = $idSubtable;

        return [
            'method' => $module . '.' . $subtableAction,
            'parameters' => $parameters,
        ];
    }

    /**
     * @param int[] $ids
     * @param mixed $parentData
     * @return list<array<string, mixed>>
     */
    private function fetchExpandedSubtables(array $request, array $ids, $parentData, ?array $metadata): array
    {
        if ($ids === []) {
            return [];
        }

        $privacy = StaticContainer::get(DataPrivacy::class);
        $maxBytes = intdiv(self::EXPANDED_SUBTABLES_MAX_BYTES, count($ids));
        $subtables = [];
        foreach ($ids as $idSubtable) {
            $subtableRequest = $this->buildSubtableRequest($request, $metadata, $idSubtable);
            if ($subtableRequest === null) {
                return [];
            }
            if ($privacy->isMethodExcluded($subtableRequest['method'])) {
                continue;
            }

            try {
                $data = Request::processRequest($subtableRequest['method'], $subtableRequest['parameters'] + [
                    'format' => 'original',
                    'format_metrics' => 'bc',
                ], []);
            } catch (Exception $e) {
                // eg a subtable id from an outdated table, the report itself is still analysed
                StaticContainer::get(LoggerInterface::class)->info('ChatGPT insight skipped the subtable {idSubtable}: {message}', [
                    'idSubtable' => $idSubtable,
                    'message' => $e->getMessage(),
                ]);
                continue;
            }

            $parentLabel = $this->getParentLabel($parentData, $idSubtable);
            $subtables[] = array_filter(['parentLabel' => $parentLabel], 'is_string')
                + $this->payload->build($data, $metadata, ['method' => $subtableRequest['method']] + $subtableRequest['parameters'], $maxBytes);
        }

        return $subtables;
    }

    /**
     * @param mixed $parentData
     */
    private function getParentLabel($parentData, int $idSubtable): ?string
    {
        if (!$parentData instanceof DataTable) {
            return null;
        }

        $row = $parentData->getRowFromIdSubDataTable($idSubtable);
        $label = $row ? $row->getColumn('label') : false;

        return is_scalar($label) && $label !== '' ? (string) $label : null;
    }

    /**
     * Maps the widget parameters to the report API method and its validated parameters
     *
     * @param array{periods?: list<array{period: string, date: string}>, segments?: list<string>} $comparisons
     * @return array{method: string, parameters: array<string, mixed>, evolution: bool, comparisons: array}
     * @throws InsightNotAvailableException if the widget does not map to a report
     * @throws InvalidArgumentException if a parameter is invalid
     */
    public function buildReportRequest(array $widgetParams, int $idSite, string $date, string $period, string $segment = '', array $comparisons = []): array
    {
        $this->checkPeriodAndDate($period, $date);

        $resolved = $this->resolver->resolve($widgetParams, array_keys(self::PARAMETER_RULES));
        if ($resolved === null) {
            throw new InsightNotAvailableException('Insights are not available for this widget yet');
        }
        $method = $resolved['module'] . '.' . $resolved['action'];

        $action = is_string($widgetParams['action'] ?? null) ? $widgetParams['action'] : '';
        $viewDataTable = is_string($widgetParams['viewDataTable'] ?? null) ? $widgetParams['viewDataTable'] : '';
        $evolution = stripos($action, 'Evolution') !== false || stripos($viewDataTable, 'Evolution') !== false;
        if ($evolution) {
            [$period, $date] = $this->getEvolutionPeriodAndDate($period, $date);
        }

        $parameters = [
            'idSite' => $idSite,
            'period' => $period,
            'date' => $date,
        ];

        $widgetSegment = $widgetParams['segment'] ?? '';
        $segment = is_string($widgetSegment) && $widgetSegment !== '' ? $widgetSegment : $segment;
        if ($segment !== '') {
            $parameters['segment'] = $this->checkSegment($segment);
        }

        foreach ($resolved['parameters'] + $widgetParams as $name => $value) {
            if (!isset(self::PARAMETER_RULES[$name]) || $value === '' || $value === null || $value === []) {
                continue;
            }
            if ($name === 'columns' && !$evolution) {
                // the plotted metrics of a graph, a table shows every metric
                continue;
            }
            $parameters[$name] = $this->sanitizeParam($name, $value, self::PARAMETER_RULES[$name]);
        }
        foreach (['apiModule', 'apiAction'] as $name) {
            if (isset($resolved['parameters'][$name])) {
                $parameters[$name] = $resolved['parameters'][$name];
            }
        }
        foreach ($this->resolver->getRequiredParameters($resolved['module'], $resolved['action']) as $required) {
            if (array_key_exists($required, $parameters)) {
                continue;
            }
            // real time widgets without the parameter show the last 30 minutes
            if ($required === 'lastMinutes') {
                $parameters['lastMinutes'] = self::DEFAULT_LAST_MINUTES;
                continue;
            }
            // eg cohorts, whose controller computes the date range to display
            throw new InsightNotAvailableException('Insights are not available for this widget yet');
        }

        $parameters['filter_limit'] = self::ROW_LIMITED_METHODS[$method] ?? -1;

        return [
            'method' => $method,
            'parameters' => $parameters,
            'evolution' => $evolution,
            'comparisons' => $this->checkComparisons($comparisons),
        ];
    }

    /**
     * The request descriptor given to the model: what the data is, and how to fetch more of it with the tools
     */
    public function describe(array $request): array
    {
        $parameters = $request['parameters'];
        unset($parameters['filter_limit']);

        $descriptor = ['method' => $request['method']] + $parameters;
        if (!empty($request['comparisons'])) {
            $descriptor['comparisons'] = $request['comparisons'];
        }
        return $descriptor;
    }

    /**
     * The active segment definition of the request
     */
    public static function getSegmentFromRequest(): string
    {
        try {
            // read from the query string: request variables are HTML escaped, which breaks segment operators
            $raw = Request::getRawSegmentFromRequest();
            if (is_string($raw) && $raw !== '') {
                return urldecode($raw);
            }
            return \Piwik\Request::fromRequest()->getStringParameter('segment', '');
        } catch (Exception $e) {
            return '';
        }
    }

    /**
     * @return array{periods?: list<array{period: string, date: string}>, segments?: list<string>}
     */
    public static function getComparisonsFromRequest(): array
    {
        $request = \Piwik\Request::fromRequest();
        $periods = $request->getArrayParameter('comparePeriods', []);
        $dates = $request->getArrayParameter('compareDates', []);
        $segments = $request->getArrayParameter('compareSegments', []);

        $comparisons = [];
        foreach (array_values($periods) as $index => $comparePeriod) {
            $comparisons['periods'][] = [
                'period' => is_string($comparePeriod) ? $comparePeriod : '',
                'date' => isset(array_values($dates)[$index]) && is_string(array_values($dates)[$index]) ? array_values($dates)[$index] : '',
            ];
        }
        foreach ($segments as $compareSegment) {
            $comparisons['segments'][] = is_string($compareSegment) ? $compareSegment : '';
        }
        return $comparisons;
    }

    private function getReportMetadata(array $request): ?array
    {
        $parameters = $request['parameters'];
        [$module, $action] = explode('.', $request['method'], 2);
        if ($module === 'API') {
            return null;
        }

        $apiParameters = array_diff_key($parameters, array_flip(array_merge(['idSite', 'period', 'date', 'segment', 'filter_limit', 'columns'], self::PARENT_ONLY_PARAMETERS)));
        try {
            $metadata = Request::processRequest('API.getMetadata', [
                'idSite' => $parameters['idSite'],
                'apiModule' => $module,
                'apiAction' => $action,
                'apiParameters' => $apiParameters,
                'period' => $parameters['period'],
                'date' => $parameters['date'],
                'hideMetricsDoc' => 1,
                'format' => 'original',
            ], []);
        } catch (Exception $e) {
            return null;
        }

        return is_array($metadata) && isset($metadata[0]) && is_array($metadata[0]) ? $metadata[0] : null;
    }

    /**
     * @param mixed $value
     * @return mixed
     */
    private function sanitizeParam(string $name, $value, string $type)
    {
        switch ($type) {
            case 'int':
                if (is_int($value) || (is_string($value) && preg_match('/^-?\d{1,10}$/', $value))) {
                    return (int) $value;
                }
                break;
            case 'goal':
                if (is_string($value) && in_array($value, self::GOAL_KEYWORDS, true)) {
                    return $value;
                }
                if (is_int($value) || (is_string($value) && preg_match('/^\d{1,10}$/', $value))) {
                    return (int) $value;
                }
                break;
            case 'bool':
                if (in_array($value, [true, 1, '1', 'true'], true)) {
                    return 1;
                }
                if (in_array($value, [false, 0, '0', 'false'], true)) {
                    return 0;
                }
                break;
            case 'name':
                if (is_string($value) && preg_match('/^[A-Za-z0-9_]{1,64}$/', $value)) {
                    return $value;
                }
                break;
            case 'columns':
                $columns = is_array($value) ? $value : (is_string($value) ? explode(',', $value) : []);
                $columns = array_values(array_filter(array_map('trim', array_filter($columns, 'is_string')), 'strlen'));
                if ($columns !== [] && count($columns) <= 20 && preg_grep('/^[A-Za-z0-9_]{1,64}$/', $columns, PREG_GREP_INVERT) === []) {
                    return implode(',', $columns);
                }
                break;
            case 'label':
                if (is_string($value) && mb_strlen($value) <= self::MAX_LABEL_LENGTH && !preg_match('/[\x00-\x1F\x7F]/', $value)) {
                    return $value;
                }
                break;
            case 'order':
                if (is_string($value) && in_array(strtolower($value), ['asc', 'desc'], true)) {
                    return strtolower($value);
                }
                break;
        }

        throw new InvalidArgumentException(sprintf('Invalid value for the parameter %s', $name));
    }

    private function checkSegment(string $segment): string
    {
        if (strlen($segment) > self::MAX_SEGMENT_LENGTH || preg_match('/[\x00-\x1F\x7F]/', $segment)) {
            throw new InvalidArgumentException('Invalid segment');
        }
        // the definition itself and the access to it are checked by the report request
        return $segment;
    }

    private function checkPeriodAndDate(string $period, string $date): void
    {
        if (!in_array($period, self::PERIODS, true)) {
            throw new InvalidArgumentException('Invalid period');
        }

        $relative = '(last|previous)([1-9]\d{0,2})';
        if ($period === 'range') {
            $day = '(\d{4}-\d{2}-\d{2}|today|yesterday)';
            if (!preg_match('/^(' . $relative . '|' . $day . ',' . $day . ')$/', $date)) {
                throw new InvalidArgumentException('Invalid date');
            }
            $bounds = explode(',', $date);
            if (count($bounds) === 2) {
                foreach ($bounds as $bound) {
                    $this->checkDay($bound);
                }
                if (preg_match('/^\d/', $bounds[0]) && preg_match('/^\d/', $bounds[1]) && $bounds[0] > $bounds[1]) {
                    throw new InvalidArgumentException('Invalid date');
                }
            }
            return;
        }

        if (preg_match('/^' . $relative . '$/', $date)) {
            return;
        }
        $bounds = explode(',', $date);
        if (count($bounds) > 2) {
            throw new InvalidArgumentException('Invalid date');
        }
        foreach ($bounds as $bound) {
            $this->checkDay($bound);
        }
    }

    private function checkDay(string $day): void
    {
        if ($day === 'today' || $day === 'yesterday') {
            return;
        }
        if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $day, $matches) || !checkdate((int) $matches[2], (int) $matches[3], (int) $matches[1])) {
            throw new InvalidArgumentException('Invalid date');
        }
    }

    /**
     * The points the evolution graph shows: the selected period over the last 30 periods up to the selected date,
     * or every day of a range
     *
     * @return array{0: string, 1: string}
     */
    private function getEvolutionPeriodAndDate(string $period, string $date): array
    {
        if ($period === 'range') {
            return ['day', $date];
        }
        if (strpos($date, ',') !== false || preg_match('/^(last|previous)\d+$/', $date)) {
            return [$period, $date];
        }
        if ($date === 'today' || $date === 'yesterday') {
            // previousN ends with the period before the current one, which only matches yesterday for days
            return [$period, $date === 'yesterday' && $period === 'day' ? 'previous' . self::EVOLUTION_POINTS : 'last' . self::EVOLUTION_POINTS];
        }

        $end = new DateTimeImmutable($date);
        $start = $end->modify(sprintf('-%d %s', self::EVOLUTION_POINTS - 1, $period));
        return [$period, $start->format('Y-m-d') . ',' . $end->format('Y-m-d')];
    }

    /**
     * @return array{periods?: list<array{period: string, date: string}>, segments?: list<string>}
     */
    private function checkComparisons(array $comparisons): array
    {
        $checked = [];
        $periods = isset($comparisons['periods']) && is_array($comparisons['periods']) ? $comparisons['periods'] : [];
        $segments = isset($comparisons['segments']) && is_array($comparisons['segments']) ? $comparisons['segments'] : [];
        if (count($periods) > self::MAX_COMPARISONS || count($segments) > self::MAX_COMPARISONS) {
            throw new InvalidArgumentException('Too many comparisons');
        }

        foreach ($periods as $comparison) {
            $comparePeriod = is_array($comparison) && is_string($comparison['period'] ?? null) ? $comparison['period'] : '';
            $compareDate = is_array($comparison) && is_string($comparison['date'] ?? null) ? $comparison['date'] : '';
            $this->checkPeriodAndDate($comparePeriod, $compareDate);
            $checked['periods'][] = ['period' => $comparePeriod, 'date' => $compareDate];
        }
        foreach ($segments as $compareSegment) {
            if (!is_string($compareSegment)) {
                throw new InvalidArgumentException('Invalid segment');
            }
            // an empty compared segment is "all visits"
            $checked['segments'][] = $compareSegment === '' ? '' : $this->checkSegment($compareSegment);
        }

        return $checked;
    }
}
