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

/**
 * The per user request limit is reached. The message is a translated text for the user, safe to show as is.
 */
class RateLimitExceededException extends Exception
{
}
