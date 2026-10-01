<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Settings;

/**
 * Default prompts of the general and website settings.
 *
 * A prompt equal to a default is never stored: the general setting is deleted and the website setting is left
 * empty, so a later rewrite of the defaults reaches every user who did not customise the prompt.
 */
final class DefaultPrompts
{
    public const SETTING_NAMES = [
        'chatBasePrompt' => LegacyPrompts::CHAT,
        'insightBasePrompt' => LegacyPrompts::INSIGHT,
    ];

    /** @var array<string, string[]>|null */
    private static $translatedDefaults = null;

    /**
     * The default, in the language of the current user, replaces an empty prompt and a default prompt of a previous
     * version. A custom prompt is kept.
     */
    public static function resolve(string $kind, string $prompt, ?string $default = null): string
    {
        if (trim($prompt) === '' || LegacyPrompts::isLegacyDefault($kind, $prompt)) {
            return $default ?? LegacyPrompts::getDefault($kind);
        }

        return $prompt;
    }

    /**
     * Whether a prompt is empty or a default, current in any language or of a previous version
     */
    public static function isDefault(string $kind, string $prompt): bool
    {
        $prompt = trim($prompt);
        if ($prompt === '' || LegacyPrompts::isLegacyDefault($kind, $prompt)) {
            return true;
        }

        return in_array($prompt, self::getTranslatedDefaults()[$kind] ?? [], true);
    }

    /**
     * General setting value to store: null, which deletes the stored value, for a default prompt
     *
     * @param mixed $prompt
     */
    public static function toStoredGeneralPrompt(string $kind, $prompt): ?string
    {
        $prompt = (string) $prompt;

        return self::isDefault($kind, $prompt) ? null : $prompt;
    }

    /**
     * Website setting value to store: empty, so the general prompt applies, when the prompt is the general prompt or a
     * default while the general prompt is a default too
     */
    public static function toStoredSitePrompt(string $kind, string $prompt, string $generalPrompt): string
    {
        if (trim($prompt) === '' || trim($prompt) === trim($generalPrompt)) {
            return '';
        }
        if (self::isDefault($kind, $prompt) && self::isDefault($kind, $generalPrompt)) {
            return '';
        }

        return $prompt;
    }

    /**
     * Current default prompts in every language of the plugin, trimmed
     *
     * @return array<string, string[]>
     */
    private static function getTranslatedDefaults(): array
    {
        if (self::$translatedDefaults !== null) {
            return self::$translatedDefaults;
        }

        $defaults = [];
        foreach (glob(__DIR__ . '/../lang/*.json') ?: [] as $file) {
            $translations = json_decode((string) file_get_contents($file), true);
            foreach (LegacyPrompts::TRANSLATION_KEYS as $kind => $translationKey) {
                list($plugin, $key) = explode('_', $translationKey, 2);
                $value = $translations[$plugin][$key] ?? null;
                if (is_string($value) && trim($value) !== '') {
                    $defaults[$kind][] = trim($value);
                }
            }
        }

        return self::$translatedDefaults = $defaults;
    }
}
