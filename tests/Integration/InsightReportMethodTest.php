<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\API\Request;
use Piwik\Plugins\SitesManager\API as SitesManagerAPI;
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
    private $originalPost;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        Fixture::createWebsite('2024-01-01 00:00:00');
        // a website that could be deleted, the only one cannot
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        // the API methods read the site and the widget from the request, as when called over HTTP
        $this->originalGet = $_GET;
        $this->originalPost = $_POST;
        $_GET['idSite'] = (string) $this->idSite;
    }

    public function tearDown(): void
    {
        $_GET = $this->originalGet;
        $_POST = $this->originalPost;

        parent::tearDown();
    }

    /**
     * @dataProvider getApiMethodsThatAreNotReports
     */
    public function test_insights_refuseApiMethodsThatAreNotReports_withoutCallingThem(string $apiMethod, array $widgetParams): void
    {
        $_POST['widgetParams'] = json_encode($widgetParams);

        try {
            Request::processRequest('ChatGPT.' . $apiMethod, [
                'idSite' => $this->idSite,
                'period' => 'day',
                'date' => 'yesterday',
            ]);
            $this->fail('An API method that is not a report must be refused');
        } catch (\Exception $e) {
            $this->assertStringContainsString('Insights are only available for Matomo reports', $e->getMessage());
        }

        $this->assertSame($this->idSite, (int) SitesManagerAPI::getInstance()->getSiteFromId($this->idSite)['idsite']);
    }

    public function getApiMethodsThatAreNotReports(): array
    {
        $widgets = [
            'write method' => ['module' => 'SitesManager', 'action' => 'deleteSite'],
            'users write method' => ['module' => 'UsersManager', 'action' => 'deleteUser'],
            'read method that is not a report' => ['module' => 'API', 'action' => 'getMatomoVersion'],
            'write method as evolution api method' => ['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph', 'apiMethod' => 'SitesManager.deleteSite'],
        ];

        $cases = [];
        foreach (['getInsights', 'getStreamingResponse'] as $apiMethod) {
            foreach ($widgets as $name => $widgetParams) {
                $cases[$apiMethod . ' ' . $name] = [$apiMethod, $widgetParams];
            }
        }
        return $cases;
    }

    /**
     * @dataProvider getReportWidgets
     */
    public function test_insights_fetchReports_beforeRequiringTheModelConfiguration(array $widgetParams): void
    {
        $_POST['widgetParams'] = json_encode($widgetParams);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('ChatGPT API key is not configured');

        Request::processRequest('ChatGPT.getInsights', [
            'idSite' => $this->idSite,
            'period' => 'day',
            'date' => 'yesterday',
        ]);
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
