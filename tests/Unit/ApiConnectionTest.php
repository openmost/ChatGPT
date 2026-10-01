<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Unit;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\ChatGPT\Config;
use Piwik\Plugins\ChatGPT\Services\ApiConnection;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;

/**
 * The API key is optional on a custom host, the default host always needs one.
 *
 * @group ChatGPT
 * @group ChatGPTApiConnectionTest
 * @group Plugins
 */
class ApiConnectionTest extends TestCase
{
    private const CUSTOM_HOST = 'https://llm.example.com/v1/chat/completions';

    public function test_aKeylessCustomHost_isUsable_withoutAuthorizationHeader(): void
    {
        $settings = $this->settings([], ['host' => self::CUSTOM_HOST]);

        $connection = ApiConnection::fromSettings($settings);

        $this->assertTrue($settings->isConfigured());
        $this->assertSame(self::CUSTOM_HOST, $connection['host']);
        $this->assertSame('', $connection['apiKey']);
        $this->assertSame(['Content-Type: application/json', 'Accept: application/json'], ApiConnection::headers($connection['apiKey']));
        $this->assertStringNotContainsString('Authorization', implode("\n", ApiConnection::headers('', 'text/event-stream')));
    }

    public function test_aKeylessCustomSiteHost_isUsable(): void
    {
        $settings = $this->settings(['host' => self::CUSTOM_HOST], ['apiKey' => 'general-key']);

        $connection = ApiConnection::fromSettings($settings);

        $this->assertSame(self::CUSTOM_HOST, $connection['host']);
        $this->assertSame('', $connection['apiKey']);
    }

    public function test_aKeylessDefaultHost_isNotConfigured(): void
    {
        $settings = $this->settings([], []);

        $this->assertFalse($settings->isCustomHost());
        $this->assertFalse($settings->isConfigured());
    }

    public function test_withAKey_theDefaultHost_sendsTheKey(): void
    {
        $connection = ApiConnection::fromSettings($this->settings([], ['apiKey' => 'general-key']));

        $this->assertSame(Config::DEFAULT_HOST, $connection['host']);
        $this->assertSame('general-key', $connection['apiKey']);
        $this->assertSame([
            'Content-Type: application/json',
            'Accept: text/event-stream',
            'Authorization: Bearer general-key',
        ], ApiConnection::headers($connection['apiKey'], 'text/event-stream'));
    }

    public function test_withAKey_aCustomHost_sendsTheKey(): void
    {
        $connection = ApiConnection::fromSettings($this->settings(['host' => self::CUSTOM_HOST, 'apiKey' => 'site-key'], []));

        $this->assertSame('site-key', $connection['apiKey']);
        $this->assertContains('Authorization: Bearer site-key', ApiConnection::headers($connection['apiKey']));
    }

    /**
     * @dataProvider getDefaultHostSpellings
     */
    public function test_theDefaultHost_isRecognised_whateverItsSpelling(string $host): void
    {
        $this->assertTrue(Config::isDefaultHost($host));
        $this->assertFalse($this->settings([], ['host' => $host])->isConfigured());
    }

    public function getDefaultHostSpellings(): array
    {
        return [
            'as is' => [Config::DEFAULT_HOST],
            'trailing slash' => [Config::DEFAULT_HOST . '/'],
            'upper case' => [strtoupper(Config::DEFAULT_HOST)],
            'surrounding spaces' => [' ' . Config::DEFAULT_HOST . ' '],
        ];
    }

    public function test_anyOtherHost_isACustomHost(): void
    {
        $this->assertFalse(Config::isDefaultHost(self::CUSTOM_HOST));
        $this->assertFalse(Config::isDefaultHost(Config::DEFAULT_HOST . '?proxy=1'));
    }

    private function settings(array $site, array $system): EffectiveSettings
    {
        return EffectiveSettings::fromValues(1, $site, $system + [
            'host' => Config::DEFAULT_HOST,
            'apiKey' => '',
            'model' => Config::LATEST_RECOMMENDED_MODEL,
            'chatBasePrompt' => 'Chat',
            'insightBasePrompt' => 'Insight',
        ], false);
    }
}
