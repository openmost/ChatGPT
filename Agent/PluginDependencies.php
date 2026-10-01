<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Agent;

use Piwik\Container\StaticContainer;
use Piwik\Plugin\Manager as PluginManager;

/**
 * Detects the optional plugins the assistant can run on: AIProviders (bundled since Matomo 5.13.0, but it may be
 * missing or deactivated on upgraded instances) and McpServer (Marketplace plugin). Any failure while detecting them
 * means "not available": the plugin must keep working without them.
 */
class PluginDependencies
{
    public const AI_PROVIDERS = 'AIProviders';
    public const MCP_SERVER = 'McpServer';

    public const PLUGIN_MISSING = 'missing';
    public const PLUGIN_INACTIVE = 'inactive';
    public const PLUGIN_ACTIVE = 'active';

    // values of the AIProviders availability statuses, not referenced by constant as the plugin may be missing
    public const AI_READY = 'ready';
    public const AI_NOT_CONFIGURED = 'not_configured';
    public const AI_UNSUPPORTED = 'provider_unsupported';
    public const AI_UNAVAILABLE = 'unavailable';

    private const AI_PROVIDER_SERVICE = 'Piwik\Plugins\AIProviders\AIProviderService';

    /** @var array{status: string, providerId: string|null, providerName: string|null}|null */
    private $aiAvailability = null;

    /** @var bool|null */
    private $aiManaged = null;

    public function getPluginState(string $pluginName): string
    {
        try {
            if (!$this->isPluginInFilesystem($pluginName)) {
                return self::PLUGIN_MISSING;
            }

            return $this->isPluginActivated($pluginName) ? self::PLUGIN_ACTIVE : self::PLUGIN_INACTIVE;
        } catch (\Throwable $e) {
            return self::PLUGIN_MISSING;
        }
    }

    /**
     * @return array{status: string, providerId: string|null, providerName: string|null}
     */
    public function getAiProvidersAvailability(): array
    {
        if ($this->aiAvailability === null) {
            $this->aiAvailability = $this->detectAiProvidersAvailability();
        }

        return $this->aiAvailability;
    }

    /**
     * Whether AIProviders is activated with a provider that has its credentials and supports conversations.
     */
    public function isAiProvidersConnected(): bool
    {
        return $this->getAiProvidersAvailability()['status'] === self::AI_READY;
    }

    /**
     * On a managed instance the provider is forced from the configuration and the AI Providers page is unavailable.
     */
    public function isAiProvidersManaged(): bool
    {
        if ($this->aiManaged === null) {
            $this->aiManaged = false;
            if ($this->getPluginState(self::AI_PROVIDERS) === self::PLUGIN_ACTIVE) {
                try {
                    $this->aiManaged = (bool) $this->getAiProviderService()->isManaged();
                } catch (\Throwable $e) {
                    $this->aiManaged = false;
                }
            }
        }

        return $this->aiManaged;
    }

    /**
     * The AIProviderService of the AIProviders plugin, to run the conversations. Throws when the plugin is not loaded.
     *
     * @return object
     */
    public function getAiProvidersService()
    {
        return $this->getAiProviderService();
    }

    protected function isPluginInFilesystem(string $pluginName): bool
    {
        return (bool) PluginManager::getInstance()->isPluginInFilesystem($pluginName);
    }

    protected function isPluginActivated(string $pluginName): bool
    {
        return (bool) PluginManager::getInstance()->isPluginActivated($pluginName);
    }

    /**
     * @return object the AIProviderService of the AIProviders plugin
     */
    protected function getAiProviderService()
    {
        if (!class_exists(self::AI_PROVIDER_SERVICE)) {
            throw new \RuntimeException('The AIProviders plugin is not loaded.');
        }

        return StaticContainer::get(self::AI_PROVIDER_SERVICE);
    }

    /**
     * @return array{status: string, providerId: string|null, providerName: string|null}
     */
    private function detectAiProvidersAvailability(): array
    {
        $unavailable = ['status' => self::AI_UNAVAILABLE, 'providerId' => null, 'providerName' => null];

        if ($this->getPluginState(self::AI_PROVIDERS) !== self::PLUGIN_ACTIVE) {
            return $unavailable;
        }

        try {
            $availability = $this->getAiProviderService()->getConversationAvailability();
        } catch (\Throwable $e) {
            return $unavailable;
        }

        if (!is_array($availability) || !isset($availability['status']) || !is_string($availability['status'])) {
            return $unavailable;
        }

        return [
            'status' => $availability['status'],
            'providerId' => isset($availability['providerId']) ? (string) $availability['providerId'] : null,
            'providerName' => isset($availability['providerName']) ? (string) $availability['providerName'] : null,
        ];
    }
}
