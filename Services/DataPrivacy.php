<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Piwik\Piwik;
use Piwik\Plugins\ChatGPT\SystemSettings;

/**
 * The privacy settings applied to everything the plugin sends to the AI provider: nothing leaves Matomo until a super
 * user allows it, then e-mail and IP addresses, URL query strings and visitor-level reports are kept out as configured.
 */
class DataPrivacy
{
    public const SETTING_DATA_SHARING = 'dataSharingAllowed';
    public const SETTING_MASK_PERSONAL_DATA = 'maskPersonalData';
    public const SETTING_STRIP_QUERY_STRINGS = 'stripUrlQueryStrings';
    public const SETTING_EXCLUDE_VISITOR_DATA = 'excludeVisitorData';

    public const DEFAULTS = [
        self::SETTING_DATA_SHARING => false,
        self::SETTING_MASK_PERSONAL_DATA => true,
        self::SETTING_STRIP_QUERY_STRINGS => true,
        self::SETTING_EXCLUDE_VISITOR_DATA => true,
    ];

    /**
     * API modules whose reports hold one row per visit or visitor
     */
    public const VISITOR_LEVEL_MODULES = ['Live', 'UserId'];

    private const EMAIL_PATTERN = '/[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,}/iu';
    private const IPV4_PATTERN = '/(?<![\d.])(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?!\.?\d)/';
    // full form, or a compressed form with "::", so a time such as 12:30:45 is not taken for an address
    private const IPV6_PATTERN = '/(?<![\w:])(?:(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}|(?:[0-9a-f]{1,4}(?::[0-9a-f]{1,4}){0,6})?::(?:[0-9a-f]{1,4}(?::[0-9a-f]{1,4}){0,6})?)(?![\w:])/i';
    // a quote ends the query string, while an escaped quote of an encoded JSON string (\") is removed whole
    private const QUERY_STRING_PATTERN = '/\?(?:[^\s#"\'<>?\\\\]|\\\\")*=(?:[^\s#"\'<>\\\\]|\\\\")*/u';

    /** @var array<string, bool>|null */
    private $options;

    /**
     * @param array<string, bool>|null $options setting name => value, read from the general settings when null
     */
    public function __construct(?array $options = null)
    {
        $this->options = $options === null ? null : $options + self::DEFAULTS;
    }

    public function isDataSharingAllowed(): bool
    {
        return $this->getOption(self::SETTING_DATA_SHARING);
    }

    /**
     * The message displayed instead of an answer while the data sharing is not allowed, null once it is
     */
    public function getDataSharingError(): ?string
    {
        if ($this->isDataSharingAllowed()) {
            return null;
        }

        return Piwik::translate('ChatGPT_DataSharingNotAllowed');
    }

    public function excludesVisitorData(): bool
    {
        return $this->getOption(self::SETTING_EXCLUDE_VISITOR_DATA);
    }

    /**
     * Whether the report of this API method ("Live.getLastVisitsDetails") or module ("Live") is kept out
     */
    public function isMethodExcluded(string $method): bool
    {
        if (!$this->excludesVisitorData()) {
            return false;
        }

        $module = strtolower((string) preg_split('/[._]/', trim($method))[0]);
        foreach (self::VISITOR_LEVEL_MODULES as $visitorLevelModule) {
            if ($module === strtolower($visitorLevelModule)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Whether the arguments of a Matomo tool call target a visitor-level report that is kept out
     *
     * @param array<string, mixed> $arguments
     */
    public function isToolCallExcluded(array $arguments): bool
    {
        foreach (['method', 'module', 'apiModule', 'reportUniqueId'] as $name) {
            if (is_string($arguments[$name] ?? null) && $this->isMethodExcluded($arguments[$name])) {
                return true;
            }
        }

        return false;
    }

    public function redact(string $text): string
    {
        if ($this->getOption(self::SETTING_MASK_PERSONAL_DATA)) {
            $text = (string) preg_replace(self::EMAIL_PATTERN, '[email]', $text);
            $text = (string) preg_replace(self::IPV4_PATTERN, '[ip]', $text);
            $text = (string) preg_replace_callback(self::IPV6_PATTERN, static function (array $match): string {
                // a lone "::" is not an address
                return strlen(trim($match[0], ':')) > 0 ? '[ip]' : $match[0];
            }, $text);
        }
        if ($this->getOption(self::SETTING_STRIP_QUERY_STRINGS)) {
            $text = (string) preg_replace(self::QUERY_STRING_PATTERN, '', $text);
        }

        return $text;
    }

    /**
     * Redacts every string of a value, the keys of the arrays are kept as is
     *
     * @param mixed $value
     * @return mixed
     */
    public function redactValue($value)
    {
        if (is_string($value)) {
            return $this->redact($value);
        }
        if (is_array($value)) {
            foreach ($value as $key => $item) {
                $value[$key] = $this->redactValue($item);
            }
        }

        return $value;
    }

    private function getOption(string $name): bool
    {
        if ($this->options === null) {
            $this->options = self::readSettings();
        }

        return (bool) ($this->options[$name] ?? self::DEFAULTS[$name]);
    }

    /**
     * @return array<string, bool>
     */
    private static function readSettings(): array
    {
        try {
            $settings = new SystemSettings();
            $options = [];
            foreach (array_keys(self::DEFAULTS) as $name) {
                $options[$name] = (bool) $settings->$name->getValue();
            }

            return $options;
        } catch (\Throwable $e) {
            // unreadable settings never allow the data sharing
            return self::DEFAULTS;
        }
    }
}
