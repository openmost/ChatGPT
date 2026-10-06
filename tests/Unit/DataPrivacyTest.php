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
use Piwik\Plugins\ChatGPT\Services\DataPrivacy;

/**
 * @group ChatGPT
 * @group DataPrivacyTest
 * @group Plugins
 */
class DataPrivacyTest extends TestCase
{
    public function test_dataSharing_isNotAllowedByDefault(): void
    {
        $privacy = new DataPrivacy([]);

        $this->assertFalse($privacy->isDataSharingAllowed());
        $this->assertNotNull($privacy->getDataSharingError());
    }

    public function test_dataSharing_isAllowedOnceASuperUserAllowsIt(): void
    {
        $privacy = new DataPrivacy([DataPrivacy::SETTING_DATA_SHARING => true]);

        $this->assertTrue($privacy->isDataSharingAllowed());
        $this->assertNull($privacy->getDataSharingError());
    }

    /**
     * @dataProvider getRedactedTexts
     */
    public function test_redact_masksPersonalDataAndQueryStrings_byDefault(string $text, string $expected): void
    {
        $this->assertSame($expected, (new DataPrivacy([]))->redact($text));
    }

    public function getRedactedTexts(): array
    {
        return [
            'e-mail' => ['Contact jane.doe+news@example.co.uk now', 'Contact [email] now'],
            'ipv4' => ['Visit from 192.168.12.34.', 'Visit from [ip].'],
            'ipv6 full' => ['2001:0db8:85a3:0000:0000:8a2e:0370:7334', '[ip]'],
            'ipv6 compressed' => ['from 2001:db8::1 today', 'from [ip] today'],
            'query string' => ['/checkout?email=jane%40example.com&step=2', '/checkout'],
            'full url' => ['https://example.com/a/b?utm_source=x#top', 'https://example.com/a/b#top'],
            'time is kept' => ['Visited at 12:30:45', 'Visited at 12:30:45'],
            'version is kept' => ['Matomo 5.4.0', 'Matomo 5.4.0'],
            'question is kept' => ['Is it up? Yes', 'Is it up? Yes'],
            'lone colons are kept' => ['Module::method', 'Module::method'],
        ];
    }

    public function test_redact_keepsTheEscapedQuotesOfAnEncodedJsonString(): void
    {
        $json = (string) json_encode(['label' => '/search?q="shoes"'], JSON_UNESCAPED_SLASHES);

        $this->assertSame(['label' => '/search'], json_decode((new DataPrivacy([]))->redact($json), true));
    }

    public function test_redact_keepsEverything_whenTheMaskingIsTurnedOff(): void
    {
        $privacy = new DataPrivacy([
            DataPrivacy::SETTING_MASK_PERSONAL_DATA => false,
            DataPrivacy::SETTING_STRIP_QUERY_STRINGS => false,
        ]);

        $this->assertSame('jane@example.com 10.0.0.1 /a?b=c', $privacy->redact('jane@example.com 10.0.0.1 /a?b=c'));
    }

    public function test_redactValue_redactsTheNestedStrings_andKeepsTheKeysAndNumbers(): void
    {
        $value = ['rows' => [['label' => 'jane@example.com', 'nb_visits' => 3, 'jane@example.com' => 'key']]];

        $this->assertSame(
            ['rows' => [['label' => '[email]', 'nb_visits' => 3, 'jane@example.com' => 'key']]],
            (new DataPrivacy([]))->redactValue($value)
        );
    }

    public function test_visitorLevelReports_areExcludedByDefault_untilASuperUserAllowsThem(): void
    {
        $this->assertTrue((new DataPrivacy([]))->isMethodExcluded('Live.getLastVisitsDetails'));
        $this->assertFalse(
            (new DataPrivacy([DataPrivacy::SETTING_EXCLUDE_VISITOR_DATA => false]))->isMethodExcluded('Live.getLastVisitsDetails')
        );

        $privacy = new DataPrivacy([DataPrivacy::SETTING_EXCLUDE_VISITOR_DATA => true]);
        $this->assertTrue($privacy->isMethodExcluded('Live.getLastVisitsDetails'));
        $this->assertTrue($privacy->isMethodExcluded('live'));
        $this->assertTrue($privacy->isMethodExcluded('UserId_getUsers'));
        $this->assertFalse($privacy->isMethodExcluded('VisitsSummary.get'));
        $this->assertFalse($privacy->isMethodExcluded('Liveliness.get'));
    }

    public function test_isToolCallExcluded_readsTheMethodAndModuleArguments(): void
    {
        $privacy = new DataPrivacy([DataPrivacy::SETTING_EXCLUDE_VISITOR_DATA => true]);

        $this->assertTrue($privacy->isToolCallExcluded(['method' => 'Live.getVisitorProfile']));
        $this->assertTrue($privacy->isToolCallExcluded(['module' => 'Live', 'action' => 'getLastVisitsDetails']));
        $this->assertTrue($privacy->isToolCallExcluded(['apiModule' => 'UserId', 'apiAction' => 'getUsers']));
        $this->assertTrue($privacy->isToolCallExcluded(['reportUniqueId' => 'Live_getLastVisitsDetails']));
        $this->assertFalse($privacy->isToolCallExcluded(['apiModule' => 'Actions', 'apiAction' => 'getPageUrls']));
        $this->assertFalse($privacy->isToolCallExcluded([]));
    }
}
