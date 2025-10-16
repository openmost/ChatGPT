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
use Piwik\Validators\NotEmpty;

/**
 * Defines Settings for ChatGPT.
 *
 * Usage like this:
 * // require Piwik\Plugin\SettingsProvider via Dependency Injection eg in constructor of your class
 * $settings = $settingsProvider->getMeasurableSettings('ChatGPT', $idSite);
 * $settings->appId->getValue();
 * $settings->contactEmails->getValue();
 */
class MeasurableSettings extends \Piwik\Settings\Measurable\MeasurableSettings
{
    /** @var Setting */
    public $host;
    public $apiKey;
    public $modelCustom;
    public $modelPreset;
    public $chatBasePrompt;
    public $insightBasePrompt;

    protected function init()
    {
        // System setting --> allows selection of a single value
        $this->host = $this->createHostSetting();
        $this->apiKey = $this->createApiKeySetting();
        $this->modelPreset = $this->createModelSetting();
        $this->modelCustom = $this->createModelCustomSetting();
        $this->chatBasePrompt = $this->createChatBasePromptSetting();
        $this->insightBasePrompt = $this->createInsightBasePromptSetting();
    }

    private function createHostSetting()
    {
        return $this->makeSetting('host', $default = '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Host';
            $field->uiControl = FieldConfig::UI_CONTROL_URL;
            $field->description = 'Change the host to connect your own GPT instance';
        });
    }

    private function createApiKeySetting()
    {
        return $this->makeSetting('apiKey', $default = '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'API Key';
            $field->uiControl = FieldConfig::UI_CONTROL_PASSWORD;
            $field->description = 'Add your ChatGPT API Key here';
        });
    }

    private function createModelSetting()
    {
        return $this->makeSetting('model', $default = '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $field->title = 'Model';
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->description = 'Select the model you want to use';
            $field->availableValues = array(
                '' => '',
                'o1-mini' => 'o1 mini',
                'gpt-4o' => 'GPT 4o',
                'gpt-4o-mini' => 'GPT 4o mini',
                'gpt-4' => 'GPT 4',
                'gpt-4-turbo' => 'GPT 4 Turbo',
                'gpt-3.5-turbo' => 'GPT 3.5 turbo',
            );
        });
    }

    private function createModelCustomSetting()
    {
        return $this->makeSetting('modelCustom', $default = '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Custom Model';
            $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
            $field->description = 'Enter a custom model name.';
            $field->validators[] = new NotEmpty();
        });
    }

    private function createChatBasePromptSetting()
    {
        return $this->makeSetting('chatBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Chat base prompt';
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = 'Adapt the prompt to get more precise answer in the chat feature';
        });
    }

    private function createInsightBasePromptSetting()
    {
        return $this->makeSetting('insightBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Insight base prompt';
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = 'Adapt the prompt to get more precise insights for your reports';
        });
    }
}
