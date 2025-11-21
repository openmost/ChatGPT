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
            $field->title = 'Host';
            $field->uiControl = FieldConfig::UI_CONTROL_URL;
            $field->description = 'Change the host to connect your own GPT instance';
        });
    }

    private function createApiKeySetting()
    {
        return $this->makeSetting('apiKey', $default = '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'API Key';
            $field->uiControl = FieldConfig::UI_CONTROL_PASSWORD;
            $field->description = 'Add your ChatGPT API Key here';
        });
    }

    private function createModelSetting()
    {
        return $this->makeSetting('model', $default = '', FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
            $field->title = 'Model';
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->description = 'Select the model you want to use. Leave empty to use system default. Models are fetched dynamically from the API.';
            $field->availableValues = $this->getAvailableModelsForSetting();
        });
    }

    /**
     * Récupère les modèles disponibles depuis l'API ou retourne les valeurs par défaut
     */
    private function getAvailableModelsForSetting()
    {
        // Liste par défaut si l'API n'est pas disponible
        $defaultModels = array(
            '' => '(Use system default)',
            'o1-mini' => 'o1 mini',
            'o1' => 'o1',
            'gpt-4o' => 'GPT 4o',
            'gpt-4o-mini' => 'GPT 4o mini',
            'gpt-4' => 'GPT 4',
            'gpt-4-turbo' => 'GPT 4 Turbo',
            'gpt-3.5-turbo' => 'GPT 3.5 turbo',
        );

        try {
            // Essayer de récupérer les valeurs depuis les settings du site ou système
            $host = $this->host->getValue();
            $apiKey = $this->apiKey->getValue();

            // Si pas configuré au niveau du site, utiliser les settings système
            if (empty($host) || empty($apiKey)) {
                $systemSettings = new SystemSettings();
                $host = $host ?: $systemSettings->host->getValue();
                $apiKey = $apiKey ?: $systemSettings->apiKey->getValue();
            }

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
            $models = ['' => '(Use system default)'];
            foreach ($data['data'] as $model) {
                $modelId = $model['id'];
                // Filtrer les modèles pertinents pour le chat
                if (preg_match('/^(gpt|o1|o3|chatgpt)/i', $modelId)) {
                    $models[$modelId] = $modelId;
                }
            }

            if (count($models) <= 1) {
                return $defaultModels;
            }

            // Trier par nom (en gardant l'option vide en premier)
            $emptyOption = $models[''];
            unset($models['']);
            ksort($models);
            $models = ['' => $emptyOption] + $models;

            return $models;
        } catch (\Exception $e) {
            return $defaultModels;
        }
    }

    private function createChatBasePromptSetting()
    {
        return $this->makeSetting('chatBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Chat base prompt';
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = 'Adapt the prompt to get more precise answer in the chat feature';
        });
    }

    private function createInsightBasePromptSetting()
    {
        return $this->makeSetting('insightBasePrompt', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Insight base prompt';
            $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
            $field->description = 'Adapt the prompt to get more precise insights for your reports';
        });
    }
}
