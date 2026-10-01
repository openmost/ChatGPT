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
use Piwik\Plugins\ChatGPT\Agent\McpAgent;
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\Agent\Recommendations;

/**
 * @group ChatGPT
 * @group RecommendationsTest
 * @group Plugins
 */
class RecommendationsTest extends TestCase
{
    private const URL_PARAMS = ['idSite' => 3, 'period' => 'week', 'date' => '2026-09-14'];

    private const PLUGINS_URL = 'index.php?module=CorePluginsAdmin&action=plugins&idSite=3&period=week&date=2026-09-14';
    private const AI_PROVIDERS_URL = 'index.php?module=AIProviders&action=index&idSite=3&period=week&date=2026-09-14';
    private const MARKETPLACE_URL = 'index.php?module=Marketplace&action=overview&idSite=3&period=week&date=2026-09-14#?showPlugin=McpServer';
    private const MCP_SETTINGS_URL = 'index.php?module=CoreAdminHome&action=generalSettings&idSite=3&period=week&date=2026-09-14#/McpServer';

    /**
     * @dataProvider getStates
     */
    public function test_build_forSuperUsers(array $state, array $expected): void
    {
        $recommendations = Recommendations::build($state, true, self::URL_PARAMS);

        $this->assertSame($expected, array_map(function (array $recommendation) {
            return [$recommendation['id'], $recommendation['url']];
        }, $recommendations));

        foreach ($recommendations as $recommendation) {
            $this->assertFalse($recommendation['askAdministrator']);
            $this->assertStringStartsWith('ChatGPT_', $recommendation['message']);
            $this->assertSame($recommendation['url'] === '', $recommendation['action'] === '');
        }
    }

    /**
     * @dataProvider getStates
     */
    public function test_build_forOtherUsers_asksTheAdministrator_withoutLinks(array $state, array $expected): void
    {
        $recommendations = Recommendations::build($state, false, self::URL_PARAMS);

        $this->assertSame(array_column($expected, 0), array_column($recommendations, 'id'));
        foreach ($recommendations as $recommendation) {
            $this->assertSame('', $recommendation['url']);
            $this->assertSame('', $recommendation['action']);
            $this->assertTrue($recommendation['askAdministrator']);
        }
    }

    public function getStates(): array
    {
        return [
            'everything ready with write mode' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_READY, true),
                [],
            ],
            'read-only MCP Server' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_READY, false),
                [[Recommendations::ENABLE_WRITE_MODE, self::MCP_SETTINGS_URL]],
            ],
            'AI Providers absent: agent mode impossible' => [
                $this->state(PluginDependencies::PLUGIN_MISSING, PluginDependencies::AI_UNAVAILABLE, McpAgent::STATUS_NOT_INSTALLED),
                [],
            ],
            'AI Providers deactivated' => [
                $this->state(PluginDependencies::PLUGIN_INACTIVE, PluginDependencies::AI_UNAVAILABLE, McpAgent::STATUS_READY, true),
                [[Recommendations::ACTIVATE_AI_PROVIDERS, self::PLUGINS_URL]],
            ],
            'AI Providers without provider' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_NOT_CONFIGURED, McpAgent::STATUS_READY, true),
                [[Recommendations::CONNECT_PROVIDER, self::AI_PROVIDERS_URL]],
            ],
            'AI Providers with a provider without conversations' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_UNSUPPORTED, McpAgent::STATUS_READY, true),
                [[Recommendations::CONNECT_PROVIDER, self::AI_PROVIDERS_URL]],
            ],
            'AI Providers failing' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_UNAVAILABLE, McpAgent::STATUS_READY, true),
                [[Recommendations::CONNECT_PROVIDER, self::AI_PROVIDERS_URL]],
            ],
            'MCP Server absent' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_NOT_INSTALLED),
                [[Recommendations::INSTALL_MCP_SERVER, self::MARKETPLACE_URL]],
            ],
            'MCP Server deactivated' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_NOT_ACTIVATED),
                [[Recommendations::ACTIVATE_MCP_SERVER, self::PLUGINS_URL]],
            ],
            'MCP disabled in its settings' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_DISABLED),
                [[Recommendations::ENABLE_MCP, self::MCP_SETTINGS_URL]],
            ],
            'MCP Server failing' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_UNAVAILABLE),
                [[Recommendations::MCP_UNAVAILABLE, '']],
            ],
            'no access to the MCP tools' => [
                $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_NO_ACCESS),
                [],
            ],
            'steps in the order they have to be taken' => [
                $this->state(PluginDependencies::PLUGIN_INACTIVE, PluginDependencies::AI_UNAVAILABLE, McpAgent::STATUS_NOT_INSTALLED),
                [
                    [Recommendations::ACTIVATE_AI_PROVIDERS, self::PLUGINS_URL],
                    [Recommendations::INSTALL_MCP_SERVER, self::MARKETPLACE_URL],
                ],
            ],
        ];
    }

    public function test_build_hasNoLinkToTheAiProvidersPage_whenTheProviderIsManaged(): void
    {
        $state = $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_NOT_CONFIGURED, McpAgent::STATUS_READY, true);
        $state['aiManaged'] = true;

        $recommendation = Recommendations::build($state, true, self::URL_PARAMS)[0];

        $this->assertSame(Recommendations::CONNECT_PROVIDER, $recommendation['id']);
        $this->assertSame('', $recommendation['url']);
        $this->assertSame('', $recommendation['action']);
        $this->assertFalse($recommendation['askAdministrator']);
    }

    public function test_build_encodesTheUrlParameters(): void
    {
        $state = $this->state(PluginDependencies::PLUGIN_INACTIVE, PluginDependencies::AI_UNAVAILABLE, McpAgent::STATUS_READY, true);

        $recommendation = Recommendations::build($state, true, ['idSite' => '1', 'period' => 'day', 'date' => 'today"><script>&module=x'])[0];

        $this->assertSame(
            'index.php?module=CorePluginsAdmin&action=plugins&idSite=1&period=day&date=today%22%3E%3Cscript%3E%26module%3Dx',
            $recommendation['url']
        );
    }

    public function test_build_omitsTheMissingUrlParameters(): void
    {
        $state = $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_READY, false);

        $recommendation = Recommendations::build($state, true)[0];

        $this->assertSame('index.php?module=CoreAdminHome&action=generalSettings#/McpServer', $recommendation['url']);
    }

    public function test_build_usesTranslationKeysThatExist(): void
    {
        $translations = json_decode((string) file_get_contents(__DIR__ . '/../../lang/en.json'), true)['ChatGPT'];
        $states = array_column($this->getStates(), 0);
        $states[] = $this->state(PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::AI_READY, McpAgent::STATUS_DISABLED);

        foreach ($states as $state) {
            foreach (Recommendations::build($state, true, self::URL_PARAMS) as $recommendation) {
                foreach (['message', 'action'] as $field) {
                    if ($recommendation[$field] === '') {
                        continue;
                    }
                    $key = substr($recommendation[$field], strlen('ChatGPT_'));
                    $this->assertArrayHasKey($key, $translations, $recommendation[$field]);
                }
            }
        }
        $this->assertArrayHasKey('AskAdministrator', $translations);
    }

    private function state(string $aiPlugin, string $ai, string $mcp, bool $canPerformActions = false): array
    {
        return [
            'aiPlugin' => $aiPlugin,
            'ai' => $ai,
            'aiManaged' => false,
            'mcp' => $mcp,
            'canPerformActions' => $canPerformActions,
        ];
    }
}
