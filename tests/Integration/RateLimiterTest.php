<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Option;
use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\Services\RateLimiter;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group ChatGPT
 * @group ChatGPTRateLimiterTest
 * @group Plugins
 */
class RateLimiterTest extends IntegrationTestCase
{
    /** @var int */
    private $idSite;

    public function setUp(): void
    {
        parent::setUp();

        Fixture::createSuperUser();
        FakeAccess::clearAccess(true);
        $this->idSite = (int) Fixture::createWebsite('2024-01-01 00:00:00');

        StaticContainer::get('Piwik\Translation\Translator')->addDirectory(__DIR__ . '/../../lang');
    }

    public function test_check_countsTheRequests_belowTheLimit(): void
    {
        $limiter = new RateLimiter();
        $limiter->check($this->idSite);
        $limiter->check($this->idSite);

        $stored = json_decode((string) Option::get($this->getOptionName()), true);
        $this->assertSame(2, $stored['count']);
    }

    public function test_check_refusesTheRequest_withATranslatedMessage_onceTheLimitIsReached(): void
    {
        Option::set($this->getOptionName(), json_encode(['window_start' => time(), 'count' => 30]));

        try {
            (new RateLimiter())->check($this->idSite);
            $this->fail('The request over the limit must be refused');
        } catch (\Exception $e) {
            $this->assertSame(1, preg_match('/^Rate limit exceeded\. Please wait \d+ seconds before making another request\.$/', $e->getMessage()));
            $this->assertStringNotContainsString('ChatGPT_RateLimitExceeded', $e->getMessage());
        }
    }

    public function test_check_startsANewWindow_onceTheWindowHasExpired(): void
    {
        Option::set($this->getOptionName(), json_encode(['window_start' => time() - 7200, 'count' => 30]));

        (new RateLimiter())->check($this->idSite);

        $stored = json_decode((string) Option::get($this->getOptionName()), true);
        $this->assertSame(1, $stored['count']);
    }

    private function getOptionName(): string
    {
        return 'ChatGPT_ratelimit_' . $this->idSite . '_' . Piwik::getCurrentUserLogin();
    }
}
