<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;
use Piwik\Plugins\ChatGPT\SystemSettings;
use Piwik\Plugins\ChatGPT\tests\Fakes\FakePluginDependencies;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group ChatGPT
 * @group ChatGPTAiProvidersTakeoverTest
 * @group Plugins
 */
class AiProvidersTakeoverTest extends IntegrationTestCase
{
    private const CONNECTION_FIELDS = ['host', 'apiKey', 'modelPreset', 'modelCustom'];

    /** @var int */
    private $idSite;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        // the test environment only loads the translations of the core plugins
        StaticContainer::get('Piwik\Translation\Translator')->addDirectory(__DIR__ . '/../../lang');
    }

    public function test_theConnectionFields_areReadOnly_withANotice_whenAiProvidersIsConnected(): void
    {
        $this->useDependencies(FakePluginDependencies::connected());
        $settings = new SystemSettings();

        foreach (self::CONNECTION_FIELDS as $name) {
            $field = $settings->{$name}->configureField();
            $this->assertSame('disabled', $field->uiControlAttributes['disabled'] ?? null, $name);
        }
        foreach (['chatBasePrompt', 'insightBasePrompt'] as $name) {
            $this->assertArrayNotHasKey('disabled', $settings->{$name}->configureField()->uiControlAttributes, $name);
        }

        $host = $settings->host->configureField();
        $this->assertStringStartsWith('AI Providers takes over', (string) $host->introduction);
        $this->assertStringContainsString('<a href="index.php?module=AIProviders&amp;action=index">Administration > System > AI Providers</a>', (string) $host->inlineHelp);
        $this->assertStringContainsString('index.php?module=AIProviders&amp;action=index', (string) $host->inlineHelp);
        $this->assertTrue($settings->isTakenOverByAiProviders());
    }

    public function test_theNotice_hasNoLink_forOtherUsers(): void
    {
        $this->useDependencies(FakePluginDependencies::connected());
        FakeAccess::clearAccess(false, [$this->idSite]);

        $host = (new SystemSettings())->host->configureField();

        $this->assertSame('disabled', $host->uiControlAttributes['disabled'] ?? null);
        $this->assertStringNotContainsString('module=AIProviders', (string) $host->inlineHelp);
    }

    public function test_theNotice_hasNoLink_whenTheProviderIsManaged(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->managed = true;
        $this->useDependencies($dependencies);

        $host = (new SystemSettings())->host->configureField();

        $this->assertNotEmpty($host->introduction);
        $this->assertStringNotContainsString('module=AIProviders', (string) $host->inlineHelp);
    }

    /**
     * @dataProvider getDisconnectedStates
     */
    public function test_theConnectionFields_areEditable_whenAiProvidersIsNotConnected(string $aiState): void
    {
        $this->useDependencies(FakePluginDependencies::withoutAiProviders($aiState));
        $settings = new SystemSettings();

        foreach (self::CONNECTION_FIELDS as $name) {
            $field = $settings->{$name}->configureField();
            $this->assertArrayNotHasKey('disabled', $field->uiControlAttributes, $name);
        }
        $this->assertEmpty($settings->host->configureField()->introduction);
        $this->assertFalse($settings->isTakenOverByAiProviders());
    }

    public function getDisconnectedStates(): array
    {
        return [
            'absent' => [PluginDependencies::PLUGIN_MISSING],
            'deactivated' => [PluginDependencies::PLUGIN_INACTIVE],
            'activated without provider' => [PluginDependencies::PLUGIN_ACTIVE],
        ];
    }

    public function test_theConnectionFields_areEditable_whenTheDetectionFails(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->availability = new \RuntimeException('AIProviders failure');
        $this->useDependencies($dependencies);

        $settings = new SystemSettings();

        $this->assertArrayNotHasKey('disabled', $settings->apiKey->configureField()->uiControlAttributes);
    }

    public function test_theGeneralSettingsCanStillBeSaved_whenAiProvidersTakesOver(): void
    {
        $this->useDependencies(FakePluginDependencies::connected());
        $settings = new SystemSettings();
        $settings->chatBasePrompt->setValue('New chat prompt');
        $settings->save();

        $this->assertSame('New chat prompt', (new SystemSettings())->chatBasePrompt->getValue());
    }

    /**
     * @dataProvider getStoredCascadeCases
     */
    public function test_forSite_resolvesTheKeyCascade_fromTheStoredSettings(
        string $siteKey,
        bool $aiProvidersConnected,
        string $generalKey,
        string $expectedSource
    ): void {
        $this->saveGeneralKey($generalKey);
        if ($siteKey !== '') {
            SiteSettingsStorage::save($this->idSite, ['apiKey' => $siteKey]);
        }
        $dependencies = $aiProvidersConnected ? FakePluginDependencies::connected() : FakePluginDependencies::withoutAiProviders();

        $settings = EffectiveSettings::forSite($this->idSite, $dependencies);

        $this->assertSame($expectedSource, $settings->getKeySource());
    }

    public function getStoredCascadeCases(): array
    {
        return [
            'site key only' => ['site-key', false, '', EffectiveSettings::SOURCE_SITE],
            'AI Providers only' => ['', true, '', EffectiveSettings::SOURCE_AI_PROVIDERS],
            'general key only' => ['', false, 'general-key', EffectiveSettings::SOURCE_SYSTEM],
            'all three' => ['site-key', true, 'general-key', EffectiveSettings::SOURCE_SITE],
            'none' => ['', false, '', EffectiveSettings::SOURCE_NONE],
        ];
    }

    public function test_forSite_usesTheDependenciesOfTheContainer_byDefault(): void
    {
        $this->useDependencies(FakePluginDependencies::connected());

        $this->assertSame(EffectiveSettings::SOURCE_AI_PROVIDERS, EffectiveSettings::forSite($this->idSite)->getKeySource());
    }

    public function test_hasAnySiteApiKey(): void
    {
        $this->assertFalse(SiteSettingsStorage::hasAnySiteApiKey());

        SiteSettingsStorage::save($this->idSite, ['apiKey' => '', 'host' => '']);
        $this->assertFalse(SiteSettingsStorage::hasAnySiteApiKey());

        SiteSettingsStorage::save($this->idSite, ['apiKey' => 'site-key']);
        $this->assertTrue(SiteSettingsStorage::hasAnySiteApiKey());
    }

    public function test_theRealDependencies_resolveTheAiProvidersService(): void
    {
        $dependencies = new PluginDependencies();
        if ($dependencies->getPluginState(PluginDependencies::AI_PROVIDERS) !== PluginDependencies::PLUGIN_ACTIVE
            || !class_exists('Piwik\Plugins\AIProviders\AIProviderService')
        ) {
            $this->markTestSkipped('AIProviders is not activated in the test environment.');
        }

        $this->assertInstanceOf('Piwik\Plugins\AIProviders\AIProviderService', $dependencies->getAiProvidersService());
        $this->assertIsArray($dependencies->getAiProvidersAvailability());
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

    private function saveGeneralKey(string $apiKey): void
    {
        $this->useDependencies(FakePluginDependencies::withoutAiProviders());
        $settings = new SystemSettings();
        $settings->apiKey->setValue($apiKey);
        $settings->save();
    }
}
