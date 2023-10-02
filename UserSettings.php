<?php

namespace Piwik\Plugins\ChatGPT;

use Piwik\Settings\Setting;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

class UserSettings extends \Piwik\Settings\Plugin\UserSettings
{
  public $apiKey;

     protected function init()
    {
      $this->apiKey = $this->createApiKeySetting();
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

}
