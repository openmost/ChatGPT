<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT;

class ChatGPT extends \Piwik\Plugin
{

    public function registerEvents()
    {
        return [
            // 'Template.nextToCalendar' => 'addChatGPTButtonToControlBar',
        ];
    }

    public function addChatGPTButtonToControlBar()
    {
        echo '<div class="borderedControl piwikTopControl margin-left: 16px">
            <div class="piwikSelector">
            <a href="/index.php?module=ChatGPT&action=index" class="title" style="display: flex; align-items: center">
            
            <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px">
                <path d="M18.38 27.9399V13.5399L29.57 7.07993C35.77 3.49993 46.87 12.3299 42.21 20.4099" stroke="black" stroke-width="3" stroke-linejoin="round"/>
                <path d="M18.38 20.94L30.85 13.74L42.04 20.2C48.24 23.78 46.14 37.81 36.81 37.81" stroke="black" stroke-width="3" stroke-linejoin="round"/>
                <path d="M24.44 17.4399L36.91 24.6399V37.5699C36.91 44.7299 23.71 49.9299 19.05 41.8499" stroke="black" stroke-width="3" stroke-linejoin="round"/>
                <path d="M30.5 21.2V35.34L19.31 41.7999C13.11 45.3799 2.01002 36.5499 6.67002 28.4699" stroke="black" stroke-width="3" stroke-linejoin="round"/>
                <path d="M30.5 27.9401L18.03 35.1401L6.83997 28.6801C0.629975 25.0901 2.72997 11.0701 12.06 11.0701" stroke="black" stroke-width="3" stroke-linejoin="round"/>
                <path d="M24.44 31.44L11.97 24.24V11.31C11.97 4.15002 25.17 -1.04998 29.83 7.03002" stroke="black" stroke-width="3" stroke-linejoin="round"/>
            </svg>

            <span>Ask ChatGPT</span>
            
            </a>
            </div>
            </div>';


    }

}
