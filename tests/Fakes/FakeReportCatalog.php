<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\tests\Fakes;

use Piwik\Plugins\ChatGPT\Services\ReportMethodResolver;

/**
 * Widget, report and API fixtures of a Matomo instance, taken from real widget metadata, for the method resolution
 */
class FakeReportCatalog
{
    public const API_METHODS = [
        'VisitsSummary.get', 'Goals.get', 'Goals.getMetrics', 'Goals.getGoals', 'Goals.getItemsSku', 'Actions.getPageUrls',
        'DevicesDetection.getType', 'DevicesDetection.getBrowsers', 'Referrers.getReferrerType', 'Events.getName',
        'EventsEnhancedPremium.getEventNamesEvolution', 'CustomReports.getCustomReport', 'CustomDimensions.getCustomDimension',
        'Live.getLastVisitsDetails', 'Live.getCounters', 'FormAnalytics.getCounters', 'Cohorts.getCohortsOverTime',
        'Funnels.getFunnelFlow', 'Insights.getMoversAndShakersOverview', 'API.getRowEvolution',
        'UsersManager.deleteUser', 'SitesManager.deleteSite', 'UsersManager.getUsers',
    ];

    public const REPORTS = [
        'VisitsSummary.get', 'Goals.get', 'Goals.getMetrics', 'Goals.getItemsSku', 'Actions.getPageUrls', 'DevicesDetection.getType',
        'DevicesDetection.getBrowsers', 'Referrers.getReferrerType', 'Events.getName', 'EventsEnhancedPremium.getEventNamesEvolution',
        'CustomReports.getCustomReport', 'CustomDimensions.getCustomDimension', 'Cohorts.getCohortsOverTime', 'Funnels.getFunnelFlow',
    ];

    public static function widgetIndex(): array
    {
        $graph = ['forceView' => '1', 'viewDataTable' => 'graphEvolution'];
        return [
            // declared without its report too, eg by a widget container
            self::widget('VisitsSummary', 'getEvolutionGraph', $graph, null),
            self::widget('VisitsSummary', 'getEvolutionGraph', $graph, ['VisitsSummary', 'get', []]),
            self::widget('VisitsSummary', 'get', ['forceView' => '1', 'viewDataTable' => 'sparklines'], ['VisitsSummary', 'get', []]),
            self::widget('Goals', 'getEvolutionGraph', $graph, ['Goals', 'get', []]),
            self::widget('Goals', 'getEvolutionGraph', $graph + ['idGoal' => 5], ['Goals', 'get', ['idGoal' => 5]]),
            self::widget('Goals', 'getEvolutionGraph', $graph + ['idGoal' => 'ecommerceOrder'], ['Goals', 'get', ['idGoal' => 'ecommerceOrder']]),
            self::widget('Goals', 'getSparklines', [], null),
            self::widget('Referrers', 'getReferrerType', ['viewDataTable' => 'tableGoals', 'idGoal' => '0'], ['Goals', 'get', []]),
            self::widget('CustomReports', 'getEvolutionGraph', $graph + ['idCustomReport' => 13], ['CustomReports', 'getCustomReport', ['idCustomReport' => 13]]),
            self::widget('CustomDimensions', 'getCustomDimension', ['idDimension' => '7'], ['CustomDimensions', 'getCustomDimension', ['idDimension' => 7]]),
            self::widget('EventsEnhancedPremium', 'getEventNamesEvolutionGraph', $graph, null),
            self::widget('Insights', 'getOverallMoversAndShakers', [], null),
            self::widget('Live', 'widget', [], null),
            self::widget('Live', 'getLastVisitsDetails', ['viewDataTable' => 'VisitorLog'], null),
            self::widget('FormAnalytics', 'getCounters', [], null),
            self::widget('Cohorts', 'getEvolutionGraph', $graph, null),
            self::widget('Funnels', 'funnelReport', ['idGoal' => 4, 'idFunnel' => 1], null),
            self::widget('UserCountryMap', 'realtimeMap', [], null),
            self::widget('KPIWidgets', 'kPIWidgetsVisits', [], null),
        ];
    }

    public static function controllerSources(): array
    {
        return [
            'Goals.getSparklines' => "Request::processRequest('Goals.getGoals'); Factory::build('sparklines', 'Goals.getMetrics', 'Goals.getSparklines');",
            'EventsEnhancedPremium.getEventNamesEvolutionGraph' => "\$this->getLastUnitGraph('EventsEnhancedPremium', __FUNCTION__, 'EventsEnhancedPremium.getEventNamesEvolution');",
            'Cohorts.getEvolutionGraph' => "Factory::build(Evolution::ID, 'Cohorts.getCohortsOverTime', 'Cohorts.getEvolutionGraph');",
            'Funnels.funnelReport' => "Request::processRequest('Funnels.getFunnelFlow', \$params);",
            'UserCountryMap.realtimeMap' => "Request::processRequest('Goals.getGoals'); Request::processRequest('UsersManager.getUsers');",
        ];
    }

    public static function requiredParameters(): array
    {
        return [
            'FormAnalytics.getCounters' => ['idSite', 'lastMinutes'],
            'Live.getCounters' => ['idSite', 'lastMinutes'],
            'Cohorts.getCohortsOverTime' => ['idSite', 'period', 'date', 'displayDateRange'],
            'API.getRowEvolution' => ['idSite', 'period', 'date', 'apiModule', 'apiAction'],
        ];
    }

    public static function resolver(): ReportMethodResolver
    {
        $sources = self::controllerSources();
        $required = self::requiredParameters();

        return new ReportMethodResolver(
            function (string $module, string $action): bool {
                return in_array($module . '.' . $action, self::API_METHODS, true);
            },
            function (string $module, string $action): bool {
                return in_array($module . '.' . $action, self::REPORTS, true);
            },
            [self::class, 'widgetIndex'],
            function (string $module, string $action) use ($sources): string {
                return $sources[$module . '.' . $action] ?? '';
            },
            function (string $module, string $action) use ($required): array {
                return $required[$module . '.' . $action] ?? ['idSite'];
            }
        );
    }

    private static function widget(string $module, string $action, array $parameters, ?array $report): array
    {
        return [
            'module' => $module,
            'action' => $action,
            'parameters' => $parameters,
            'report' => $report === null ? null : ['module' => $report[0], 'action' => $report[1], 'parameters' => $report[2]],
        ];
    }
}
