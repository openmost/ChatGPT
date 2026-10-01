<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Settings;

use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\SystemSettings;
use Piwik\Settings\Setting;
use Piwik\Url;

/**
 * General settings of the plugin, edited on its page of the System administration instead of the general settings.
 *
 * The values are read and written through SystemSettings, so they keep their storage, defaults and validators.
 */
final class SystemSettingsForm
{
    public const API_KEY_PLACEHOLDER = '******';

    public const ACTION = 'settings';

    /** @var SystemSettings */
    private $settings;

    public function __construct(?SystemSettings $settings = null)
    {
        $this->settings = $settings ?? new SystemSettings();
    }

    /**
     * @param array<string, string|int> $params
     */
    public static function getUrl(array $params = []): string
    {
        return 'index.php?' . Url::getQueryStringFromParameters([
            'module' => SiteSettingsStorage::PLUGIN_NAME,
            'action' => self::ACTION,
        ] + $params);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getFields(): array
    {
        $fields = [];
        foreach ($this->getSettings() as $name => $setting) {
            $config = $setting->configureField();

            $options = null;
            if (is_array($config->availableValues)) {
                $options = [];
                foreach ($config->availableValues as $key => $label) {
                    $options[] = ['key' => (string) $key, 'value' => (string) $label];
                }
            }

            $fields[] = [
                'name' => $name,
                'uicontrol' => $config->uiControl,
                'title' => $config->title,
                'description' => (string) $config->description,
                'options' => $options,
                'disabled' => !$this->isEditable($name, $setting),
            ];
        }

        return $fields;
    }

    /**
     * Notice displayed above the fields when AI Providers answers the requests, null otherwise.
     *
     * @return array{message: string, link: string}|null link is an HTML sentence, empty for the users who cannot open
     *                                                   the AI Providers settings
     */
    public function getAiProvidersNotice(): ?array
    {
        if (!$this->settings->isTakenOverByAiProviders()) {
            return null;
        }

        return [
            'message' => Piwik::translate('ChatGPT_AiProvidersTakeover'),
            'link' => SystemSettings::getAiProvidersLink(),
        ];
    }

    /**
     * @return array<string, string> setting name => value, the saved API key replaced by a placeholder
     */
    public function getValues(): array
    {
        $values = [];
        foreach ($this->getSettings() as $name => $setting) {
            $values[$name] = SingleValue::toString($setting->getValue());
        }

        if ($values['apiKey'] !== '') {
            $values['apiKey'] = self::API_KEY_PLACEHOLDER;
        }

        // the default is displayed when no prompt is stored, or a default prompt of a previous version
        $values['chatBasePrompt'] = $this->settings->getChatBasePrompt();
        $values['insightBasePrompt'] = $this->settings->getInsightBasePrompt();

        return $values;
    }

    /**
     * Current default prompts in the language of the current user, for the "Reset to default" buttons
     *
     * @return array<string, string> setting name => default prompt
     */
    public static function getDefaultPrompts(): array
    {
        $defaults = [];
        foreach (DefaultPrompts::SETTING_NAMES as $name => $kind) {
            $defaults[$name] = LegacyPrompts::getDefault($kind);
        }

        return $defaults;
    }

    /**
     * Fields that cannot be edited are ignored, they keep their saved values. An empty API key or its placeholder keeps
     * the saved key.
     *
     * @param array<string, string|null> $values setting name => value, null to keep the saved value
     * @param bool $deleteApiKey removes the saved API key, even when AI Providers takes over the connection fields
     */
    public function save(array $values, bool $deleteApiKey = false): void
    {
        Piwik::checkUserHasSuperUserAccess();

        // only an explicit request deletes the key, an empty value keeps it
        if ($deleteApiKey && $this->settings->apiKey->isWritableByCurrentUser()) {
            $this->settings->apiKey->setValue(null);
        }

        foreach ($this->getSettings() as $name => $setting) {
            $value = $values[$name] ?? null;
            if ($value === null || !$this->isEditable($name, $setting)) {
                continue;
            }
            if ($name === 'apiKey' && ($deleteApiKey || self::keepsSavedApiKey($value))) {
                continue;
            }
            $setting->setValue($value);
        }

        $this->settings->save();
    }

    public static function keepsSavedApiKey(string $value): bool
    {
        return trim($value) === '' || $value === self::API_KEY_PLACEHOLDER;
    }

    public function isEditable(string $name, Setting $setting): bool
    {
        // a value set in the config file cannot be changed from the UI
        if (!$setting->isWritableByCurrentUser()) {
            return false;
        }

        return !($this->settings->isTakenOverByAiProviders() && in_array($name, AiProvidersTakeover::FIELDS, true));
    }

    /**
     * @return array<string, Setting>
     */
    private function getSettings(): array
    {
        return [
            'host' => $this->settings->host,
            'apiKey' => $this->settings->apiKey,
            'modelPreset' => $this->settings->modelPreset,
            'modelCustom' => $this->settings->modelCustom,
            'chatBasePrompt' => $this->settings->chatBasePrompt,
            'insightBasePrompt' => $this->settings->insightBasePrompt,
        ];
    }
}
