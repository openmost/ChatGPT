<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Unit;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Piwik\Plugins\ChatGPT\Services\InsightNotAvailableException;
use Piwik\Plugins\ChatGPT\Services\InsightReport;
use Piwik\Plugins\ChatGPT\tests\Fakes\FakeReportCatalog;

/**
 * @group ChatGPT
 * @group InsightReportTest
 * @group Plugins
 */
class InsightReportTest extends TestCase
{
    /** @var InsightReport */
    private $insightReport;

    public function setUp(): void
    {
        parent::setUp();

        $this->insightReport = new InsightReport(FakeReportCatalog::resolver());
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

    public function test_buildReportRequest_fetchesTheWholeReport_withOnlyTheParametersThatDefineIt(): void
    {
        $request = $this->insightReport->buildReportRequest([
            'module' => 'Goals',
            'action' => 'getItemsSku',
            'idGoal' => '3',
            'flat' => 'true',
            'expanded' => '',
            'filter_limit' => '10',
            'filter_offset' => '20',
            'filter_sort_column' => 'nb_visits',
            'viewDataTable' => 'table',
            'token_auth' => 'must not be forwarded',
            'idSite' => '99',
            'unknown' => 'value',
        ], 1, 'yesterday', 'week');

        $this->assertSame('Goals.getItemsSku', $request['method']);
        $this->assertSame([
            'idSite' => 1,
            'period' => 'week',
            'date' => 'yesterday',
            'idGoal' => 3,
            'flat' => 1,
            'filter_limit' => -1,
        ], $request['parameters']);
        $this->assertFalse($request['evolution']);
    }

    public function test_buildReportRequest_limitsTheVisitLog_whichHasOneRowPerVisit(): void
    {
        $request = $this->insightReport->buildReportRequest(['module' => 'Live', 'action' => 'getLastVisitsDetails', 'filter_limit' => '5'], 1, 'today', 'year');

        $this->assertSame(100, $request['parameters']['filter_limit']);
    }

    /**
     * @dataProvider getGoalIds
     * @param int|string $expected
     */
    public function test_buildReportRequest_acceptsGoalIdsAndEcommerceGoals(string $idGoal, $expected): void
    {
        $request = $this->insightReport->buildReportRequest(['module' => 'Goals', 'action' => 'get', 'idGoal' => $idGoal], 1, 'today', 'day');

        $this->assertSame($expected, $request['parameters']['idGoal']);
    }

    public function getGoalIds(): array
    {
        return [
            'goal' => ['5', 5],
            'ecommerce order' => ['ecommerceOrder', 'ecommerceOrder'],
            'abandoned cart' => ['ecommerceAbandonedCart', 'ecommerceAbandonedCart'],
        ];
    }

    /**
     * @dataProvider getInvalidParameters
     */
    public function test_buildReportRequest_rejectsInvalidParameterValues(array $widgetParams): void
    {
        $this->expectException(InvalidArgumentException::class);

        $this->insightReport->buildReportRequest(['module' => 'Goals', 'action' => 'get'] + $widgetParams, 1, 'today', 'day');
    }

    public function getInvalidParameters(): array
    {
        return [
            'goal' => [['idGoal' => '1 OR 1=1']],
            'integer' => [['idSubtable' => '3abc']],
            'boolean' => [['flat' => 'maybe']],
            'name' => [['secondaryDimension' => 'event Action;']],
            'label with control characters' => [['label' => "a\nb"]],
        ];
    }

    public function test_buildReportRequest_passesTheSegment_ofTheWidgetFirst_thenOfTheRequest(): void
    {
        $fromRequest = $this->insightReport->buildReportRequest(['module' => 'DevicesDetection', 'action' => 'getType'], 1, 'today', 'day', 'browserCode==CH');
        $this->assertSame('browserCode==CH', $fromRequest['parameters']['segment']);

        $fromWidget = $this->insightReport->buildReportRequest(['module' => 'DevicesDetection', 'action' => 'getType', 'segment' => 'deviceType==smartphone'], 1, 'today', 'day', 'browserCode==CH');
        $this->assertSame('deviceType==smartphone', $fromWidget['parameters']['segment']);

        $without = $this->insightReport->buildReportRequest(['module' => 'DevicesDetection', 'action' => 'getType'], 1, 'today', 'day');
        $this->assertArrayNotHasKey('segment', $without['parameters']);
    }

    public function test_buildReportRequest_rejectsAnUnsafeSegment(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid segment');

        $this->insightReport->buildReportRequest(['module' => 'DevicesDetection', 'action' => 'getType'], 1, 'today', 'day', "browserCode==CH\0");
    }

    /**
     * @dataProvider getValidDatesAndPeriods
     */
    public function test_buildReportRequest_keepsValidDatesAndPeriods_includingRanges(string $date, string $period): void
    {
        $request = $this->insightReport->buildReportRequest(['module' => 'VisitsSummary', 'action' => 'get'], 1, $date, $period);

        $this->assertSame($date, $request['parameters']['date']);
        $this->assertSame($period, $request['parameters']['period']);
    }

    public function getValidDatesAndPeriods(): array
    {
        return [
            'keywords' => ['today', 'day'],
            'last n' => ['last30', 'month'],
            'previous n' => ['previous7', 'week'],
            'date' => ['2026-01-31', 'year'],
            'range' => ['2026-01-01,2026-01-31', 'range'],
            'range to today' => ['2026-01-01,today', 'range'],
            'relative range' => ['last7', 'range'],
            'several days' => ['2026-01-01,2026-01-07', 'day'],
        ];
    }

    /**
     * @dataProvider getInvalidDatesAndPeriods
     */
    public function test_buildReportRequest_rejectsInvalidDatesAndPeriods(string $date, string $period): void
    {
        $this->expectException(InvalidArgumentException::class);

        $this->insightReport->buildReportRequest(['module' => 'VisitsSummary', 'action' => 'get'], 1, $date, $period);
    }

    public function getInvalidDatesAndPeriods(): array
    {
        return [
            'injection' => ["2026-01-01' OR 1=1", 'day'],
            'unknown period' => ['today', 'decade'],
            'impossible date' => ['2026-02-30', 'day'],
            'range without end' => ['today', 'range'],
            'reversed range' => ['2026-02-01,2026-01-01', 'range'],
            'three dates' => ['2026-01-01,2026-01-02,2026-01-03', 'day'],
        ];
    }

    public function test_buildReportRequest_keepsValidComparisons_andRejectsInvalidOnes(): void
    {
        $comparisons = [
            'periods' => [['period' => 'range', 'date' => '2025-01-01,2025-01-31']],
            'segments' => ['', 'deviceType==smartphone'],
        ];
        $request = $this->insightReport->buildReportRequest(['module' => 'VisitsSummary', 'action' => 'get'], 1, 'today', 'day', '', $comparisons);
        $this->assertSame($comparisons, $request['comparisons']);
        $this->assertSame($comparisons, $this->insightReport->describe($request)['comparisons']);

        $this->expectException(InvalidArgumentException::class);
        $this->insightReport->buildReportRequest(['module' => 'VisitsSummary', 'action' => 'get'], 1, 'today', 'day', '', [
            'periods' => [['period' => 'range', 'date' => 'not a date']],
        ]);
    }

    /**
     * @dataProvider getEvolutionWidgets
     */
    public function test_buildReportRequest_fetchesTheSeriesTheEvolutionGraphShows(array $widgetParams, string $period, string $date, string $expectedMethod, string $expectedPeriod, string $expectedDate): void
    {
        $request = $this->insightReport->buildReportRequest($widgetParams, 1, $date, $period);

        $this->assertSame($expectedMethod, $request['method']);
        $this->assertSame($expectedPeriod, $request['parameters']['period']);
        $this->assertSame($expectedDate, $request['parameters']['date']);
        $this->assertTrue($request['evolution']);
    }

    public function getEvolutionWidgets(): array
    {
        $graph = ['forceView' => '1', 'viewDataTable' => 'graphEvolution'];
        return [
            'visits overview, today' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph'] + $graph, 'day', 'today', 'VisitsSummary.get', 'day', 'last30'],
            'visits overview, yesterday' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph'] + $graph, 'day', 'yesterday', 'VisitsSummary.get', 'day', 'previous30'],
            'months up to a date' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph'] + $graph, 'month', '2026-06-15', 'VisitsSummary.get', 'month', '2024-01-15,2026-06-15'],
            'days of a range' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph'] + $graph, 'range', '2026-01-01,2026-01-31', 'VisitsSummary.get', 'day', '2026-01-01,2026-01-31'],
            'premium events evolution' => [['module' => 'EventsEnhancedPremium', 'action' => 'getEventNamesEvolutionGraph'] + $graph, 'day', 'yesterday', 'EventsEnhancedPremium.getEventNamesEvolution', 'day', 'previous30'],
        ];
    }

    public function test_buildReportRequest_keepsTheGoalAndTheCustomReportOfAnEvolutionGraph(): void
    {
        $goal = $this->insightReport->buildReportRequest(['module' => 'Goals', 'action' => 'getEvolutionGraph', 'viewDataTable' => 'graphEvolution', 'idGoal' => 'ecommerceOrder'], 1, 'today', 'day');
        $this->assertSame('Goals.get', $goal['method']);
        $this->assertSame('ecommerceOrder', $goal['parameters']['idGoal']);

        $customReport = $this->insightReport->buildReportRequest(['module' => 'CustomReports', 'action' => 'getEvolutionGraph', 'viewDataTable' => 'graphEvolution', 'idCustomReport' => 13, 'columns' => ['nb_visits', 'nb_hits']], 1, 'today', 'day');
        $this->assertSame('CustomReports.getCustomReport', $customReport['method']);
        $this->assertSame(13, $customReport['parameters']['idCustomReport']);
        $this->assertSame('nb_visits,nb_hits', $customReport['parameters']['columns']);
    }

    public function test_buildReportRequest_addsTheDefaultLastMinutes_ofRealTimeWidgets(): void
    {
        $default = $this->insightReport->buildReportRequest(['module' => 'FormAnalytics', 'action' => 'getCounters'], 1, 'today', 'day');
        $this->assertSame(30, $default['parameters']['lastMinutes']);

        $explicit = $this->insightReport->buildReportRequest(['module' => 'FormAnalytics', 'action' => 'getCounters', 'lastMinutes' => '1440'], 1, 'today', 'day');
        $this->assertSame(1440, $explicit['parameters']['lastMinutes']);
    }

    public function test_buildReportRequest_mapsTheRowEvolutionOfAReport(): void
    {
        $request = $this->insightReport->buildReportRequest([
            'module' => 'CoreHome',
            'action' => 'getRowEvolution',
            'apiModule' => 'Events',
            'apiAction' => 'getName',
            'label' => 'read_episode',
        ], 1, 'today', 'day');

        $this->assertSame('API.getRowEvolution', $request['method']);
        $this->assertSame('Events', $request['parameters']['apiModule']);
        $this->assertSame('getName', $request['parameters']['apiAction']);
        $this->assertSame('read_episode', $request['parameters']['label']);
        $this->assertSame('last30', $request['parameters']['date']);
    }

    /**
     * @dataProvider getUnavailableWidgets
     */
    public function test_buildReportRequest_failsCleanly_forWidgetsWithoutReportData(array $widgetParams): void
    {
        $this->expectException(InsightNotAvailableException::class);

        $this->insightReport->buildReportRequest($widgetParams, 1, 'today', 'day');
    }

    public function getUnavailableWidgets(): array
    {
        return [
            'missing module' => [['action' => 'getType']],
            'missing action' => [['module' => 'DevicesDetection']],
            'unsafe characters' => [['module' => 'Devices<Detection>', 'action' => 'get.Type()']],
            'not a widget' => [['module' => 'SitesManager', 'action' => 'deleteSite']],
            'injected api method' => [['module' => 'KPIWidgets', 'action' => 'kPIWidgetsVisits', 'apiMethod' => 'UsersManager.deleteUser']],
            'computed in php' => [['module' => 'KPIWidgets', 'action' => 'kPIWidgetsVisits']],
            'helper call in the controller' => [['module' => 'UserCountryMap', 'action' => 'realtimeMap']],
            'date range computed by the controller' => [['module' => 'Cohorts', 'action' => 'getEvolutionGraph', 'viewDataTable' => 'graphEvolution']],
        ];
    }

    public function test_describe_isTheApiRequest_withoutTheRowLimit(): void
    {
        $request = $this->insightReport->buildReportRequest(['module' => 'Actions', 'action' => 'getPageUrls', 'idSubtable' => '4', 'flat' => '0'], 1, '2026-01-01,2026-01-31', 'range', 'browserCode==CH');

        $this->assertSame([
            'method' => 'Actions.getPageUrls',
            'idSite' => 1,
            'period' => 'range',
            'date' => '2026-01-01,2026-01-31',
            'segment' => 'browserCode==CH',
            'idSubtable' => 4,
            'flat' => 0,
        ], $this->insightReport->describe($request));
    }
}
