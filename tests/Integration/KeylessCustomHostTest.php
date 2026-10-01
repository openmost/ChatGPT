<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\ChatGPT;
use Piwik\Plugins\ChatGPT\Config;
use Piwik\Plugins\ChatGPT\Services\ApiConnection;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;
use Piwik\Plugins\ChatGPT\tests\Fakes\FakePluginDependencies;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The API key is optional on a custom host (self-hosted or compatible endpoint), the default host needs one.
 *
 * @group ChatGPT
 * @group ChatGPTKeylessCustomHostTest
 * @group Plugins
 */
class KeylessCustomHostTest extends IntegrationTestCase
{
    private const CUSTOM_HOST = 'https://llm.example.com/v1/chat/completions';
    // nothing listens on the discard port: the request fails at connection time, after the configuration checks
    private const UNREACHABLE_CUSTOM_HOST = 'https://127.0.0.1:9/v1/chat/completions';

    /** @var int */
    private $idSite;

    /** @var array<string, mixed> */
    private $originalGet;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        // the test environment only loads the translations of the core plugins
        StaticContainer::get('Piwik\Translation\Translator')->addDirectory(__DIR__ . '/../../lang');
        StaticContainer::getContainer()->set(PluginDependencies::class, FakePluginDependencies::withoutAiProviders());

        $this->originalGet = $_GET;
        $_GET['idSite'] = (string) $this->idSite;
    }

    public function tearDown(): void
    {
        $_GET = $this->originalGet;

        parent::tearDown();
    }

    public function test_aKeylessCustomHost_isConfigured_andSendsNoAuthorizationHeader(): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', ['host' => self::CUSTOM_HOST]);

        $settings = EffectiveSettings::forSite($this->idSite);
        $connection = ApiConnection::fromSettings($settings);

        $this->assertTrue($settings->isConfigured());
        $this->assertSame(EffectiveSettings::SOURCE_SYSTEM, $settings->getKeySource());
        $this->assertSame(self::CUSTOM_HOST, $connection['host']);
        $this->assertSame('', $connection['apiKey']);
        $this->assertStringNotContainsString('Authorization', implode("\n", ApiConnection::headers($connection['apiKey'])));
        $this->assertSame(['plugins/ChatGPT/assets/js/app.js'], $this->getJavaScriptFiles());
    }

    public function test_aKeylessCustomHost_isCalled_insteadOfAConfigurationError(): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', ['host' => self::UNREACHABLE_CUSTOM_HOST]);

        try {
            $this->getResponse();
            $this->fail('The unreachable host must fail the request');
        } catch (\Exception $e) {
            $this->assertStringStartsWith('Connection error', $e->getMessage());
        }
    }

    public function test_aKeylessDefaultHost_failsWithTheTranslatedError(): void
    {
        $this->assertFalse(EffectiveSettings::forSite($this->idSite)->isConfigured());
        $this->assertSame([], $this->getJavaScriptFiles());

        try {
            $this->getResponse();
            $this->fail('The default host must require an API key');
        } catch (\Exception $e) {
            $this->assertStringStartsWith('ChatGPT API key is not configured', $e->getMessage());
            $this->assertStringStartsWith(Piwik::translate('ChatGPT_ApiKeyNotConfigured'), $e->getMessage());
        }
    }

    public function test_aKeylessCustomSiteHost_isConfigured_withoutTheGeneralKey(): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', ['apiKey' => 'general-key']);
        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'host' => self::CUSTOM_HOST]);

        $connection = ApiConnection::fromSettings(EffectiveSettings::forSite($this->idSite));

        $this->assertSame(self::CUSTOM_HOST, $connection['host']);
        $this->assertSame('', $connection['apiKey']);
        $this->assertTrue(SiteSettingsStorage::hasAnySiteConnection());
    }

    public function test_hasAnySiteConnection_countsTheKeysAndTheCustomHostsOfTheWebsites(): void
    {
        $this->assertFalse(SiteSettingsStorage::hasAnySiteConnection());

        SiteSettingsStorage::save($this->idSite, ['host' => Config::DEFAULT_HOST]);
        $this->assertFalse(SiteSettingsStorage::hasAnySiteConnection());

        SiteSettingsStorage::save($this->idSite, ['host' => self::CUSTOM_HOST]);
        $this->assertTrue(SiteSettingsStorage::hasAnySiteConnection());
        $this->assertSame(['plugins/ChatGPT/assets/js/app.js'], $this->getJavaScriptFiles());

        SiteSettingsStorage::save($this->idSite, ['host' => '', 'apiKey' => 'site-key']);
        $this->assertTrue(SiteSettingsStorage::hasAnySiteConnection());
    }

    public function test_withAKey_theDefaultHost_isUnchanged(): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', ['apiKey' => 'general-key']);

        $settings = EffectiveSettings::forSite($this->idSite);
        $connection = ApiConnection::fromSettings($settings);

        $this->assertTrue($settings->isConfigured());
        $this->assertSame('general-key', $connection['apiKey']);
        $this->assertContains('Authorization: Bearer general-key', ApiConnection::headers($connection['apiKey']));
        $this->assertSame(['plugins/ChatGPT/assets/js/app.js'], $this->getJavaScriptFiles());
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccess(),
        ];
    }

    private function getResponse(): void
    {
        Request::processRequest('ChatGPT.getResponse', [
            'idSite' => $this->idSite,
            'period' => 'day',
            'date' => 'yesterday',
            'messages' => json_encode([['role' => 'user', 'content' => 'Hello']]),
        ]);
    }

    /**
     * @return list<string>
     */
    private function getJavaScriptFiles(): array
    {
        $files = [];
        (new ChatGPT())->getJavaScriptFiles($files);

        return $files;
    }
}
