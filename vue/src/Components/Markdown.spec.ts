/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { mount } from '@vue/test-utils';
import {
  describe, expect, it, vi,
} from 'vitest';
import Markdown from './Markdown.vue';
import wrapWideBlocks from './wrapWideBlocks';
import sanitizeHtml from './sanitizeHtml';
import { tokenizeCode } from './highlightCode';

const LONG_TOKEN = 'x'.repeat(200);
const LONG_URL = `https://example.com/${'segment/'.repeat(20)}?pageUrl=${'a'.repeat(60)}`;
const COLUMNS = Array.from({ length: 10 }, (_, index) => `Column ${index + 1}`);

// what the markdown converter outputs for an answer mixing every block that can overflow
const OVERFLOW_FIXTURE_HTML = [
  '<h3>Weekly KPIs</h3>',
  `<table><thead><tr>${COLUMNS.map((name) => `<th>${name}</th>`).join('')}</tr></thead>`,
  `<tbody><tr>${COLUMNS.map(() => `<td>${LONG_TOKEN}</td>`).join('')}</tr></tbody></table>`,
  `<p>${LONG_TOKEN}</p>`,
  `<p><a href="${LONG_URL}">${LONG_URL}</a></p>`,
  '<ul><li>Level 1<ul><li>Level 2<ul><li>Level 3 <code>pageUrl=@%2Fcheckout%2F</code></li></ul></li></ul></li></ul>',
  `<pre><code>{"segment":"${LONG_TOKEN}"}</code></pre>`,
  '<img src="x" onerror="alert(1)"><script>alert(2)</script>',
].join('');

vi.mock('showdown', () => ({
  Converter: class {
    makeHtml(): string {
      return OVERFLOW_FIXTURE_HTML;
    }
  },
}));

vi.mock('CoreHome', () => ({
  translate: (key: string) => key,
}));

describe('Markdown', () => {
  it('sanitizes the rendered answer', () => {
    const wrapper = mount(Markdown, { props: { markdown: 'any answer' } });
    const html = wrapper.html();

    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('<img');
    const link = wrapper.find('a');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer');
  });

  it('puts tables and code blocks in their own keyboard scrollable box', () => {
    const wrapper = mount(Markdown, { props: { markdown: 'any answer' } });

    const tableBox = wrapper.find('.ai-chat-table-scroll');
    expect(tableBox.attributes('tabindex')).toBe('0');
    expect(tableBox.attributes('role')).toBe('region');
    expect(tableBox.attributes('aria-label')).toBe('ChatGPT_ScrollableTable');
    expect(tableBox.findAll('th')).toHaveLength(10);

    const codeBox = wrapper.find('.ai-chat-code-scroll');
    expect(codeBox.attributes('tabindex')).toBe('0');
    expect(codeBox.attributes('aria-label')).toBe('ChatGPT_ScrollableCode');
    expect(codeBox.find('pre code').exists()).toBe(true);
  });

  it('keeps the nested lists, the long token and the long URL as text', () => {
    const wrapper = mount(Markdown, { props: { markdown: 'any answer' } });

    expect(wrapper.findAll('ul ul ul li')).toHaveLength(1);
    expect(wrapper.text()).toContain(LONG_TOKEN);
    expect(wrapper.find('a').text()).toBe(LONG_URL);
  });

  it('only wraps after sanitizing, so an injected wrapper attribute never survives', () => {
    const unsafe = '<div class="ai-chat-table-scroll" onclick="alert(1)"><table><tr><td>1</td></tr></table></div>';
    const html = wrapWideBlocks(sanitizeHtml(unsafe));

    expect(html).not.toContain('onclick');
    expect(html).toBe(
      '<div class="ai-chat-table-scroll" tabindex="0" role="region" aria-label="ChatGPT_ScrollableTable">'
      + '<table><tbody><tr><td>1</td></tr></tbody></table></div>',
    );
  });

  it('highlights code blocks with text-only spans and adds a copy button', async () => {
    const writeText = vi.fn(async () => undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    vi.stubGlobal('isSecureContext', true);
    const wrapper = mount(Markdown, { props: { markdown: 'any answer' } });

    const code = wrapper.find('.ai-chat-code-block pre code');
    expect(code.find('.ai-chat-code-property').text()).toBe('"segment"');
    expect(code.text()).toBe(`{"segment":"${LONG_TOKEN}"}`);

    const copy = wrapper.find('.ai-chat-code-block .ai-chat-code-copy');
    expect(copy.text()).toBe('ChatGPT_CopyCode');
    await copy.trigger('click');
    await new Promise((resolve) => { setTimeout(resolve, 0); });

    expect(writeText).toHaveBeenCalledWith(`{"segment":"${LONG_TOKEN}"}`);
    expect(copy.text()).toBe('ChatGPT_CodeCopied');
    vi.unstubAllGlobals();
  });

  it('tokenizes a dataLayer snippet', () => {
    const tokens = tokenizeCode("// step\n_mtm.push({ event: 'pay', value: 2, ok: true });")
      .filter((token) => token.type)
      .map((token) => `${token.type}:${token.text}`);

    expect(tokens).toEqual([
      'comment:// step',
      'function:push',
      "string:'pay'",
      'number:2',
      'literal:true',
    ]);
  });

  it('never turns highlighted code into markup', () => {
    const html = wrapWideBlocks(sanitizeHtml('<pre><code>&lt;img src=x onerror=alert(1)&gt;</code></pre>'));

    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
  });
});
