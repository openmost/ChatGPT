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
        );
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

    private function pluginIsConfigured()
    {
        $settings = new \Piwik\Plugins\ChatGPT\SystemSettings();
        $host = $settings->host->getValue();
        $apiKey = $settings->apiKey->getValue();
        $modelCustom = $settings->modelCustom->getValue();
        $modelPreset = $settings->modelPreset->getValue();
        $model = !empty($modelCustom) ? $modelCustom : $modelPreset;
        return $host && $apiKey && $model;
    }
}
