<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

/**
 * Configuration constants and static data for ChatGPT plugin.
 * This class has no dependencies to avoid circular loading issues.
 */
class Config
{
    public const DEFAULT_HOST = 'https://api.openai.com/v1/chat/completions';

    /**
     * Model option resolved to RECOMMENDED_MODEL when a request is sent, so the installs using it follow the
     * recommendation of each plugin release without changing their settings.
     */
    public const LATEST_RECOMMENDED_MODEL = 'latest-recommended';

    public const RECOMMENDED_MODEL = 'gpt-6-astra';

    public const DEFAULT_MODEL = self::LATEST_RECOMMENDED_MODEL;

    /**
     * Returns the list of available preset models.
     *
     * Only conversational chat-completions models are listed: reasoning
     * models (o-series), *-pro and *-codex variants are intentionally excluded
     * because they are tuned for one-shot deep analysis or code rather than
     * back-and-forth discussion of report data.
     */
    public static function getAvailableModels(): array
    {
        return [
            // GPT-6
            'gpt-6-astra' => 'GPT 6 Astra',
            'gpt-6.1-sol' => 'GPT 6.1 Sol',
            'gpt-6-sol' => 'GPT 6 Sol',
            'gpt-6-luna' => 'GPT 6 Luna',

            // GPT-5.6
            'gpt-5.6-sol' => 'GPT 5.6 Sol',
            'gpt-5.6-terra' => 'GPT 5.6 Terra',
            'gpt-5.6-luna' => 'GPT 5.6 Luna',

            // GPT-5.5 / GPT-5.4
            'gpt-5.5' => 'GPT 5.5',
            'gpt-5.4' => 'GPT 5.4',
            'gpt-5.4-mini' => 'GPT 5.4 mini',
            'gpt-5.4-nano' => 'GPT 5.4 nano',

            // GPT-5.2 / GPT-5.1 / GPT-5
            'gpt-5.2' => 'GPT 5.2',
            'gpt-5.1' => 'GPT 5.1',
            'gpt-5' => 'GPT 5',
            'gpt-5-mini' => 'GPT 5 mini',
            'gpt-5-nano' => 'GPT 5 nano',

            // GPT-4.1 / GPT-4o
            'gpt-4.1' => 'GPT 4.1',
            'gpt-4.1-mini' => 'GPT 4.1 mini',
            'gpt-4o' => 'GPT 4o',
            'gpt-4o-mini' => 'GPT 4o mini',
        ];
    }

    /**
     * Models deprecated or shut down by OpenAI, or removed from the preset list of a previous plugin version.
     *
     * @return string[]
     */
    public static function getDeprecatedModels(): array
    {
        return [
            'gpt-5-chat-latest',
            'gpt-5.1-chat-latest',
            'gpt-5.2-chat-latest',
            'gpt-5.3-chat-latest',
            'gpt-5-2025-08-07',
            'gpt-5-mini-2025-08-07',
            'gpt-5-nano-2025-08-07',
            'gpt-4.1-nano',
            'chatgpt-4o-latest',
            'gpt-4',
            'gpt-4-0613',
            'gpt-4-1106-preview',
            'gpt-4-turbo',
            'gpt-4-turbo-preview',
            'gpt-4-32k',
            'gpt-4.5-preview',
            'gpt-3.5-turbo',
            'o1',
            'o1-mini',
            'o1-preview',
            'o3-mini',
        ];
    }

    public static function isAvailableModel(string $model): bool
    {
        return $model === self::LATEST_RECOMMENDED_MODEL || array_key_exists($model, self::getAvailableModels());
    }

    public static function isDeprecatedModel(string $model): bool
    {
        return in_array(strtolower(trim($model)), self::getDeprecatedModels(), true);
    }

    /**
     * Model sent to the API for a configured value.
     */
    public static function resolveModel(string $model): string
    {
        $model = trim($model);

        return ($model === '' || $model === self::LATEST_RECOMMENDED_MODEL) ? self::RECOMMENDED_MODEL : $model;
    }

    public static function getModelLabel(string $model): string
    {
        return self::getAvailableModels()[$model] ?? $model;
    }
}
