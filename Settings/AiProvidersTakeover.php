<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Settings;

use Piwik\Settings\FieldConfig;

/**
 * When AI Providers answers the requests, the host, key and model of the general settings are not used: they stay
 * visible, read-only, so they are ready if AI Providers is deactivated.
 */
final class AiProvidersTakeover
{
    /**
     * The first field carries the notice.
     */
    public const FIELDS = ['host', 'apiKey', 'modelPreset', 'modelCustom'];

    /**
     * @param string $introduction notice displayed above the fields
     * @param string $inlineHelp HTML help of the first field, with the link to the AI Providers settings
     */
    public static function apply(
        FieldConfig $field,
        string $settingName,
        bool $isTakenOver,
        string $introduction = '',
        string $inlineHelp = ''
    ): void {
        if (!$isTakenOver || !in_array($settingName, self::FIELDS, true)) {
            return;
        }

        $field->uiControlAttributes['disabled'] = 'disabled';

        if ($settingName === self::FIELDS[0]) {
            $field->introduction = $introduction;
            if ($inlineHelp !== '') {
                $field->inlineHelp = $inlineHelp;
            }
        }
    }
}
