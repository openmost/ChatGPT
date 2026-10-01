<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\tests\Fakes;

use Piwik\Plugins\AIProviders\AIConversationRequest;
use Piwik\Plugins\AIProviders\AIConversationResponse;
use Piwik\Plugins\ChatGPT\Agent\McpAgent;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;

/**
 * Agent with scripted AI provider answers, MCP tool catalog and tool results
 */
class ScriptedMcpAgent extends McpAgent
{
    /** @var list<AIConversationResponse> */
    public $responses = [];

    /** @var list<AIConversationRequest> */
    public $requests = [];

    /** @var list<array<string, mixed>> */
    public $catalog = [];

    /** @var \Throwable|null thrown when the catalog is fetched */
    public $catalogError = null;

    /** @var int */
    public $catalogFetches = 0;

    /** @var list<array<string, mixed>|\Throwable> */
    public $toolResults = [];

    /** @var list<array{string, array<string, mixed>, string}> */
    public $toolCalls = [];

    /** @var string */
    public $keySource = EffectiveSettings::SOURCE_AI_PROVIDERS;

    /** @var bool */
    public $superUser = true;

    protected function converse(AIConversationRequest $request): AIConversationResponse
    {
        $this->requests[] = $request;

        return array_shift($this->responses);
    }

    protected function fetchToolCatalog(): array
    {
        $this->catalogFetches++;
        if ($this->catalogError !== null) {
            throw $this->catalogError;
        }

        return $this->catalog;
    }

    protected function callInternalTool(string $name, array $arguments, string $sessionKey): array
    {
        $this->toolCalls[] = [$name, $arguments, $sessionKey];
        $result = array_shift($this->toolResults);
        if ($result instanceof \Throwable) {
            throw $result;
        }

        return $result;
    }

    protected function translate(string $translationKey): string
    {
        return $translationKey;
    }

    protected function getKeySource(int $idSite): string
    {
        return $this->keySource;
    }

    protected function isSuperUser(): bool
    {
        return $this->superUser;
    }
}
