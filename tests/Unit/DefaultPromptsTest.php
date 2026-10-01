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
use Piwik\Plugins\ChatGPT\Settings\DefaultPrompts;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Plugins\ChatGPT\Settings\LegacyPrompts;

/**
 * Default prompts: the defaults of previous versions are upgraded, a default is never stored, custom prompts are kept.
 *
 * @group ChatGPT
 * @group ChatGPTDefaultPromptsTest
 * @group Plugins
 */
class DefaultPromptsTest extends TestCase
{
    private const NEW_DEFAULT = 'New default prompt';

    /**
     * @dataProvider getLegacyDefaults
     */
    public function test_resolve_replacesTheDefaultOfAPreviousVersion_inAnyLanguage(string $kind, string $legacyPrompt): void
    {
        $this->assertSame(self::NEW_DEFAULT, DefaultPrompts::resolve($kind, $legacyPrompt, self::NEW_DEFAULT));
        // the settings form may add spaces or line breaks around the saved value
        $this->assertSame(self::NEW_DEFAULT, DefaultPrompts::resolve($kind, "  " . $legacyPrompt . "\r\n", self::NEW_DEFAULT));
        $this->assertTrue(DefaultPrompts::isDefault($kind, $legacyPrompt));
        $this->assertNull(DefaultPrompts::toStoredGeneralPrompt($kind, $legacyPrompt));
    }

    public function getLegacyDefaults(): array
    {
        $cases = [];
        foreach (LegacyPrompts::DEFAULTS as $kind => $languages) {
            foreach ($languages as $language => $prompts) {
                foreach ($prompts as $index => $prompt) {
                    $cases["$kind $language $index"] = [$kind, $prompt];
                }
            }
        }

        return $cases;
    }

    public function test_theLegacyList_coversEveryLanguageOfThePlugin(): void
    {
        $languages = array_map(static function (string $file): string {
            return basename($file, '.json');
        }, glob(__DIR__ . '/../../lang/*.json'));
        sort($languages);

        foreach ([LegacyPrompts::CHAT, LegacyPrompts::INSIGHT] as $kind) {
            $listed = array_keys(LegacyPrompts::DEFAULTS[$kind]);
            sort($listed);
            $this->assertSame($languages, $listed, $kind);
        }
    }

    public function test_aLegacyDefault_isNeverACurrentDefault(): void
    {
        foreach ($this->getCurrentDefaults() as $kind => $prompts) {
            foreach ($prompts as $language => $prompt) {
                $this->assertFalse(LegacyPrompts::isLegacyDefault($kind, $prompt), "$kind $language");
            }
        }
    }

    /**
     * @dataProvider getKinds
     */
    public function test_aCustomPrompt_isKept(string $kind): void
    {
        $custom = 'You are a Matomo expert. Answer in two sentences.';

        $this->assertSame($custom, DefaultPrompts::resolve($kind, $custom, self::NEW_DEFAULT));
        $this->assertFalse(DefaultPrompts::isDefault($kind, $custom));
        $this->assertSame($custom, DefaultPrompts::toStoredGeneralPrompt($kind, $custom));
        // a prompt starting with a previous default is a custom prompt
        $extended = LegacyPrompts::DEFAULTS[$kind]['en'][0] . ' Always answer in French.';
        $this->assertSame($extended, DefaultPrompts::resolve($kind, $extended, self::NEW_DEFAULT));
    }

    /**
     * @dataProvider getKinds
     */
    public function test_anEmptyPrompt_fallsBackToTheDefault(string $kind): void
    {
        $this->assertSame(self::NEW_DEFAULT, DefaultPrompts::resolve($kind, '', self::NEW_DEFAULT));
        $this->assertSame(self::NEW_DEFAULT, DefaultPrompts::resolve($kind, " \n\t ", self::NEW_DEFAULT));
        $this->assertNull(DefaultPrompts::toStoredGeneralPrompt($kind, ''));
    }

    public function test_aCurrentDefault_inAnyLanguage_isNotStored(): void
    {
        foreach ($this->getCurrentDefaults() as $kind => $prompts) {
            foreach ($prompts as $language => $prompt) {
                $this->assertTrue(DefaultPrompts::isDefault($kind, $prompt), "$kind $language");
                $this->assertNull(DefaultPrompts::toStoredGeneralPrompt($kind, $prompt), "$kind $language");
            }
        }
    }

    public function test_aWebsitePrompt_equalToTheGeneralPrompt_isStoredEmpty(): void
    {
        $this->assertSame('', DefaultPrompts::toStoredSitePrompt(LegacyPrompts::CHAT, ' Custom general ', 'Custom general'));
        $this->assertSame('', DefaultPrompts::toStoredSitePrompt(LegacyPrompts::CHAT, '', 'Custom general'));
    }

    public function test_aDefaultWebsitePrompt_isStoredEmpty_whenTheGeneralPromptIsADefault(): void
    {
        $defaults = $this->getCurrentDefaults();

        $this->assertSame('', DefaultPrompts::toStoredSitePrompt(LegacyPrompts::CHAT, $defaults[LegacyPrompts::CHAT]['fr'], $defaults[LegacyPrompts::CHAT]['en']));
        $this->assertSame('', DefaultPrompts::toStoredSitePrompt(LegacyPrompts::INSIGHT, LegacyPrompts::DEFAULTS[LegacyPrompts::INSIGHT]['de'][0], $defaults[LegacyPrompts::INSIGHT]['en']));
    }

    public function test_aDefaultWebsitePrompt_isKept_whenTheGeneralPromptIsCustom(): void
    {
        $default = $this->getCurrentDefaults()[LegacyPrompts::CHAT]['en'];

        $this->assertSame($default, DefaultPrompts::toStoredSitePrompt(LegacyPrompts::CHAT, $default, 'Custom general'));
        $this->assertSame('Site prompt', DefaultPrompts::toStoredSitePrompt(LegacyPrompts::CHAT, 'Site prompt', 'Custom general'));
    }

    public function test_theEffectivePrompt_ofAWebsite(): void
    {
        $legacy = LegacyPrompts::DEFAULTS[LegacyPrompts::CHAT]['fr'][0];

        $this->assertSame('Site prompt', EffectiveSettings::resolvePrompt(LegacyPrompts::CHAT, 'Site prompt', 'General prompt'));
        $this->assertSame('General prompt', EffectiveSettings::resolvePrompt(LegacyPrompts::CHAT, '', 'General prompt'));
        $this->assertSame('General prompt', EffectiveSettings::resolvePrompt(LegacyPrompts::CHAT, "  \n", 'General prompt'));
        // a previous default saved for the website follows the general prompt
        $this->assertSame('General prompt', EffectiveSettings::resolvePrompt(LegacyPrompts::CHAT, $legacy, 'General prompt'));
    }

    public function getKinds(): array
    {
        return [
            'chat' => [LegacyPrompts::CHAT],
            'insight' => [LegacyPrompts::INSIGHT],
        ];
    }

    /**
     * @return array<string, array<string, string>> kind => language => default prompt
     */
    private function getCurrentDefaults(): array
    {
        $defaults = [];
        foreach (glob(__DIR__ . '/../../lang/*.json') as $file) {
            $translations = json_decode((string) file_get_contents($file), true)['ChatGPT'];
            $language = basename($file, '.json');
            $defaults[LegacyPrompts::CHAT][$language] = $translations['ChatBasePromptDefault'];
            $defaults[LegacyPrompts::INSIGHT][$language] = $translations['InsightBasePromptDefault'];
        }

        return $defaults;
    }
}
