<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Piwik\Plugin\Manager;
use Piwik\Plugin\ReportsProvider;
use Piwik\Report\ReportWidgetFactory;
use Piwik\Widget\WidgetConfig;
use Piwik\Widget\WidgetContainerConfig;
use Piwik\Widget\WidgetsList;
use ReflectionMethod;

/**
 * Resolves the API method that holds the data of a widget.
 *
 * Widget actions are controller actions: most are also report API methods, but evolution graphs, sparklines and
 * other custom actions are not. The method is looked up in this order:
 * - the report that declares the widget (Report::configureWidgets), the same source as API.getWidgetMetadata;
 * - an explicit apiMethod widget parameter naming a report;
 * - the widget action itself, when it is a report or a data API method;
 * - the report or data API method the controller action renders;
 * - the naming conventions of evolution graphs.
 *
 * Only widgets Matomo declares are resolved, and only to reports or read methods, never to any API method.
 */
class ReportMethodResolver
{
    private const NAME_PATTERN = '/^[A-Za-z0-9]+$/';

    /**
     * Widgets rendered client side, whose data comes from an API method no Matomo metadata links them to
     */
    private const WIDGET_API_METHODS = [
        'Insights.getOverallMoversAndShakers' => 'Insights.getMoversAndShakersOverview',
        'Live.widget' => 'Live.getLastVisitsDetails',
        'Live.getSimpleLastVisitCount' => 'Live.getCounters',
        'MediaAnalytics.currentPlays' => 'MediaAnalytics.getCurrentNumPlays',
        'MediaAnalytics.currentTime' => 'MediaAnalytics.getCurrentSumTimeSpent',
        'MediaAnalytics.mostPlays' => 'MediaAnalytics.getCurrentMostPlays',
        'UserCountryMap.visitorMap' => 'UserCountry.getCountry',
    ];

    /**
     * @var callable(string, string): bool
     */
    private $apiExists;

    /**
     * @var callable(string, string): bool
     */
    private $isReport;

    /**
     * @var callable(): list<array{module: string, action: string, parameters: array, report: array|null}>
     */
    private $widgetIndexProvider;

    /**
     * @var callable(string, string): string
     */
    private $controllerSource;

    /**
     * @var callable(string, string): string[]
     */
    private $requiredParameters;

    /**
     * @var list<array{module: string, action: string, parameters: array, report: array|null}>|null
     */
    private $widgetIndex;

    public function __construct(
        ?callable $apiExists = null,
        ?callable $isReport = null,
        ?callable $widgetIndexProvider = null,
        ?callable $controllerSource = null,
        ?callable $requiredParameters = null
    ) {
        $this->apiExists = $apiExists ?: [self::class, 'apiMethodExists'];
        $this->isReport = $isReport ?: [self::class, 'reportExists'];
        $this->widgetIndexProvider = $widgetIndexProvider ?: [self::class, 'buildWidgetIndex'];
        $this->controllerSource = $controllerSource ?: [self::class, 'readControllerAction'];
        $this->requiredParameters = $requiredParameters ?: [self::class, 'getApiRequiredParameters'];
    }

    /**
     * @return string[] the parameters of the API method without a default value
     */
    public function getRequiredParameters(string $module, string $action): array
    {
        return (array) call_user_func($this->requiredParameters, $module, $action);
    }

