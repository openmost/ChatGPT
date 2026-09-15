/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import Chat from './Chat.vue';
import { AgentStatus } from '../../types';

vi.mock('CoreHome', async () => {
  const { defineComponent, h } = await import('vue');

  return {
    AjaxHelper: { fetch: vi.fn() },
    MatomoUrl: { parsed: { value: { idSite: '1', period: 'day', date: 'yesterday' } } },
    translate: (key: string, ...values: unknown[]) => (values.length ? `${key}:${values.join(',')}` : key),
    Alert: defineComponent({
      props: { severity: { type: String, default: '' } },
      setup(props, { slots }) {
        return () => h('div', { class: `alert alert-${props.severity}` }, slots.default?.());
      },
    }),
  };
});

const AGENT_READY: AgentStatus = {
  mode: 'agent',
  mcp: 'ready',
  ai: 'ready',
  providerName: 'OpenAI',
  toolCount: 19,
  canPerformActions: true,
};

const EMPTY_STREAM = {
  ok: true,
  body: { getReader: () => ({ read: async () => ({ done: true, value: undefined }) }) },
};

type ChatInstance = {
  onSubmit: (message?: { role: string, content: string }) => Promise<void>;
  parseAgentData: (data: string) => void;
  agentSteps: { id: string, status: string, title: string }[];
  streamingContent: string;
  errored: boolean;
  errorMessage: string;
};

let fetchMock: ReturnType<typeof vi.fn>;
const wrappers: VueWrapper[] = [];

function mockAgentStatus(status: Partial<AgentStatus> | null) {
  fetchMock.mockImplementation(async (url: string) => {
    if (url.includes('action=agentStatus')) {
      return status
        ? { ok: true, json: async () => ({ ...AGENT_READY, ...status }) }
        : { ok: false, json: async () => ({}) };
    }
    return EMPTY_STREAM;
  });
}

async function mountChat(): Promise<VueWrapper> {
  const wrapper = mount(Chat, {
    props: {
      aiName: 'chat-gpt',
      aiLabel: 'ChatGPT',
      apiMethod: 'ChatGPT.getResponse',
    },
  });
  wrappers.push(wrapper);
  await flushPromises();
  return wrapper;
}

function vm(wrapper: VueWrapper): ChatInstance {
  return wrapper.vm as unknown as ChatInstance;
}

function requestedUrls(): string[] {
  return fetchMock.mock.calls.map((call) => String(call[0]));
}

describe('Chat', () => {
  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.unstubAllGlobals();
  });

  it.each([
    ['not_installed', 'ready', 'ChatGPT_AgentMcpNotInstalled'],
    ['not_activated', 'ready', 'ChatGPT_AgentMcpNotActivated'],
    ['disabled', 'not_configured', 'ChatGPT_AgentMcpDisabled'],
    ['ready', 'not_configured', 'ChatGPT_AgentAiNotConfigured'],
    ['ready', 'unsupported', 'ChatGPT_AgentAiUnsupported'],
  ])('explains how to enable the agent (mcp %s, ai %s)', async (mcp, ai, expectedNotice) => {
    mockAgentStatus({ mode: 'chat', mcp, ai });

    const wrapper = await mountChat();

    expect(wrapper.find('.ai-chat-notice').text()).toBe(expectedNotice);
  });

  it('does not display a notice when the agent can perform actions', async () => {
    mockAgentStatus({});

    const wrapper = await mountChat();

    expect(wrapper.find('.ai-chat-notice').exists()).toBe(false);
  });

  it('explains that the agent is read-only without the full API access', async () => {
    mockAgentStatus({ canPerformActions: false });

    const wrapper = await mountChat();

    expect(wrapper.find('.ai-chat-notice').text()).toBe('ChatGPT_AgentReadOnly');
  });

  it('keeps the classic chat without notice when the agent status is unavailable', async () => {
    mockAgentStatus(null);

    const wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'Hello' });
    await flushPromises();

    expect(wrapper.find('.ai-chat-notice').exists()).toBe(false);
    expect(requestedUrls().some((url) => url.includes('module=API')
      && url.includes('method=ChatGPT.getStreamingResponse'))).toBe(true);
    expect(requestedUrls().some((url) => url.includes('action=agent&'))).toBe(false);
  });

  it('uses the classic chat when the agent is not ready', async () => {
    mockAgentStatus({ mode: 'chat', mcp: 'not_installed' });

    const wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'Hello' });
    await flushPromises();

    expect(requestedUrls().some((url) => url.includes('method=ChatGPT.getStreamingResponse'))).toBe(true);
  });

  it('sends the conversation to the agent when it is ready', async () => {
    mockAgentStatus({});

    const wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'How many visits?' });
    await flushPromises();

    const agentCall = fetchMock.mock.calls.find((call) => String(call[0]).includes('action=agent&'));
    expect(agentCall).toBeDefined();
    const body = agentCall![1].body as URLSearchParams;
    expect(JSON.parse(body.get('messages')!)).toEqual([{ role: 'user', content: 'How many visits?' }]);
    expect(body.get('force_api_session')).toBe('1');
  });

  it('builds the tool steps and the answer from the agent events', async () => {
    mockAgentStatus({});
    const wrapper = await mountChat();
    const chat = vm(wrapper);

    chat.parseAgentData(JSON.stringify({
      type: 'tool_call', id: 'call_1', name: 'matomo_site_list', title: 'List sites',
    }));
    chat.parseAgentData(JSON.stringify({ type: 'tool_result', id: 'call_1', isError: false }));
    chat.parseAgentData(JSON.stringify({
      type: 'tool_call', id: 'call_2', name: 'matomo_goal_get', title: '',
    }));
    chat.parseAgentData(JSON.stringify({ type: 'tool_result', id: 'call_2', isError: true }));
    chat.parseAgentData(JSON.stringify({ type: 'text', content: 'First part' }));
    chat.parseAgentData(JSON.stringify({ type: 'text', content: 'Second part' }));
    chat.parseAgentData('not json');

    expect(chat.agentSteps.map(({ id, status, title }) => ({ id, status, title }))).toEqual([
      { id: 'call_1', status: 'done', title: 'List sites' },
      { id: 'call_2', status: 'error', title: 'matomo_goal_get' },
    ]);
    expect(chat.streamingContent).toBe('First part\n\nSecond part');
  });

  it('displays the agent errors', async () => {
    mockAgentStatus({});
    const wrapper = await mountChat();

    vm(wrapper).parseAgentData(JSON.stringify({ type: 'error', message: 'Rate limit exceeded' }));
    await flushPromises();

    expect(vm(wrapper).errored).toBe(true);
    expect(wrapper.find('.alert-danger').text()).toBe('Rate limit exceeded');
  });
});
