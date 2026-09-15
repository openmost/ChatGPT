/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { describe, expect, it } from 'vitest';
import sanitizeHtml from './sanitizeHtml';

function parse(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = sanitizeHtml(html);
  return container;
}

describe('sanitizeHtml', () => {
  it('keeps the markdown formatting', () => {
    const container = parse('<h3>Title</h3><p><strong>Bold</strong> <code>x</code></p>'
      + '<table><thead><tr><th align="left">A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>'
      + '<ul><li>item</li></ul><pre><code>code</code></pre>');

    expect(container.querySelector('h3')?.textContent).toBe('Title');
    expect(container.querySelector('strong')).not.toBeNull();
    expect(container.querySelector('th')?.getAttribute('align')).toBe('left');
    expect(container.querySelector('li')?.textContent).toBe('item');
    expect(container.querySelector('pre code')).not.toBeNull();
  });

  it('keeps safe links and opens them in a new tab without opener', () => {
    const link = parse('<a href="https://matomo.org" title="Matomo">link</a>').querySelector('a');

    expect(link?.getAttribute('href')).toBe('https://matomo.org');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  // attack payloads under test
  /* eslint-disable no-script-url */
  it.each([
    ['javascript:alert(1)'],
    [' javascript:alert(1)'],
    ['\tjava\nscript:alert(1)'],
    ['&#x20;javascript:alert(1)'],
    ['JaVaScRiPt:alert(1)'],
    ['data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=='],
    ['vbscript:msgbox(1)'],
  /* eslint-enable no-script-url */
  ])('removes the unsafe link url %j', (href) => {
    const link = parse(`<a href="${href}">click</a>`).querySelector('a');

    expect(link?.getAttribute('href') ?? null).toBeNull();
    expect(link?.textContent).toBe('click');
  });

  it('removes scripts, event handlers and non allowed elements', () => {
    const html = sanitizeHtml('<p onclick="alert(1)">text</p><img src="x" onerror="alert(1)">'
      + '<script>alert(1)</script><iframe src="https://example.com"></iframe>'
      + '<svg><animate onbegin="alert(1)"/></svg><style>body{display:none}</style>');

    expect(html).toBe('<p>text</p>');
  });

  it('only renders disabled tasklist checkboxes', () => {
    const inputs = parse('<input type="checkbox" checked><input type="text" value="x">').querySelectorAll('input');

    inputs.forEach((input) => {
      expect(input.getAttribute('type')).toBe('checkbox');
      expect(input.hasAttribute('disabled')).toBe(true);
      expect(input.hasAttribute('value')).toBe(false);
    });
  });

  it('returns an empty string for empty input', () => {
    expect(sanitizeHtml('')).toBe('');
  });
});
