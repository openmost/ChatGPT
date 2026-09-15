<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\ChatGPT\Agent\McpAgent;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group ChatGPT
 * @group ChatGPTMcpAgentTest
 * @group Plugins
 */
class McpAgentTest extends IntegrationTestCase
{
    private int $idSite;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00', 1, 'Openmost website');
    }

    public function test_getStatus_fallsBackToTheClassicChat_whenNoAiProviderIsConfigured(): void
    {
        $status = $this->getAgent()->getStatus();

        $this->assertSame(McpAgent::MODE_CHAT, $status['mode']);
        $this->assertNotSame(McpAgent::STATUS_READY, $status['ai']);
        $this->assertContains($status['mcp'], [
            McpAgent::STATUS_READY,
            McpAgent::STATUS_NOT_INSTALLED,
            McpAgent::STATUS_NOT_ACTIVATED,
            McpAgent::STATUS_DISABLED,
            McpAgent::STATUS_NO_ACCESS,
            McpAgent::STATUS_UNAVAILABLE,
        ]);
        $this->assertIsInt($status['toolCount']);
        $this->assertIsBool($status['canPerformActions']);
    }

    public function test_isAvailable_isFalse_whenNoAiProviderIsConfigured(): void
    {
        $this->assertFalse(McpAgent::isAvailable());
    }

    public function test_buildSystemPrompt_describesTheContextAndTheExpectedFormat(): void
    {
        $prompt = $this->getAgent()->buildSystemPrompt('  You are a Matomo expert.  ', $this->idSite, 'week', '2026-09-14');

        $this->assertStringStartsWith("You are a Matomo expert.\n", $prompt);
        $this->assertStringContainsString('website "Openmost website" (idSite ' . $this->idSite . '), period "week", date "2026-09-14"', $prompt);
        $this->assertStringContainsString('never as raw JSON', $prompt);
        $this->assertStringNotContainsString('report the user is currently looking at', $prompt);
    }

    public function test_buildSystemPrompt_appendsTheReportData_forInsights(): void
    {
        $prompt = $this->getAgent()->buildSystemPrompt('Insights prompt', $this->idSite, 'day', 'yesterday', '{"nb_visits":12}');

        $this->assertStringContainsString('only use the tools when you need additional data', $prompt);
        $this->assertStringEndsWith("\n{\"nb_visits\":12}", $prompt);
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccess(),
        ];
    }

    private function getAgent(): McpAgent
    {
        return StaticContainer::get(McpAgent::class);
    }
}
