<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\tests\Fakes;

use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;

/**
 * Plugin detection with scripted plugin states and AIProviders service, the real detection logic runs on top of it
 */
class FakePluginDependencies extends PluginDependencies
{
    public const THROW = 'throw';

    /** @var array<string, string> plugin name => PLUGIN_* state, or THROW when the plugin manager fails */
    public $plugins = [];

    /** @var mixed returned by getConversationAvailability(), thrown when it is a \Throwable */
    public $availability = null;

    /** @var bool|\Throwable returned by isManaged(), thrown when it is a \Throwable */
    public $managed = false;

    /** @var bool the AIProviders service class cannot be loaded */
    public $serviceMissing = false;

    /** @var int */
    public $serviceCalls = 0;

    /** @var FakeAiProviderService|null created on first use, with the scripted availability */
    public $service = null;

    public static function connected(string $mcpState = self::PLUGIN_ACTIVE): self
    {
        $dependencies = new self();
        $dependencies->plugins = [self::AI_PROVIDERS => self::PLUGIN_ACTIVE, self::MCP_SERVER => $mcpState];
        $dependencies->availability = ['status' => self::AI_READY, 'providerId' => 'openai', 'providerName' => 'OpenAI'];

        return $dependencies;
    }

    public static function withoutAiProviders(string $aiState = self::PLUGIN_MISSING, string $mcpState = self::PLUGIN_ACTIVE): self
    {
        $dependencies = new self();
        $dependencies->plugins = [self::AI_PROVIDERS => $aiState, self::MCP_SERVER => $mcpState];
        $dependencies->availability = ['status' => self::AI_NOT_CONFIGURED, 'providerId' => null, 'providerName' => null];

        return $dependencies;
    }

    protected function isPluginInFilesystem(string $pluginName): bool
    {
        $state = $this->getScriptedState($pluginName);

        return $state !== self::PLUGIN_MISSING;
    }

    protected function isPluginActivated(string $pluginName): bool
    {
        return $this->getScriptedState($pluginName) === self::PLUGIN_ACTIVE;
    }

    protected function getAiProviderService()
    {
        $this->serviceCalls++;
        if ($this->serviceMissing) {
            throw new \RuntimeException('The AIProviders plugin is not loaded.');
        }

        if ($this->service === null) {
            $this->service = new FakeAiProviderService($this->availability, $this->managed);
        }

        return $this->service;
    }

    private function getScriptedState(string $pluginName): string
    {
        $state = isset($this->plugins[$pluginName]) ? $this->plugins[$pluginName] : self::PLUGIN_MISSING;
        if ($state === self::THROW) {
            throw new \RuntimeException('The plugin manager failed.');
        }

        return $state;
    }
}
