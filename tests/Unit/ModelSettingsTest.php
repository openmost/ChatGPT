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
use Piwik\Plugins\ChatGPT\Config;
use Piwik\Plugins\ChatGPT\Settings\ModelUpgradeNotice;
use Piwik\Plugins\ChatGPT\Settings\SingleValue;
use Piwik\Plugins\ChatGPT\Settings\SiteSettingsStorage;

/**
 * @group ChatGPT
 * @group ModelSettingsTest
 * @group Plugins
 */
class ModelSettingsTest extends TestCase
{
    public function testLatestRecommendedResolvesToTheRecommendedModel(): void
    {
        $this->assertSame(Config::RECOMMENDED_MODEL, Config::resolveModel(Config::LATEST_RECOMMENDED_MODEL));
        $this->assertSame(Config::RECOMMENDED_MODEL, Config::resolveModel(''));
        $this->assertSame('gpt-5.1', Config::resolveModel(' gpt-5.1 '));
        $this->assertSame(Config::LATEST_RECOMMENDED_MODEL, Config::DEFAULT_MODEL);
    }

    public function testRecommendedModelIsListedAndNotDeprecated(): void
    {
        $this->assertArrayHasKey(Config::RECOMMENDED_MODEL, Config::getAvailableModels());
        $this->assertTrue(Config::isAvailableModel(Config::LATEST_RECOMMENDED_MODEL));

        foreach (array_keys(Config::getAvailableModels()) as $model) {
            $this->assertFalse(Config::isDeprecatedModel($model), $model);
        }
    }

    public function testRemovedModelsAreDeprecated(): void
    {
        $this->assertTrue(Config::isDeprecatedModel('chatgpt-4o-latest'));
        $this->assertTrue(Config::isDeprecatedModel('gpt-5-chat-latest'));
        $this->assertTrue(Config::isDeprecatedModel('gpt-4-turbo'));
        $this->assertFalse(Config::isAvailableModel('gpt-4-turbo'));
    }

    public function testReadsSiteValuesSavedByTheWebsiteForm(): void
    {
        $values = SiteSettingsStorage::fromStoredValues([
            'host' => '',
            'apiKey' => 'key',
            'modelPreset' => ['gpt-5.4-mini'],
            'modelCustom' => '',
            'chatBasePrompt' => 'Chat',
            'model' => ['gpt-4o'],
        ]);

        $this->assertSame('gpt-5.4-mini', $values['modelPreset']);
        $this->assertSame('', $values['modelCustom']);
        $this->assertSame('key', $values['apiKey']);
        $this->assertSame('Chat', $values['chatBasePrompt']);
        $this->assertSame('', $values['insightBasePrompt']);
    }

    public function testReadsTheLegacyModelWhenTheModelSettingsWereNeverSaved(): void
    {
        $this->assertSame('gpt-4o', SiteSettingsStorage::fromStoredValues([
            'model' => ['gpt-4o'],
        ])['modelPreset']);

        // a legacy model that is no longer listed is kept as a custom model
        $values = SiteSettingsStorage::fromStoredValues(['model' => ['chatgpt-4o-latest']]);
        $this->assertSame('', $values['modelPreset']);
        $this->assertSame('chatgpt-4o-latest', $values['modelCustom']);

        // an empty preset saved by the website form means the general settings apply
        $this->assertSame('', SiteSettingsStorage::fromStoredValues([
            'modelPreset' => [''],
            'model' => ['gpt-4o'],
        ])['modelPreset']);
        $this->assertSame('', SiteSettingsStorage::fromStoredValues(['model' => ['']])['modelPreset']);
    }

    public function testUnwrap(): void
    {
        $this->assertSame('a', SingleValue::toString(['a']));
        $this->assertSame('a', SingleValue::toString(' a '));
        $this->assertSame('', SingleValue::toString([]));
        $this->assertSame('', SingleValue::toString(null));
    }

    public function testClassifiesModelErrors(): void
    {
        $this->assertSame(ModelUpgradeNotice::REASON_UNAVAILABLE, ModelUpgradeNotice::classifyApiError(
            404,
            '{"error":{"message":"The model `gpt-4-turbo` does not exist or you do not have access to it.","type":"invalid_request_error","param":null,"code":"model_not_found"}}'
        ));

        $this->assertNull(ModelUpgradeNotice::classifyApiError(
            429,
            '{"error":{"message":"You exceeded your current quota.","type":"insufficient_quota","param":null,"code":"insufficient_quota"}}'
        ));
        $this->assertNull(ModelUpgradeNotice::classifyApiError(
            401,
            '{"error":{"message":"Incorrect API key provided.","type":"invalid_request_error","param":null,"code":"invalid_api_key"}}'
        ));
    }
}
