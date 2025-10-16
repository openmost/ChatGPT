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
use Piwik\Common;
use Piwik\Piwik;
use Piwik\Plugins\LogViewer\Log\Log;

/**
 * API for plugin ChatGPT
 *
 * @method static \Piwik\Plugins\ChatGPT\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    private $logger;

    public function __construct(\Piwik\Log\LoggerInterface $logger) {
        $this->logger = $logger;
    }

    public function getResponse($idSite, $period, $date, $messages = [])
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = Common::getRequestVar('idSite');
        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);
        $chatBasePrompt = $measurableSettings->chatBasePrompt->getValue() ?: $systemSettings->chatBasePrompt->getValue();

        $conversationBase = [
            [
                "role" => "system",
                "name" => "AI",
                "content" => $chatBasePrompt,
            ]
        ];

        return $this->fetchModelAi(array_merge($conversationBase, $messages));
    }

    public function getInsights($idSite, $period, $date, $reportId, $messages = [])
    {
        Piwik::checkUserHasSomeViewAccess();

        if(!$reportId){
            error_log('You must enter a valid reportId');
        }

        $idSite = Common::getRequestVar('idSite');
        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);
        $insightBasePrompt = $measurableSettings->insightBasePrompt->getValue() ?: $systemSettings->insightBasePrompt->getValue();

        $data = Request::processRequest($reportId, array(
            'idSite' => $idSite,
            'date' => $date,
            'period' => $period,
            'format' => 'json',
        ));

        $conversationBase = [
            [
                "role" => "system",
                "name" => "AI",
                "content" => "$insightBasePrompt $data",
            ]
        ];

        return $this->fetchModelAi(array_merge($conversationBase, $messages));
    }

    private function fetchModelAi($conversation)
    {
        $idSite = Common::getRequestVar('idSite');
        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);

        $host = $measurableSettings->host->getValue() ?: $systemSettings->host->getValue();
        $api_key = $measurableSettings->apiKey->getValue() ?: $systemSettings->apiKey->getValue();
        $modelCustom = $systemSettings->modelCustom->getValue();
        $modelPreset = $systemSettings->modelPreset->getValue();
        $model = !empty($modelCustom) ? $modelCustom : $modelPreset;

        if (!$host) {
            error_log('You must enter a valid host');
        }

        if (!$api_key) {
            error_log('You must enter a valid API Key');
        }

        if (!$model) {
            error_log('You must enter a valid model');
        }

        $data = [
            "model" => $model,
            "messages" => $conversation,
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
        $this->logger->info('Data provided to ChatGPT API: ' . json_encode($data));

        if (!$response) {
            error_log('An error occurred with the request');
        }

        curl_close($ch);

        return json_decode($response, true);
    }
}
