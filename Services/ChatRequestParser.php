<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

declare(strict_types=1);

namespace Piwik\Plugins\ChatGPT\Services;

use Piwik\Common;

/**
 * Reads the conversation and widget parameters posted by the chat, as JSON strings or arrays
 */
class ChatRequestParser
{
    private const ALLOWED_ROLES = ['system', 'user', 'assistant'];

    public function parseMessages($messages): array
    {
        return $this->parseJsonParam('messages', $messages);
    }

    public function parseWidgetParams($widgetParams): array
    {
        return $this->parseJsonParam('widgetParams', $widgetParams);
    }

    /**
     * Keeps only well formed messages with an allowed role, to prevent injection
     *
     * @param string[] $allowedRoles
     * @return list<array{role: string, content: string, name?: string}>
     */
    public function sanitizeConversation(array $conversation, array $allowedRoles = self::ALLOWED_ROLES): array
    {
        $sanitized = [];

        foreach ($conversation as $message) {
            if (!is_array($message)) {
                continue;
            }

            $role = $message['role'] ?? '';
            if (!in_array($role, $allowedRoles, true)) {
                continue;
            }

            $sanitizedMessage = [
                'role' => $role,
                'content' => (string) ($message['content'] ?? ''),
            ];

            if (isset($message['name']) && is_string($message['name']) && preg_match('/^[a-zA-Z0-9_-]+$/', $message['name'])) {
                $sanitizedMessage['name'] = $message['name'];
            }

            $sanitized[] = $sanitizedMessage;
        }

        return $sanitized;
    }

    private function parseJsonParam(string $name, $value): array
    {
        // First check $_POST directly
        if (!empty($_POST[$name])) {
            $decoded = $this->decode($_POST[$name]);
            if ($decoded !== null) {
                return $decoded;
            }
        }

        // Fallback to the request parameters
        if (empty($value) || !is_array($value)) {
            $postValue = Common::getRequestVar($name, '', 'string', $_POST);
            $decoded = $this->decode($postValue);
            if ($decoded !== null) {
                return $decoded;
            }
        }

        return $this->decode($value) ?? [];
    }

    private function decode($value): ?array
    {
        if (is_array($value)) {
            return $value;
        }

        if (is_string($value) && $value !== '') {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return $decoded;
            }
        }

        return null;
    }
}
