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
import ChatAgentSteps from './ChatAgentSteps.vue';
import { AgentStep } from '../../types';

vi.mock('CoreHome', () => ({
  translate: (key: string, ...values: unknown[]) => (values.length ? `${key}:${values.join(',')}` : key),
}));

const LONG_NAME = `matomo_${'very_long_tool_name_'.repeat(8)}get`;

function steps(...statuses: AgentStep['status'][]): AgentStep[] {
  return statuses.map((status, index) => ({
    id: `call_${index}`,
    name: index === 0 ? LONG_NAME : `matomo_tool_${index}`,
    title: `Tool ${index}`,
    status,
  }));
}

describe('ChatAgentSteps', () => {
  it('summarizes the running step and stays collapsed', () => {
    const wrapper = mount(ChatAgentSteps, { props: { steps: steps('done', 'running') } });
    const toggle = wrapper.find('.ai-chat-steps__toggle');

    expect(toggle.text()).toContain('ChatGPT_AgentToolStep:Tool 1');
    expect(toggle.attributes('aria-expanded')).toBe('false');
    expect(wrapper.find('.ai-chat-steps__status--running').exists()).toBe(true);
  });

  it('counts the tools and the failures once the answer is done', () => {
    const wrapper = mount(ChatAgentSteps, { props: { steps: steps('done', 'error', 'done') } });
    const toggle = wrapper.find('.ai-chat-steps__toggle');

    expect(toggle.text()).toContain('ChatGPT_AgentStepsSummary:3');
    expect(toggle.text()).toContain('ChatGPT_AgentStepsFailed:1');
  });

  it('expands to a timeline with each status and the full tool name', async () => {
    const wrapper = mount(ChatAgentSteps, {
      attachTo: document.body,
      props: { steps: steps('done', 'error') },
    });
    const toggle = wrapper.find('.ai-chat-steps__toggle');
    const list = wrapper.find(`#${toggle.attributes('aria-controls')}`);
    expect(list.isVisible()).toBe(false);

    await toggle.trigger('click');

    expect(toggle.attributes('aria-expanded')).toBe('true');
    expect(list.isVisible()).toBe(true);
    const items = list.findAll('li');
    expect(items[0].classes()).toContain('ai-chat-step--done');
    expect(items[0].text()).toContain('ChatGPT_AgentStepDone');
    expect(items[0].find('.ai-chat-step__name').text()).toBe(LONG_NAME);
    expect(items[1].classes()).toContain('ai-chat-step--error');
    expect(items[1].text()).toContain('ChatGPT_AgentStepError');
    wrapper.unmount();
  });
});
