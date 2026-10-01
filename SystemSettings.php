<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\Settings\AiProvidersTakeover;
use Piwik\Plugins\ChatGPT\Settings\DefaultPrompts;
use Piwik\Plugins\ChatGPT\Settings\LegacyPrompts;
use Piwik\Plugins\ChatGPT\Settings\SingleValue;
use Piwik\Settings\Setting;
use Piwik\Settings\FieldConfig;
use Piwik\Settings\Storage\Factory as StorageFactory;
use Piwik\Validators\NotEmpty;

/**
 * System-wide settings for ChatGPT plugin.
 */
class SystemSettings extends \Piwik\Settings\Plugin\SystemSettings
{
    use SettingsBase;

    /** @var Setting */
    public $host;
    public $apiKey;
    public $modelPreset;
    public $modelCustom;
    public $chatBasePrompt;
    public $insightBasePrompt;

    /** @var bool|null */
    private $isTakenOver = null;

    protected function init()
    {
        // the model chosen with a previous plugin version is kept until the model settings are saved
        $legacyModel = $this->getLegacyModel();
        $defaultPreset = Config::DEFAULT_MODEL;
        $defaultCustom = '';
        if ($legacyModel !== '') {
            if (Config::isAvailableModel($legacyModel)) {
                $defaultPreset = $legacyModel;
            } else {
                $defaultCustom = $legacyModel;
            }
        }

        $this->host = $this->makeSetting('host', Config::DEFAULT_HOST, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureHostField($field);
            $field->validators[] = new NotEmpty();
            $field->validate = function ($value) {
                if (!self::isHttpsUrl((string) $value)) {
                    throw new \Exception(Piwik::translate('ChatGPT_InvalidApiUrl'));
                }
            };
            $this->applyAiProvidersTakeover($field, 'host');
        });

        $this->apiKey = $this->makeSetting('apiKey', null, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureApiKeyField($field);
            $this->applyAiProvidersTakeover($field, 'apiKey');
        });

        $this->modelPreset = $this->makeSetting('modelPreset', $defaultPreset, FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $this->configureModelPresetField($field, SingleValue::toString($this->modelPreset->getValue()));
            $field->validators[] = new NotEmpty();
            $this->applyAiProvidersTakeover($field, 'modelPreset');
        });

        $this->modelCustom = $this->makeSetting('modelCustom', $defaultCustom, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureModelCustomField($field);
            $this->applyAiProvidersTakeover($field, 'modelCustom');
        });

        // a default prompt is not stored, so the defaults rewritten by a later version reach this install
        $this->chatBasePrompt = $this->makeSetting('chatBasePrompt', Piwik::translate('ChatGPT_ChatBasePromptDefault'), FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureChatBasePromptField($field);
            $field->transform = function ($value) {
                return DefaultPrompts::toStoredGeneralPrompt(LegacyPrompts::CHAT, $value);
            };
        });

        $this->insightBasePrompt = $this->makeSetting('insightBasePrompt', Piwik::translate('ChatGPT_InsightBasePromptDefault'), FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureInsightBasePromptField($field);
            $field->transform = function ($value) {
                return DefaultPrompts::toStoredGeneralPrompt(LegacyPrompts::INSIGHT, $value);
            };
        });
    }

    /**
     * The settings are edited on the ChatGPT page of the System administration (see Settings\SystemSettingsForm):
     * none is listed in Administration > General settings nor accepted by CorePluginsAdmin.setSystemSettings, which
     * would bypass the API key masking and the AI Providers takeover of that page.
     *
     * @return Setting[]
     */
    public function getSettingsWritableByCurrentUser()
    {
        return [];
    }

    /**
     * Every request is refused for a host that is not an HTTPS URL, so such a host cannot be saved.
     */
    public static function isHttpsUrl(string $url): bool
    {
        $parsed = parse_url(trim($url));

        return is_array($parsed) && strtolower($parsed['scheme'] ?? '') === 'https' && !empty($parsed['host']);
    }

    /**
     * Model of the general settings, the custom model overrides the preset. May be the latest recommended option.
     */
    public function getConfiguredModel(): string
    {
        $model = trim((string) $this->modelCustom->getValue());

        return $model !== '' ? $model : SingleValue::toString($this->modelPreset->getValue());
    }

    /**
     * Chat prompt of the general settings: the default, in the language of the current user, when none is stored or
     * when the stored one is a default of a previous version
     */
    public function getChatBasePrompt(): string
    {
        return DefaultPrompts::resolve(LegacyPrompts::CHAT, SingleValue::toString($this->chatBasePrompt->getValue()));
    }

    /**
     * Insight prompt of the general settings, see getChatBasePrompt()
     */
    public function getInsightBasePrompt(): string
    {
        return DefaultPrompts::resolve(LegacyPrompts::INSIGHT, SingleValue::toString($this->insightBasePrompt->getValue()));
    }

    /**
     * Whether AI Providers answers the requests instead of the host and key of these settings
     */
    public function isTakenOverByAiProviders(): bool
    {
        if ($this->isTakenOver === null) {
            try {
                $this->isTakenOver = StaticContainer::get(PluginDependencies::class)->isAiProvidersConnected();
            } catch (\Throwable $e) {
                $this->isTakenOver = false;
            }
        }

        return $this->isTakenOver;
    }

    private function applyAiProvidersTakeover(FieldConfig $field, string $settingName): void
    {
        if (!$this->isTakenOverByAiProviders()) {
            return;
        }

        AiProvidersTakeover::apply(
            $field,
            $settingName,
            true,
            Piwik::translate('ChatGPT_AiProvidersTakeover'),
            self::getAiProvidersLink()
        );
    }

    /**
     * HTML sentence linking to the AI Providers settings, empty for the users who cannot open them.
     */
    public static function getAiProvidersLink(): string
    {
        try {
            // the AI Providers page is unavailable when the provider is managed from the configuration
            if (Piwik::hasUserSuperUserAccess() && !StaticContainer::get(PluginDependencies::class)->isAiProvidersManaged()) {
                return Piwik::translate('ChatGPT_AiProvidersTakeoverLink', [
                    '<a href="index.php?module=AIProviders&amp;action=index">',
                    '</a>',
                ]);
            }
        } catch (\Throwable $e) {
            return '';
        }

        return '';
    }

    /**
     * Value of the single "model" setting of previous plugin versions, empty once the model settings were saved.
     */
    private function getLegacyModel(): string
    {
        try {
            $storage = StaticContainer::get(StorageFactory::class)->getPluginStorage($this->pluginName, '');
            if (
                $storage->getValue('modelPreset', null, FieldConfig::TYPE_ARRAY) !== null
                || $storage->getValue('modelCustom', null, FieldConfig::TYPE_STRING) !== null
            ) {
                return '';
            }

            return SingleValue::toString($storage->getValue('model', null, FieldConfig::TYPE_ARRAY));
        } catch (\Throwable $e) {
            return '';
        }
    }
}
