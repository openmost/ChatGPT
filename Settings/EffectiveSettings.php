<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Settings;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\Config;
use Piwik\Plugins\ChatGPT\SystemSettings;

/**
 * Settings applied to a website: the values set for the website override the general settings.
 *
 * The key cascade (key of the website, then AI Providers, then the general key) is resolved here once for all the
 * features: chat, insights and agent.
 */
final class EffectiveSettings
{
    public const SOURCE_SITE = 'site';
    public const SOURCE_SYSTEM = 'system';
    public const SOURCE_AI_PROVIDERS = 'aiProviders';
    public const SOURCE_NONE = 'none';

    /** @var int */
    private $idSite;
    /** @var string */
    private $host;
    /** @var string */
    private $apiKey;
    /** @var string */
    private $configuredModel;
    /** @var string */
    private $modelSource;
    /** @var string */
    private $keySource;
    /** @var string */
    private $chatBasePrompt;
    /** @var string */
    private $insightBasePrompt;

    private function __construct()
    {
    }

    public static function forSite(int $idSite, ?PluginDependencies $dependencies = null): self
    {
        $system = new SystemSettings();
        $dependencies = $dependencies ?? StaticContainer::get(PluginDependencies::class);

        return self::fromValues($idSite, SiteSettingsStorage::read($idSite), [
            'host' => (string) $system->host->getValue(),
            'apiKey' => (string) $system->apiKey->getValue(),
            'model' => $system->getConfiguredModel(),
            'chatBasePrompt' => $system->getChatBasePrompt(),
            'insightBasePrompt' => $system->getInsightBasePrompt(),
        ], $dependencies->isAiProvidersConnected());
    }

    /**
     * @param array<string, string> $site values of the website, see SiteSettingsStorage::read()
     * @param array{host: string, apiKey: string, model: string, chatBasePrompt: string, insightBasePrompt: string} $system
     *        general settings
     */
    public static function fromValues(int $idSite, array $site, array $system, bool $aiProvidersConnected): self
    {
        $site += array_fill_keys(SiteSettingsStorage::SETTING_NAMES, '');

        $settings = new self();
        $settings->idSite = $idSite;

        $systemHost = trim($system['host']);
        $settings->host = $site['host'] !== '' ? $site['host'] : $systemHost;

        // A website admin can change the host: the general API key is only sent to the general host
        $settings->apiKey = $site['apiKey'];
        if ($settings->apiKey === '' && $settings->host === $systemHost) {
            $settings->apiKey = trim($system['apiKey']);
        }

        if ($site['modelCustom'] !== '' || $site['modelPreset'] !== '') {
            $settings->configuredModel = $site['modelCustom'] !== '' ? $site['modelCustom'] : $site['modelPreset'];
            $settings->modelSource = self::SOURCE_SITE;
        } else {
            $settings->configuredModel = $system['model'];
            $settings->modelSource = self::SOURCE_SYSTEM;
        }

        $settings->keySource = self::resolveKeySource($site['apiKey'], $aiProvidersConnected, $settings->isPluginConfigured());

        $settings->chatBasePrompt = self::resolvePrompt(LegacyPrompts::CHAT, $site['chatBasePrompt'], $system['chatBasePrompt']);
        $settings->insightBasePrompt = self::resolvePrompt(LegacyPrompts::INSIGHT, $site['insightBasePrompt'], $system['insightBasePrompt']);

        return $settings;
    }

    /**
     * The prompt of the website, unless it is empty or a default prompt of a previous version: the general prompt,
     * already resolved to its default, then applies. An empty general prompt falls back to the default.
     */
    public static function resolvePrompt(string $kind, string $sitePrompt, string $systemPrompt): string
    {
        if (trim($sitePrompt) !== '' && !LegacyPrompts::isLegacyDefault($kind, $sitePrompt)) {
            return $sitePrompt;
        }

        return DefaultPrompts::resolve($kind, $systemPrompt);
    }

    /**
     * Any one key is enough: the key of the website, then the AI provider configured in Matomo (AIProviders plugin),
     * then the general key of the plugin. The keys are never copied from one place to another.
     */
    public static function resolveKeySource(string $siteApiKey, bool $aiProvidersConnected, bool $pluginConfigured): string
    {
        if (trim($siteApiKey) !== '') {
            return self::SOURCE_SITE;
        }
        if ($aiProvidersConnected) {
            return self::SOURCE_AI_PROVIDERS;
        }

        return $pluginConfigured ? self::SOURCE_SYSTEM : self::SOURCE_NONE;
    }

    public function getIdSite(): int
    {
        return $this->idSite;
    }

    public function getHost(): string
    {
        return $this->host;
    }

    public function getApiKey(): string
    {
        return $this->apiKey;
    }

    public function isCustomHost(): bool
    {
        return !Config::isDefaultHost($this->host);
    }

    /**
     * Whether the requests of the website can be answered, by any of the key sources.
     */
    public function isConfigured(): bool
    {
        return $this->keySource !== self::SOURCE_NONE;
    }

    /**
     * Whether the host and key of the plugin settings are usable. Custom hosts may not need an API key.
     */
    public function isPluginConfigured(): bool
    {
        return $this->host !== '' && ($this->isCustomHost() || $this->apiKey !== '');
    }

    /**
     * Where the key used for the website comes from, one of the SOURCE_* constants.
     */
    public function getKeySource(): string
    {
        return $this->keySource;
    }

    /**
     * Whether the requests run on the AI provider configured in Matomo instead of the plugin host and key.
     */
    public function usesAiProviders(): bool
    {
        return $this->keySource === self::SOURCE_AI_PROVIDERS;
    }

    /**
     * Model sent to the API, the latest recommended option resolved.
     */
    public function getModel(): string
    {
        return Config::resolveModel($this->configuredModel);
    }

    /**
     * Whether the model comes from the settings of the website or from the general settings.
     */
    public function getModelSource(): string
    {
        return $this->modelSource;
    }

    public function getChatBasePrompt(): string
    {
        return $this->chatBasePrompt;
    }

    public function getInsightBasePrompt(): string
    {
        return $this->insightBasePrompt;
    }
}
