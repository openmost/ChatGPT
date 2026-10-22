<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\Config;
use Piwik\Plugins\ChatGPT\Settings\IniConfig;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group ChatGPT
 * @group ChatGPTIniConfigTest
 * @group Plugins
 */
class IniConfigTest extends IntegrationTestCase
{
    public function tearDown(): void
    {
        Config::getInstance()->ChatGPT = [];

        parent::tearDown();
    }

    public function test_defaults_withoutTheSection(): void
    {
        $this->assertSame('ChatGPT', IniConfig::getDisplayName());
        $this->assertSame(30, IniConfig::getRateLimitRequests());
        $this->assertSame(3600, IniConfig::getRateLimitWindow());
    }

    public function test_readsTheValues_ofTheSection(): void
    {
        Config::getInstance()->ChatGPT = [
            'display_name' => ' Company AI ',
            'rate_limit_requests' => '120',
            'rate_limit_window' => '600',
        ];

        $this->assertSame('Company AI', IniConfig::getDisplayName());
        $this->assertSame(120, IniConfig::getRateLimitRequests());
        $this->assertSame(600, IniConfig::getRateLimitWindow());
    }

    public function test_zeroRequests_disablesTheLimit(): void
    {
        Config::getInstance()->ChatGPT = ['rate_limit_requests' => '0'];

        $this->assertSame(0, IniConfig::getRateLimitRequests());
    }

    /**
     * @dataProvider getInvalidValues
     */
    public function test_invalidValues_fallBackToTheDefaults(array $section): void
    {
        Config::getInstance()->ChatGPT = $section;

        $this->assertSame('ChatGPT', IniConfig::getDisplayName());
        $this->assertSame(30, IniConfig::getRateLimitRequests());
        $this->assertSame(3600, IniConfig::getRateLimitWindow());
    }

    public function getInvalidValues(): array
    {
        return [
            'empty' => [['display_name' => '  ', 'rate_limit_requests' => '', 'rate_limit_window' => '']],
            'markup and negative numbers' => [['display_name' => '<b>AI</b>', 'rate_limit_requests' => '-5', 'rate_limit_window' => '-1']],
            'too long and not numeric' => [['display_name' => str_repeat('a', 41), 'rate_limit_requests' => 'ten', 'rate_limit_window' => '1h']],
            'zero window' => [['rate_limit_window' => '0']],
            'arrays' => [['display_name' => ['a'], 'rate_limit_requests' => ['1'], 'rate_limit_window' => ['1']]],
        ];
    }
}
