<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Piwik\DataTable;
use Piwik\DataTable\DataTableInterface;
use Piwik\DataTable\Row;
use Piwik\DataTable\Simple;

/**
 * Turns report data into a compact, bounded and deterministic payload for the model: the label and the metrics of
 * each row, the report totals, the request it comes from and the names and units of its metrics.
 */
class ReportPayload
{
    public const MAX_ROWS = 200;

    /**
     * About 15k tokens: room for the conversation and the tool results in every model context window
     */
    public const MAX_BYTES = 60000;

    private const MIN_ROWS = 5;
    private const MAX_LABEL_LENGTH = 200;

    /**
     * Columns that never help the analysis: images, segment definitions, links and nested goal tables
     */
    private const NOISE_COLUMNS = ['logo', 'logoWidth', 'logoHeight', 'segment', 'url', 'urlPattern', 'idsubdatatable', 'goals', 'html_label_prefix', 'html_label_suffix'];

    /**
     * Metrics rows are ranked by when a report is truncated, in this order of preference
     */
    private const SORT_METRICS = ['nb_visits', 'nb_hits', 'nb_events', 'nb_conversions', 'nb_plays', 'nb_impressions', 'nb_uniq_visitors', 'nb_actions', 'nb_pageviews', 'hits', 'revenue'];

    /**
     * @param mixed $data the report: a DataTable, a DataTable\Map, an array or a scalar
     * @param array|null $metadata the API.getMetadata entry of the report
     * @param array<string, mixed> $request the API request the data comes from
     */
    public function build($data, ?array $metadata, array $request): array
    {
        $rowLimit = self::MAX_ROWS;
        while (true) {
            $payload = $this->compose($data, $metadata, $request, $rowLimit);
            if (strlen($this->encode($payload)) <= self::MAX_BYTES) {
                return $payload;
            }
            if ($rowLimit <= self::MIN_ROWS) {
                break;
            }
            $rowLimit = max(self::MIN_ROWS, intdiv($rowLimit, 2));
        }

        $payload = $this->compose($data, $metadata, $request, 0);
        if (strlen($this->encode($payload)) <= self::MAX_BYTES) {
            return $payload;
        }

        return [
            'request' => $request,
            'note' => 'The report is too large to be included, fetch it with the Matomo tools.',
        ];
    }

