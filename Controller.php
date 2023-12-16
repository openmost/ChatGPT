<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link     https://matomo.org
 * @license  http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\ChatGPT;

use Piwik\API\Request;
use Piwik\Common;
use Piwik\DataTable\Renderer\Json;
use Piwik\Piwik;
use Piwik\Session\SessionNamespace;
use Piwik\View;

class Controller extends \Piwik\Plugin\Controller
{
    public function index()
    {
        return $this->renderTemplate('index', array(
            'answerToLife' => 42,
            'siteName' => 'TEST'
        ));
    }
}