<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Cache;
use Piwik\Http;
use Piwik\Piwik;
use Piwik\Settings\Setting;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

/**
 * Defines Settings for ChatGPT.
 *
 * Usage like this:
 * $settings = new SystemSettings();
 * $settings->metric->getValue();
 * $settings->description->getValue();
 */
class SystemSettings extends \Piwik\Settings\Plugin\SystemSettings
{
    /** @var Setting */
    public $host;
    public $apiKey;
    public $model;
    public $enableStreaming;
    public $chatBasePrompt;
    public $insightBasePrompt;

    protected function init()
    {
        $this->host = $this->createHostSetting();
        $this->apiKey = $this->createApiKeySetting();
        $this->model = $this->createModelSetting();
        $this->enableStreaming = $this->createEnableStreamingSetting();
        $this->chatBasePrompt = $this->createChatBasePromptSetting();
        $this->insightBasePrompt = $this->createInsightBasePromptSetting();
    }

    private function createEnableStreamingSetting()
    {
        return $this->makeSetting('enableStreaming', $default = false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_EnableStreaming');
            $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
            $field->description = Piwik::translate('ChatGPT_EnableStreamingDescription');
        });
    }

    private function createHostSetting()
    {
        return $this->makeSetting('host', $default = 'https://api.openai.com/v1/chat/completions', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_Host');
            $field->uiControl = FieldConfig::UI_CONTROL_URL;
            $field->description = Piwik::translate('ChatGPT_HostDescription');
            $field->validators[] = new NotEmpty();
        });
    }

    private function createApiKeySetting()
    {
        return $this->makeSetting('apiKey', $default = null, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_ApiKey');
            $field->uiControl = FieldConfig::UI_CONTROL_PASSWORD;
            $field->description = Piwik::translate('ChatGPT_ApiKeyDescription');
            $field->validators[] = new NotEmpty();
        });
    }

    private function createModelSetting()
    {
        return $this->makeSetting('model', $default = '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_Model');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->description = Piwik::translate('ChatGPT_ModelDescription');
            $field->availableValues = $this->getAvailableModelsForSetting();
            $field->validators[] = new NotEmpty();
        });
    }

    /**
     * Cache TTL for models list (1 hour)
     */
    private const MODELS_CACHE_TTL = 3600;

    /**
     * Retrieves available models from API with caching
     */
    private function getAvailableModelsForSetting(): array
    {
        $defaultModels = [
            'o1-mini' => 'o1 mini',
            'o1' => 'o1',
            'gpt-4o' => 'GPT 4o',
            'gpt-4o-mini' => 'GPT 4o mini',
            'gpt-4' => 'GPT 4',
            'gpt-4-turbo' => 'GPT 4 Turbo',
            'gpt-3.5-turbo' => 'GPT 3.5 turbo',
        ];

        try {
            $host = $this->host->getValue();
            $apiKey = $this->apiKey->getValue();

            if (empty($host) || empty($apiKey)) {
                return $defaultModels;
            }

            // Check cache first
            $cacheKey = 'ChatGPT_models_' . md5($host);
            $cache = Cache::getLazyCache();
            $cachedModels = $cache->fetch($cacheKey);

            if ($cachedModels !== false && is_array($cachedModels) && !empty($cachedModels)) {
                return $cachedModels;
            }

            // Fetch from API using Matomo's HTTP client
            $baseUrl = preg_replace('#/v1/.*$#', '/v1', $host);
            $modelsUrl = $baseUrl . '/models';

            $response = Http::sendHttpRequest(
                $modelsUrl,
                10,
                null,
                null,
                0,
                false,
                false,
                false,
                'GET',
                null,
                null,
                null,
                [
                    'Authorization: Bearer ' . $apiKey,
                    'Content-Type: application/json',
                    'Accept: application/json',
                ]
            );

            if (empty($response)) {
                return $defaultModels;
            }

            $data = json_decode($response, true);

            if (!isset($data['data']) || !is_array($data['data'])) {
                return $defaultModels;
            }

            $models = [];
            foreach ($data['data'] as $model) {
                if (!isset($model['id'])) {
                    continue;
                }
                $modelId = $model['id'];
                if (preg_match('/^(gpt|o1|o3|chatgpt|claude)/i', $modelId)) {
                    $models[$modelId] = $modelId;
                }
            }

            if (empty($models)) {
                return $defaultModels;
            }

            ksort($models);

            // Cache the results
            $cache->save($cacheKey, $models, self::MODELS_CACHE_TTL);

            return $models;
        } catch (\Exception $e) {
            return $defaultModels;
        }
    }

    private function createChatBasePromptSetting()
    {
        $defaultPrompt = Piwik::translate('ChatGPT_ChatBasePromptDefault');
        return $this->makeSetting('chatBasePrompt', $default = $defaultPrompt, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_ChatBasePrompt');
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = Piwik::translate('ChatGPT_ChatBasePromptDescription');
            $field->validators[] = new NotEmpty();
        });
    }

    private function createInsightBasePromptSetting()
    {
        $defaultPrompt = Piwik::translate('ChatGPT_InsightBasePromptDefault');
        return $this->makeSetting('insightBasePrompt', $default = $defaultPrompt, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_InsightBasePrompt');
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = Piwik::translate('ChatGPT_InsightBasePromptDescription');
            $field->validators[] = new NotEmpty();
        });
    }
}