    public function encode(array $payload): string
    {
        return (string) json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE | JSON_PARTIAL_OUTPUT_ON_ERROR);
    }

    /**
     * @param mixed $data
     */
    private function compose($data, ?array $metadata, array $request, int $rowLimit): array
    {
        $payload = [];
        $allowedColumns = null;
        if ($metadata !== null) {
            $payload['report'] = array_filter([
                'name' => isset($metadata['name']) ? (string) $metadata['name'] : '',
                'dimension' => isset($metadata['dimension']) ? (string) $metadata['dimension'] : '',
            ], 'strlen');
            $metrics = $this->getMetrics($metadata);
            if ($metrics !== []) {
                $allowedColumns = array_keys($metrics);
            }
        }
        $payload['request'] = $request;
        if (isset($metrics) && $metrics !== []) {
            $payload['metrics'] = $metrics;
        }

        return $payload + $this->normalize($data, $allowedColumns, $rowLimit);
    }

    /**
     * @return array<string, array{name: string, type?: string}>
     */
    private function getMetrics(array $metadata): array
    {
        $names = [];
        foreach (['metrics', 'processedMetrics'] as $key) {
            if (isset($metadata[$key]) && is_array($metadata[$key])) {
                $names += $metadata[$key];
            }
        }

        $metrics = [];
        foreach ($names as $column => $name) {
            if (!is_string($column) || !is_scalar($name)) {
                continue;
            }
            $metric = ['name' => (string) $name];
            if (isset($metadata['metricTypes'][$column]) && is_string($metadata['metricTypes'][$column])) {
                $metric['type'] = $metadata['metricTypes'][$column];
            }
            $metrics[$column] = $metric;
        }

        return $metrics;
    }

    /**
     * @param mixed $data
     * @param string[]|null $allowedColumns
     */
    private function normalize($data, ?array $allowedColumns, int $rowLimit): array
    {
        if ($data instanceof DataTable\Map) {
            return $this->normalizeSeries($data->getDataTables(), $allowedColumns, $rowLimit);
        }
        if ($data instanceof DataTable) {
            return $this->normalizeTable($data, $allowedColumns, $rowLimit);
        }
        if ($data instanceof DataTableInterface) {
            return ['value' => null];
        }
        if (is_array($data)) {
            if ($data !== [] && array_keys($data) === range(0, count($data) - 1)) {
                $rows = [];
                foreach ($data as $row) {
                    $rows[] = is_array($row) ? $row : ['value' => $row];
                }
                return $this->normalizeRows($rows, [], null, $allowedColumns, $rowLimit);
            }
            return ['values' => $this->compactColumns($data, $allowedColumns)];
        }

        return ['value' => is_scalar($data) || $data === null ? $data : null];
    }

    /**
     * @param array<string, mixed> $tables
     */
    private function normalizeSeries(array $tables, ?array $allowedColumns, int $rowLimit): array
    {
        $result = [];
        $skipped = max(0, count($tables) - max($rowLimit, 1));
        if ($skipped > 0) {
            // the most recent points matter most
            $tables = array_slice($tables, $skipped, null, true);
        }

        $rowsPerPoint = $tables === [] ? 0 : max(min(self::MIN_ROWS, $rowLimit), intdiv($rowLimit, count($tables)));
        $series = [];
        foreach ($tables as $key => $table) {
            $point = $this->normalize($table, $allowedColumns, $rowsPerPoint);
            $series[(string) $key] = $point['values'] ?? $point;
        }
        $result['series'] = $series;

        if ($skipped > 0) {
            $result['note'] = sprintf('%d earlier points not included.', $skipped);
        }
        return $result;
    }

    private function normalizeTable(DataTable $table, ?array $allowedColumns, int $rowLimit): array
    {
        $rows = $table->getRows();
        if ($table instanceof Simple || (count($rows) === 1 && !$this->hasLabel(reset($rows)))) {
            $first = reset($rows);
            return ['values' => $first instanceof Row ? $this->compactColumns($first->getColumns(), $this->effectiveColumns($first->getColumns(), $allowedColumns)) : []];
        }

        $arrays = [];
        $subtables = [];
        foreach ($rows as $index => $row) {
            $arrays[$index] = $row->getColumns();
            $idSubtable = $row->getIdSubDataTable();
            if ($idSubtable !== null) {
                $subtables[$index] = (int) $idSubtable;
            }
        }

        $totals = $table->getMetadata('totals');
        return $this->normalizeRows($arrays, $subtables, is_array($totals) ? $totals : null, $allowedColumns, $rowLimit);
    }

    /**
     * @param array<int, array> $rows
     * @param array<int, int> $subtables
     */
    private function normalizeRows(array $rows, array $subtables, ?array $totals, ?array $allowedColumns, int $rowLimit): array
    {
        $allowedColumns = $rows === [] ? $allowedColumns : $this->effectiveColumns(reset($rows), $allowedColumns);
        $result = [];
        $rowCount = count($rows);

        $sortMetric = null;
        if ($rowCount > $rowLimit) {
            $sortMetric = $this->getSortMetric($rows, $allowedColumns);
            if ($sortMetric !== null) {
                $rows = $this->sortRows($rows, $sortMetric);
            }
            $rows = array_slice($rows, 0, $rowLimit, true);
        }

        $compactRows = [];
        foreach ($rows as $index => $row) {
            if (isset($row['idsubdatatable']) && !isset($subtables[$index]) && is_numeric($row['idsubdatatable'])) {
                $subtables[$index] = (int) $row['idsubdatatable'];
            }
            $compactRow = $this->compactColumns($row, $allowedColumns);
            if (isset($subtables[$index])) {
                $compactRow['idSubtable'] = $subtables[$index];
            }
            $compactRows[] = $compactRow;
        }

        if ($totals !== null) {
            $result['totals'] = $this->compactColumns($totals, $allowedColumns);
        }
        $result['rowCount'] = $rowCount;
        $result['rows'] = $compactRows;

        if ($rowCount > $rowLimit) {
            $result['note'] = $sortMetric !== null
                ? sprintf('%d more rows not included, sorted by %s.', $rowCount - $rowLimit, $sortMetric)
                : sprintf('%d more rows not included.', $rowCount - $rowLimit);
        }

        return $result;
    }

    /**
     * The metadata metrics when the rows hold them, every column otherwise
     *
     * @param mixed $row
     */
    private function effectiveColumns($row, ?array $allowedColumns): ?array
    {
        if ($allowedColumns === null || !is_array($row)) {
            return $allowedColumns;
        }
        return array_intersect($allowedColumns, array_keys($row)) === [] ? null : $allowedColumns;
    }

    /**
     * @param mixed $row
     */
    private function hasLabel($row): bool
    {
        return $row instanceof Row && $row->getColumn('label') !== false;
    }

    private function compactColumns(array $columns, ?array $allowedColumns): array
    {
        $compact = [];
        foreach ($columns as $column => $value) {
            $column = (string) $column;
            if ($column === 'label') {
                // Matomo stores labels HTML encoded, the model reads plain text
                $compact['label'] = $this->truncate(is_scalar($value) ? html_entity_decode((string) $value, ENT_QUOTES, 'UTF-8') : '');
                continue;
            }
            if (in_array($column, self::NOISE_COLUMNS, true) || is_array($value) || is_object($value) || $value === null) {
                continue;
            }
            if ($allowedColumns !== null ? !in_array($column, $allowedColumns, true) : substr($column, -17) === '_percent_of_total') {
                continue;
            }
            if (is_float($value)) {
                $value = round($value, 2);
            } elseif (is_string($value)) {
                $value = $this->truncate($value);
            }
            $compact[$column] = $value;
        }

        return $compact;
    }

    private function getSortMetric(array $rows, ?array $allowedColumns): ?string
    {
        $first = reset($rows);
        if (!is_array($first)) {
            return null;
        }

        foreach (self::SORT_METRICS as $metric) {
            if (isset($first[$metric]) && is_numeric($first[$metric]) && ($allowedColumns === null || in_array($metric, $allowedColumns, true))) {
                return $metric;
            }
        }
        foreach ($first as $column => $value) {
            if ($column !== 'label' && (is_int($value) || is_float($value)) && ($allowedColumns === null || in_array($column, $allowedColumns, true))) {
                return (string) $column;
            }
        }

        return null;
    }

    /**
     * Descending and stable, so the payload is the same for the same data
     */
    private function sortRows(array $rows, string $metric): array
    {
        $positions = array_flip(array_keys($rows));
        uksort($rows, function ($a, $b) use ($rows, $metric, $positions) {
            $valueA = isset($rows[$a][$metric]) && is_numeric($rows[$a][$metric]) ? (float) $rows[$a][$metric] : 0.0;
            $valueB = isset($rows[$b][$metric]) && is_numeric($rows[$b][$metric]) ? (float) $rows[$b][$metric] : 0.0;
            if ($valueA === $valueB) {
                return $positions[$a] <=> $positions[$b];
            }
            return $valueA < $valueB ? 1 : -1;
        });

        return $rows;
    }

    private function truncate(string $value): string
    {
        return mb_strlen($value) > self::MAX_LABEL_LENGTH ? mb_substr($value, 0, self::MAX_LABEL_LENGTH) . '...' : $value;
    }
}
