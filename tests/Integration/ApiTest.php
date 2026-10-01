<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\API\Request;
use Piwik\Plugins\ChatGPT\Services\InsightReport;
use Piwik\Plugins\ChatGPT\SystemSettings;
use Piwik\Plugins\SitesManager\API as SitesManagerAPI;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The classic chat (without agent) keeps using the plugin settings
 *
 * @group ChatGPT
 * @group ChatGPTApiTest
 * @group Plugins
 */
class ApiTest extends IntegrationTestCase
{
    private int $idSite;

    /** @var array<string, mixed> */
    private array $originalGet;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        // the API methods read the site from the request, as when called over HTTP
        $this->originalGet = $_GET;
        $_GET['idSite'] = (string) $this->idSite;
    }

    public function tearDown(): void
    {
        $_GET = $this->originalGet;

        parent::tearDown();
    }

    public function test_getResponse_failsWithAConfigurationError_whenNoApiKeyIsConfigured(): void
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('ChatGPT API key is not configured');

        Request::processRequest('ChatGPT.getResponse', [
            'idSite' => $this->idSite,
            'period' => 'day',
            'date' => 'yesterday',
            'messages' => json_encode([['role' => 'user', 'content' => 'Hello']]),
        ]);
    }

    public function test_getInsights_fetchesTheReport_beforeRequiringTheModelConfiguration(): void
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('ChatGPT API key is not configured');

        Request::processRequest('ChatGPT.getInsights', [
            'idSite' => $this->idSite,
            'period' => 'day',
            'date' => 'yesterday',
            'widgetParams' => json_encode(['module' => 'VisitsSummary', 'action' => 'get']),
        ]);
    }

    public function test_systemSettings_defaultToOpenAiWithoutApiKey(): void
    {
        $settings = new SystemSettings();

        $this->assertSame('https://api.openai.com/v1/chat/completions', $settings->host->getValue());
        $this->assertEmpty($settings->apiKey->getValue());
    }

    public function test_insightReport_returnsTheReportDataAsJson(): void
    {
        $data = (new InsightReport())->fetch(['module' => 'VisitsSummary', 'action' => 'get'], $this->idSite, 'yesterday', 'day');

        $this->assertIsArray(json_decode($data, true));
    }

    public function test_insightReport_checksTheSiteAccess(): void
    {
        FakeAccess::clearAccess(false, [], [], 'anonymous');

        $this->expectException(\Exception::class);

        (new InsightReport())->fetch(['module' => 'VisitsSummary', 'action' => 'get'], $this->idSite, 'yesterday', 'day');
    }

    /**
     * @dataProvider getApiMethodsThatAreNotReports
     */
    public function test_getInsights_refusesApiMethodsThatAreNotReports_withoutCallingThem(array $widgetParams): void
    {
        // a website that could be deleted, the only one cannot
        Fixture::createWebsite('2024-01-01 00:00:00');

        try {
            Request::processRequest('ChatGPT.getInsights', [
                'idSite' => $this->idSite,
                'period' => 'day',
                'date' => 'yesterday',
                'widgetParams' => json_encode($widgetParams),
            ]);
            $this->fail('An API method that is not a report must be refused');
        } catch (\Exception $e) {
            $this->assertStringContainsString('Insights are only available for Matomo reports', $e->getMessage());
        }

        $this->assertSame($this->idSite, (int) SitesManagerAPI::getInstance()->getSiteFromId($this->idSite)['idsite']);
    }

    public function getApiMethodsThatAreNotReports(): array
    {
        return [
            'write method' => [['module' => 'SitesManager', 'action' => 'deleteSite']],
            'users write method' => [['module' => 'UsersManager', 'action' => 'deleteUser']],
            'read method that is not a report' => [['module' => 'API', 'action' => 'getMatomoVersion']],
            'write method as evolution api method' => [['module' => 'VisitsSummary', 'action' => 'getEvolutionGraph', 'apiMethod' => 'SitesManager.deleteSite']],
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
