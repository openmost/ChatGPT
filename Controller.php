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

/**
 * A controller lets you for example create a page that can be added to a menu. For more information read our guide
 * http://developer.piwik.org/guides/mvc-in-piwik or have a look at the our API references for controller and view:
 * http://developer.piwik.org/api-reference/Piwik/Plugin/Controller and
 * http://developer.piwik.org/api-reference/Piwik/View
 */
class Controller extends \Piwik\Plugin\Controller
{
    /**
     * @throws \Exception
     */
    public function index()
    {
        Piwik::checkUserHasSomeViewAccess();

        $idSite = Common::getRequestVar('idSite');
        $systemSettings = new \Piwik\Plugins\ChatGPT\SystemSettings();
        $measurableSettings = new \Piwik\Plugins\ChatGPT\MeasurableSettings($idSite);
        $api_key = $measurableSettings->apiKey->getValue() ?: $systemSettings->apiKey->getValue();

        return $this->renderTemplate('index', array(
            'api_key' => $api_key
        ));
    }
}
