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
use Piwik\Plugin\Manager as PluginManager;
use Piwik\Plugins\AIProviders\AIConversationRequest;
use Piwik\Plugins\AIProviders\AIConversationResponse;
use Piwik\Plugins\AIProviders\AIProviderService;
use Piwik\Plugins\AIProviders\CanonicalMessage;
use Piwik\Site;

/**
 * Chat agent running on the AI provider configured in Matomo (AIProviders plugin) with the tools of
 * the McpServer plugin, called in-process with the permissions of the current user: no public MCP
 * endpoint or OAuth client is involved.
 *
 * McpServer only accepts internal tool calls when the root request is not an API request, so the
 * agent must be run from a controller action.
 */
class McpAgent
{
    public const MODE_AGENT = 'agent';
    public const MODE_CHAT = 'chat';

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

    // referenced by name: McpServer is an optional Marketplace plugin
    private const MCP_UNAVAILABLE_EXCEPTION = 'Piwik\Plugins\McpServer\Support\Access\McpUnavailableException';

    /** @var list<array<string, mixed>>|null */
    private ?array $toolCatalog = null;

    public function __construct(private LoggerInterface $logger)
    {
    }

    /**
     * Lightweight check without user context (no MCP catalog), used when building the assets
     */
    public static function isAvailable(): bool
    {
        try {
            $pluginManager = PluginManager::getInstance();
            if (!$pluginManager->isPluginActivated('McpServer') || !$pluginManager->isPluginActivated('AIProviders')) {
                return false;
            }

            return StaticContainer::get(AIProviderService::class)->canConverse();
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
     * @return array{mode: string, mcp: string, ai: string, providerName: string|null, toolCount: int, canPerformActions: bool}
     */
    public function getStatus(): array
    {
        $mcpStatus = $this->getMcpStatus();
        $aiStatus = $this->getAiStatus();
        $isAgent = $mcpStatus === self::STATUS_READY && $aiStatus['status'] === self::STATUS_READY;
        $tools = $mcpStatus === self::STATUS_READY ? $this->getToolCatalog() : [];

        return [
            'mode' => $isAgent ? self::MODE_AGENT : self::MODE_CHAT,
            'mcp' => $mcpStatus,
            'ai' => $aiStatus['status'],
            'providerName' => $aiStatus['providerName'],
            'toolCount' => count($tools),
            'canPerformActions' => self::hasActionTools($tools),
        ];
    }

    public function buildSystemPrompt(string $basePrompt, int $idSite, string $period, string $date, ?string $reportData = null): string
    {
        $lines = [
            trim($basePrompt),
            '',
            'You are connected to this Matomo instance through Matomo tools (MCP). Use them to look up real analytics data and to perform the actions the user asks for, then answer with the results.',
            sprintf(
                'Current context: website "%s" (idSite %d), period "%s", date "%s". Use this website and period unless the user asks for something else.',
                Site::getNameFor($idSite),
                $idSite,
                $period,
                $date
            ),
            'Answer in the language of the user. Format your answer as readable Markdown text (titles, lists, bold metrics), never as raw JSON.',
        ];

        if ($reportData !== null) {
            $lines[] = '';
            $lines[] = 'The data of the report the user is currently looking at is provided below in JSON. Analyze it directly: only use the tools when you need additional data to answer.';
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
        $tools = $this->getToolCatalog();
        $toolTitles = [];
        foreach ($tools as $tool) {
            $toolTitles[$tool['name']] = !empty($tool['title']) ? $tool['title'] : $tool['name'];
        }

        $conversation = $this->toCanonicalMessages($messages);

        for ($iteration = 0; $iteration < self::MAX_ITERATIONS; $iteration++) {
            $response = $this->converse(
                (new AIConversationRequest($conversation, self::CALLER_PLUGIN))
                    ->withSystemPrompt($systemPrompt)
                    ->withTools($tools)
                    ->withFeatureKey($featureKey)
                    ->withMaxTokens(self::MAX_TOKENS)
                    ->withTimeoutSeconds(self::TIMEOUT_SECONDS)
            );

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
     * One round-trip with the AI provider configured in Matomo
     */
    protected function converse(AIConversationRequest $request): AIConversationResponse
    {
        return StaticContainer::get(AIProviderService::class)->converse($request);
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

    private function getMcpStatus(): string
    {
        $pluginManager = PluginManager::getInstance();
        if (!$pluginManager->isPluginInFilesystem('McpServer')) {
            return self::STATUS_NOT_INSTALLED;
        }
        if (!$pluginManager->isPluginActivated('McpServer')) {
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
        if (!PluginManager::getInstance()->isPluginActivated('AIProviders')) {
            return ['status' => self::STATUS_UNAVAILABLE, 'providerName' => null];
        }

        try {
            $availability = StaticContainer::get(AIProviderService::class)->getConversationAvailability();
        } catch (\Throwable $e) {
            $this->logger->warning('ChatGPT agent: AI providers are unavailable: ' . $e->getMessage());
            return ['status' => self::STATUS_UNAVAILABLE, 'providerName' => null];
        }

        $statuses = [
            AIProviderService::CONVERSATION_READY => self::STATUS_READY,
            AIProviderService::CONVERSATION_NOT_CONFIGURED => self::STATUS_NOT_CONFIGURED,
            AIProviderService::CONVERSATION_PROVIDER_UNSUPPORTED => self::STATUS_UNSUPPORTED,
        ];

        return [
            'status' => $statuses[$availability['status']] ?? self::STATUS_UNAVAILABLE,
            'providerName' => $availability['providerName'],
        ];
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
