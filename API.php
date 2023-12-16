<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */

namespace Piwik\Plugins\ChatGPT;

/**
 * API for plugin ChatGPT
 *
 * @method static \Piwik\Plugins\ChatGPT\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    public function getChatGptResponse($idSite, $period, $date, $prompt)
    {
        $host = \Piwik\SettingsPiwik::getPiwikUrl();
        $tokenAuth = "c59d0eb4ff95cbe632a41e4c86f3707d"; // \Piwik\Piwik::getCurrentUserTokenAuth();

        $basePrompt = "You are Matomo Analytics expert and you know perfectly the Matomo Reporting API documentation.
        here is the host : $host
        here is the token auth : $tokenAuth
        here is the idSite : $idSite
        
        return only the url as a <a> html tag ready to click that redirect to the working API url asked in the user prompt.
        Don't add anything more and don't format in markdown, we only need the HTML tag. The <a> tag should have .btn class, the text is 'Do the action and add padding of 2 rtem a t the top with a ChatGPT icon in SVG before the text'.
        
        here is the user prompt : 
        $prompt";

        return $this->fetchChatGpt($basePrompt);
    }

    function fetchChatGpt($prompt)
    {
        $settings = new \Piwik\Plugins\ChatGPT\UserSettings();

        $api_key = $settings->apiKey->getValue();

        if (!$api_key) {
            error_log('You must enter a valid API Key');
        }

        if (!$prompt) {
            error_log('You must enter a valid prompt');
        }

        $data = [
            "model" => "gpt-4",
            "messages" => [
                [
                    "role" => "user",
                    "content" => htmlspecialchars($prompt),
                ],
            ],
            "temperature" => 1,
            "max_tokens" => 256,
            "top_p" => 1,
            "frequency_penalty" => 0,
            "presence_penalty" => 0,
        ];

        $headers = [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $api_key,
        ];

        $ch = curl_init('https://api.openai.com/v1/chat/completions');
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