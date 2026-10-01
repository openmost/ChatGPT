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
use Piwik\FrontController;
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\Config;
use Piwik\Plugins\ChatGPT\Controller;
use Piwik\Plugins\ChatGPT\Settings\SingleValue;
use Piwik\Plugins\ChatGPT\Settings\SystemSettingsForm;
use Piwik\Plugins\ChatGPT\SystemSettings;
use Piwik\Plugins\ChatGPT\tests\Fakes\FakePluginDependencies;
use Piwik\Settings\Storage\Backend\PluginSettingsTable;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * General settings edited on the ChatGPT page of the System administration instead of the general settings.
 *
 * @group ChatGPT
 * @group ChatGPTSystemSettingsPageTest
 * @group Plugins
 */
class SystemSettingsPageTest extends IntegrationTestCase
{
    private const SECRET_KEY = 'sk-test-secret-0123456789';

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
        $this->useDependencies(FakePluginDependencies::withoutAiProviders());

        $this->originalGet = $_GET;
    }

    public function tearDown(): void
    {
        $_GET = $this->originalGet;

        parent::tearDown();
    }

    public function test_thePage_isRenderedForTheSuperUser_withTheKeyMasked(): void
    {
        $this->saveViaApi(['apiKey' => self::SECRET_KEY]);

        $html = $this->renderPage();

        $this->assertStringContainsString('vue-entry="ChatGPT.ManageSystemSettings"', $html);
        $this->assertStringContainsString(SystemSettingsForm::API_KEY_PLACEHOLDER, html_entity_decode($html));
        $this->assertStringNotContainsString(self::SECRET_KEY, $html);
    }

    /**
     * @dataProvider getDeniedAccess
     */
    public function test_thePage_isDenied_toAdminAndViewUsers(string $access): void
    {
        $this->setAccess($access);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasSuperUserAccess');
        (new Controller())->settings();
    }

    /**
     * @dataProvider getDeniedAccess
     */
    public function test_theSave_isDenied_toAdminAndViewUsers(string $access): void
    {
        $this->setAccess($access);

        try {
            $this->saveViaApi(['chatBasePrompt' => 'Hijacked']);
            $this->fail('The save must be denied');
        } catch (\Exception $e) {
            $this->assertStringContainsString('checkUserHasSuperUserAccess', $e->getMessage());
            $this->assertNotSame('Hijacked', (new SystemSettings())->chatBasePrompt->getValue());
        }
    }

    public function getDeniedAccess(): array
    {
        return [
            'admin' => ['admin'],
            'view' => ['view'],
        ];
    }

    public function test_theValues_roundTrip_throughTheSamePluginSettings(): void
    {
        $model = array_keys(Config::getAvailableModels())[0];

        $this->saveViaApi([
            'host' => 'https://llm.example.com/v1/chat/completions',
            'apiKey' => self::SECRET_KEY,
            'modelPreset' => $model,
            'modelCustom' => 'my-model',
            'chatBasePrompt' => 'Chat & prompt',
            'insightBasePrompt' => 'Insight prompt',
        ]);

        $settings = new SystemSettings();
        $this->assertSame('https://llm.example.com/v1/chat/completions', $settings->host->getValue());
        $this->assertSame(self::SECRET_KEY, $settings->apiKey->getValue());
        $this->assertSame($model, SingleValue::toString($settings->modelPreset->getValue()));
        $this->assertSame('my-model', $settings->getConfiguredModel());
        $this->assertSame('Chat & prompt', $settings->chatBasePrompt->getValue());

        $stored = (new PluginSettingsTable('ChatGPT', ''))->load();
        $this->assertSame(self::SECRET_KEY, $stored['apiKey']);
        $this->assertSame([$model], $stored['modelPreset']);
        $this->assertSame('Insight prompt', $stored['insightBasePrompt']);

        $values = (new SystemSettingsForm())->getValues();
        $this->assertSame(SystemSettingsForm::API_KEY_PLACEHOLDER, $values['apiKey']);
        $this->assertSame($model, $values['modelPreset']);
        $this->assertSame('Chat & prompt', $values['chatBasePrompt']);
    }

    public function test_theValuesSavedFromTheGeneralSettings_areRead(): void
    {
        (new PluginSettingsTable('ChatGPT', ''))->save([
            'host' => 'https://old.example.com/v1/chat/completions',
            'apiKey' => self::SECRET_KEY,
            'model' => ['my-legacy-model'],
        ]);

        $values = (new SystemSettingsForm())->getValues();

        $this->assertSame('https://old.example.com/v1/chat/completions', $values['host']);
        $this->assertSame(SystemSettingsForm::API_KEY_PLACEHOLDER, $values['apiKey']);
        $this->assertSame('my-legacy-model', $values['modelCustom']);
    }

    public function test_theDefaults_areUnchanged(): void
    {
        $values = (new SystemSettingsForm())->getValues();

        $this->assertSame(Config::DEFAULT_HOST, $values['host']);
        $this->assertSame('', $values['apiKey']);
        $this->assertSame(Config::LATEST_RECOMMENDED_MODEL, $values['modelPreset']);
        $this->assertNotSame('', $values['chatBasePrompt']);
    }

    /**
     * @dataProvider getKeptKeys
     */
    public function test_theSavedKey_isKept_whenTheFieldIsLeftUntouchedOrEmpty(?string $submitted): void
    {
        $this->saveViaApi(['apiKey' => self::SECRET_KEY]);

        $this->saveViaApi(['apiKey' => $submitted, 'chatBasePrompt' => 'Other prompt']);

        $settings = new SystemSettings();
        $this->assertSame(self::SECRET_KEY, $settings->apiKey->getValue());
        $this->assertSame('Other prompt', $settings->chatBasePrompt->getValue());
    }

    public function getKeptKeys(): array
    {
        return [
            'placeholder' => [SystemSettingsForm::API_KEY_PLACEHOLDER],
            'empty' => [''],
            'left out' => [null],
        ];
    }

    public function test_aNewKey_replacesTheSavedKey(): void
    {
        $this->saveViaApi(['apiKey' => self::SECRET_KEY]);
        $this->saveViaApi(['apiKey' => 'sk-new']);

        $this->assertSame('sk-new', (new SystemSettings())->apiKey->getValue());
    }

    public function test_theValidation_isUnchanged(): void
    {
        $this->expectException(\Exception::class);

        $this->saveViaApi(['host' => '']);
    }

    /**
     * @dataProvider getNonHttpsHosts
     */
    public function test_aHostThatIsNotHttps_isRefused_withATranslatedError(string $host): void
    {
        $this->saveViaApi(['host' => 'https://kept.example.com/v1/chat/completions']);

        try {
            $this->saveViaApi(['host' => $host]);
            $this->fail('A host that is not an HTTPS URL must be refused');
        } catch (\Exception $e) {
            $this->assertStringStartsWith('Invalid API host URL - HTTPS required', $e->getMessage());
        }

        $this->assertSame('https://kept.example.com/v1/chat/completions', (new SystemSettings())->host->getValue());
    }

    public function getNonHttpsHosts(): array
    {
        return [
            'http' => ['http://llm.example.com/v1/chat/completions'],
            'no scheme' => ['llm.example.com/v1/chat/completions'],
            'no host' => ['https:///v1/chat/completions'],
        ];
    }

    public function test_theConnectionFields_areDisabled_withTheNotice_whenAiProvidersTakesOver(): void
    {
        $this->saveViaApi(['host' => 'https://kept.example.com/v1/chat/completions']);
        $this->useDependencies(FakePluginDependencies::connected());

        $fields = array_column((new SystemSettingsForm())->getFields(), null, 'name');

        foreach (['host', 'apiKey', 'modelPreset', 'modelCustom'] as $name) {
            $this->assertTrue($fields[$name]['disabled'], $name);
        }
        $this->assertFalse($fields['chatBasePrompt']['disabled']);
        $this->assertFalse($fields['insightBasePrompt']['disabled']);
        $notice = (new SystemSettingsForm())->getAiProvidersNotice();
        $this->assertStringStartsWith('AI Providers takes over', $notice['message']);
        $this->assertStringContainsString('<a href="index.php?module=AIProviders&amp;action=index">', $notice['link']);
        $this->assertStringContainsString('ai-providers-notice=', $this->renderPage());

        $this->saveViaApi(['host' => 'https://ignored.example.com', 'chatBasePrompt' => 'Saved prompt']);

        $settings = new SystemSettings();
        $this->assertSame('https://kept.example.com/v1/chat/completions', $settings->host->getValue());
        $this->assertSame('Saved prompt', $settings->chatBasePrompt->getValue());
    }

    public function test_theFields_areEditable_withoutAiProviders(): void
    {
        foreach ((new SystemSettingsForm())->getFields() as $field) {
            $this->assertFalse($field['disabled'], $field['name']);
        }
        $this->assertNull((new SystemSettingsForm())->getAiProvidersNotice());
    }

    public function test_theFields_areAbsentFromTheGeneralSettings(): void
    {
        $this->assertSame([], (new SystemSettings())->getSettingsWritableByCurrentUser());

        $general = Request::processRequest('CorePluginsAdmin.getSystemSettings', ['format' => 'original']);

        $this->assertNotContains('ChatGPT', array_column($general, 'pluginName'));
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccess(),
        ];
    }

    private function renderPage(): string
    {
        $_GET = ['module' => 'ChatGPT', 'action' => 'settings'];

        return (string) FrontController::getInstance()->fetchDispatch('ChatGPT', SystemSettingsForm::ACTION);
    }

    /**
     * @param array<string, string|null> $values
     */
    private function saveViaApi(array $values): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', array_filter($values, static function ($value) {
            return $value !== null;
        }));
    }

    private function setAccess(string $access): void
    {
        if ($access === 'admin') {
            FakeAccess::clearAccess(false, [$this->idSite], [], 'admin_user');
        } else {
            FakeAccess::clearAccess(false, [], [$this->idSite], 'view_user');
        }
    }

    private function useDependencies(PluginDependencies $dependencies): void
    {
        StaticContainer::getContainer()->set(PluginDependencies::class, $dependencies);
    }
}
