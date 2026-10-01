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
    protected function configureModelPresetField(FieldConfig $field, string $currentValue = ''): void
    {
        $field->title = Piwik::translate('ChatGPT_ModelPreset');
        $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
        $field->description = Piwik::translate('ChatGPT_ModelPresetDescription');
        $field->availableValues = self::getModelPresetOptions($currentValue);
    }

    /**
     * Latest recommended option first, then the preset models. A saved model that is no longer listed stays
     * selectable, flagged as deprecated, so the other settings can still be saved.
     *
     * @return array<string, string> model => label
     */
    public static function getModelPresetOptions(string $currentValue = ''): array
    {
        $options = [
            Config::LATEST_RECOMMENDED_MODEL => Piwik::translate('ChatGPT_ModelLatestRecommended', [Config::getModelLabel(Config::RECOMMENDED_MODEL)]),
        ] + Config::getAvailableModels();

        if ($currentValue !== '' && !isset($options[$currentValue])) {
            $options[$currentValue] = Piwik::translate('ChatGPT_ModelDeprecatedOption', [$currentValue]);
        }

        return $options;
    }

    /**
     * Configure model custom field
     */
    protected function configureModelCustomField(FieldConfig $field): void
    {
        $field->title = Piwik::translate('ChatGPT_ModelCustom');
        $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
        $field->description = Piwik::translate('ChatGPT_ModelCustomDescription');
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