    /**
     * @param string[] $dataParameters the widget parameters that select data, the others only change the display
     * @return array{module: string, action: string, parameters: array<string, mixed>, source: string}|null
     */
    public function resolve(array $widgetParams, array $dataParameters): ?array
    {
        $module = $this->name($widgetParams['module'] ?? null);
        $action = $this->name($widgetParams['action'] ?? null);
        if ($module === '' || $action === '') {
            return null;
        }

        // the row evolution popover of a report row
        if ($action === 'getRowEvolution') {
            $apiModule = $this->name($widgetParams['apiModule'] ?? null);
            $apiAction = $this->name($widgetParams['apiAction'] ?? null);
            if ($apiModule !== '' && $apiAction !== '' && $this->isReport($apiModule, $apiAction)) {
                return $this->result('API', 'getRowEvolution', ['apiModule' => $apiModule, 'apiAction' => $apiAction], 'rowEvolution');
            }
            return null;
        }

        $widget = $this->findWidget($module, $action, $widgetParams, $dataParameters);
        if ($widget === null && !$this->isReport($module, $action)) {
            // not a widget of this Matomo: never call an arbitrary API method
            return null;
        }

        // a report widget is its own report, even when another report declares it (eg the goal views of Goals.get)
        if ($this->apiExists($module, $action) && $this->isReport($module, $action)) {
            return $this->result($module, $action, [], 'api');
        }

        if ($widget !== null && $widget['report'] !== null
            && $this->apiExists($widget['report']['module'], $widget['report']['action'])
        ) {
            return $this->result($widget['report']['module'], $widget['report']['action'], $widget['report']['parameters'], 'report');
        }

        $known = self::WIDGET_API_METHODS[$module . '.' . $action] ?? null;
        if ($known !== null) {
            [$knownModule, $knownAction] = explode('.', $known, 2);
            if ($this->apiExists($knownModule, $knownAction)) {
                return $this->result($knownModule, $knownAction, [], 'known');
            }
        }

        foreach (['apiMethod', 'method'] as $key) {
            if (isset($widgetParams[$key]) && is_string($widgetParams[$key])
                && preg_match('/^([A-Za-z0-9]+)\.([A-Za-z0-9]+)$/', $widgetParams[$key], $matches)
                && $this->apiExists($matches[1], $matches[2]) && $this->isReport($matches[1], $matches[2])
            ) {
                return $this->result($matches[1], $matches[2], [], 'parameter');
            }
        }

        if ($this->apiExists($module, $action) && $this->isReadMethod($action)) {
            return $this->result($module, $action, [], 'api');
        }

        $rendered = $this->findInController($module, $action);
        if ($rendered !== null) {
            return $this->result($rendered[0], $rendered[1], [], 'controller');
        }

        foreach ($this->getConventionalActions($module, $action) as $candidate) {
            if ($this->apiExists($module, $candidate) && $this->isReport($module, $candidate)) {
                return $this->result($module, $candidate, [], 'convention');
            }
        }

        return null;
    }

    /**
     * The widget declared by Matomo with the same module, action and data parameters
     *
     * @return array{module: string, action: string, parameters: array, report: array|null}|null
     */
    private function findWidget(string $module, string $action, array $widgetParams, array $dataParameters): ?array
    {
        $best = null;
        $bestScore = -1;
        $sameAction = null;
        foreach ($this->getWidgetIndex() as $entry) {
            if ($entry['module'] !== $module || $entry['action'] !== $action) {
                continue;
            }
            if ($sameAction === null || ($sameAction['report'] === null && $entry['report'] !== null)) {
                $sameAction = $entry;
            }

            $score = 0;
            foreach ($entry['parameters'] as $key => $value) {
                if (!in_array($key, $dataParameters, true)) {
                    continue;
                }
                if (!array_key_exists($key, $widgetParams) || $this->scalar($widgetParams[$key]) !== $this->scalar($value)) {
                    $score = -1;
                    break;
                }
                $score += 2;
            }
            // the same widget can also be declared without its report, eg in a widget container
            if ($score >= 0 && $entry['report'] !== null) {
                $score++;
            }

            if ($score > $bestScore) {
                $best = $entry;
                $bestScore = $score;
            }
        }

        if ($best !== null) {
            return $best;
        }

        // a widget of this report with other data parameters: its report applies, not its parameters
        if ($sameAction !== null && $sameAction['report'] !== null) {
            $sameAction['report']['parameters'] = [];
        }
        return $sameAction;
    }

    /**
     * @return array{0: string, 1: string}|null
     */
    private function findInController(string $module, string $action): ?array
    {
        $source = (string) call_user_func($this->controllerSource, $module, $action);
        if ($source === '' || !preg_match_all('/[\'"]([A-Z][A-Za-z0-9]*)\.([a-z][A-Za-z0-9]*)[\'"]/', $source, $matches, PREG_SET_ORDER)) {
            return null;
        }

        // only reports: controllers also call helper methods (eg Goals.getGoals) that are not the widget data
        foreach ($matches as $match) {
            if (($match[1] !== $module || $match[2] !== $action)
                && $this->apiExists($match[1], $match[2]) && $this->isReport($match[1], $match[2])
            ) {
                return [$match[1], $match[2]];
            }
        }

        return null;
    }

    /**
     * @return string[] eg getEventNamesEvolutionGraph: getEventNamesEvolution, getEventNames, get
     */
    private function getConventionalActions(string $module, string $action): array
    {
        $candidates = [];
        if (preg_match('/^(get\w+Evolution)Graph$/', $action, $matches)) {
            $candidates[] = $matches[1];
        }
        if (preg_match('/^get(\w+)Evolution(Graph|Overview)?$/', $action, $matches)) {
            $candidates[] = 'get' . $matches[1];
        }
        if (preg_match('/Evolution|Sparkline|Overview/i', $action)) {
            $candidates[] = $module === 'CustomReports' ? 'getCustomReport' : 'get';
        }

        return array_values(array_unique(array_diff($candidates, [$action])));
    }

    /**
     * @return list<array{module: string, action: string, parameters: array, report: array|null}>
     */
    private function getWidgetIndex(): array
    {
        if ($this->widgetIndex === null) {
            $this->widgetIndex = (array) call_user_func($this->widgetIndexProvider);
        }
        return $this->widgetIndex;
    }

