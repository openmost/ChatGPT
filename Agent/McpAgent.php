<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Agent;

use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\Log\LoggerInterface;
use Piwik\NoAccessException;
use Piwik\Piwik;
use Piwik\Plugins\AIProviders\AIConversationRequest;
use Piwik\Plugins\AIProviders\AIConversationResponse;
use Piwik\Plugins\AIProviders\CanonicalMessage;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Site;

/**
 * Chat agent running on the AI provider configured in Matomo (AIProviders plugin) with the tools of
 * the McpServer plugin, called in-process with the permissions of the current user: no public MCP
 * endpoint or OAuth client is involved. Without McpServer, the same AI provider answers without tools.
 *
 * McpServer only accepts internal tool calls when the root request is not an API request, so the
 * agent must be run from a controller action.
 *
 * The AIProviders plugin ships with Matomo 5.13 and later, McpServer 5.x requires Matomo 5.8 and
 * PHP 8.1: on older setups the agent is reported as unavailable and the classic chat is used.
 */
class McpAgent
{
    public const MODE_AGENT = 'agent';
    public const MODE_CHAT = 'chat';

    // AI Providers answers the requests of the website, or the host and key of the plugin settings
    public const ENGINE_AI_PROVIDERS = 'aiProviders';
    public const ENGINE_PLUGIN = 'plugin';

    public const STATUS_READY = 'ready';
    public const STATUS_NOT_INSTALLED = 'not_installed';
    public const STATUS_NOT_ACTIVATED = 'not_activated';
    public const STATUS_DISABLED = 'disabled';
    public const STATUS_NO_ACCESS = 'no_access';
    public const STATUS_NOT_CONFIGURED = 'not_configured';
    public const STATUS_UNSUPPORTED = 'unsupported';
    public const STATUS_UNAVAILABLE = 'unavailable';

    public const CALLER_PLUGIN = 'ChatGPT';
    public const MAX_ITERATIONS = 10;
    public const MAX_TOKENS = 4096;
    public const TIMEOUT_SECONDS = 120;

    public const CONFIRMATION_RULE = 'Before any tool call that creates, modifies or deletes something in Matomo, describe the exact change and ask the user to confirm it explicitly in the conversation. Only make that tool call after the user has confirmed it in a later message.';

    // referenced by name: McpServer is an optional Marketplace plugin
    private const MCP_UNAVAILABLE_EXCEPTION = 'Piwik\Plugins\McpServer\Support\Access\McpUnavailableException';

    /**
     * @var LoggerInterface
     */
    private $logger;

    /** @var list<array<string, mixed>>|null */
    private $toolCatalog = null;

    /**
     * @var PluginDependencies
     */
    private $dependencies;

    public function __construct(LoggerInterface $logger, ?PluginDependencies $dependencies = null)
    {
        $this->logger = $logger;
        $this->dependencies = $dependencies ?? new PluginDependencies();
    }

