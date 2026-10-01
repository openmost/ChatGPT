<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Plugins\ChatGPT\Agent\McpAgent;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;

class ChatGPT extends \Piwik\Plugin
{
    public function registerEvents()
    {
        return array(
            'Template.afterEventsReport' => 'renderOpenmostCommunicationAfterEvents',
            'Widget.filterWidgets' => 'addOpenmostCommunicationWidgets',
            'Template.beforeContent' => 'renderOpenmostCommunication',
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
        $translationKeys[] = 'ChatGPT_SiteSettingsTitle';
        $translationKeys[] = 'ChatGPT_SiteSettingsIntro';
        $translationKeys[] = 'ChatGPT_SiteSettingsGeneralSettings';
        $translationKeys[] = 'General_GeneralSettings';
        $translationKeys[] = 'General_YourChangesHaveBeenSaved';
        $translationKeys[] = 'ChatGPT_AgentToolStep';
        $translationKeys[] = 'ChatGPT_AgentMcpUnavailable';
        $translationKeys[] = 'ChatGPT_AskAdministrator';
        $translationKeys[] = 'ChatGPT_SiteSettingsAiProvidersNotice';
        $translationKeys[] = 'ChatGPT_SystemSettingsMenu';
        $translationKeys[] = 'ChatGPT_SystemSettingsIntro';
        $translationKeys[] = 'ChatGPT_SystemSettingsLink';
        $translationKeys[] = 'ChatGPT_SettingsConnectionTitle';
        $translationKeys[] = 'ChatGPT_SettingsPromptsTitle';
        $translationKeys[] = 'ChatGPT_ResetPromptToDefault';
        $translationKeys[] = 'ChatGPT_ResetPromptToDefaultHelp';
        $translationKeys[] = 'ChatGPT_UseGeneralPrompt';
        $translationKeys[] = 'ChatGPT_UseGeneralPromptHelp';
        $translationKeys[] = 'ChatGPT_SiteSettingsPromptsIntro';
        $translationKeys[] = 'ChatGPT_DeleteApiKey';
        $translationKeys[] = 'ChatGPT_DeleteApiKeyConfirmTitle';
        $translationKeys[] = 'ChatGPT_DeleteApiKeyConfirmText';
        $translationKeys[] = 'ChatGPT_DeleteSiteApiKeyConfirmText';
        $translationKeys[] = 'ChatGPT_DeleteApiKeyDone';
        $translationKeys[] = 'General_Yes';
        $translationKeys[] = 'General_No';
        $translationKeys[] = 'ChatGPT_CloseInsights';
        $translationKeys[] = 'ChatGPT_CopyAnswer';
        $translationKeys[] = 'ChatGPT_AnswerCopied';
        $translationKeys[] = 'ChatGPT_ScrollToLatest';
        $translationKeys[] = 'ChatGPT_ComposerHint';
        $translationKeys[] = 'ChatGPT_AnswerAnnouncement';
        $translationKeys[] = 'ChatGPT_AgentStepsSummary';
        $translationKeys[] = 'ChatGPT_AgentStepsFailed';
        $translationKeys[] = 'ChatGPT_AgentStepRunning';
        $translationKeys[] = 'ChatGPT_AgentStepDone';
        $translationKeys[] = 'ChatGPT_AgentStepError';
        $translationKeys[] = 'ChatGPT_EmptyStateTitle';
        $translationKeys[] = 'ChatGPT_EmptyStateText';
        $translationKeys[] = 'ChatGPT_SuggestionsLabel';
        $translationKeys[] = 'ChatGPT_SuggestionWeeklyKpis';
        $translationKeys[] = 'ChatGPT_SuggestionTopPages';
        $translationKeys[] = 'ChatGPT_SuggestionTrafficSources';
        $translationKeys[] = 'ChatGPT_SuggestionGoals';
        $translationKeys[] = 'ChatGPT_NewConversation';
        $translationKeys[] = 'ChatGPT_ScrollableTable';
        $translationKeys[] = 'ChatGPT_ScrollableCode';
        $translationKeys[] = 'ChatGPT_CopyCode';
        $translationKeys[] = 'ChatGPT_CodeCopied';
        foreach (['ActivateAiProviders', 'ConnectProvider', 'InstallMcpServer', 'ActivateMcpServer', 'EnableMcp', 'EnableWriteMode'] as $step) {
            $translationKeys[] = 'ChatGPT_Recommend' . $step;
            $translationKeys[] = 'ChatGPT_Recommend' . $step . 'Action';
        }
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
        // any one key is enough: general key, AI Providers or the key of a website
        return $this->chatIsConfigured() || McpAgent::isAvailable() || SiteSettingsStorage::hasAnySiteApiKey();
    }

    private function chatIsConfigured(): bool
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

    public function renderOpenmostCommunication(&$out, $layout, $module = '', $action = '')
    {
        OpenmostCommunication::beforeContent($out, (string) $layout, (string) $module, (string) $action, $this->getPluginName());
    }

    public function addOpenmostCommunicationWidgets($list)
    {
        OpenmostCommunication::filterWidgets($list, $this->getPluginName());
    }

    public function renderOpenmostCommunicationAfterEvents(&$out, $dataTable = null)
    {
        OpenmostCommunication::afterEventsReport($out, $this->getPluginName());
    }
}
