/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { translate } from 'CoreHome';
import highlightCode from './highlightCode';

function wrapScrollable(element: Element, className: string, label: string): void {
  const wrapper = element.ownerDocument.createElement('div');
  wrapper.className = className;
  // keyboard users scroll a wide table or code block with the arrow keys once it has the focus
  wrapper.setAttribute('tabindex', '0');
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', label);
  element.replaceWith(wrapper);
  wrapper.appendChild(element);
}

/**
 * Wraps the tables and code blocks of already sanitized HTML in their own scrolling box, so a wide
 * answer never widens the conversation, and highlights the code. Only static attributes and text
 * nodes are added, nothing from the answer is parsed as HTML again.
 */
export default function wrapWideBlocks(safeHtml: string): string {
  if (!safeHtml || typeof document === 'undefined') {
    return safeHtml;
  }

  const template = document.createElement('template');
  template.innerHTML = safeHtml;
  template.content.querySelectorAll('table').forEach((table) => {
    wrapScrollable(table, 'ai-chat-table-scroll', translate('ChatGPT_ScrollableTable'));
  });
  template.content.querySelectorAll('pre code').forEach((code) => highlightCode(code));
  template.content.querySelectorAll('pre').forEach((pre) => {
    wrapScrollable(pre, 'ai-chat-code-scroll', translate('ChatGPT_ScrollableCode'));
    // the copy button sits outside the scrolling box, so it stays visible on long lines
    const block = template.ownerDocument.createElement('div');
    block.className = 'ai-chat-code-block';
    const scroll = pre.parentElement as HTMLElement;
    scroll.replaceWith(block);
    block.appendChild(scroll);
    const copy = template.ownerDocument.createElement('button');
    copy.type = 'button';
    copy.className = 'ai-chat-icon-button ai-chat-code-copy';
    copy.textContent = translate('ChatGPT_CopyCode');
    block.appendChild(copy);
  });

  return template.innerHTML;
}
