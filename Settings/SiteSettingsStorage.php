<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Settings;

use Piwik\Plugins\ChatGPT\Config;
use Piwik\Common;
use Piwik\Db;
use Piwik\Settings\Storage\Backend\MeasurableSettingsTable;
use Piwik\Settings\Storage\Storage;

/**
 * Settings of a website, edited on the ChatGPT page of the Websites administration.
 *
 * Stored in the site settings table under the names used by the MeasurableSettings of previous plugin versions,
 * so the values saved from the website edit form are kept. The single "model" setting of older versions is read
 * as long as the model settings were never saved since.
 */
final class SiteSettingsStorage
{
    public const PLUGIN_NAME = 'ChatGPT';

    public const API_KEY_PLACEHOLDER = '******';

    public const SETTING_NAMES = [
        'host',
        'apiKey',
        'modelPreset',
        'modelCustom',
        'chatBasePrompt',
        'insightBasePrompt',
    ];

    public const LEGACY_MODEL_SETTING = 'model';

    /**
     * @return array<string, string> setting name => value, an empty string when the general setting applies
     */
    public static function read(int $idSite): array
    {
        $storedValues = [];
        if ($idSite > 0) {
            try {
                $storedValues = (new MeasurableSettingsTable($idSite, self::PLUGIN_NAME))->load();
            } catch (\Throwable $e) {
                $storedValues = [];
            }
        }

        return self::fromStoredValues($storedValues);
    }

    /**
     * Whether a website has its own API key, the plugin then works for this website without general key.
     */
    public static function hasAnySiteApiKey(): bool
    {
        try {
            $sql = sprintf(
                "SELECT 1 FROM `%s` WHERE plugin_name = ? AND setting_name = 'apiKey' AND setting_value NOT IN ('', '\"\"') LIMIT 1",
                Common::prefixTable('site_setting')
            );

            return (bool) Db::fetchOne($sql, [self::PLUGIN_NAME]);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Whether a website can be answered with its own connection: its own API key, or its own custom host, where the
     * key is optional.
     */
    public static function hasAnySiteConnection(): bool
    {
        if (self::hasAnySiteApiKey()) {
            return true;
        }

        try {
            $sql = sprintf(
                "SELECT setting_value FROM `%s` WHERE plugin_name = ? AND setting_name = 'host' AND setting_value NOT IN ('', '\"\"')",
                Common::prefixTable('site_setting')
            );

            foreach (Db::fetchAll($sql, [self::PLUGIN_NAME]) as $row) {
                $host = trim((string) $row['setting_value']);
                if ($host !== '' && !Config::isDefaultHost($host)) {
                    return true;
                }
            }
        } catch (\Throwable $e) {
            return false;
        }

        return false;
    }

    /**
     * @param array<string, mixed> $storedValues setting name => stored value
     * @return array<string, string>
     */
    public static function fromStoredValues(array $storedValues): array
    {
        $values = [];
        foreach (self::SETTING_NAMES as $name) {
            $values[$name] = SingleValue::toString($storedValues[$name] ?? null);
        }

        if (!array_key_exists('modelPreset', $storedValues) && $values['modelCustom'] === '') {
            $legacyModel = SingleValue::toString($storedValues[self::LEGACY_MODEL_SETTING] ?? null);
            if (Config::isAvailableModel($legacyModel)) {
                $values['modelPreset'] = $legacyModel;
            } else {
                $values['modelCustom'] = $legacyModel;
            }
        }

        return $values;
    }

    /**
     * @param array<string, string> $values setting name => value, validated by the caller. The API key placeholder
     *                                      keeps the saved key.
     */
    public static function save(int $idSite, array $values): void
    {
        $storage = new Storage(new MeasurableSettingsTable($idSite, self::PLUGIN_NAME));

        foreach (self::SETTING_NAMES as $name) {
            if (!array_key_exists($name, $values)) {
                continue;
            }
            if ($name === 'apiKey' && $values[$name] === self::API_KEY_PLACEHOLDER) {
                continue;
            }
            $storage->setValue($name, $values[$name]);
        }

        $storage->save();
    }
}
