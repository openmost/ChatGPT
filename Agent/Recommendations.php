<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Agent;

/**
 * Steps that unlock the agent mode (the assistant queries the real reports through the Matomo tools), in the order
 * they have to be taken. Super users get a link to take each step, other users are asked to contact them.
 */
final class Recommendations
{
    public const ACTIVATE_AI_PROVIDERS = 'activateAiProviders';
    public const CONNECT_PROVIDER = 'connectProvider';
    public const INSTALL_MCP_SERVER = 'installMcpServer';
    public const ACTIVATE_MCP_SERVER = 'activateMcpServer';
    public const ENABLE_MCP = 'enableMcp';
    public const MCP_UNAVAILABLE = 'mcpUnavailable';
    public const ENABLE_WRITE_MODE = 'enableWriteMode';

    private const MESSAGES = [
        self::ACTIVATE_AI_PROVIDERS => ['ChatGPT_RecommendActivateAiProviders', 'ChatGPT_RecommendActivateAiProvidersAction'],
        self::CONNECT_PROVIDER => ['ChatGPT_RecommendConnectProvider', 'ChatGPT_RecommendConnectProviderAction'],
        self::INSTALL_MCP_SERVER => ['ChatGPT_RecommendInstallMcpServer', 'ChatGPT_RecommendInstallMcpServerAction'],
        self::ACTIVATE_MCP_SERVER => ['ChatGPT_RecommendActivateMcpServer', 'ChatGPT_RecommendActivateMcpServerAction'],
        self::ENABLE_MCP => ['ChatGPT_RecommendEnableMcp', 'ChatGPT_RecommendEnableMcpAction'],
        self::MCP_UNAVAILABLE => ['ChatGPT_AgentMcpUnavailable', ''],
        self::ENABLE_WRITE_MODE => ['ChatGPT_RecommendEnableWriteMode', 'ChatGPT_RecommendEnableWriteModeAction'],
    ];

    /**
     * @param array{aiPlugin: string, ai: string, aiManaged: bool, mcp: string, canPerformActions: bool} $state
     *        aiPlugin is a PluginDependencies::PLUGIN_* state, ai a PluginDependencies::AI_* status, mcp a
     *        McpAgent::STATUS_* status
     * @param array<string, string|int> $urlParams idSite, period and date of the current page
     * @return list<array{id: string, message: string, action: string, url: string, askAdministrator: bool}>
     *         translation keys, the action and the url are empty when the user cannot take the step
     */
    public static function build(array $state, bool $isSuperUser, array $urlParams = []): array
    {
        $ids = self::getApplicableIds($state);

        $recommendations = [];
        foreach ($ids as $id) {
            $url = $isSuperUser ? self::getUrl($id, (bool) $state['aiManaged'], $urlParams) : '';
            $recommendations[] = [
                'id' => $id,
                'message' => self::MESSAGES[$id][0],
                'action' => $url !== '' ? self::MESSAGES[$id][1] : '',
                'url' => $url,
                'askAdministrator' => !$isSuperUser,
            ];
        }

        return $recommendations;
    }

    /**
     * @param array{aiPlugin: string, ai: string, aiManaged: bool, mcp: string, canPerformActions: bool} $state
     * @return list<string>
     */
    private static function getApplicableIds(array $state): array
    {
        // without AIProviders (Matomo before 5.13.0) the agent mode cannot be unlocked
        if ($state['aiPlugin'] === PluginDependencies::PLUGIN_MISSING) {
            return [];
        }

        $ids = [];
        if ($state['aiPlugin'] === PluginDependencies::PLUGIN_INACTIVE) {
            $ids[] = self::ACTIVATE_AI_PROVIDERS;
        } elseif ($state['ai'] !== PluginDependencies::AI_READY) {
            $ids[] = self::CONNECT_PROVIDER;
        }

        switch ($state['mcp']) {
            case McpAgent::STATUS_NOT_INSTALLED:
                $ids[] = self::INSTALL_MCP_SERVER;
                break;
            case McpAgent::STATUS_NOT_ACTIVATED:
                $ids[] = self::ACTIVATE_MCP_SERVER;
                break;
            case McpAgent::STATUS_DISABLED:
                $ids[] = self::ENABLE_MCP;
                break;
            case McpAgent::STATUS_UNAVAILABLE:
                $ids[] = self::MCP_UNAVAILABLE;
                break;
            case McpAgent::STATUS_READY:
                if (!$state['canPerformActions']) {
                    $ids[] = self::ENABLE_WRITE_MODE;
                }
                break;
        }

        return $ids;
    }

    /**
     * @param array<string, string|int> $urlParams
     */
    private static function getUrl(string $id, bool $aiManaged, array $urlParams): string
    {
        switch ($id) {
            case self::ACTIVATE_AI_PROVIDERS:
            case self::ACTIVATE_MCP_SERVER:
                return self::buildUrl(['module' => 'CorePluginsAdmin', 'action' => 'plugins'], $urlParams);
            case self::CONNECT_PROVIDER:
                // the AI Providers page is unavailable when the provider is managed from the configuration
                return $aiManaged ? '' : self::buildUrl(['module' => 'AIProviders', 'action' => 'index'], $urlParams);
            case self::INSTALL_MCP_SERVER:
                return self::buildUrl(['module' => 'Marketplace', 'action' => 'overview'], $urlParams)
                    . '#?' . http_build_query(['showPlugin' => PluginDependencies::MCP_SERVER]);
            case self::ENABLE_MCP:
            case self::ENABLE_WRITE_MODE:
                return self::buildUrl(['module' => 'CoreAdminHome', 'action' => 'generalSettings'], $urlParams)
                    . '#/' . PluginDependencies::MCP_SERVER;
            default:
                return '';
        }
    }

    /**
     * @param array<string, string> $route
     * @param array<string, string|int> $urlParams
     */
    private static function buildUrl(array $route, array $urlParams): string
    {
        $params = $route;
        foreach (['idSite', 'period', 'date'] as $name) {
            if (isset($urlParams[$name]) && (string) $urlParams[$name] !== '') {
                $params[$name] = (string) $urlParams[$name];
            }
        }

        return 'index.php?' . http_build_query($params);
    }
}
