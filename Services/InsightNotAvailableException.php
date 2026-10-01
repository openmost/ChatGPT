<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

/**
 * The widget an insight is requested for has no report data the plugin can fetch
 */
class InsightNotAvailableException extends \Exception
{
}
