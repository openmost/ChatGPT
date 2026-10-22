<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Settings;

use Exception;
use Piwik\Config;

/**
 * The optional [ChatGPT] section of config/config.ini.php: install-wide values only a server administrator changes,
 * kept out of the settings pages. An invalid value falls back to its default.
 */
class IniConfig
{
    public const SECTION = 'ChatGPT';

    public const DEFAULT_DISPLAY_NAME = 'ChatGPT';
    public const DEFAULT_RATE_LIMIT_REQUESTS = 30;
    public const DEFAULT_RATE_LIMIT_WINDOW = 3600;

    private const MAX_DISPLAY_NAME_LENGTH = 40;

    /**
     * The name shown in the top menu, the chat page and the insights panel, eg for a self-hosted model
     */
    public static function getDisplayName(): string
    {
        $value = self::get('display_name');
        if (!is_string($value)) {
            return self::DEFAULT_DISPLAY_NAME;
        }

        $value = trim($value);
        if ($value === '' || mb_strlen($value) > self::MAX_DISPLAY_NAME_LENGTH || preg_match('/[\x00-\x1F\x7F<>]/', $value)) {
            return self::DEFAULT_DISPLAY_NAME;
        }

        return $value;
    }

    /**
     * Requests a user can send for a site within the window, 0 disables the limit
     */
    public static function getRateLimitRequests(): int
    {
        return self::getInteger('rate_limit_requests', self::DEFAULT_RATE_LIMIT_REQUESTS, 0);
    }

    /**
     * Length of the rate limit window, in seconds
     */
    public static function getRateLimitWindow(): int
    {
        return self::getInteger('rate_limit_window', self::DEFAULT_RATE_LIMIT_WINDOW, 1);
    }

    private static function getInteger(string $key, int $default, int $min): int
    {
        $value = self::get($key);
        if (is_int($value)) {
            return $value >= $min ? $value : $default;
        }
        if (is_string($value) && preg_match('/^\d{1,9}$/', trim($value))) {
            $value = (int) trim($value);
            return $value >= $min ? $value : $default;
        }

        return $default;
    }

    /**
     * @return mixed
     */
    private static function get(string $key)
    {
        try {
            $section = Config::getInstance()->{self::SECTION};
        } catch (Exception $e) {
            return null;
        }

        return is_array($section) ? ($section[$key] ?? null) : null;
    }
}
