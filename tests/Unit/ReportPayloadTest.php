<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Unit;

use PHPUnit\Framework\TestCase;
use Piwik\DataTable;
use Piwik\DataTable\Row;
use Piwik\DataTable\Simple;
use Piwik\Plugins\ChatGPT\Services\ReportPayload;

/**
 * @group ChatGPT
 * @group ReportPayloadTest
 * @group Plugins
 */
class ReportPayloadTest extends TestCase
{
    private const REQUEST = ['method' => 'Actions.getPageUrls', 'idSite' => 1, 'period' => 'month', 'date' => 'today', 'segment' => 'browserCode==CH'];

    private const METADATA = [
        'name' => 'Page URLs',
        'dimension' => 'Page URL',
        'metrics' => ['nb_hits' => 'Pageviews', 'nb_visits' => 'Unique Pageviews'],
        'processedMetrics' => ['bounce_rate' => 'Bounce Rate'],
        'metricTypes' => ['nb_hits' => 'number', 'nb_visits' => 'number', 'bounce_rate' => 'percent'],
    ];

    public function test_build_keepsTheLabelsMetricsAndTotals_ofEveryRow_upToTheCap(): void
    {
        $payload = (new ReportPayload())->build($this->createTable(250), self::METADATA, self::REQUEST);

        $this->assertSame(['name' => 'Page URLs', 'dimension' => 'Page URL'], $payload['report']);
        $this->assertSame(self::REQUEST, $payload['request']);
        $this->assertSame(['name' => 'Bounce Rate', 'type' => 'percent'], $payload['metrics']['bounce_rate']);
        $this->assertSame(['nb_visits' => 31375, 'nb_hits' => 62750], $payload['totals']);
        $this->assertSame(250, $payload['rowCount']);
        $this->assertCount(ReportPayload::MAX_ROWS, $payload['rows']);
        $this->assertSame('50 more rows not included, sorted by nb_visits.', $payload['note']);

        // the most visited rows first, label and metrics only
        $this->assertSame(['label' => "/page-250 & 'more'", 'nb_visits' => 250, 'nb_hits' => 500, 'bounce_rate' => '25%', 'idSubtable' => 250], $payload['rows'][0]);
        $this->assertSame(51, $payload['rows'][199]['nb_visits']);
    }

    public function test_build_keepsTheReportOrder_whenEveryRowFits(): void
    {
        $payload = (new ReportPayload())->build($this->createTable(3), self::METADATA, self::REQUEST);

        $this->assertSame(['/page-1 & \'more\'', '/page-2 & \'more\'', '/page-3 & \'more\''], array_column($payload['rows'], 'label'));
        $this->assertArrayNotHasKey('note', $payload);
    }

    public function test_build_keepsEveryScalarColumn_whenTheMetadataDoesNotMatchTheRows(): void
    {
        $table = new DataTable();
        $table->addRow(new Row([Row::COLUMNS => ['label' => 'Chrome', 'nb_events' => 3, 'nb_visits_percent_of_total' => '50%', 'goals' => ['idgoal=1' => []]]]));

        $payload = (new ReportPayload())->build($table, self::METADATA, self::REQUEST);

        $this->assertSame([['label' => 'Chrome', 'nb_events' => 3]], $payload['rows']);
    }

    public function test_build_returnsTheValues_ofASingleRowReport(): void
    {
        $table = new Simple();
        $table->addRowsFromArray(['nb_visits' => 12, 'nb_hits' => 30, 'bounce_rate' => '40%', 'avg_time' => 12.3456]);

        $payload = (new ReportPayload())->build($table, null, self::REQUEST);

        $this->assertSame(['nb_visits' => 12, 'nb_hits' => 30, 'bounce_rate' => '40%', 'avg_time' => 12.35], $payload['values']);
        $this->assertArrayNotHasKey('rows', $payload);
    }

    public function test_build_returnsASeries_forEvolutionData(): void
    {
        $map = new DataTable\Map();
        foreach (['2026-09-01' => 10, '2026-09-02' => 20] as $date => $visits) {
            $point = new Simple();
            $point->addRowsFromArray(['nb_visits' => $visits]);
            $map->addTable($point, $date);
        }

        $payload = (new ReportPayload())->build($map, null, self::REQUEST);

        $this->assertSame(['2026-09-01' => ['nb_visits' => 10], '2026-09-02' => ['nb_visits' => 20]], $payload['series']);
    }

    public function test_build_boundsThePayloadSize_byDroppingRows(): void
    {
        $table = new DataTable();
        for ($i = 1; $i <= 300; $i++) {
            $columns = ['label' => str_repeat('x', 250) . $i];
            for ($metric = 1; $metric <= 15; $metric++) {
                $columns['metric_' . $metric] = $i * 1000 + $metric;
            }
            $table->addRowFromSimpleArray($columns);
        }

        $payloadBuilder = new ReportPayload();
        $payload = $payloadBuilder->build($table, null, self::REQUEST);
        $encoded = $payloadBuilder->encode($payload);

        $this->assertLessThanOrEqual(ReportPayload::MAX_BYTES, strlen($encoded));
        $this->assertLessThan(ReportPayload::MAX_ROWS, count($payload['rows']));
        $this->assertSame(300, $payload['rowCount']);
        $this->assertStringContainsString('more rows not included, sorted by metric_1.', $payload['note']);
        $this->assertSame(203, mb_strlen($payload['rows'][0]['label']), 'labels are truncated to 200 characters');
    }

    public function test_build_isDeterministic(): void
    {
        $payloadBuilder = new ReportPayload();
        $table = new DataTable();
        foreach (['b', 'a', 'c'] as $label) {
            $table->addRowFromSimpleArray(['label' => $label, 'nb_visits' => 5]);
        }
        $table->addRowFromSimpleArray(['label' => 'd', 'nb_visits' => 1]);

        $first = $payloadBuilder->encode($payloadBuilder->build($table, null, self::REQUEST));
        $second = $payloadBuilder->encode($payloadBuilder->build($table, null, self::REQUEST));

        $this->assertSame($first, $second);
    }

    private function createTable(int $rows): DataTable
    {
        $table = new DataTable();
        for ($i = 1; $i <= $rows; $i++) {
            $table->addRow(new Row([
                Row::COLUMNS => [
                    'label' => "/page-$i &amp; &#039;more&#039;",
                    'nb_visits' => $i,
                    'nb_hits' => $i * 2,
                    'bounce_rate' => '25%',
                    'sum_time_spent' => 99,
                    'goals' => ['idgoal=1' => ['nb_conversions' => 1]],
                ],
                Row::METADATA => ['url' => "https://example.com/page-$i", 'segment' => 'pageUrl==x', 'logo' => 'logo.png'],
                Row::DATATABLE_ASSOCIATED => $i,
            ]));
        }
        $table->setMetadata('totals', ['nb_visits' => 31375, 'nb_hits' => 62750, 'sum_time_spent' => 99]);

        return $table;
    }
}
