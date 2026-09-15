<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Exception;
use Piwik\Option;
use Piwik\Piwik;

/**
 * Per user and per site request limit shared by the chat API and the agent controller
 */
class RateLimiter
{
    private const MAX_REQUESTS = 30;
    private const WINDOW_SECONDS = 3600;

    /**
     * @throws Exception if the rate limit is exceeded
     */
    public function check(int $idSite): void
    {
        $userLogin = Piwik::getCurrentUserLogin();
        $rateLimitKey = 'ChatGPT_ratelimit_' . $idSite . '_' . $userLogin;

        $currentTime = time();
        $rateData = Option::get($rateLimitKey);

        if ($rateData) {
            $rateData = json_decode($rateData, true);
            $windowStart = $rateData['window_start'] ?? 0;

            // Reset window if expired
            if ($currentTime - $windowStart > self::WINDOW_SECONDS) {
                $rateData = ['window_start' => $currentTime, 'count' => 0];
            }

            if (($rateData['count'] ?? 0) >= self::MAX_REQUESTS) {
                $resetTime = $windowStart + self::WINDOW_SECONDS - $currentTime;
                throw new Exception("Rate limit exceeded. Please wait {$resetTime} seconds before making another request.");
            }
        } else {
            $rateData = ['window_start' => $currentTime, 'count' => 0];
        }

        $rateData['count'] = ($rateData['count'] ?? 0) + 1;
        Option::set($rateLimitKey, json_encode($rateData));
    }
}
