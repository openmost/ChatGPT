<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Settings;

/**
 * The model settings are declared as TYPE_ARRAY single selects and saved as ["gpt-5.5"].
 */
final class SingleValue
{
    /**
     * Unwraps a ["value"] array, other values are returned as is.
     *
     * @param mixed $value
     * @return mixed
     */
    public static function unwrap($value)
    {
        if (is_array($value)) {
            $value = reset($value);
        }

        return $value === false ? null : $value;
    }

    /**
     * @param mixed $value
     */
    public static function toString($value): string
    {
        $value = self::unwrap($value);

        return is_scalar($value) ? trim((string) $value) : '';
    }
}
