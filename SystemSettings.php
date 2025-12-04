<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Piwik;
use Piwik\Settings\Setting;
use Piwik\Settings\FieldConfig;
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

    protected function init()
    {
        $this->host = $this->makeSetting('host', ChatGPT::DEFAULT_HOST, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureHostField($field);
            $field->validators[] = new NotEmpty();
        });

        $this->apiKey = $this->makeSetting('apiKey', null, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureApiKeyField($field);
        });

        $this->modelPreset = $this->makeSetting('modelPreset', ChatGPT::DEFAULT_MODEL, FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $this->configureModelPresetField($field, false);
            $field->validators[] = new NotEmpty();
        });

        $this->modelCustom = $this->makeSetting('modelCustom', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureModelCustomField($field, false);
        });

        $this->chatBasePrompt = $this->makeSetting('chatBasePrompt', Piwik::translate('ChatGPT_ChatBasePromptDefault'), FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureChatBasePromptField($field);
            $field->validators[] = new NotEmpty();
        });

        $this->insightBasePrompt = $this->makeSetting('insightBasePrompt', Piwik::translate('ChatGPT_InsightBasePromptDefault'), FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $this->configureInsightBasePromptField($field);
            $field->validators[] = new NotEmpty();
        });
    }
}
