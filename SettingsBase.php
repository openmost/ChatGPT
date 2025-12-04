<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Piwik;
use Piwik\Settings\FieldConfig;

/**
 * Shared settings configuration for ChatGPT plugin.
 * Used by both SystemSettings and MeasurableSettings.
 */
trait SettingsBase
{
    /**
     * Configure host field
     */
    protected function configureHostField(FieldConfig $field): void
    {
        $field->title = Piwik::translate('ChatGPT_Host');
        $field->uiControl = FieldConfig::UI_CONTROL_URL;
        $field->description = Piwik::translate('ChatGPT_HostDescription');
    }

    /**
     * Configure API key field
     */
    protected function configureApiKeyField(FieldConfig $field): void
    {
        $field->title = Piwik::translate('ChatGPT_ApiKey');
        $field->uiControl = FieldConfig::UI_CONTROL_PASSWORD;
        $field->description = Piwik::translate('ChatGPT_ApiKeyDescription');
    }

    /**
     * Configure model preset field
     */
    protected function configureModelPresetField(FieldConfig $field, bool $isMeasurable = false): void
    {
        $field->title = Piwik::translate('ChatGPT_ModelPreset');
        $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
        $field->description = Piwik::translate($isMeasurable ? 'ChatGPT_ModelPresetDescriptionMeasurable' : 'ChatGPT_ModelPresetDescription');
        $field->availableValues = $isMeasurable
            ? ['' => Piwik::translate('ChatGPT_UseSystemDefault')] + Config::getAvailableModels()
            : Config::getAvailableModels();
    }

    /**
     * Configure model custom field
     */
    protected function configureModelCustomField(FieldConfig $field, bool $isMeasurable = false): void
    {
        $field->title = Piwik::translate('ChatGPT_ModelCustom');
        $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
        $field->description = Piwik::translate($isMeasurable ? 'ChatGPT_ModelCustomDescriptionMeasurable' : 'ChatGPT_ModelCustomDescription');
    }

    /**
     * Configure chat base prompt field
     */
    protected function configureChatBasePromptField(FieldConfig $field): void
    {
        $field->title = Piwik::translate('ChatGPT_ChatBasePrompt');
        $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
        $field->description = Piwik::translate('ChatGPT_ChatBasePromptDescription');
    }

    /**
     * Configure insight base prompt field
     */
    protected function configureInsightBasePromptField(FieldConfig $field): void
    {
        $field->title = Piwik::translate('ChatGPT_InsightBasePrompt');
        $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
        $field->description = Piwik::translate('ChatGPT_InsightBasePromptDescription');
    }
}
