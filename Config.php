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
    public const DEFAULT_MODEL = 'gpt-5.5';

    /**
     * Returns the list of available preset models.
     *
     * Only conversational chat-completions models are listed — reasoning
     * models (o-series) and *-pro variants are intentionally excluded
     * because they are tuned for one-shot deep analysis rather than
     * back-and-forth discussion of report data.
     */
    public static function getAvailableModels(): array
    {
        return [
            // GPT-5.5 / GPT-5.4 / GPT-5.1 / GPT-5
            'gpt-5.5' => 'GPT 5.5',

            'gpt-5.4' => 'GPT 5.4',
            'gpt-5.4-mini' => 'GPT 5.4 mini',
            'gpt-5.4-nano' => 'GPT 5.4 nano',

            'gpt-5.1' => 'GPT 5.1',

            'gpt-5-mini' => 'GPT 5 Mini',
            'gpt-5-nano' => 'GPT 5 Nano',
            'gpt-5-chat-latest' => 'GPT 5 (Latest)',

            // GPT-4.1 Series
            'gpt-4.1' => 'GPT 4.1',
            'gpt-4.1-mini' => 'GPT 4.1 Mini',
            'gpt-4.1-nano' => 'GPT 4.1 Nano',

            // GPT-4o Series
            'gpt-4o' => 'GPT 4o',
            'gpt-4o-mini' => 'GPT 4o Mini',
            'chatgpt-4o-latest' => 'GPT 4o (Latest)',

            // Legacy
            'gpt-4' => 'GPT 4',
            'gpt-4-turbo' => 'GPT 4 Turbo',
        ];
    }
}