    private function apiExists(string $module, string $action): bool
    {
        return (bool) call_user_func($this->apiExists, $module, $action);
    }

    private function isReport(string $module, string $action): bool
    {
        return (bool) call_user_func($this->isReport, $module, $action);
    }

    private function isReadMethod(string $action): bool
    {
        return (bool) preg_match('/^get[A-Z]/', $action);
    }

    /**
     * @param mixed $value
     */
    private function name($value): string
    {
        return is_string($value) && preg_match(self::NAME_PATTERN, $value) ? $value : '';
    }

    /**
     * @param mixed $value
     */
    private function scalar($value): string
    {
        return is_array($value) ? (string) json_encode(array_values($value)) : (string) $value;
    }

    private function result(string $module, string $action, array $parameters, string $source): array
    {
        return ['module' => $module, 'action' => $action, 'parameters' => $parameters, 'source' => $source];
    }

    public static function apiMethodExists(string $module, string $action): bool
    {
        $className = 'Piwik\\Plugins\\' . $module . '\\API';
        if (!Manager::getInstance()->isPluginActivated($module) || !class_exists($className) || !method_exists($className, $action)) {
            return false;
        }

        $method = new ReflectionMethod($className, $action);
        return $method->isPublic() && !$method->isStatic() && strpos($action, '__') !== 0;
    }

    /**
     * @return string[]
     */
    public static function getApiRequiredParameters(string $module, string $action): array
    {
        $className = 'Piwik\\Plugins\\' . $module . '\\API';
        if (!class_exists($className) || !method_exists($className, $action)) {
            return [];
        }

        $required = [];
        foreach ((new ReflectionMethod($className, $action))->getParameters() as $parameter) {
            if (!$parameter->isOptional()) {
                $required[] = $parameter->getName();
            }
        }
        return $required;
    }

    public static function reportExists(string $module, string $action): bool
    {
        return ReportsProvider::factory($module, $action) !== null;
    }

    /**
     * Every widget Matomo declares, with the report that declares it, like WidgetsList::get() builds them
     *
     * @return list<array{module: string, action: string, parameters: array, report: array|null}>
     */
    public static function buildWidgetIndex(): array
    {
        $index = [];
        $collect = function (WidgetConfig $widget, ?array $report) use (&$index, &$collect): void {
            if ($widget instanceof WidgetContainerConfig) {
                foreach ($widget->getWidgetConfigs() as $child) {
                    $collect($child, $report);
                }
                return;
            }
            $parameters = $widget->getParameters();
            unset($parameters['module'], $parameters['action'], $parameters['widget']);
            $index[] = [
                'module' => (string) $widget->getModule(),
                'action' => (string) $widget->getAction(),
                'parameters' => $parameters,
                'report' => $report,
            ];
        };

        $widgets = \Piwik\Container\StaticContainer::get('Piwik\Plugin\WidgetsProvider');
        foreach (array_merge($widgets->getWidgetContainerConfigs(), $widgets->getWidgetConfigs()) as $config) {
            $collect($config, null);
        }

        $reports = \Piwik\Container\StaticContainer::get('Piwik\Plugin\ReportsProvider');
        foreach ($reports->getAllReports() as $report) {
            if (!$report->isEnabled()) {
                continue;
            }
            $list = new class () extends WidgetsList {
                /** @var WidgetConfig[] */
                public $captured = [];

                public function addWidgetConfig(WidgetConfig $widget)
                {
                    $this->captured[] = $widget;
                }

                public function addToContainerWidget($containerId, WidgetConfig $widget)
                {
                    $this->captured[] = $widget;
                }
            };
            $report->configureWidgets($list, new ReportWidgetFactory($report));

            $declaringReport = [
                'module' => (string) $report->getModule(),
                'action' => (string) $report->getAction(),
                'parameters' => (array) $report->getParameters(),
            ];
            foreach ($list->captured as $widget) {
                $collect($widget, $declaringReport);
            }
        }

        return $index;
    }

    /**
     * Source code of a controller action, where custom widgets name the API method they render
     */
    public static function readControllerAction(string $module, string $action): string
    {
        $className = 'Piwik\\Plugins\\' . $module . '\\Controller';
        if (!Manager::getInstance()->isPluginActivated($module) || !class_exists($className) || !method_exists($className, $action)) {
            return '';
        }

        $method = new ReflectionMethod($className, $action);
        $file = $method->getFileName();
        if (!is_string($file) || !is_readable($file)) {
            return '';
        }

        $lines = file($file);
        if ($lines === false) {
            return '';
        }

        return implode('', array_slice($lines, $method->getStartLine() - 1, $method->getEndLine() - $method->getStartLine() + 1));
    }
}
