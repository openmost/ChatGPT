<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Unit;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\ChatGPT\OpenmostCommunication;

/**
 * @group ChatGPT
 * @group OpenmostCommunicationUrlTest
 * @group Plugins
 */
class OpenmostCommunicationUrlTest extends TestCase
{
    private const UTM = 'utm_source=matomo_onpremise&utm_medium=banner&utm_campaign=ai_chatbots_tracking&utm_content=chatgpt';

    public function test_siteLocale_mapsMatomoLanguagesToWebsiteLocales(): void
    {
        $expected = [
            'en' => 'en', 'en-gb' => 'en', 'fr' => 'fr', 'de' => 'de', 'es-ar' => 'es', 'pt-br' => 'pt', 'pt' => 'pt',
            'zh-cn' => 'zh-hans', 'zh-tw' => 'zh-hant', 'ZH_CN' => 'zh-hans', 'ar' => 'ar', 'ja' => 'ja', 'pl' => 'pl',
            'nl' => 'nl', 'it' => 'it', 'ru' => 'en', 'zh' => 'en', '' => 'en',
        ];

        foreach ($expected as $language => $locale) {
            $this->assertSame($locale, OpenmostCommunication::siteLocale($language), "language '$language'");
        }
    }

    public function test_campaignUrl_linksToTheLocalizedPage_whenTheSiteServesTheLocale(): void
    {
        $this->assertSame(
            'https://openmost.com/fr/matomo/services/suivi-recherche-ia?' . self::UTM,
            $this->url('ai_chatbots_tracking', 'fr')
        );
        $this->assertSame(
            'https://openmost.com/zh-hans/matomo/services/ai-search-tracking?' . self::UTM,
            $this->url('ai_chatbots_tracking', 'zh-cn')
        );
        $this->assertStringStartsWith(
            'https://openmost.com/de/matomo/dienstleistungen/tracking-konzept?',
            $this->url('tracking_plan', 'de')
        );
    }

    public function test_campaignUrl_linksToTheEnglishPage_whenTheSiteDoesNotServeTheLanguage(): void
    {
        $this->assertSame('https://openmost.com/matomo/services/ai-search-tracking?' . self::UTM, $this->url('ai_chatbots_tracking', 'ru'));
        $this->assertSame('https://openmost.com/matomo/services/ai-search-tracking?' . self::UTM, $this->url('ai_chatbots_tracking', 'en'));
    }

    public function test_campaignUrl_linksToTheEnglishPage_whenTheUserLanguageFails(): void
    {
        $url = OpenmostCommunication::campaignUrl('ai_chatbots_tracking', 'ChatGPT', function () {
            throw new \RuntimeException('No language');
        });

        $this->assertSame('https://openmost.com/matomo/services/ai-search-tracking?' . self::UTM, $url);
    }

    public function test_campaignUrl_keepsTheSameUtmParametersInEveryLanguage(): void
    {
        foreach (['ai_chatbots_tracking', 'tracking_plan'] as $campaign) {
            $queries = [];
            foreach (['en', 'fr', 'ar', 'zh-cn', 'pt-br', 'ja'] as $language) {
                $queries[$language] = parse_url($this->url($campaign, $language), PHP_URL_QUERY);
            }

            $this->assertSame(
                'utm_source=matomo_onpremise&utm_medium=banner&utm_campaign=' . $campaign . '&utm_content=chatgpt',
                $queries['en']
            );
            $this->assertCount(1, array_unique($queries), "$campaign: " . json_encode($queries));
        }
    }

    private function url(string $campaign, string $language): string
    {
        return OpenmostCommunication::campaignUrl($campaign, 'ChatGPT', function () use ($language) {
            return $language;
        });
    }
}
