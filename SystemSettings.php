<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

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
        return $this->makeSetting('host', $default = 'https://api.openai.com/v1/chat/completions', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Host';
            $field->uiControl = FieldConfig::UI_CONTROL_URL;
            $field->description = 'Change the host to connect your own GPT instance';
            $field->validators[] = new NotEmpty();
        });
    }

    private function createApiKeySetting()
    {
        return $this->makeSetting('apiKey', $default = null, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'API Key';
            $field->uiControl = FieldConfig::UI_CONTROL_PASSWORD;
            $field->description = 'Add your ChatGPT API Key here';
            $field->validators[] = new NotEmpty();
        });
    }

    private function createModelSetting()
    {
        return $this->makeSetting('model', $default = '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $field->title = 'Model';
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->description = 'Select the model you want to use. Models are fetched dynamically from the API when Host and API Key are configured.';
            $field->availableValues = $this->getAvailableModelsForSetting();
            $field->validators[] = new NotEmpty();
        });
    }

    /**
     * Récupère les modèles disponibles depuis l'API ou retourne les valeurs par défaut
     */
    private function getAvailableModelsForSetting()
    {
        // Liste par défaut si l'API n'est pas disponible
        $defaultModels = array(
            'o1-mini' => 'o1 mini',
            'o1' => 'o1',
            'gpt-4o' => 'GPT 4o',
            'gpt-4o-mini' => 'GPT 4o mini',
            'gpt-4' => 'GPT 4',
            'gpt-4-turbo' => 'GPT 4 Turbo',
            'gpt-3.5-turbo' => 'GPT 3.5 turbo',
        );

        try {
            // Essayer de récupérer les valeurs sauvegardées pour host et apiKey
            $host = $this->host->getValue();
            $apiKey = $this->apiKey->getValue();

            if (empty($host) || empty($apiKey)) {
                return $defaultModels;
            }

            // Construire l'URL pour l'endpoint /models
            $baseUrl = preg_replace('#/v1/.*$#', '/v1', $host);
            $modelsUrl = $baseUrl . '/models';

            $headers = [
                'Content-Type: application/json',
                'Accept: application/json',
                'Authorization: Bearer ' . $apiKey,
            ];

            $ch = curl_init($modelsUrl);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if (!$response || $httpCode !== 200) {
                return $defaultModels;
            }

            $data = json_decode($response, true);

            if (!isset($data['data']) || !is_array($data['data'])) {
                return $defaultModels;
            }

            // Filtrer et trier les modèles (garder seulement les modèles de chat/completion)
            $models = [];
            foreach ($data['data'] as $model) {
                $modelId = $model['id'];
                // Filtrer les modèles pertinents pour le chat
                if (preg_match('/^(gpt|o1|o3|chatgpt)/i', $modelId)) {
                    $models[$modelId] = $modelId;
                }
            }

            if (empty($models)) {
                return $defaultModels;
            }

            // Trier par nom
            ksort($models);

            return $models;
        } catch (\Exception $e) {
            return $defaultModels;
        }
    }

    private function createChatBasePromptSetting()
    {
        return $this->makeSetting('chatBasePrompt', $default = 'You are a Matomo expert and know everything about digital analytics. Your answer should be complete and precise.', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Chat base prompt';
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = 'Adapt the prompt to get more precise answer in the chat feature';
            $field->validators[] = new NotEmpty();
        });
    }

    private function createInsightBasePromptSetting()
    {
        return $this->makeSetting('insightBasePrompt', $default = 'Give me insights from the dataset formatted in JSON provided below, add bold style to most important metrics of your answer :', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Insight base prompt';
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = 'Adapt the prompt to get more precise insights for your reports';
            $field->validators[] = new NotEmpty();
        });
    }
}
