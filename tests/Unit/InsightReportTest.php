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
use Piwik\Plugins\ChatGPT\Services\InsightReport;

/**
 * @group ChatGPT
 * @group InsightReportTest
 * @group Plugins
 */
class InsightReportTest extends TestCase
{
    private InsightReport $insightReport;

    public function setUp(): void
    {
        parent::setUp();

        $this->insightReport = new InsightReport();
    }

    /**
     * @dataProvider getWidgetParamsForInsightDetection
     */
    public function test_isInsightRequest(bool $expected, array $widgetParams): void
    {
        $this->assertSame($expected, $this->insightReport->isInsightRequest($widgetParams));
    }

    public function getWidgetParamsForInsightDetection(): array
    {
        return [
            'chat without widget' => [false, []],
            'unrelated parameters' => [false, ['idGoal' => 1]],
            'report widget' => [true, ['module' => 'DevicesDetection', 'action' => 'getType']],
            'action only' => [true, ['action' => 'getType']],
        ];
    }

    public function test_buildReportRequest_mapsTheWidgetToItsReportWithSupportedParameters(): void
    {
        $request = $this->insightReport->buildReportRequest([
            'module' => 'Goals',
            'action' => 'getItemsSku',
            'idGoal' => '3',
            'flat' => 'true',
            'expanded' => '',
            'filter_limit' => '10',
            'token_auth' => 'must not be forwarded',
            'unknown' => 'value',
        ], 1, 'yesterday', 'week');

        $this->assertSame([
            'method' => 'Goals.getItemsSku',
            'parameters' => [
                'idSite' => 1,
                'date' => 'yesterday',
                'period' => 'week',
                'format' => 'json',
                'idGoal' => 3,
                'flat' => 1,
                'filter_limit' => 10,
            ],
        ], $request);
    }

    /**
     * @dataProvider getDatesAndPeriods
     */
    public function test_buildReportRequest_sanitizesTheDateAndPeriod(string $date, string $period, string $expectedDate, string $expectedPeriod): void
    {
        $request = $this->insightReport->buildReportRequest(['module' => 'VisitsSummary', 'action' => 'get'], 1, $date, $period);

        $this->assertSame($expectedDate, $request['parameters']['date']);
        $this->assertSame($expectedPeriod, $request['parameters']['period']);
    }

    public function getDatesAndPeriods(): array
    {
        return [
            'keywords' => ['today', 'day', 'today', 'day'],
            'last n' => ['last30', 'month', 'last30', 'month'],
            'previous n' => ['previous7', 'week', 'previous7', 'week'],
            'date' => ['2026-01-31', 'year', '2026-01-31', 'year'],
            'range' => ['2026-01-01,2026-01-31', 'range', '2026-01-01,2026-01-31', 'range'],
            'invalid date' => ["2026-01-01' OR 1=1", 'day', 'today', 'day'],
            'invalid period' => ['today', 'decade', 'today', 'day'],
        ];
    }

    public function test_buildReportRequest_stripsUnsafeCharactersFromTheModuleAndAction(): void
    {
        $request = $this->insightReport->buildReportRequest(['module' => 'Devices<Detection>', 'action' => 'get.Type()'], 1, 'today', 'day');

        $this->assertSame('DevicesDetection.getType', $request['method']);
    }

    /**
     * @dataProvider getEvolutionWidgets
     */
    public function test_buildReportRequest_usesTheApiMethodAndNinetyDays_forEvolutionGraphs(array $widgetParams, string $expectedMethod): void
    {
        $request = $this->insightReport->buildReportRequest($widgetParams, 1, 'today', 'month');

        $this->assertSame($expectedMethod, $request['method']);
        $this->assertSame('last90', $request['parameters']['date']);
        $this->assertSame('day', $request['parameters']['period']);
    }

    public function getEvolutionWidgets(): array
    {
        return [
            'module get by default' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph'], 'VisitsSummary.get'],
            'explicit api method' => [['module' => 'Actions', 'action' => 'getEvolutionGraph', 'apiMethod' => 'Actions.get'], 'Actions.get'],
            'explicit method' => [['module' => 'Goals', 'action' => 'getEvolutionOverview', 'method' => 'Goals.get'], 'Goals.get'],
            'custom reports' => [['module' => 'CustomReports', 'action' => 'getRowEvolution'], 'CustomReports.getCustomReport'],
        ];
    }

    /**
     * @dataProvider getInvalidWidgets
     */
    public function test_buildReportRequest_rejectsWidgetsWithoutAValidApiMethod(array $widgetParams): void
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid API method format');

        $this->insightReport->buildReportRequest($widgetParams, 1, 'today', 'day');
    }

    public function getInvalidWidgets(): array
    {
        return [
            'missing module' => [['action' => 'getType']],
            'missing action' => [['module' => 'DevicesDetection']],
            'injected evolution api method' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph', 'apiMethod' => 'UsersManager.deleteUser&login=x']],
        ];
    }

    /**
     * @dataProvider getApiMethodsThatAreNotReports
     */
    public function test_fetch_refusesApiMethodsThatAreNotReports_withoutCallingThem(array $widgetParams, string $expectedMethod): void
    {
        $insightReport = new class () extends InsightReport {
            /** @var string[] */
            public array $checkedMethods = [];

            protected function isReport(string $method): bool
            {
                $this->checkedMethods[] = $method;
                return false;
            }
        };

        try {
            $insightReport->fetch($widgetParams, 1, 'today', 'day');
            $this->fail('An API method that is not a report must be refused');
        } catch (\Exception $e) {
            $this->assertSame('Insights are only available for Matomo reports', $e->getMessage());
        }

        $this->assertSame([$expectedMethod], $insightReport->checkedMethods);
    }

    public function getApiMethodsThatAreNotReports(): array
    {
        return [
            'write method' => [['module' => 'SitesManager', 'action' => 'deleteSite'], 'SitesManager.deleteSite'],
            'users write method' => [['module' => 'UsersManager', 'action' => 'deleteUser'], 'UsersManager.deleteUser'],
            'read method that is not a report' => [['module' => 'API', 'action' => 'getMatomoVersion'], 'API.getMatomoVersion'],
            'write method as evolution api method' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph', 'apiMethod' => 'SitesManager.deleteSite'], 'SitesManager.deleteSite'],
        ];
    }
}
