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
use Piwik\Plugins\ChatGPT\Settings\LegacyPrompts;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;
use Piwik\Plugins\ChatGPT\Settings\SystemSettingsForm;
use Piwik\Plugins\ChatGPT\SystemSettings;
use Piwik\Plugins\ChatGPT\tests\Fakes\FakePluginDependencies;
use Piwik\Settings\Storage\Backend\Cache as SettingsCache;
use Piwik\Settings\Storage\Backend\MeasurableSettingsTable;
use Piwik\Settings\Storage\Backend\PluginSettingsTable;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Translation\Translator;

/**
 * Prompts of the general and website settings: previous defaults upgraded, defaults not stored, partial saves.
 *
 * @group ChatGPT
 * @group ChatGPTPromptSettingsTest
 * @group Plugins
 */
class PromptSettingsTest extends IntegrationTestCase
{
    /** @var int */
    private $idSite;

    /** @var array<string, array<string, string>> */
    private $defaults = [];

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        // the test environment only loads the translations of the core plugins
        $this->getTranslator()->addDirectory(__DIR__ . '/../../lang');
        StaticContainer::getContainer()->set(PluginDependencies::class, FakePluginDependencies::withoutAiProviders());

        foreach (['en', 'fr'] as $language) {
            $translations = json_decode((string) file_get_contents(__DIR__ . '/../../lang/' . $language . '.json'), true)['ChatGPT'];
            $this->defaults[$language] = [
                'chatBasePrompt' => $translations['ChatBasePromptDefault'],
                'insightBasePrompt' => $translations['InsightBasePromptDefault'],
            ];
        }
    }

    public function tearDown(): void
    {
        $this->getTranslator()->setCurrentLanguage('en');

        parent::tearDown();
    }

    public function test_theDefaultsOfAPreviousVersion_storedByTheSettingsForm_areUpgraded(): void
    {
        $this->storeSystemPrompts(
            LegacyPrompts::DEFAULTS[LegacyPrompts::CHAT]['en'][0],
            LegacyPrompts::DEFAULTS[LegacyPrompts::INSIGHT]['de'][0]
        );

        $settings = EffectiveSettings::forSite($this->idSite);
        $this->assertSame($this->defaults['en']['chatBasePrompt'], $settings->getChatBasePrompt());
        $this->assertSame($this->defaults['en']['insightBasePrompt'], $settings->getInsightBasePrompt());

        // the settings page shows the new default, so saving it does not keep the previous one
        $values = (new SystemSettingsForm())->getValues();
        $this->assertSame($this->defaults['en']['chatBasePrompt'], $values['chatBasePrompt']);
        $this->assertSame($this->defaults['en']['insightBasePrompt'], $values['insightBasePrompt']);

        // nothing is written to the database
        $stored = (new PluginSettingsTable('ChatGPT', ''))->load();
        $this->assertSame(LegacyPrompts::DEFAULTS[LegacyPrompts::CHAT]['en'][0], $stored['chatBasePrompt']);
    }

    public function test_theUpgradedDefault_isInTheLanguageOfTheUser(): void
    {
        $this->storeSystemPrompts(LegacyPrompts::DEFAULTS[LegacyPrompts::CHAT]['en'][0], LegacyPrompts::DEFAULTS[LegacyPrompts::INSIGHT]['en'][0]);
        $this->getTranslator()->setCurrentLanguage('fr');

        $settings = EffectiveSettings::forSite($this->idSite);

        $this->assertSame($this->defaults['fr']['chatBasePrompt'], $settings->getChatBasePrompt());
        $this->assertSame($this->defaults['fr']['insightBasePrompt'], $settings->getInsightBasePrompt());
        $this->assertSame($this->defaults['fr'], SystemSettingsForm::getDefaultPrompts());
    }

    public function test_aCustomPrompt_isNeverTouched(): void
    {
        $this->storeSystemPrompts('My chat prompt', 'My insight prompt:');

        $settings = EffectiveSettings::forSite($this->idSite);
        $this->assertSame('My chat prompt', $settings->getChatBasePrompt());
        $this->assertSame('My insight prompt:', $settings->getInsightBasePrompt());
        $this->assertSame('My chat prompt', (new SystemSettingsForm())->getValues()['chatBasePrompt']);
    }

    public function test_anEmptyStoredPrompt_fallsBackToTheDefault(): void
    {
        $this->storeSystemPrompts('', "  \n ");

        $settings = EffectiveSettings::forSite($this->idSite);

        $this->assertSame($this->defaults['en']['chatBasePrompt'], $settings->getChatBasePrompt());
        $this->assertSame($this->defaults['en']['insightBasePrompt'], $settings->getInsightBasePrompt());
    }

    /**
     * @dataProvider getDefaultValues
     */
    public function test_aDefaultPrompt_isStoredAsNotCustomised(string $language, string $kind): void
    {
        $this->storeSystemPrompts('My chat prompt', 'My insight prompt');
        $prompt = $kind === 'legacy'
            ? LegacyPrompts::DEFAULTS[LegacyPrompts::CHAT][$language][0]
            : $this->defaults[$language]['chatBasePrompt'];

        $this->saveSystemSettings(['chatBasePrompt' => $prompt]);

        $stored = (new PluginSettingsTable('ChatGPT', ''))->load();
        $this->assertArrayNotHasKey('chatBasePrompt', $stored);
        $this->assertSame('My insight prompt', $stored['insightBasePrompt']);
        $this->assertSame($this->defaults['en']['chatBasePrompt'], (new SystemSettings())->getChatBasePrompt());
    }

    public function getDefaultValues(): array
    {
        return [
            'current default' => ['en', 'current'],
            'current default of another language' => ['fr', 'current'],
            'previous default' => ['en', 'legacy'],
        ];
    }

    public function test_anEmptyPrompt_isSavedAsTheDefault(): void
    {
        $this->storeSystemPrompts('My chat prompt', 'My insight prompt');

        $this->saveSystemSettings(['insightBasePrompt' => '']);

        $this->assertArrayNotHasKey('insightBasePrompt', (new PluginSettingsTable('ChatGPT', ''))->load());
        $this->assertSame($this->defaults['en']['insightBasePrompt'], (new SystemSettings())->getInsightBasePrompt());
    }

    public function test_savingTheConnectionCard_keepsTheStoredPrompts(): void
    {
        $this->saveSystemSettings(['chatBasePrompt' => 'My chat prompt', 'insightBasePrompt' => 'My insight prompt']);

        $this->saveSystemSettings(['host' => 'https://llm.example.com/v1/chat/completions', 'apiKey' => 'sk-test', 'modelCustom' => 'my-model']);

        $stored = (new PluginSettingsTable('ChatGPT', ''))->load();
        $this->assertSame('My chat prompt', $stored['chatBasePrompt']);
        $this->assertSame('My insight prompt', $stored['insightBasePrompt']);
        $this->assertSame('https://llm.example.com/v1/chat/completions', $stored['host']);
    }

    public function test_savingThePromptsCard_keepsTheStoredConnection(): void
    {
        $this->saveSystemSettings(['host' => 'https://llm.example.com/v1/chat/completions', 'apiKey' => 'sk-test', 'modelCustom' => 'my-model']);

        $this->saveSystemSettings(['chatBasePrompt' => 'My chat prompt', 'insightBasePrompt' => '']);

        $settings = new SystemSettings();
        $this->assertSame('https://llm.example.com/v1/chat/completions', $settings->host->getValue());
        $this->assertSame('sk-test', $settings->apiKey->getValue());
        $this->assertSame('my-model', $settings->getConfiguredModel());
        $this->assertSame('My chat prompt', $settings->getChatBasePrompt());
    }

    public function test_aWebsitePrompt_equalToTheGeneralPrompt_isStoredEmpty(): void
    {
        $this->saveSiteSettings(['chatBasePrompt' => $this->defaults['en']['chatBasePrompt'], 'insightBasePrompt' => 'Site insight prompt']);

        $stored = SiteSettingsStorage::read($this->idSite);
        $this->assertSame('', $stored['chatBasePrompt']);
        $this->assertSame('Site insight prompt', $stored['insightBasePrompt']);

        $this->saveSystemSettings(['chatBasePrompt' => 'General chat prompt']);
        $this->saveSiteSettings(['chatBasePrompt' => ' General chat prompt ']);
        $this->assertSame('', SiteSettingsStorage::read($this->idSite)['chatBasePrompt']);
    }

    public function test_theWebsiteReset_fallsBackToTheGeneralPrompt(): void
    {
        $this->saveSystemSettings(['chatBasePrompt' => 'General chat prompt']);
        $this->saveSiteSettings(['chatBasePrompt' => 'Site chat prompt', 'insightBasePrompt' => 'Site insight prompt']);
        $this->assertSame('Site chat prompt', EffectiveSettings::forSite($this->idSite)->getChatBasePrompt());

        $this->saveSiteSettings(['chatBasePrompt' => '', 'insightBasePrompt' => '']);

        $settings = EffectiveSettings::forSite($this->idSite);
        $this->assertSame('General chat prompt', $settings->getChatBasePrompt());
        $this->assertSame($this->defaults['en']['insightBasePrompt'], $settings->getInsightBasePrompt());
    }

    public function test_aPreviousDefault_savedForAWebsite_followsTheGeneralPrompt(): void
    {
        (new MeasurableSettingsTable($this->idSite, 'ChatGPT'))->save([
            'chatBasePrompt' => LegacyPrompts::DEFAULTS[LegacyPrompts::CHAT]['it'][0],
        ]);
        SettingsCache::clearCache();

        $this->assertSame($this->defaults['en']['chatBasePrompt'], EffectiveSettings::forSite($this->idSite)->getChatBasePrompt());
    }

    public function test_savingTheWebsiteConnectionCard_keepsTheWebsitePrompts(): void
    {
        $this->saveSiteSettings(['chatBasePrompt' => 'Site chat prompt', 'insightBasePrompt' => 'Site insight prompt']);

        $this->saveSiteSettings(['host' => 'https://llm.example.com/v1/chat/completions', 'apiKey' => 'sk-site', 'modelPreset' => '', 'modelCustom' => 'site-model']);

        $stored = SiteSettingsStorage::read($this->idSite);
        $this->assertSame('Site chat prompt', $stored['chatBasePrompt']);
        $this->assertSame('Site insight prompt', $stored['insightBasePrompt']);
        $this->assertSame('site-model', $stored['modelCustom']);
    }

    public function test_savingTheWebsitePromptsCard_keepsTheWebsiteConnection(): void
    {
        $this->saveSiteSettings(['host' => 'https://llm.example.com/v1/chat/completions', 'apiKey' => 'sk-site', 'modelPreset' => '', 'modelCustom' => 'site-model']);

        $this->saveSiteSettings(['chatBasePrompt' => 'Site chat prompt', 'insightBasePrompt' => '']);

        $stored = SiteSettingsStorage::read($this->idSite);
        $this->assertSame('https://llm.example.com/v1/chat/completions', $stored['host']);
        $this->assertSame('sk-site', $stored['apiKey']);
        $this->assertSame('site-model', $stored['modelCustom']);
        $this->assertSame('Site chat prompt', $stored['chatBasePrompt']);
    }

    public function test_theSettingsPages_receiveTheDefaultAndGeneralPrompts(): void
    {
        $this->saveSystemSettings(['chatBasePrompt' => 'General chat prompt']);

        $_GET = ['module' => 'ChatGPT', 'action' => 'settings'];
        $settingsPage = html_entity_decode((string) \Piwik\FrontController::getInstance()->fetchDispatch('ChatGPT', 'settings'));
        $this->assertStringContainsString('default-prompts=', $settingsPage);
        $this->assertStringContainsString(json_encode($this->defaults['en']['insightBasePrompt']), $settingsPage);

        $_GET = ['module' => 'ChatGPT', 'action' => 'manage', 'idSite' => $this->idSite];
        $sitePage = html_entity_decode((string) \Piwik\FrontController::getInstance()->fetchDispatch('ChatGPT', 'manage'));
        $this->assertStringContainsString('general-prompts=', $sitePage);
        $this->assertStringContainsString('"General chat prompt"', $sitePage);
        $_GET = [];
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccess(),
        ];
    }

    private function storeSystemPrompts(string $chat, string $insight): void
    {
        (new PluginSettingsTable('ChatGPT', ''))->save([
            'chatBasePrompt' => $chat,
            'insightBasePrompt' => $insight,
        ]);
        SettingsCache::clearCache();
    }

    /**
     * @param array<string, string> $values
     */
    private function saveSystemSettings(array $values): void
    {
        Request::processRequest('ChatGPT.setSystemSettings', $values);
    }

    /**
     * @param array<string, string> $values
     */
    private function saveSiteSettings(array $values): void
    {
        Request::processRequest('ChatGPT.setSiteSettings', ['idSite' => $this->idSite] + $values);
    }

    private function getTranslator(): Translator
    {
        return StaticContainer::get(Translator::class);
    }
}
