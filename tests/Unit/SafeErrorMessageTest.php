<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Unit;

use Exception;
use PHPUnit\Framework\TestCase;
use Piwik\Plugins\ChatGPT\Services\SafeErrorMessage;

/**
 * @group ChatGPT
 * @group SafeErrorMessageTest
 * @group Plugins
 */
class SafeErrorMessageTest extends TestCase
{
    private const FALLBACK = 'The request could not be completed.';

    /**
     * @dataProvider getMessages
     */
    public function test_fromThrowable_neverShowsABacktraceOrAServerPath(string $message, string $expected): void
    {
        $shown = SafeErrorMessage::fromThrowable(new Exception($message), self::FALLBACK);

        $this->assertSame($expected, $shown);
        $this->assertStringNotContainsString('#0 ', $shown);
        $this->assertSame(0, preg_match('~[A-Za-z]:\\\\|/[\w.-]+/[\w./-]*\.php|\.php~', $shown));
    }

    public function getMessages(): array
    {
        $trace = " #0 C:\\wamp64\\www\\openmost-platform\\matomo5\\core\\API\\Proxy.php(94): Piwik\\API\\Proxy-&gt;includeApiFile('\\\\Piwik\\\\Plugins\\\\...')\n#1 {main}";
        return [
            'matomo api error in development mode' => [
                "The method 'getEventNamesEvolutionGraph' does not exist or is not available in the module '\\Piwik\\Plugins\\EventsEnhancedPremium\\API'" . $trace,
                "The method 'getEventNamesEvolutionGraph' does not exist or is not available in the module '\\Piwik\\Plugins\\EventsEnhancedPremium\\API'",
            ],
            'file and line on the next line' => ["Something failed in \n /var/www/matomo/core/API/Request.php:12 \n #0 {main}", 'Something failed'],
            'unix path in the message' => ['Cannot open /var/www/matomo/tmp/cache/file.php', self::FALLBACK],
            'windows path in the message' => ['Cannot open C:\\wamp64\\www\\matomo\\config.ini.php', self::FALLBACK],
            'html' => ['<b>You must be logged in</b> to access this', 'You must be logged in to access this'],
            'plain translated message' => ['You can not access this resource as it requires view access.', 'You can not access this resource as it requires view access.'],
            'empty' => ['', self::FALLBACK],
            'too long' => [str_repeat('a', 400), self::FALLBACK],
        ];
    }
}
