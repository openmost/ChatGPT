<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Piwik\Piwik;
use Throwable;

/**
 * The error message shown to the user: never a backtrace or a server path, which Matomo appends to API errors in
 * development mode. The full error belongs in the Matomo logs.
 */
class SafeErrorMessage
{
    private const MAX_LENGTH = 300;

    /**
     * @param string|null $fallback shown when the message is not safe, a translated generic message by default
     */
    public static function fromThrowable(Throwable $e, ?string $fallback = null): string
    {
        $message = self::clean($e->getMessage());
        if ($message !== '') {
            return $message;
        }

        return $fallback ?? Piwik::translate('ChatGPT_RequestFailed');
    }

    /**
     * The first line of the message, or an empty string when it holds a backtrace frame or a file path
     */
    public static function clean(string $message): string
    {
        // UTF-8 mode: in byte mode \R also matches the 0x85 byte inside a character such as the Arabic letter meem, the
        // message was cut in the middle of that character and json_encode then refused the invalid UTF-8
        $parts = preg_split('/\R|\s#\d+\s/u', mb_scrub($message, 'UTF-8'));
        $message = trim(strip_tags(is_array($parts) ? (string) $parts[0] : ''));
        // a trailing " in" is left when the file and line follow on the next line
        $message = (string) preg_replace('/\s+in$/', '', $message);

        $hasPath = preg_match('~[A-Za-z]:[\\\\/]|\\\\[\w.-]+\\\\[\w.-]+\.php|/[\w.-]+/[\w./-]*\.php|\.php\b|\.php:\d+~u', $message);
        if ($message === '' || $hasPath || mb_strlen($message) > self::MAX_LENGTH) {
            return '';
        }

        return $message;
    }
}
