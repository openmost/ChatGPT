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
        try {
            $settings = new SystemSettings();

            // Check if settings properties exist and are properly initialized
            if (!isset($settings->host) || $settings->host === null) {
                return false;
            }
            if (!isset($settings->apiKey) || $settings->apiKey === null) {
                return false;
            }

            $host = $settings->host->getValue();
            $apiKey = $settings->apiKey->getValue();

            if (empty($host)) {
                return false;
            }

            // Custom host doesn't require API key
            $isCustomHost = $host !== Config::DEFAULT_HOST;
            if (!$isCustomHost && empty($apiKey)) {
                return false;
            }

            return true;
        } catch (\Throwable $e) {
            // Catch any error during plugin installation/initialization
            return false;
        }
    }
}
