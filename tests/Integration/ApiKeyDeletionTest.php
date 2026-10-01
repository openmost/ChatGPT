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
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;
use Piwik\Plugins\ChatGPT\Settings\SystemSettingsForm;
use Piwik\Plugins\ChatGPT\SystemSettings;
use Piwik\Plugins\ChatGPT\tests\Fakes\FakePluginDependencies;
use Piwik\Settings\Storage\Backend\PluginSettingsTable;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * An empty API key keeps the saved key: only the explicit deleteApiKey parameter removes it.
 *
 * @group ChatGPT
 * @group ChatGPTApiKeyDeletionTest
 * @group Plugins
 */
class ApiKeyDeletionTest extends IntegrationTestCase
{
    private const SECRET_KEY = 'sk-test-secret-0123456789';

    /** @var int */
    private $idSite;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        StaticContainer::get('Piwik\Translation\Translator')->addDirectory(__DIR__ . '/../../lang');
        $this->useDependencies(FakePluginDependencies::withoutAiProviders());

        Request::processRequest('ChatGPT.setSystemSettings', ['apiKey' => self::SECRET_KEY]);
    }

    public function test_deleteApiKey_removesTheSavedKey(): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', ['deleteApiKey' => '1']);

        $this->assertSame('', (string) (new SystemSettings())->apiKey->getValue());
        $this->assertArrayNotHasKey('apiKey', (new PluginSettingsTable('ChatGPT', ''))->load());
        $this->assertSame('', (new SystemSettingsForm())->getValues()['apiKey']);
    }

    public function test_deleteApiKey_wins_overAKeySentInTheSameRequest_andKeepsTheOtherFields(): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', ['host' => 'https://llm.example.com/v1/chat/completions']);

        Request::processRequest('ChatGPT.setSystemSettings', ['apiKey' => 'sk-other', 'deleteApiKey' => '1']);

        $settings = new SystemSettings();
        $this->assertSame('', (string) $settings->apiKey->getValue());
        $this->assertSame('https://llm.example.com/v1/chat/completions', $settings->host->getValue());
    }

    /**
     * @dataProvider getKeptValues
     */
    public function test_anEmptyKey_stillKeepsTheSavedKey(array $params): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', $params);

        $this->assertSame(self::SECRET_KEY, (new SystemSettings())->apiKey->getValue());
    }

    public function getKeptValues(): array
    {
        return [
            'empty value' => [['apiKey' => '']],
            'placeholder' => [['apiKey' => SystemSettingsForm::API_KEY_PLACEHOLDER]],
            'delete not requested' => [['apiKey' => '', 'deleteApiKey' => '0']],
        ];
    }

    /**
     * @dataProvider getDeniedAccess
     */
    public function test_deleteApiKey_isDenied_toAdminAndViewUsers(string $access): void
    {
        if ($access === 'admin') {
            FakeAccess::clearAccess(false, [$this->idSite], [], 'admin_user');
        } else {
            FakeAccess::clearAccess(false, [], [$this->idSite], 'view_user');
        }

        try {
            Request::processRequest('ChatGPT.setSystemSettings', ['deleteApiKey' => '1']);
            $this->fail('The deletion must be denied');
        } catch (\Exception $e) {
            $this->assertStringContainsString('checkUserHasSuperUserAccess', $e->getMessage());
        }

        FakeAccess::clearAccess(true);
        $this->assertSame(self::SECRET_KEY, (new SystemSettings())->apiKey->getValue());
    }

    public function getDeniedAccess(): array
    {
        return [
            'admin' => ['admin'],
            'view' => ['view'],
        ];
    }

    public function test_deleteApiKey_works_whenAiProvidersTakesOverTheConnectionFields(): void
    {
        $this->useDependencies(FakePluginDependencies::connected());

        Request::processRequest('ChatGPT.setSystemSettings', ['deleteApiKey' => '1']);

        $this->assertSame('', (string) (new SystemSettings())->apiKey->getValue());
    }

    public function test_theKeyCascade_fallsThrough_afterTheDeletion(): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', ['deleteApiKey' => '1']);

        $withoutAiProviders = FakePluginDependencies::withoutAiProviders();
        $this->assertSame(EffectiveSettings::SOURCE_NONE, EffectiveSettings::forSite($this->idSite, $withoutAiProviders)->getKeySource());
        $this->assertSame(EffectiveSettings::SOURCE_AI_PROVIDERS, EffectiveSettings::forSite($this->idSite, FakePluginDependencies::connected())->getKeySource());

        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'apiKey' => 'sk-site']);
        $siteSettings = EffectiveSettings::forSite($this->idSite, FakePluginDependencies::connected());
        $this->assertSame(EffectiveSettings::SOURCE_SITE, $siteSettings->getKeySource());
        $this->assertSame('sk-site', $siteSettings->getApiKey());
    }

    public function test_deleteApiKey_removesTheWebsiteKey_andAnEmptyValueKeepsIt(): void
    {
        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'apiKey' => 'sk-site', 'modelCustom' => 'site-model']);

        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'apiKey' => '', 'modelCustom' => 'site-model']);
        $this->assertSame('sk-site', SiteSettingsStorage::read($this->idSite)['apiKey']);

        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'apiKey' => SiteSettingsStorage::API_KEY_PLACEHOLDER]);
        $this->assertSame('sk-site', SiteSettingsStorage::read($this->idSite)['apiKey']);

        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'deleteApiKey' => '1']);
        $stored = SiteSettingsStorage::read($this->idSite);
        $this->assertSame('', $stored['apiKey']);
        $this->assertSame('site-model', $stored['modelCustom']);

        // the website then follows AI Providers, then the general key
        $this->assertSame(EffectiveSettings::SOURCE_AI_PROVIDERS, EffectiveSettings::forSite($this->idSite, FakePluginDependencies::connected())->getKeySource());
        $general = EffectiveSettings::forSite($this->idSite, FakePluginDependencies::withoutAiProviders());
        $this->assertSame(EffectiveSettings::SOURCE_SYSTEM, $general->getKeySource());
        $this->assertSame(self::SECRET_KEY, $general->getApiKey());
    }

    public function test_deleteApiKey_ofAWebsite_isAllowedToItsAdmin_andDeniedToViewUsers(): void
    {
        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'apiKey' => 'sk-site']);

        FakeAccess::clearAccess(false, [], [$this->idSite], 'view_user');
        try {
            Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'deleteApiKey' => '1']);
            $this->fail('The deletion must be denied');
        } catch (\Exception $e) {
            $this->assertStringContainsString('checkUserHasAdminAccess', $e->getMessage());
        }
        $this->assertSame('sk-site', SiteSettingsStorage::read($this->idSite)['apiKey']);

        FakeAccess::clearAccess(false, [$this->idSite], [], 'admin_user');
        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite, 'deleteApiKey' => '1']);
        $this->assertSame('', SiteSettingsStorage::read($this->idSite)['apiKey']);
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccess(),
        ];
    }

    private function useDependencies(PluginDependencies $dependencies): void
    {
        StaticContainer::getContainer()->set(PluginDependencies::class, $dependencies);
    }
}
