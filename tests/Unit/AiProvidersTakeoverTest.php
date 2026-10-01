<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Unit;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\ChatGPT\Settings\AiProvidersTakeover;
use Piwik\Settings\FieldConfig;

/**
 * @group ChatGPT
 * @group AiProvidersTakeoverTest
 * @group Plugins
 */
class AiProvidersTakeoverTest extends TestCase
{
    public function test_theConnectionFields_areReadOnly_whenAiProvidersTakesOver(): void
    {
        foreach (AiProvidersTakeover::FIELDS as $settingName) {
            $field = new FieldConfig();

            AiProvidersTakeover::apply($field, $settingName, true, 'Notice', '<a href="#">Link</a>');

            $this->assertSame('disabled', $field->uiControlAttributes['disabled'] ?? null, $settingName);
        }
    }

    public function test_theNotice_isDisplayedOnce_aboveTheFirstField(): void
    {
        $fields = [];
        foreach (AiProvidersTakeover::FIELDS as $settingName) {
            $fields[$settingName] = new FieldConfig();
            AiProvidersTakeover::apply($fields[$settingName], $settingName, true, 'Notice', '<a href="#">Link</a>');
        }

        $this->assertSame('host', AiProvidersTakeover::FIELDS[0]);
        $this->assertSame('Notice', $fields['host']->introduction);
        $this->assertSame('<a href="#">Link</a>', $fields['host']->inlineHelp);
        foreach (['apiKey', 'modelPreset', 'modelCustom'] as $settingName) {
            $this->assertNull($fields[$settingName]->introduction, $settingName);
            $this->assertNull($fields[$settingName]->inlineHelp, $settingName);
        }
    }

    public function test_theFieldsAreEditable_whenAiProvidersDoesNotTakeOver(): void
    {
        foreach (AiProvidersTakeover::FIELDS as $settingName) {
            $field = new FieldConfig();

            AiProvidersTakeover::apply($field, $settingName, false, 'Notice', 'Link');

            $this->assertSame([], $field->uiControlAttributes, $settingName);
            $this->assertNull($field->introduction, $settingName);
            $this->assertNull($field->inlineHelp, $settingName);
        }
    }

    public function test_thePrompts_stayEditable_whenAiProvidersTakesOver(): void
    {
        foreach (['chatBasePrompt', 'insightBasePrompt'] as $settingName) {
            $field = new FieldConfig();

            AiProvidersTakeover::apply($field, $settingName, true, 'Notice', 'Link');

            $this->assertSame([], $field->uiControlAttributes, $settingName);
        }
    }

    public function test_theHelpOfTheFirstField_isKept_withoutLink(): void
    {
        $field = new FieldConfig();
        $field->inlineHelp = 'Existing help';

        AiProvidersTakeover::apply($field, 'host', true, 'Notice', '');

        $this->assertSame('Existing help', $field->inlineHelp);
        $this->assertSame('Notice', $field->introduction);
    }

    public function test_theOtherControlAttributes_areKept(): void
    {
        $field = new FieldConfig();
        $field->uiControlAttributes = ['placeholder' => 'sk-...'];

        AiProvidersTakeover::apply($field, 'apiKey', true, 'Notice', '');

        $this->assertSame(['placeholder' => 'sk-...', 'disabled' => 'disabled'], $field->uiControlAttributes);
    }
}
