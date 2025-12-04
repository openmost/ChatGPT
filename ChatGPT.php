<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

class ChatGPT extends \Piwik\Plugin
{
    /**
     * Returns the list of available preset models
     */
    public static function getAvailableModels(): array
    {
        return [
            // GPT-5.1 / GPT-5 Series
            'gpt-5.1' => 'GPT 5.1',
            'gpt-5-mini' => 'GPT 5 Mini',
            'gpt-5-nano' => 'GPT 5 Nano',
            'gpt-5-pro' => 'GPT 5 Pro',
            'gpt-5-chat-latest' => 'GPT 5 (Latest)',

            // O-Series
            'o1-mini' => 'o1 Mini',
            'o1' => 'o1',
            'o3-mini' => 'o3 Mini',
            'o3' => 'o3',

            // GPT-4.1 Series
            'gpt-4.1' => 'GPT 4.1',
            'gpt-4.1-mini' => 'GPT 4.1 Mini',
            'gpt-4.1-nano' => 'GPT 4.1 Nano',

            // GPT-4o Series
            'gpt-4o' => 'GPT 4o',
            'gpt-4o-mini' => 'GPT 4o Mini',
            'chatgpt-4o-latest' => 'GPT 4o (Latest)',

            // Legacy models
            'gpt-4' => 'GPT 4',
            'gpt-4-turbo' => 'GPT 4 Turbo',
            'gpt-3.5-turbo' => 'GPT 3.5 Turbo',
        ];
    }

    public function registerEvents()
    {
        return array(
            'AssetManager.getJavaScriptFiles' => 'getJavaScriptFiles',
            'AssetManager.getStylesheetFiles' => 'getStylesheetFiles',
            'Translate.getClientSideTranslationKeys' => 'getClientSideTranslationKeys',
        );
    }

    public function getClientSideTranslationKeys(&$translationKeys)
    {
        $translationKeys[] = 'ChatGPT_Insights';
        $translationKeys[] = 'ChatGPT_Loading';
        $translationKeys[] = 'ChatGPT_Submit';
        $translationKeys[] = 'ChatGPT_You';
        $translationKeys[] = 'ChatGPT_AI';
        $translationKeys[] = 'ChatGPT_ErrorMessage';
        $translationKeys[] = 'ChatGPT_MessagePlaceholder';
        $translationKeys[] = 'ChatGPT_AskQuestion';
        $translationKeys[] = 'ChatGPT_InvalidResponse';
        $translationKeys[] = 'ChatGPT_AnErrorOccurred';
        $translationKeys[] = 'ChatGPT_NoResponseBody';
        $translationKeys[] = 'ChatGPT_WaitingForResponse';
    }

    public function getJavaScriptFiles(&$files)
    {
        if ($this->pluginIsConfigured()) {
            $files[] = "plugins/ChatGPT/assets/js/app.js";
        }
    }

    public function getStylesheetFiles(&$files)
    {
        if ($this->pluginIsConfigured()) {
            $files[] = "plugins/ChatGPT/assets/css/app.css";
        }
    }

    private function pluginIsConfigured(): bool
    {
        $settings = new SystemSettings();
        $host = $settings->host->getValue();
        $apiKey = $settings->apiKey->getValue();

        if (empty($host)) {
            return false;
        }

        // Custom host doesn't require API key
        $isCustomHost = $host !== SystemSettings::DEFAULT_HOST;
        if (!$isCustomHost && empty($apiKey)) {
            return false;
        }

        return true;
    }
}
