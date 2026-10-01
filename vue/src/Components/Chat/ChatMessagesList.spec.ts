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
import ChatMessagesList from './ChatMessagesList.vue';
import { Message } from '../../types';

jest.mock('../Markdown.vue', () => {
  const { defineComponent, h } = require('vue');

  return {
    __esModule: true,
    default: defineComponent({
      props: { markdown: { type: String, default: '' } },
      setup(props: { markdown: string }) {
        return () => h('div', { class: 'ai-chat-markdown' }, props.markdown);
      },
    }),
  };
});

jest.mock('CoreHome', () => ({
  translate: (key: string, ...values: unknown[]) => (
    values.length ? `${key}:${values.join(',')}` : key
  ),
}), { virtual: true });
type Wrapper = ReturnType<typeof mount>;

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

function restoreAllStubs(): void {
  restoreStubs.splice(0).reverse().forEach((restore) => restore());
}

// jsdom has no layout: the sizes of the scroll container and the anchor are set by each test
interface Layout {
  scrollHeight: number;
  clientHeight: number;
  scrollTop: number;
  anchorTop: number;
}

const HISTORY: Message[] = [
  { role: 'user', content: 'Earlier question' },
  { role: 'assistant', content: 'Earlier answer' },
];

const wrappers: Wrapper[] = [];
let layout: Layout;

function applyLayout(wrapper: Wrapper): HTMLElement {
  const root = wrapper.find('.ai-chat-scroll').element as HTMLElement;
  Object.defineProperty(root, 'scrollHeight', {
    configurable: true, get: () => layout.scrollHeight,
  });
  Object.defineProperty(root, 'clientHeight', {
    configurable: true, get: () => layout.clientHeight,
  });
  Object.defineProperty(root, 'scrollTop', {
    configurable: true,
    get: () => layout.scrollTop,
    set: (value: number) => { layout.scrollTop = value; },
  });
  root.querySelectorAll('[data-message-index]').forEach((element) => {
    Object.defineProperty(element, 'offsetTop', {
      configurable: true, get: () => layout.anchorTop,
    });
  });
  return root;
}

async function mountList(messages: Message[], loading = false): Promise<Wrapper> {
  const wrapper = mount(ChatMessagesList, {
    attachTo: document.body,
    props: {
      aiName: 'chat-gpt', aiLabel: 'ChatGPT', messages, loading,
    },
  });
  wrappers.push(wrapper);
  applyLayout(wrapper);
  await flushPromises();
  return wrapper;
}

// the user sends a question: the list receives it with the loading state, then the streamed answer
async function sendQuestion(wrapper: Wrapper, history: Message[]): Promise<Message[]> {
  const withQuestion = [...history, { role: 'user', content: 'New question' }];
  await wrapper.setProps({ messages: withQuestion, loading: true });
  applyLayout(wrapper);
  await flushPromises();
  return withQuestion;
}

async function streamAnswer(wrapper: Wrapper, messages: Message[], content: string) {
  await wrapper.setProps({
    messages: [...messages, { role: 'assistant', content }],
    loading: false,
    streaming: true,
  });
  applyLayout(wrapper);
  await flushPromises();
}

describe('ChatMessagesList auto-scroll', () => {
  beforeEach(() => {
    layout = {
      scrollHeight: 1000, clientHeight: 500, scrollTop: 0, anchorTop: 700,
    };
  });

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    restoreAllStubs();
  });

  it('follows a short answer down to the bottom', async () => {
    const wrapper = await mountList(HISTORY);
    const messages = await sendQuestion(wrapper, HISTORY);

    // the question and the answer fit in the view: stick to the bottom
    layout.scrollHeight = 1100;
    await streamAnswer(wrapper, messages, 'Short answer');

    expect(layout.scrollTop).toBe(600);
  });

  it('anchors a long answer at its start instead of following it to the end', async () => {
    const wrapper = await mountList(HISTORY);
    const messages = await sendQuestion(wrapper, HISTORY);

    layout.scrollHeight = 1150;
    await streamAnswer(wrapper, messages, 'Growing answer');
    expect(layout.scrollTop).toBe(650);

    // the answer is now taller than the view: the question stays at the top, 16px under the edge
    layout.scrollHeight = 2400;
    await streamAnswer(wrapper, messages, 'Growing answer, much longer now');
    expect(layout.scrollTop).toBe(684);

    layout.scrollHeight = 3000;
    await streamAnswer(wrapper, messages, 'Growing answer, much longer now, and longer');
    expect(layout.scrollTop).toBe(684);
  });

  it('anchors an insight without question at the start of the answer', async () => {
    const wrapper = await mountList([]);
    await wrapper.setProps({ loading: true });
    applyLayout(wrapper);
    await flushPromises();

    layout.anchorTop = 20;
    layout.scrollHeight = 2000;
    await streamAnswer(wrapper, [], 'Long insight');

    expect(layout.scrollTop).toBe(4);
  });

  it('stops all auto-scroll once the user scrolls by hand, until the next question', async () => {
    const wrapper = await mountList(HISTORY);
    const messages = await sendQuestion(wrapper, HISTORY);

    layout.scrollHeight = 1100;
    await streamAnswer(wrapper, messages, 'Answer');
    expect(layout.scrollTop).toBe(600);

    layout.scrollTop = 120;
    await wrapper.find('.ai-chat-scroll').trigger('wheel');
    layout.scrollHeight = 1200;
    await streamAnswer(wrapper, messages, 'Answer that keeps growing');
    expect(layout.scrollTop).toBe(120);

    // the next question follows the conversation again
    const next = [...messages, { role: 'assistant', content: 'Answer that keeps growing' }];
    await wrapper.setProps({ streaming: false, messages: next });
    await sendQuestion(wrapper, next);
    expect(layout.scrollTop).toBe(684);
  });

  it('shows the "scroll to latest" button away from the bottom, and scrolls down with it', async () => {
    const scrollTo = jest.fn((options: ScrollToOptions) => {
      layout.scrollTop = options.top ?? 0;
    });
    stubProperty(window, 'matchMedia', jest.fn(() => ({ matches: false })));
    const wrapper = await mountList(HISTORY);
    const root = applyLayout(wrapper);
    root.scrollTo = scrollTo as unknown as typeof root.scrollTo;

    layout.scrollTop = 500;
    await wrapper.find('.ai-chat-scroll').trigger('scroll');
    const button = wrapper.find('.ai-chat-scroll-latest');
    expect(button.isVisible()).toBe(false);

    layout.scrollTop = 100;
    await wrapper.find('.ai-chat-scroll').trigger('scroll');
    expect(button.isVisible()).toBe(true);
    expect(button.attributes('aria-label')).toBe('ChatGPT_ScrollToLatest');

    await button.trigger('click');
    expect(scrollTo).toHaveBeenCalledWith({ top: 500, behavior: 'smooth' });
    expect(button.isVisible()).toBe(false);
  });

  it('does not animate the scroll when the user prefers reduced motion', async () => {
    const scrollTo = jest.fn();
    stubProperty(window, 'matchMedia', jest.fn(() => ({ matches: true })));
    const wrapper = await mountList(HISTORY);
    const root = applyLayout(wrapper);
    root.scrollTo = scrollTo as unknown as typeof root.scrollTo;

    layout.scrollTop = 0;
    await wrapper.find('.ai-chat-scroll').trigger('scroll');
    await wrapper.find('.ai-chat-scroll-latest').trigger('click');

    expect(scrollTo).toHaveBeenCalledWith({ top: 500, behavior: 'auto' });
  });
});
