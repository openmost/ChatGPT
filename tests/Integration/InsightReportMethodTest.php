<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\API\Request;
use Piwik\Plugin\ReportsProvider;
use Piwik\Plugins\ChatGPT\Services\InsightNotAvailableException;
use Piwik\Plugins\ChatGPT\Services\InsightReport;
use Piwik\Plugins\SitesManager\API as SitesManagerAPI;
use Piwik\Plugins\UsersManager\Model as UsersModel;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * Insights only request Matomo reports, never any other API method
 *
 * @group ChatGPT
 * @group ChatGPTInsightReportMethodTest
 * @group Plugins
 */
class InsightReportMethodTest extends IntegrationTestCase
{
    private $idSite;
    private $originalGet;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        Fixture::createWebsite('2024-01-01 00:00:00');
        // a website that could be deleted, the only one cannot
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        // the API methods read the site from the request, as when called over HTTP
        $this->originalGet = $_GET;
        $_GET['idSite'] = (string) $this->idSite;

        // off by default, see test_getResponse_answersWithTheConsentMessage_untilASuperUserAllowsTheDataSharing
        Request::processRequest('ChatGPT.setSystemSettings', ['dataSharingAllowed' => '1']);
    }

    public function tearDown(): void
    {
        $_GET = $this->originalGet;

        parent::tearDown();
    }

    /**
     * @dataProvider getApiMethodsThatAreNotReports
     */
    public function test_insightReport_onlyResolvesToMatomoReports(array $widgetParams): void
    {
        try {
            $request = (new InsightReport())->buildReportRequest($widgetParams, $this->idSite, 'yesterday', 'day');
        } catch (InsightNotAvailableException $e) {
            $this->addToAssertionCount(1);
            return;
        }

        [$module, $action] = explode('.', $request['method'], 2);
        $this->assertNotNull(ReportsProvider::factory($module, $action), $request['method'] . ' is not a Matomo report');
    }

    /**
     * @dataProvider getApiMethodsThatAreNotReports
     */
    public function test_getInsights_neverCallsApiMethodsThatAreNotReports(array $widgetParams): void
    {
        try {
            Request::processRequest('ChatGPT.getInsights', [
                'idSite' => $this->idSite,
                'period' => 'day',
                'date' => 'yesterday',
                'widgetParams' => json_encode($widgetParams),
            ]);
        } catch (\Exception $e) {
            // refused, or stopped later by the missing model configuration: both are fine
        }

        $this->assertSame($this->idSite, (int) SitesManagerAPI::getInstance()->getSiteFromId($this->idSite)['idsite']);
        $this->assertNotEmpty((new UsersModel())->getUser('superUserLogin'));
    }

    public function getApiMethodsThatAreNotReports(): array
    {
        return [
            'write method' => [['module' => 'SitesManager', 'action' => 'deleteSite']],
            'users write method' => [['module' => 'UsersManager', 'action' => 'deleteUser', 'userLogin' => 'superUserLogin']],
            'read method that is not a report' => [['module' => 'API', 'action' => 'getMatomoVersion']],
            'write method as evolution api method' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph', 'apiMethod' => 'SitesManager.deleteSite']],
            'injected api method' => [['module' => 'KPIWidgets', 'action' => 'kPIWidgetsVisits', 'apiMethod' => 'UsersManager.deleteUser']],
        ];
    }

    /**
     * @dataProvider getReportWidgets
     */
    public function test_insightReport_fetchesReports(array $widgetParams): void
    {
        $data = (new InsightReport())->fetch($widgetParams, $this->idSite, 'yesterday', 'day');

        $this->assertIsArray(json_decode($data, true));
    }

    public function test_insightReport_analysesTheSearchedRows_andTheExpandedSubtables(): void
    {
        $tracker = Fixture::getTracker($this->idSite, '2024-03-10 10:00:00', true, true);
        foreach (['spring-sale' => 'shoes', 'winter' => 'coats'] as $campaign => $keyword) {
            $tracker->setForceNewVisit();
            $tracker->setUrl('http://example.com/?mtm_campaign=' . $campaign . '&mtm_kwd=' . $keyword);
            Fixture::checkResponse($tracker->doTrackPageView('Home'));
        }

        $campaigns = Request::processRequest('Referrers.getCampaigns', ['idSite' => $this->idSite, 'period' => 'day', 'date' => '2024-03-10', 'format' => 'original'], []);
        $idSubtable = (int) $campaigns->getRowFromLabel('spring-sale')->getIdSubDataTable();

        $payload = json_decode((new InsightReport())->fetch([
            'module' => 'Referrers',
            'action' => 'getCampaigns',
            'filter_column' => 'label',
            'filter_pattern' => 'spring',
            'expandedSubtables' => [$idSubtable],
        ], $this->idSite, '2024-03-10', 'day', '', []), true);

        $this->assertSame(['spring-sale'], array_column($payload['rows'], 'label'));
        $this->assertSame('spring', $payload['request']['filter_pattern']);
        $this->assertCount(1, $payload['expandedRows']);
        $this->assertSame('spring-sale', $payload['expandedRows'][0]['parentLabel']);
        $this->assertSame(['shoes'], array_column($payload['expandedRows'][0]['rows'], 'label'));
    }

    public function getReportWidgets(): array
    {
        return [
            'visits summary' => [['module' => 'VisitsSummary', 'action' => 'get']],
            'browsers' => [['module' => 'DevicesDetection', 'action' => 'getBrowsers']],
            'event names' => [['module' => 'Events', 'action' => 'getName']],
            'evolution graph' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph']],
        ];
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccess(),
        ];
    }
}
