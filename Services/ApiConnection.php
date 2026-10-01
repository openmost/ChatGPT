<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Exception;
use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\Settings\EffectiveSettings;
use Piwik\Plugins\ChatGPT\SystemSettings;

/**
 * Host, key and model of a request to the chat completions API of the plugin settings.
 *
 * The API key is optional on a custom host (self-hosted or compatible endpoint): no Authorization header is sent
 * without a key. The default OpenAI host always needs a key.
 */
final class ApiConnection
{
    /**
     * @return array{host: string, apiKey: string, model: string}
     * @throws Exception with a translated message when the settings cannot be used
     */
    public static function fromSettings(EffectiveSettings $settings): array
    {
        $host = trim($settings->getHost());
        $apiKey = trim($settings->getApiKey());
        $model = $settings->getModel();

        if ($host === '') {
            throw new Exception(Piwik::translate('ChatGPT_HostNotConfigured'));
        }

        if ($apiKey === '' && !$settings->isCustomHost()) {
            throw new Exception(Piwik::translate('ChatGPT_ApiKeyNotConfigured'));
        }

        if ($model === '') {
            throw new Exception(Piwik::translate('ChatGPT_ModelNotConfigured'));
        }

        if (!SystemSettings::isHttpsUrl($host)) {
            throw new Exception(Piwik::translate('ChatGPT_InvalidApiUrl'));
        }

        return [
            'host' => $host,
            'apiKey' => $apiKey,
            'model' => $model,
        ];
    }

    /**
     * HTTP headers of a request, without Authorization header when there is no API key
     *
     * @return list<string>
     */
    public static function headers(string $apiKey, string $accept = 'application/json'): array
    {
        $headers = [
            'Content-Type: application/json',
            'Accept: ' . $accept,
        ];

        if ($apiKey !== '') {
            $headers[] = 'Authorization: Bearer ' . $apiKey;
        }

        return $headers;
    }
}
