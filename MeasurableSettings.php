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
 * // require Piwik\Plugin\SettingsProvider via Dependency Injection eg in constructor of your class
 * $settings = $settingsProvider->getMeasurableSettings('ChatGPT', $idSite);
 * $settings->appId->getValue();
 * $settings->contactEmails->getValue();
 */
class MeasurableSettings extends \Piwik\Settings\Measurable\MeasurableSettings
{
    /** @var Setting */
    public $host;
    public $apiKey;
    public $model;
    public $chatBasePrompt;
    public $insightBasePrompt;

    protected function init()
    {
        // System setting --> allows selection of a single value
        $this->host = $this->createHostSetting();
        $this->apiKey = $this->createApiKeySetting();
        $this->model = $this->createModelSetting();
        $this->chatBasePrompt = $this->createChatBasePromptSetting();
        $this->insightBasePrompt = $this->createInsightBasePromptSetting();
    }

    private function createHostSetting()
    {
        return $this->makeSetting('host', $default = '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_Host');
            $field->uiControl = FieldConfig::UI_CONTROL_URL;
            $field->description = Piwik::translate('ChatGPT_HostDescription');
        });
    }

    private function createApiKeySetting()
    {
        return $this->makeSetting('apiKey', $default = '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_ApiKey');
            $field->uiControl = FieldConfig::UI_CONTROL_PASSWORD;
            $field->description = Piwik::translate('ChatGPT_ApiKeyDescription');
        });
    }

    private function createModelSetting()
    {
        return $this->makeSetting('model', $default = '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_Model');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->description = Piwik::translate('ChatGPT_ModelDescriptionMeasurable');
            $field->availableValues = $this->getAvailableModelsForSetting();
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
        $useSystemDefault = Piwik::translate('ChatGPT_UseSystemDefault');
        $defaultModels = [
            '' => $useSystemDefault,
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

            // Fall back to system settings if not configured at site level
            if (empty($host) || empty($apiKey)) {
                $systemSettings = new SystemSettings();
                $host = $host ?: $systemSettings->host->getValue();
                $apiKey = $apiKey ?: $systemSettings->apiKey->getValue();
            }

            if (empty($host) || empty($apiKey)) {
                return $defaultModels;
            }

            // Check cache first
            $cacheKey = 'ChatGPT_models_' . md5($host);
            $cache = Cache::getLazyCache();
            $cachedModels = $cache->fetch($cacheKey);

            if ($cachedModels !== false && is_array($cachedModels) && !empty($cachedModels)) {
                return ['' => $useSystemDefault] + $cachedModels;
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

            return ['' => $useSystemDefault] + $models;
        } catch (\Exception $e) {
            return $defaultModels;
        }
    }

    private function createChatBasePromptSetting()
    {
        return $this->makeSetting('chatBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_ChatBasePrompt');
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = Piwik::translate('ChatGPT_ChatBasePromptDescription');
        });
    }

    private function createInsightBasePromptSetting()
    {
        return $this->makeSetting('insightBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('ChatGPT_InsightBasePrompt');
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = Piwik::translate('ChatGPT_InsightBasePromptDescription');
        });
    }
}
