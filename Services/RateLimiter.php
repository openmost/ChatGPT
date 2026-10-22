<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Piwik\Option;
use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\Settings\IniConfig;

/**
 * Per user and per site request limit shared by the chat API and the agent controller, tuned in the [ChatGPT]
 * section of config.ini.php
 */
class RateLimiter
{
    /**
     * @throws RateLimitExceededException if the rate limit is exceeded
     */
    public function check(int $idSite): void
    {
        $maxRequests = IniConfig::getRateLimitRequests();
        if ($maxRequests === 0) {
            return;
        }
        $windowSeconds = IniConfig::getRateLimitWindow();

        $userLogin = Piwik::getCurrentUserLogin();
        $rateLimitKey = 'ChatGPT_ratelimit_' . $idSite . '_' . $userLogin;

        $currentTime = time();
        $rateData = Option::get($rateLimitKey);

        if ($rateData) {
            $rateData = json_decode($rateData, true);
            $windowStart = $rateData['window_start'] ?? 0;

            // Reset window if expired
            if ($currentTime - $windowStart > $windowSeconds) {
                $rateData = ['window_start' => $currentTime, 'count' => 0];
            }

            if (($rateData['count'] ?? 0) >= $maxRequests) {
                $resetTime = $windowStart + $windowSeconds - $currentTime;
                throw new RateLimitExceededException(Piwik::translate('ChatGPT_RateLimitExceeded', [$resetTime]));
            }
        } else {
            $rateData = ['window_start' => $currentTime, 'count' => 0];
        }

        $rateData['count'] = ($rateData['count'] ?? 0) + 1;
        Option::set($rateLimitKey, json_encode($rateData));
    }
}
