/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/* eslint-disable @typescript-eslint/no-var-requires, global-require */

// provided by the Matomo client test runner
// eslint-disable-next-line import/no-extraneous-dependencies
import { flushPromises, mount } from '@vue/test-utils';
import { MatomoUrl } from 'CoreHome';
import Chat from './Chat.vue';
import { AgentStatus, Recommendation } from '../../types';

// the jsdom version of the Matomo 5 test runner has no TextDecoder, used to read the streams
const testWindow = window as unknown as { TextDecoder?: unknown, TextEncoder?: unknown };
if (!testWindow.TextDecoder) {
  testWindow.TextDecoder = require('util').TextDecoder;
}
if (!testWindow.TextEncoder) {
  testWindow.TextEncoder = require('util').TextEncoder;
}

// the markdown renderer dependencies (showdown) are installed in the plugin, they are not available
// to the Matomo client test runner: render the raw markdown instead
jest.mock('../Markdown.vue', () => {
  const { defineComponent, h } = require('vue');

  return {
    __esModule: true,
    default: defineComponent({
      props: { markdown: { type: String, default: '' } },
      setup(props: { markdown: string }) {
        return () => h('div', { class: 'markdown-wrapper' }, props.markdown);
      },
    }),
  };
});

jest.mock('CoreHome', () => {
  const { defineComponent, h } = require('vue');

  return {
    AjaxHelper: { fetch: jest.fn(() => Promise.resolve({})) },
    MatomoUrl: { parsed: { value: { idSite: '1', period: 'day', date: 'yesterday' } } },
    translate: (key: string, ...values: unknown[]) => (
      values.length ? `${key}:${values.join(',')}` : key
    ),
    Alert: defineComponent({
      props: { severity: { type: String, default: '' } },
      setup(
        props: { severity: string },
        { slots }: { slots: { default?: () => unknown } },
      ) {
        return () => h(
          'div',
          { class: `alert alert-${props.severity}` },
          slots.default ? slots.default() : undefined,
        );
      },
    }),
  };
}, { virtual: true });

const AGENT_READY: AgentStatus = {
  mode: 'agent',
  engine: 'aiProviders',
  keySource: 'aiProviders',
  mcp: 'ready',
  ai: 'ready',
  providerName: 'OpenAI',
  toolCount: 19,
  canPerformActions: true,
  recommendations: [],
};

