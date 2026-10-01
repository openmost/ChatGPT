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
use Piwik\Plugins\ChatGPT\Agent\PluginDependencies;
use Piwik\Plugins\ChatGPT\tests\Fakes\FakePluginDependencies;

/**
 * @group ChatGPT
 * @group PluginDependenciesTest
 * @group Plugins
 */
class PluginDependenciesTest extends TestCase
{
    private const UNAVAILABLE = ['status' => PluginDependencies::AI_UNAVAILABLE, 'providerId' => null, 'providerName' => null];

    public function test_theAiProvidersServiceIsResolvedByTheClassOfTheAiProvidersPlugin(): void
    {
        $constant = new \ReflectionClassConstant(PluginDependencies::class, 'AI_PROVIDER_SERVICE');

        $this->assertSame('Piwik\Plugins\AIProviders\AIProviderService', $constant->getValue());
        if (class_exists('Piwik\Plugins\AIProviders\AIProviderService')) {
            $this->assertSame(\Piwik\Plugins\AIProviders\AIProviderService::class, $constant->getValue());
        }
    }

    /**
     * @dataProvider getPluginStates
     */
    public function test_getPluginState(string $scriptedState, string $expectedState): void
    {
        $dependencies = new FakePluginDependencies();
        $dependencies->plugins = [PluginDependencies::MCP_SERVER => $scriptedState];

        $this->assertSame($expectedState, $dependencies->getPluginState(PluginDependencies::MCP_SERVER));
    }

    public function getPluginStates(): array
    {
        return [
            'absent from the filesystem' => [PluginDependencies::PLUGIN_MISSING, PluginDependencies::PLUGIN_MISSING],
            'deactivated' => [PluginDependencies::PLUGIN_INACTIVE, PluginDependencies::PLUGIN_INACTIVE],
            'activated' => [PluginDependencies::PLUGIN_ACTIVE, PluginDependencies::PLUGIN_ACTIVE],
            'plugin manager failure' => [FakePluginDependencies::THROW, PluginDependencies::PLUGIN_MISSING],
        ];
    }

    public function test_aiProviders_isUnavailable_whenAbsentFromTheFilesystem(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->plugins[PluginDependencies::AI_PROVIDERS] = PluginDependencies::PLUGIN_MISSING;

        $this->assertSame(self::UNAVAILABLE, $dependencies->getAiProvidersAvailability());
        $this->assertFalse($dependencies->isAiProvidersConnected());
        $this->assertFalse($dependencies->isAiProvidersManaged());
        $this->assertSame(0, $dependencies->serviceCalls);
    }

    public function test_aiProviders_isUnavailable_whenDeactivated(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->plugins[PluginDependencies::AI_PROVIDERS] = PluginDependencies::PLUGIN_INACTIVE;

        $this->assertSame(self::UNAVAILABLE, $dependencies->getAiProvidersAvailability());
        $this->assertFalse($dependencies->isAiProvidersConnected());
        $this->assertSame(0, $dependencies->serviceCalls);
    }

    public function test_aiProviders_isNotConnected_whenActivatedWithoutProvider(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->availability = ['status' => PluginDependencies::AI_NOT_CONFIGURED, 'providerId' => null, 'providerName' => null];

        $this->assertSame(PluginDependencies::AI_NOT_CONFIGURED, $dependencies->getAiProvidersAvailability()['status']);
        $this->assertFalse($dependencies->isAiProvidersConnected());
    }

    public function test_aiProviders_isNotConnected_whenTheProviderDoesNotSupportConversations(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->availability = ['status' => PluginDependencies::AI_UNSUPPORTED, 'providerId' => 'custom', 'providerName' => 'Custom'];

        $this->assertSame(PluginDependencies::AI_UNSUPPORTED, $dependencies->getAiProvidersAvailability()['status']);
        $this->assertFalse($dependencies->isAiProvidersConnected());
    }

    public function test_aiProviders_isConnected_withAConfiguredProvider(): void
    {
        $dependencies = FakePluginDependencies::connected();

        $this->assertSame(
            ['status' => PluginDependencies::AI_READY, 'providerId' => 'openai', 'providerName' => 'OpenAI'],
            $dependencies->getAiProvidersAvailability()
        );
        $this->assertTrue($dependencies->isAiProvidersConnected());
    }

    /**
     * @dataProvider getFailures
     */
    public function test_aiProviders_degradesSilently_whenItsServiceFails(\Throwable $failure): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->availability = $failure;
        $dependencies->managed = $failure;

        $this->assertSame(self::UNAVAILABLE, $dependencies->getAiProvidersAvailability());
        $this->assertFalse($dependencies->isAiProvidersConnected());
        $this->assertFalse($dependencies->isAiProvidersManaged());
    }

    public function getFailures(): array
    {
        return [
            'exception' => [new \RuntimeException('Invalid configuration')],
            'error' => [new \Error('Call to undefined method')],
            'type error' => [new \TypeError('Unexpected argument')],
        ];
    }

    public function test_aiProviders_degradesSilently_whenItsServiceCannotBeLoaded(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->serviceMissing = true;

        $this->assertSame(self::UNAVAILABLE, $dependencies->getAiProvidersAvailability());
        $this->assertFalse($dependencies->isAiProvidersConnected());
        $this->assertFalse($dependencies->isAiProvidersManaged());
    }

    public function test_aiProviders_degradesSilently_whenThePluginManagerFails(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->plugins[PluginDependencies::AI_PROVIDERS] = FakePluginDependencies::THROW;

        $this->assertSame(self::UNAVAILABLE, $dependencies->getAiProvidersAvailability());
        $this->assertFalse($dependencies->isAiProvidersConnected());
    }

    /**
     * @dataProvider getInvalidAvailabilities
     */
    public function test_aiProviders_isUnavailable_whenTheServiceAnswersSomethingUnexpected($availability): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->availability = $availability;

        $this->assertSame(self::UNAVAILABLE, $dependencies->getAiProvidersAvailability());
        $this->assertFalse($dependencies->isAiProvidersConnected());
    }

    public function getInvalidAvailabilities(): array
    {
        return [
            'null' => [null],
            'string' => ['ready'],
            'no status' => [['providerId' => 'openai']],
            'status not a string' => [['status' => true]],
        ];
    }

    public function test_aiProviders_availabilityIsDetectedOncePerInstance(): void
    {
        $dependencies = FakePluginDependencies::connected();

        $dependencies->isAiProvidersConnected();
        $dependencies->getAiProvidersAvailability();
        $dependencies->isAiProvidersConnected();

        $this->assertSame(1, $dependencies->serviceCalls);
    }

    public function test_aiProviders_isManaged_whenTheProviderIsForcedFromTheConfiguration(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->managed = true;

        $this->assertTrue($dependencies->isAiProvidersManaged());
    }

    public function test_getAiProvidersService_failsLoudly_whenThePluginIsNotLoaded(): void
    {
        $dependencies = FakePluginDependencies::connected();
        $dependencies->serviceMissing = true;

        $this->expectException(\RuntimeException::class);

        $dependencies->getAiProvidersService();
    }
}
