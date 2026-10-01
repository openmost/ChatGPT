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
import ChatForm from './ChatForm.vue';

vi.mock('CoreHome', () => ({
  translate: (key: string, ...values: unknown[]) => (values.length ? `${key}:${values.join(',')}` : key),
}));

function mountForm(loading = false) {
  return mount(ChatForm, { props: { aiLabel: 'ChatGPT', loading } });
}

describe('ChatForm', () => {
  it('sends the prompt on Enter and clears the input', async () => {
    const wrapper = mountForm();
    const input = wrapper.find('textarea');
    await input.setValue('How many visits?');
    await input.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('prompt')).toEqual([[{ role: 'user', content: 'How many visits?' }]]);
    expect((input.element as HTMLTextAreaElement).value).toBe('');
  });

  it('adds a new line on Shift+Enter instead of sending', async () => {
    const wrapper = mountForm();
    const input = wrapper.find('textarea');
    await input.setValue('First line');
    await input.trigger('keydown', { key: 'Enter', shiftKey: true });

    expect(wrapper.emitted('prompt')).toBeUndefined();
  });

  it('does not send while an IME composition is validated', async () => {
    const wrapper = mountForm();
    const input = wrapper.find('textarea');
    await input.setValue('分析');
    await input.trigger('keydown', { key: 'Enter', isComposing: true });

    expect(wrapper.emitted('prompt')).toBeUndefined();
  });

  it('never sends an empty prompt, nor while an answer is loading', async () => {
    const empty = mountForm();
    await empty.find('textarea').setValue('   ');
    await empty.find('textarea').trigger('keydown', { key: 'Enter' });
    expect(empty.emitted('prompt')).toBeUndefined();
    expect(empty.find('button[type="submit"]').attributes('disabled')).toBeDefined();

    const loading = mountForm(true);
    await loading.find('textarea').setValue('Hello');
    await loading.find('textarea').trigger('keydown', { key: 'Enter' });
    expect(loading.emitted('prompt')).toBeUndefined();
  });

  it('labels the input and the icon-only send button', () => {
    const wrapper = mountForm();
    const input = wrapper.find('textarea');
    const label = wrapper.find(`label[for="${input.attributes('id')}"]`);

    expect(label.text()).toBe('ChatGPT_MessagePlaceholder:ChatGPT');
    expect(wrapper.find('button[type="submit"]').attributes('aria-label')).toBe('ChatGPT_Submit');
    expect(wrapper.find(`#${input.attributes('aria-describedby')}`).text()).toBe('ChatGPT_ComposerHint');
  });

  it('grows with the typed lines, up to six rows', async () => {
    const wrapper = mountForm();
    const input = wrapper.find('textarea');

    expect(input.attributes('rows')).toBe('1');
    await input.setValue('a\nb\nc');
    expect(input.attributes('rows')).toBe('3');
    await input.setValue('1\n2\n3\n4\n5\n6\n7\n8\n9');
    expect(input.attributes('rows')).toBe('6');
  });
});
