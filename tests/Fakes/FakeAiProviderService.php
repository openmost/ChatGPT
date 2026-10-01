<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\tests\Fakes;

/**
 * Stands for the AIProviderService of the AIProviders plugin, which may be missing
 */
class FakeAiProviderService
{
    /** @var mixed */
    private $availability;

    /** @var bool|\Throwable */
    private $managed;

    /**
     * @param mixed $availability thrown when it is a \Throwable
     * @param bool|\Throwable $managed thrown when it is a \Throwable
     */
    public function __construct($availability, $managed)
    {
        $this->availability = $availability;
        $this->managed = $managed;
    }

    /**
     * @return mixed
     */
    public function getConversationAvailability()
    {
        if ($this->availability instanceof \Throwable) {
            throw $this->availability;
        }

        return $this->availability;
    }

    /** @var list<\Piwik\Plugins\AIProviders\AIConversationRequest> */
    public $conversations = [];

    /** @var list<\Piwik\Plugins\AIProviders\AIConversationResponse> */
    public $responses = [];

    /**
     * @param \Piwik\Plugins\AIProviders\AIConversationRequest $request
     * @return \Piwik\Plugins\AIProviders\AIConversationResponse
     */
    public function converse($request)
    {
        $this->conversations[] = $request;

        return array_shift($this->responses);
    }

    public function isManaged(): bool
    {
        if ($this->managed instanceof \Throwable) {
            throw $this->managed;
        }

        return $this->managed;
    }
}
