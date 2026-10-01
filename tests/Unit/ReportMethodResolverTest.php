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
use Piwik\Plugins\ChatGPT\tests\Fakes\FakeReportCatalog;

/**
 * @group ChatGPT
 * @group ReportMethodResolverTest
 * @group Plugins
 */
class ReportMethodResolverTest extends TestCase
{
    /**
     * @dataProvider getWidgets
     */
    public function test_resolve_findsTheApiMethodHoldingTheWidgetData(array $widgetParams, ?string $expectedMethod, array $expectedParameters = [], string $expectedSource = ''): void
    {
        $resolved = FakeReportCatalog::resolver()->resolve($widgetParams, array_keys(InsightReport::PARAMETER_RULES));

        if ($expectedMethod === null) {
            $this->assertNull($resolved);
            return;
        }

        $this->assertSame($expectedMethod, $resolved['module'] . '.' . $resolved['action']);
        $this->assertSame($expectedParameters, $resolved['parameters']);
        $this->assertSame($expectedSource, $resolved['source']);
    }

    public function getWidgets(): array
    {
        $graph = ['forceView' => '1', 'viewDataTable' => 'graphEvolution'];
        return [
            'simple report' => [['module' => 'DevicesDetection', 'action' => 'getBrowsers'], 'DevicesDetection.getBrowsers', [], 'api'],
            'sparklines of a report' => [['module' => 'VisitsSummary', 'action' => 'get', 'viewDataTable' => 'sparklines'], 'VisitsSummary.get', [], 'api'],
            'goal view of another report' => [['module' => 'Referrers', 'action' => 'getReferrerType', 'viewDataTable' => 'tableGoals', 'idGoal' => '0'], 'Referrers.getReferrerType', [], 'api'],
            'custom dimension' => [['module' => 'CustomDimensions', 'action' => 'getCustomDimension', 'idDimension' => '7'], 'CustomDimensions.getCustomDimension', [], 'api'],
            'visits evolution graph' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph'] + $graph, 'VisitsSummary.get', [], 'report'],
            'goals overview evolution' => [['module' => 'Goals', 'action' => 'getEvolutionGraph'] + $graph, 'Goals.get', [], 'report'],
            'goal evolution' => [['module' => 'Goals', 'action' => 'getEvolutionGraph', 'idGoal' => 5] + $graph, 'Goals.get', ['idGoal' => 5], 'report'],
            'ecommerce evolution' => [['module' => 'Goals', 'action' => 'getEvolutionGraph', 'idGoal' => 'ecommerceOrder'] + $graph, 'Goals.get', ['idGoal' => 'ecommerceOrder'], 'report'],
            'goal evolution of an unknown goal' => [['module' => 'Goals', 'action' => 'getEvolutionGraph', 'idGoal' => 9] + $graph, 'Goals.get', [], 'report'],
            'custom report evolution' => [['module' => 'CustomReports', 'action' => 'getEvolutionGraph', 'idCustomReport' => 13] + $graph, 'CustomReports.getCustomReport', ['idCustomReport' => 13], 'report'],
            'premium events evolution' => [['module' => 'EventsEnhancedPremium', 'action' => 'getEventNamesEvolutionGraph'] + $graph, 'EventsEnhancedPremium.getEventNamesEvolution', [], 'controller'],
            'goals sparklines' => [['module' => 'Goals', 'action' => 'getSparklines'], 'Goals.getMetrics', [], 'controller'],
            'funnel report' => [['module' => 'Funnels', 'action' => 'funnelReport', 'idGoal' => 4, 'idFunnel' => 1], 'Funnels.getFunnelFlow', [], 'controller'],
            'movers and shakers' => [['module' => 'Insights', 'action' => 'getOverallMoversAndShakers'], 'Insights.getMoversAndShakersOverview', [], 'known'],
            'real time visits' => [['module' => 'Live', 'action' => 'widget'], 'Live.getLastVisitsDetails', [], 'known'],
            'visit log' => [['module' => 'Live', 'action' => 'getLastVisitsDetails', 'viewDataTable' => 'VisitorLog'], 'Live.getLastVisitsDetails', [], 'api'],
            'row evolution' => [['module' => 'CoreHome', 'action' => 'getRowEvolution', 'apiModule' => 'Events', 'apiAction' => 'getName'], 'API.getRowEvolution', ['apiModule' => 'Events', 'apiAction' => 'getName'], 'rowEvolution'],
            'row evolution of a non report' => [['module' => 'CoreHome', 'action' => 'getRowEvolution', 'apiModule' => 'UsersManager', 'apiAction' => 'getUsers'], null],
            'not a widget' => [['module' => 'SitesManager', 'action' => 'deleteSite'], null],
            'not a widget, read method' => [['module' => 'UsersManager', 'action' => 'getUsers'], null],
            'injected api method' => [['module' => 'KPIWidgets', 'action' => 'kPIWidgetsVisits', 'apiMethod' => 'UsersManager.deleteUser'], null],
            'metric computed in php' => [['module' => 'KPIWidgets', 'action' => 'kPIWidgetsVisits'], null],
            'only helper methods in the controller' => [['module' => 'UserCountryMap', 'action' => 'realtimeMap'], null],
        ];
    }
}
