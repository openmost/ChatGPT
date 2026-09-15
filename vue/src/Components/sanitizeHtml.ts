/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import DOMPurify from 'dompurify';

// The markdown rendered in the chat comes from the AI model, whose answers are built from report
// data (page titles, referrers...) that third parties can control: treat it as untrusted HTML.

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'ul', 'ol', 'li',
  'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins',
  'a', 'code', 'pre', 'blockquote',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'input', // tasklists
];

const ALLOWED_ATTR = ['href', 'title', 'align', 'type', 'checked', 'disabled'];

// dedicated instance, so the hooks below do not apply to other DOMPurify users of the page
const purifier = DOMPurify(window);

purifier.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }

  // tasklist checkboxes only
  if (node.tagName === 'INPUT') {
    node.setAttribute('type', 'checkbox');
    node.setAttribute('disabled', 'disabled');
  }
});

export default function sanitizeHtml(html: string): string {
  if (!html) {
    return '';
  }

  return purifier.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
}
