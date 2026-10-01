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
use Piwik\Plugins\ChatGPT\ChatGPT;

/**
 * A key translated in the Vue sources but missing from the client side keys is displayed as a raw key.
 *
 * @group ChatGPT
 * @group ClientSideTranslationsTest
 * @group Plugins
 */
class ClientSideTranslationsTest extends TestCase
{
    public function test_everyKeyTranslatedInTheVueSources_isLoadedClientSide(): void
    {
        $usedKeys = $this->getKeysTranslatedInVueSources();
        $this->assertNotEmpty($usedKeys);

        $clientSideKeys = [];
        (new \ReflectionClass(ChatGPT::class))->newInstanceWithoutConstructor()->getClientSideTranslationKeys($clientSideKeys);

        $this->assertSame([], array_values(array_diff($usedKeys, $clientSideKeys)));
    }

    public function test_everyClientSideKey_existsInTheEnglishTranslations(): void
    {
        $clientSideKeys = [];
        (new \ReflectionClass(ChatGPT::class))->newInstanceWithoutConstructor()->getClientSideTranslationKeys($clientSideKeys);

        $english = json_decode((string) file_get_contents(__DIR__ . '/../../lang/en.json'), true);
        foreach ($clientSideKeys as $key) {
            [$plugin, $name] = explode('_', $key, 2);
            if ($plugin === 'ChatGPT') {
                $this->assertArrayHasKey($name, $english['ChatGPT'], $key);
            }
        }
    }

    /**
     * @return string[]
     */
    private function getKeysTranslatedInVueSources(): array
    {
        $keys = [];
        $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator(__DIR__ . '/../../vue/src', \FilesystemIterator::SKIP_DOTS));
        foreach ($files as $file) {
            $path = (string) $file;
            if (!preg_match('/\.(vue|ts)$/', $path) || preg_match('/\.spec\.ts$/', $path)) {
                continue;
            }
            preg_match_all('/translate\(\s*[\'"]([A-Za-z0-9]+_[A-Za-z0-9]+)[\'"]/', (string) file_get_contents($path), $matches);
            $keys = array_merge($keys, $matches[1]);
        }

        $keys = array_values(array_unique($keys));
        sort($keys);

        return $keys;
    }
}
