<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

use Piwik\Common;
use Piwik\Piwik;

class Controller extends \Piwik\Plugin\Controller
{
    public function index()
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = Common::getRequestVar('idSite');
        $systemSettings = new SystemSettings();
        $measurableSettings = new MeasurableSettings($idSite);

        $host = $measurableSettings->host->getValue() ?: $systemSettings->host->getValue();
        $apiKey = $measurableSettings->apiKey->getValue() ?: $systemSettings->apiKey->getValue();
        $isCustomHost = $host !== ChatGPT::DEFAULT_HOST;

        // Plugin is configured if: custom host (API key optional) OR default host with API key
        $isConfigured = !empty($host) && ($isCustomHost || !empty($apiKey));

        return $this->renderTemplate('index', [
            'is_configured' => $isConfigured,
            'is_custom_host' => $isCustomHost,
        ]);
    }
}
