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
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;

/**
 * Any one key is enough: key of the website, then AI Providers, then the general key of the plugin.
 *
 * @group ChatGPT
 * @group KeyCascadeTest
 * @group Plugins
 */
class KeyCascadeTest extends TestCase
{
    private const SITE_KEY = 'site-key';
    private const GENERAL_KEY = 'general-key';

    /**
     * @dataProvider getCascadeCases
     */
    public function test_resolvesTheKeySource(
        string $siteKey,
        bool $aiProvidersConnected,
        string $generalKey,
        string $expectedSource,
        string $expectedApiKey
    ): void {
        $settings = $this->settings(['apiKey' => $siteKey], ['apiKey' => $generalKey], $aiProvidersConnected);

        $this->assertSame($expectedSource, $settings->getKeySource());
        $this->assertSame($expectedSource !== EffectiveSettings::SOURCE_NONE, $settings->isConfigured());
        $this->assertSame($expectedSource === EffectiveSettings::SOURCE_AI_PROVIDERS, $settings->usesAiProviders());
        $this->assertSame($expectedApiKey, $settings->getApiKey());
    }

    public function getCascadeCases(): array
    {
        return [
            'site key only' => [self::SITE_KEY, false, '', EffectiveSettings::SOURCE_SITE, self::SITE_KEY],
            'AI Providers only' => ['', true, '', EffectiveSettings::SOURCE_AI_PROVIDERS, ''],
            'general key only' => ['', false, self::GENERAL_KEY, EffectiveSettings::SOURCE_SYSTEM, self::GENERAL_KEY],
            'all three: the site key wins' => [self::SITE_KEY, true, self::GENERAL_KEY, EffectiveSettings::SOURCE_SITE, self::SITE_KEY],
            'site key and general key' => [self::SITE_KEY, false, self::GENERAL_KEY, EffectiveSettings::SOURCE_SITE, self::SITE_KEY],
            'AI Providers wins over the general key' => ['', true, self::GENERAL_KEY, EffectiveSettings::SOURCE_AI_PROVIDERS, self::GENERAL_KEY],
            'none' => ['', false, '', EffectiveSettings::SOURCE_NONE, ''],
        ];
    }

    public function test_theKeysAreNeverCopied_fromOneSourceToAnother(): void
    {
        $withSiteKey = $this->settings(['apiKey' => self::SITE_KEY], ['apiKey' => self::GENERAL_KEY], true);
        $withoutSiteKey = $this->settings([], ['apiKey' => self::GENERAL_KEY], true);

        $this->assertSame(self::SITE_KEY, $withSiteKey->getApiKey());
        $this->assertSame(self::GENERAL_KEY, $withoutSiteKey->getApiKey());
    }

    public function test_aCustomGeneralHost_isEnoughWithoutKey(): void
    {
        $settings = $this->settings([], ['host' => 'https://llm.example.com/v1/chat/completions', 'apiKey' => ''], false);

        $this->assertSame(EffectiveSettings::SOURCE_SYSTEM, $settings->getKeySource());
        $this->assertTrue($settings->isPluginConfigured());
    }

    public function test_aCustomSiteHost_doesNotReceiveTheGeneralKey(): void
    {
        $settings = $this->settings(['host' => 'https://evil.example.com/v1'], ['apiKey' => self::GENERAL_KEY], false);

        $this->assertSame('https://evil.example.com/v1', $settings->getHost());
        $this->assertSame('', $settings->getApiKey());
    }

    public function test_aCustomSiteHost_withoutKey_letsAiProvidersAnswer(): void
    {
        $settings = $this->settings(['host' => 'https://llm.example.com/v1'], [], true);

        $this->assertSame(EffectiveSettings::SOURCE_AI_PROVIDERS, $settings->getKeySource());
    }

    public function test_aBlankSiteKey_isNoKey(): void
    {
        $this->assertSame(EffectiveSettings::SOURCE_AI_PROVIDERS, EffectiveSettings::resolveKeySource('   ', true, true));
        $this->assertSame(EffectiveSettings::SOURCE_SYSTEM, EffectiveSettings::resolveKeySource('', false, true));
        $this->assertSame(EffectiveSettings::SOURCE_NONE, EffectiveSettings::resolveKeySource('', false, false));
    }

    public function test_theDefaultOpenAiHost_needsAKey(): void
    {
        $settings = $this->settings([], ['apiKey' => ''], false);

        $this->assertFalse($settings->isPluginConfigured());
        $this->assertFalse($settings->isCustomHost());
    }

    public function test_theModelAndPromptsOfTheSite_overrideTheGeneralSettings(): void
    {
        $settings = $this->settings(
            ['modelPreset' => 'gpt-5.4-mini', 'chatBasePrompt' => 'Site chat', 'insightBasePrompt' => ''],
            ['model' => Config::LATEST_RECOMMENDED_MODEL, 'chatBasePrompt' => 'General chat', 'insightBasePrompt' => 'General insight'],
            true
        );

        $this->assertSame('gpt-5.4-mini', $settings->getModel());
        $this->assertSame(EffectiveSettings::SOURCE_SITE, $settings->getModelSource());
        $this->assertSame('Site chat', $settings->getChatBasePrompt());
        $this->assertSame('General insight', $settings->getInsightBasePrompt());
    }

    public function test_theLatestRecommendedModel_isResolved(): void
    {
        $settings = $this->settings([], ['model' => Config::LATEST_RECOMMENDED_MODEL], false);

        $this->assertSame(Config::RECOMMENDED_MODEL, $settings->getModel());
        $this->assertSame(EffectiveSettings::SOURCE_SYSTEM, $settings->getModelSource());
    }

    /**
     * @param array<string, string> $site
     * @param array<string, string> $system
     */
    private function settings(array $site, array $system, bool $aiProvidersConnected): EffectiveSettings
    {
        return EffectiveSettings::fromValues(1, $site, $system + [
            'host' => Config::DEFAULT_HOST,
            'apiKey' => '',
            'model' => Config::LATEST_RECOMMENDED_MODEL,
            'chatBasePrompt' => 'Chat',
            'insightBasePrompt' => 'Insight',
        ], $aiProvidersConnected);
    }
}
