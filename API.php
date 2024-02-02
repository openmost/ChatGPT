<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\API\Request;

/**
 * API for plugin ChatGPT
 *
 * @method static \Piwik\Plugins\ChatGPT\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    public function getResponse($idSite, $period, $date, $prompt)
    {
        $settings = new \Piwik\Plugins\ChatGPT\SystemSettings();
        $chatBasePrompt = $settings->chatBasePrompt->getValue() ?: "You are a Matomo expert and know everything about digital analytics. Your answer should be complete and precise.";

        return $this->fetchChatGPT("$chatBasePrompt $prompt");
    }

    public function getInsights($idSite, $period, $date, $reportId)
    {
        $data = Request::processRequest($reportId, array(
            'idSite' => $idSite,
            'date' => $date,
            'period' => $period,
            'format' => 'json',
        ));

        $settings = new \Piwik\Plugins\ChatGPT\SystemSettings();
        $insightBasePrompt = $settings->insightBasePrompt->getValue() ?: "Give me insights from the dataset formatted in JSON provided below, add bold style to most important metrics of your answer :";

        return $this->fetchChatGPT("$insightBasePrompt $data");
    }

    function fetchChatGPT($prompt)
    {
        $settings = new \Piwik\Plugins\ChatGPT\SystemSettings();
        $host = $settings->host->getValue();
        $api_key = $settings->apiKey->getValue();
        $model = $settings->model->getValue();

        if (!$host) {
            error_log('You must enter a valid host');
        }

        if (!$api_key) {
            error_log('You must enter a valid API Key');
        }

        if (!$model) {
            error_log('You must enter a valid model');
        }

        if (!$prompt) {
            error_log('You must enter a valid prompt');
        }

        $data = [
            "model" => $model[0],
            "messages" => [
                [
                    "role" => "user",
                    "content" => urldecode($prompt)
                ]
            ]
        ];

        $headers = [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $api_key,
        ];

        $ch = curl_init($host);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Send data as JSON
        $response = curl_exec($ch);

        if (!$response) {
            error_log('An error occurred with the request');
        }

        curl_close($ch);

        return json_decode($response, true);
    }
}