    /**
     * Whether the AI provider configured in Matomo can answer. Lightweight check without user context (no MCP
     * catalog), used when building the assets
     */
    public static function isAvailable(): bool
    {
        try {
            return StaticContainer::get(PluginDependencies::class)->isAiProvidersConnected();
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Whether a tool can change Matomo. Only read-only tools are exposed until a super user allows
     * the raw API access (create, update, delete methods) in the McpServer settings.
     *
     * @param list<array<string, mixed>> $tools
     */
    public static function hasActionTools(array $tools): bool
    {
        foreach ($tools as $tool) {
            if (($tool['readOnly'] ?? null) !== true) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array<string, string|int> $urlParams idSite, period and date of the current page, for the links of the
     *                                             recommendations
     * @return array{mode: string, engine: string, keySource: string, mcp: string, ai: string, providerName: string|null,
     *               toolCount: int, canPerformActions: bool, recommendations: list<array<string, mixed>>}
     */
    public function getStatus(int $idSite = 0, array $urlParams = []): array
    {
        $keySource = $this->getKeySource($idSite);
        $engine = $keySource === EffectiveSettings::SOURCE_AI_PROVIDERS ? self::ENGINE_AI_PROVIDERS : self::ENGINE_PLUGIN;
        $mcpStatus = $this->getMcpStatus();
        $aiStatus = $this->getAiStatus();
        $tools = $mcpStatus === self::STATUS_READY ? $this->getToolCatalog() : [];
        $isAgent = $engine === self::ENGINE_AI_PROVIDERS && $mcpStatus === self::STATUS_READY;
        $canPerformActions = self::hasActionTools($tools);

        // a key set for the website overrides AI Providers: the recommendations would not change anything there
        $recommendations = [];
        if ($keySource !== EffectiveSettings::SOURCE_SITE) {
            $recommendations = Recommendations::build([
                'aiPlugin' => $this->dependencies->getPluginState(PluginDependencies::AI_PROVIDERS),
                'ai' => $this->dependencies->getAiProvidersAvailability()['status'],
                'aiManaged' => $this->dependencies->isAiProvidersManaged(),
                'mcp' => $mcpStatus,
                'canPerformActions' => $canPerformActions,
            ], $this->isSuperUser(), $urlParams);
        }

        return [
            'mode' => $isAgent ? self::MODE_AGENT : self::MODE_CHAT,
            'engine' => $engine,
            'keySource' => $keySource,
            'mcp' => $mcpStatus,
            'ai' => $aiStatus['status'],
            'providerName' => $aiStatus['providerName'],
            'toolCount' => count($tools),
            'canPerformActions' => $canPerformActions,
            'recommendations' => $recommendations,
        ];
    }

    /**
     * Whether the Matomo tools of McpServer can be used by the current user
     */
    public function hasTools(): bool
    {
        return $this->getAvailableTools() !== [];
    }

    public function buildSystemPrompt(
        string $basePrompt,
        int $idSite,
        string $period,
        string $date,
        ?string $reportData = null,
        bool $withTools = true
    ): string {
        $lines = [trim($basePrompt), ''];
        if ($withTools) {
            $lines[] = 'You are connected to this Matomo instance through Matomo tools (MCP). Use them to look up real analytics data and to perform the actions the user asks for, then answer with the results.';
            // kept out of the editable base prompt, so an administrator rewriting it cannot remove this safeguard
            if (self::hasActionTools($this->getAvailableTools())) {
                $lines[] = self::CONFIRMATION_RULE;
            }
        }
        $lines = array_merge($lines, [
            sprintf(
                'Current context: website "%s" (idSite %d), period "%s", date "%s". Use this website and period unless the user asks for something else.',
                Site::getNameFor($idSite),
                $idSite,
                $period,
                $date
            ),
            'Answer in the language of the user. Format your answer as readable Markdown text (titles, lists, bold metrics), never as raw JSON.',
        ]);

        if ($reportData !== null) {
            $lines[] = '';
            $lines[] = $withTools
                ? 'The data of the report the user is currently looking at is provided below in JSON. Analyze it directly: only use the tools when you need additional data to answer.'
                : 'The data of the report the user is currently looking at is provided below in JSON. Analyze it directly.';
            if ($withTools) {
                $lines[] = 'Its "request" object is the exact Matomo API request behind this data (method, idSite, period, date, segment, idSubtable...): to fetch more rows, a subtable or another period to compare with, call the Matomo tools with exactly these parameters, changing only what you need.';
            }
            $lines[] = $reportData;
        }

        return implode("\n", $lines);
    }

    /**
     * Runs the conversation until the model answers without calling tools
     *
     * @param list<array{role: string, content: string}> $messages user and assistant messages, oldest first
     * @param callable(string, array<string, mixed>): void $emit receives the agent events
     */
    public function run(array $messages, string $systemPrompt, string $featureKey, string $sessionKey, callable $emit): void
    {
        $tools = $this->getAvailableTools();
        $toolTitles = [];
        foreach ($tools as $tool) {
            $toolTitles[$tool['name']] = !empty($tool['title']) ? $tool['title'] : $tool['name'];
        }

        $conversation = $this->toCanonicalMessages($messages);

        for ($iteration = 0; $iteration < self::MAX_ITERATIONS; $iteration++) {
            $request = (new AIConversationRequest($conversation, self::CALLER_PLUGIN))
                ->withSystemPrompt($systemPrompt)
                ->withFeatureKey($featureKey)
                ->withMaxTokens(self::MAX_TOKENS)
                ->withTimeoutSeconds(self::TIMEOUT_SECONDS);
            if ($tools !== []) {
                $request = $request->withTools($tools);
            }
            $response = $this->converse($request);

            $content = $response->getContent();
            // replayed verbatim: blocks may carry provider specific fields
            $conversation[] = ['role' => 'assistant', 'content' => $content];

            $text = trim($response->getText());
            if ($text !== '') {
                $emit('text', ['content' => $text]);
            }

            $toolUses = CanonicalMessage::toolUseBlocks($content);
            if ($response->getStopReason() !== AIConversationResponse::STOP_TOOL_USE || $toolUses === []) {
                return;
            }

            $results = [];
            foreach ($toolUses as $toolUse) {
                $emit('tool_call', [
                    'id' => $toolUse['id'],
                    'name' => $toolUse['name'],
                    'title' => $toolTitles[$toolUse['name']] ?? $toolUse['name'],
                ]);

                $result = $this->callTool($toolUse['name'], $toolUse['input'], $sessionKey);

                $emit('tool_result', ['id' => $toolUse['id'], 'isError' => $result['isError']]);

                $results[] = [
                    'type' => 'tool_result',
                    'tool_use_id' => $toolUse['id'],
                    'content' => $result['content'],
                    'structuredContent' => $result['structuredContent'],
                    'is_error' => $result['isError'],
                ];
            }

            $conversation[] = ['role' => 'tool', 'content' => $results];
        }

        $emit('error', ['message' => $this->translate('ChatGPT_AgentMaxIterations')]);
    }

    /**
     * Single answer of the AI provider configured in Matomo, without tools. Used by the API methods: McpServer
     * does not accept internal tool calls from an API request.
     *
     * @param list<array{role: string, content: string}> $messages user and assistant messages, oldest first
     */
    public function answer(array $messages, string $systemPrompt, string $featureKey): string
    {
        $response = $this->converse(
            (new AIConversationRequest($this->toCanonicalMessages($messages), self::CALLER_PLUGIN))
                ->withSystemPrompt($systemPrompt)
                ->withFeatureKey($featureKey)
                ->withMaxTokens(self::MAX_TOKENS)
                ->withTimeoutSeconds(self::TIMEOUT_SECONDS)
        );

        return trim($response->getText());
    }

    /**
     * One round-trip with the AI provider configured in Matomo
     */
    protected function converse(AIConversationRequest $request): AIConversationResponse
    {
        return $this->dependencies->getAiProvidersService()->converse($request);
    }

    /**
     * @return list<array<string, mixed>>
     */
    protected function fetchToolCatalog(): array
    {
        $catalog = Request::processRequest('McpServer.getInternalToolCatalog', [], []);

        return is_array($catalog) ? array_values($catalog) : [];
    }

    /**
     * @param array<string, mixed> $arguments
     * @return array<string, mixed>
     */
    protected function callInternalTool(string $name, array $arguments, string $sessionKey): array
    {
        $result = Request::processRequest('McpServer.callInternalTool', [
            'name' => $name,
            'arguments' => $arguments,
            'sessionKey' => $sessionKey,
        ], []);

        return is_array($result) ? $result : [];
    }

    protected function translate(string $translationKey): string
    {
        return Piwik::translate($translationKey);
    }

    protected function getKeySource(int $idSite): string
    {
        return EffectiveSettings::forSite($idSite, $this->dependencies)->getKeySource();
    }

    protected function isSuperUser(): bool
    {
        return Piwik::hasUserSuperUserAccess();
    }

    private function getMcpStatus(): string
    {
        $pluginState = $this->dependencies->getPluginState(PluginDependencies::MCP_SERVER);
        if ($pluginState === PluginDependencies::PLUGIN_MISSING) {
            return self::STATUS_NOT_INSTALLED;
        }
        if ($pluginState === PluginDependencies::PLUGIN_INACTIVE) {
            return self::STATUS_NOT_ACTIVATED;
        }

        try {
            $this->getToolCatalog();
            return self::STATUS_READY;
        } catch (\Throwable $e) {
            if (is_a($e, self::MCP_UNAVAILABLE_EXCEPTION)) {
                return self::STATUS_DISABLED;
            }
            if ($e instanceof NoAccessException) {
                return self::STATUS_NO_ACCESS;
            }

            $this->logger->warning('ChatGPT agent: MCP tools are unavailable: ' . $e->getMessage());
            return self::STATUS_UNAVAILABLE;
        }
    }

    /**
     * @return array{status: string, providerName: string|null}
     */
    private function getAiStatus(): array
    {
        $availability = $this->dependencies->getAiProvidersAvailability();

        $statuses = [
            PluginDependencies::AI_READY => self::STATUS_READY,
            PluginDependencies::AI_NOT_CONFIGURED => self::STATUS_NOT_CONFIGURED,
            PluginDependencies::AI_UNSUPPORTED => self::STATUS_UNSUPPORTED,
        ];

        return [
            'status' => $statuses[$availability['status']] ?? self::STATUS_UNAVAILABLE,
            'providerName' => $availability['providerName'],
        ];
    }

    /**
     * The tools of McpServer, none when it is unavailable: the AI provider then answers without them
     *
     * @return list<array<string, mixed>>
     */
    private function getAvailableTools(): array
    {
        if ($this->getMcpStatus() !== self::STATUS_READY) {
            return [];
        }

        try {
            return $this->getToolCatalog();
        } catch (\Throwable $e) {
            return [];
        }
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function getToolCatalog(): array
    {
        if ($this->toolCatalog === null) {
            $this->toolCatalog = $this->fetchToolCatalog();
        }

        return $this->toolCatalog;
    }

    /**
     * @param array<string, mixed> $arguments
     * @return array{content: list<array<string, mixed>>, structuredContent: array<string, mixed>|null, isError: bool}
     */
    private function callTool(string $name, array $arguments, string $sessionKey): array
    {
        try {
            $result = $this->callInternalTool($name, $arguments, $sessionKey);

            return [
                'content' => is_array($result['content'] ?? null) ? $result['content'] : [],
                'structuredContent' => is_array($result['structuredContent'] ?? null) ? $result['structuredContent'] : null,
                'isError' => !empty($result['isError']),
            ];
        } catch (\Throwable $e) {
            // reported to the model, which can explain the failure or try something else
            return [
                'content' => [['type' => 'text', 'text' => $e->getMessage()]],
                'structuredContent' => null,
                'isError' => true,
            ];
        }
    }

    /**
     * @param list<array{role: string, content: string}> $messages
     * @return list<array{role: string, content: list<array<string, mixed>>}>
     */
    private function toCanonicalMessages(array $messages): array
    {
        $canonical = [];
        foreach ($messages as $message) {
            if (!in_array($message['role'] ?? '', ['user', 'assistant'], true) || trim((string) ($message['content'] ?? '')) === '') {
                continue;
            }
            $canonical[] = [
                'role' => $message['role'],
                'content' => [['type' => 'text', 'text' => (string) $message['content']]],
            ];
        }

        return $canonical;
    }
}
