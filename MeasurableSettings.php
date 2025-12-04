<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Settings\Setting;
use Piwik\Settings\FieldConfig;

/**
 * Site-specific settings for ChatGPT plugin.
 * These settings override system settings when configured.
 */
class MeasurableSettings extends \Piwik\Settings\Measurable\MeasurableSettings
{
    use SettingsBase;

    /** @var Setting */
    public $host;
    public $apiKey;
    public $modelPreset;
    public $modelCustom;
    public $chatBasePrompt;
    public $insightBasePrompt;

    protected function init()
    {
        $this->host = $this->makeSetting('host', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureHostField($field);
        });

        $this->apiKey = $this->makeSetting('apiKey', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureApiKeyField($field);
        });

        $this->modelPreset = $this->makeSetting('modelPreset', '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $this->configureModelPresetField($field, true);
        });

        $this->modelCustom = $this->makeSetting('modelCustom', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureModelCustomField($field, true);
        });

        $this->chatBasePrompt = $this->makeSetting('chatBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureChatBasePromptField($field);
        });

        $this->insightBasePrompt = $this->makeSetting('insightBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureInsightBasePromptField($field);
        });
    }
}