const WRITE_MODE: Recommendation = {
  id: 'enableWriteMode',
  message: 'ChatGPT_RecommendEnableWriteMode',
  action: 'ChatGPT_RecommendEnableWriteModeAction',
  url: 'index.php?module=CoreAdminHome&action=generalSettings#/McpServer',
  askAdministrator: false,
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

type ChatWrapper = ReturnType<typeof mount>;

let fetchMock: jest.Mock;
const originalFetch = window.fetch;
const wrappers: ChatWrapper[] = [];

// jsdom globals replaced by a test, restored after it
const restoreStubs: Array<() => void> = [];

function stubProperty(target: unknown, name: string, value: unknown): void {
  const descriptor = Object.getOwnPropertyDescriptor(target, name);
  Object.defineProperty(target, name, { configurable: true, writable: true, value });
  restoreStubs.push(() => {
    if (descriptor) {
      Object.defineProperty(target, name, descriptor);
    } else {
      delete (target as Record<string, unknown>)[name];
    }
  });
}

// polls an assertion until it passes, the streams resolve over several ticks
async function waitFor(assertion: () => void, timeout = 1000): Promise<void> {
  const start = Date.now();
  for (;;) {
    try {
      assertion();
      return;
    } catch (error) {
      if (Date.now() - start > timeout) {
        throw error;
      }
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => { setTimeout(resolve, 10); });
  }
}

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

async function mountChat(): Promise<ChatWrapper> {
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

function vm(wrapper: ChatWrapper): ChatInstance {
  return wrapper.vm as unknown as ChatInstance;
}

function requestedUrls(): string[] {
  return fetchMock.mock.calls.map((call) => String(call[0]));
}

describe('Chat', () => {
  beforeEach(() => {
    fetchMock = jest.fn();
    window.fetch = fetchMock as unknown as typeof window.fetch;
  });

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    window.fetch = originalFetch;
    restoreStubs.splice(0).reverse().forEach((restore) => restore());
  });

  it('displays the first recommendation, with its link for super users', async () => {
    mockAgentStatus({
      canPerformActions: false,
      recommendations: [WRITE_MODE, { ...WRITE_MODE, id: 'other', message: 'ChatGPT_Other' }],
    });

    const wrapper = await mountChat();

    const notice = wrapper.find('.ai-chat-notice');
    expect(notice.text()).toContain('ChatGPT_RecommendEnableWriteMode');
    expect(notice.text()).not.toContain('ChatGPT_Other');
    expect(notice.text()).not.toContain('ChatGPT_AskAdministrator');
    const link = notice.find('a.ai-chat-notice-action');
    expect(link.attributes('href')).toBe(WRITE_MODE.url);
    expect(link.text()).toBe('ChatGPT_RecommendEnableWriteModeAction');
  });

  it('asks the administrator, without link, for the other users', async () => {
    mockAgentStatus({
      mode: 'chat',
      mcp: 'not_installed',
      recommendations: [{
        id: 'installMcpServer',
        message: 'ChatGPT_RecommendInstallMcpServer',
        action: '',
        url: '',
        askAdministrator: true,
      }],
    });

    const wrapper = await mountChat();

    const notice = wrapper.find('.ai-chat-notice');
    expect(notice.text()).toContain('ChatGPT_RecommendInstallMcpServer');
    expect(notice.text()).toContain('ChatGPT_AskAdministrator');
    expect(notice.find('a').exists()).toBe(false);
  });

  it('displays the text only when a super user cannot take the step from Matomo', async () => {
    mockAgentStatus({
      recommendations: [{ ...WRITE_MODE, action: '', url: '' }],
    });

    const wrapper = await mountChat();

    const notice = wrapper.find('.ai-chat-notice');
    expect(notice.text()).toBe('ChatGPT_RecommendEnableWriteMode');
    expect(notice.find('a').exists()).toBe(false);
  });

  it('does not display a notice without recommendation', async () => {
    mockAgentStatus({});

    const wrapper = await mountChat();

    expect(wrapper.find('.ai-chat-notice').exists()).toBe(false);
  });

  it('sends the conversation to AI Providers without the Matomo tools', async () => {
    mockAgentStatus({ mode: 'chat', mcp: 'not_installed', toolCount: 0 });

    const wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'Hello' });
    await flushPromises();

    expect(requestedUrls().some((url) => url.includes('action=agent&'))).toBe(true);
    expect(requestedUrls().some((url) => url.includes('method=ChatGPT.getStreamingResponse')))
      .toBe(false);
  });

  it('uses the key of the website instead of AI Providers', async () => {
    mockAgentStatus({
      mode: 'chat', engine: 'plugin', keySource: 'site', recommendations: [],
    });

    const wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'Hello' });
    await flushPromises();

    expect(requestedUrls().some((url) => url.includes('method=ChatGPT.getStreamingResponse')))
      .toBe(true);
    expect(requestedUrls().some((url) => url.includes('action=agent&'))).toBe(false);
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
    mockAgentStatus({ mode: 'chat', engine: 'plugin', mcp: 'not_installed' });

    const wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'Hello' });
    await flushPromises();

    expect(requestedUrls().some((url) => url.includes('method=ChatGPT.getStreamingResponse')))
      .toBe(true);
  });

  it('sends the conversation to the agent when it is ready', async () => {
    mockAgentStatus({});

    const wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'How many visits?' });
    await flushPromises();

    const agentCall = fetchMock.mock.calls.find(
      (call) => String(call[0]).includes('action=agent&'),
    );
    expect(agentCall).toBeDefined();
    const body = agentCall![1].body as URLSearchParams;
    expect(JSON.parse(body.get('messages')!))
      .toEqual([{ role: 'user', content: 'How many visits?' }]);
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
    expect(wrapper.find('.ai-chat-error[role="alert"]').text()).toBe('Rate limit exceeded');
  });

  it('announces each complete answer once, never the streamed chunks', async () => {
    const chunks = [
      {
        type: 'tool_call', id: 'call_1', name: 'matomo_visits', title: 'Visits',
      },
      { type: 'tool_result', id: 'call_1', isError: false },
      { type: 'text', content: '**257 visits**' },
      { type: 'text', content: 'Bounce rate | 58%' },
    ].map((event) => new TextEncoder().encode(`data: ${JSON.stringify(event)}
`));
    const seenWhileStreaming: string[] = [];
    let wrapper: ChatWrapper | null = null;

    fetchMock.mockImplementation(async (url: string) => {
      if (url.includes('action=agentStatus')) {
        return { ok: true, json: async () => AGENT_READY };
      }
      return {
        ok: true,
        body: {
          getReader: () => ({
            read: async () => {
              await flushPromises();
              seenWhileStreaming.push(wrapper!.find('[aria-live="polite"]').text());
              const value = chunks.shift();
              return value ? { done: false, value } : { done: true, value: undefined };
            },
          }),
        },
      };
    });

    wrapper = await mountChat();
    await vm(wrapper).onSubmit({ role: 'user', content: 'KPIs?' });
    await flushPromises();

    await waitFor(() => {
      expect(wrapper!.find('[aria-live="polite"]').text())
        .toBe('ChatGPT_AnswerAnnouncement:ChatGPT 257 visits Bounce rate 58%');
    });
    expect(seenWhileStreaming.length).toBeGreaterThan(3);
    expect(seenWhileStreaming.every((text) => text === '')).toBe(true);
  });

  it('copies the markdown of a complete answer', async () => {
    mockAgentStatus({});
    const writeText = jest.fn(async () => undefined);
    stubProperty(window.navigator, 'clipboard', { writeText });
    stubProperty(window, 'isSecureContext', true);
    const wrapper = await mountChat();
    const chat = wrapper.vm as unknown as { messages: { role: string, content: string }[] };
    chat.messages.push(
      { role: 'user', content: 'Q' },
      { role: 'assistant', content: '**42** visits' },
    );
    await flushPromises();

    const copy = wrapper.find('.ai-chat-message__actions button');
    expect(copy.attributes('aria-label')).toBe('ChatGPT_CopyAnswer');
    await copy.trigger('click');
    await flushPromises();

    expect(writeText).toHaveBeenCalledWith('**42** visits');
    expect(copy.attributes('aria-label')).toBe('ChatGPT_AnswerCopied');
  });

  it('suggests translated questions on an empty conversation, and sends the picked one', async () => {
    mockAgentStatus({});
    const wrapper = mount(Chat, {
      props: {
        aiName: 'chat-gpt',
        aiLabel: 'ChatGPT',
        apiMethod: 'ChatGPT.getResponse',
        showEmptyState: true,
      },
    });
    wrappers.push(wrapper);
    await flushPromises();

    const suggestions = wrapper.findAll('.ai-chat-empty__suggestion');
    expect(suggestions.map((suggestion) => suggestion.text())).toEqual([
      'ChatGPT_SuggestionWeeklyKpis',
      'ChatGPT_SuggestionTopPages',
      'ChatGPT_SuggestionTrafficSources',
      'ChatGPT_SuggestionGoals',
    ]);

    await suggestions[0].trigger('click');
    await flushPromises();

    const agentCall = fetchMock.mock.calls.find(
      (call) => String(call[0]).includes('action=agent&'),
    );
    const body = agentCall![1].body as URLSearchParams;
    expect(JSON.parse(body.get('messages')!)).toEqual([
      { role: 'user', content: 'ChatGPT_SuggestionWeeklyKpis' },
    ]);
    expect(wrapper.find('.ai-chat-empty').exists()).toBe(false);
  });
  describe('report context', () => {
    const context = MatomoUrl.parsed.value as Record<string, unknown>;

    function queryOf(fragment: string): URLSearchParams {
      const call = fetchMock.mock.calls.find((c) => String(c[0]).includes(fragment));
      return new URL(String(call![0]), 'http://matomo.test/').searchParams;
    }

    function bodyOf(fragment: string): URLSearchParams {
      const call = fetchMock.mock.calls.find((c) => String(c[0]).includes(fragment));
      return call![1].body as URLSearchParams;
    }

    async function ask(): Promise<void> {
      const wrapper = await mountChat();
      await vm(wrapper).onSubmit({ role: 'user', content: 'Hi' });
      await flushPromises();
    }

    afterEach(() => {
      ['segment', 'comparePeriods', 'compareDates', 'compareSegments'].forEach((key) => {
        delete context[key];
      });
    });

    it('sends the URL segment in the query of the agent requests, not in the body', async () => {
      context.segment = 'browserCode==FF';
      mockAgentStatus({});

      await ask();

      expect(queryOf('action=agentStatus').get('segment')).toBe('browserCode==FF');
      expect(queryOf('action=agent&').get('segment')).toBe('browserCode==FF');
      expect(bodyOf('action=agent&').has('segment')).toBe(false);
    });

    it('sends the segment in the query of the streaming request', async () => {
      context.segment = 'browserCode==FF';
      mockAgentStatus(null);

      await ask();

      const query = queryOf('getStreamingResponse');
      expect(query.get('segment')).toBe('browserCode==FF');
      expect(query.get('idSite')).toBe('1');
      expect(bodyOf('getStreamingResponse').has('segment')).toBe(false);
    });

    it('sends no segment nor comparison without them in the URL', async () => {
      mockAgentStatus({});

      await ask();

      const query = queryOf('action=agent&');
      expect(query.has('segment')).toBe(false);
      expect(Array.from(query.keys()).some((key) => key.startsWith('compare'))).toBe(false);
    });

    it('sends the comparison arrays of the URL', async () => {
      context.comparePeriods = ['day', 'week'];
      context.compareDates = ['2026-09-29', '2026-09-22'];
      context.compareSegments = ['', 'browserCode==FF'];
      mockAgentStatus({});

      await ask();

      ['action=agentStatus', 'action=agent&'].forEach((fragment) => {
        const query = queryOf(fragment);
        expect(query.getAll('comparePeriods[]')).toEqual(['day', 'week']);
        expect(query.getAll('compareDates[]')).toEqual(['2026-09-29', '2026-09-22']);
        expect(query.getAll('compareSegments[]')).toEqual(['', 'browserCode==FF']);
      });
    });
  });
});
