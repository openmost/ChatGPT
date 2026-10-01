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
import InsightOverlay from './InsightOverlay.vue';
import InsightTrigger from './InsightTrigger.vue';
import { OVERLAY_OPEN_EVENT, resetInsightStore } from './insightStore';

const mockChatCalls: string[] = [];

// the overlay only drives the chat: record the insight requests and the focus moves
jest.mock('../Chat/Chat.vue', () => {
  const { defineComponent, h } = require('vue');

  return {
    __esModule: true,
    default: defineComponent({
      props: { widgetParams: { type: Object, default: () => ({}) } },
      methods: {
        onSubmit(this: { widgetParams: Record<string, unknown> }) {
          mockChatCalls.push(`submit:${String(this.widgetParams.action)}`);
        },
        focusInput(this: { $el: HTMLElement }) {
          const input = this.$el.querySelector('textarea');
          if (input) {
            input.focus();
          }
        },
      },
      render() {
        return h('div', { class: 'chat-stub' }, [
          h('textarea', { class: 'chat-stub-input' }),
          h('button', { class: 'chat-stub-last', type: 'button' }, 'last'),
        ]);
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

const wrappers: Wrapper[] = [];

function mountTrigger(action: string, title: string): Wrapper {
  const wrapper = mount(InsightTrigger, {
    attachTo: document.body,
    props: {
      widgetParams: { module: 'Events', action },
      aiName: 'chat-gpt',
      aiLabel: 'ChatGPT',
      reportTitle: title,
    },
  });
  wrappers.push(wrapper);
  return wrapper;
}

function mountOverlay(): Wrapper {
  const wrapper = mount(InsightOverlay, {
    attachTo: document.body,
    props: {
      aiName: 'chat-gpt',
      aiLabel: 'ChatGPT',
      apiMethod: 'ChatGPT.getInsights',
    },
  });
  wrappers.push(wrapper);
  return wrapper;
}

function button(trigger: Wrapper) {
  return trigger.find('button');
}

function dialog(): HTMLElement {
  return document.querySelector('[role="dialog"]') as HTMLElement;
}

function isDialogVisible(): boolean {
  return dialog().style.display !== 'none';
}

describe('InsightOverlay', () => {
  let triggerA: Wrapper;
  let triggerB: Wrapper;

  beforeEach(async () => {
    resetInsightStore();
    mockChatCalls.splice(0);
    mountOverlay();
    triggerA = mountTrigger('getCategory', 'Event Categories');
    triggerB = mountTrigger('getAction', 'Event Actions');
    await flushPromises();
  });

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    document.documentElement.classList.remove('ai-chat-page-scroll-locked');
  });

  it('is an accessible modal dialog labelled by its title', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();

    const panel = dialog();
    expect(panel.getAttribute('aria-modal')).toBe('true');
    const title = document.getElementById(panel.getAttribute('aria-labelledby')!);
    expect(title?.textContent).toBe('ChatGPT_Insights');
    expect(panel.querySelector('.ai-chat-overlay__close')?.getAttribute('aria-label'))
      .toBe('ChatGPT_CloseInsights');
    expect(button(triggerA).attributes('aria-controls')).toBe(panel.id);
  });

  it('opens on the trigger, asks for an insight and moves the focus to the input', async () => {
    expect(isDialogVisible()).toBe(false);

    await button(triggerA).trigger('click');
    await flushPromises();

    expect(isDialogVisible()).toBe(true);
    expect(button(triggerA).attributes('aria-expanded')).toBe('true');
    expect(mockChatCalls).toEqual(['submit:getCategory']);
    expect(document.activeElement?.classList.contains('chat-stub-input')).toBe(true);
    expect(document.querySelector('.ai-chat-overlay__report')?.textContent)
      .toBe('Event Categories');
  });

  it('switches the single panel to another report instead of stacking a second one', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();
    await button(triggerB).trigger('click');
    await flushPromises();

    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    expect(isDialogVisible()).toBe(true);
    expect(button(triggerA).attributes('aria-expanded')).toBe('false');
    expect(button(triggerB).attributes('aria-expanded')).toBe('true');
    expect(mockChatCalls).toEqual(['submit:getCategory', 'submit:getAction']);
    expect(document.querySelector('.ai-chat-overlay__report')?.textContent)
      .toBe('Event Actions');
  });

  it('closes when the same trigger is clicked again, without any request', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();
    (button(triggerA).element as HTMLElement).focus();
    await button(triggerA).trigger('click');
    await flushPromises();

    expect(isDialogVisible()).toBe(false);
    expect(button(triggerA).attributes('aria-expanded')).toBe('false');
    expect(mockChatCalls).toEqual(['submit:getCategory']);
    expect(document.activeElement).toBe(button(triggerA).element);
  });

  it('closes on Escape and gives the focus back to the trigger', async () => {
    await button(triggerB).trigger('click');
    await flushPromises();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await flushPromises();

    expect(isDialogVisible()).toBe(false);
    expect(document.activeElement).toBe(button(triggerB).element);
    expect(document.documentElement.classList.contains('ai-chat-page-scroll-locked')).toBe(false);
  });

  it('closes with its close button and gives the focus back to the trigger', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();

    (dialog().querySelector('.ai-chat-overlay__close') as HTMLButtonElement).click();
    await flushPromises();

    expect(isDialogVisible()).toBe(false);
    expect(document.activeElement).toBe(button(triggerA).element);
  });

  it('keeps the Tab focus inside the dialog', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();

    const panel = dialog();
    const close = panel.querySelector('.ai-chat-overlay__close') as HTMLElement;
    const last = panel.querySelector('.chat-stub-last') as HTMLElement;

    last.focus();
    last.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab', bubbles: true, cancelable: true,
    }));
    expect(document.activeElement).toBe(close);

    close.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab', shiftKey: true, bubbles: true, cancelable: true,
    }));
    expect(document.activeElement).toBe(last);
  });

  it('closes when the insights panel of another AI plugin opens', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();

    window.dispatchEvent(new CustomEvent(OVERLAY_OPEN_EVENT, {
      detail: { owner: 'MistralAI' },
    }));
    await flushPromises();

    expect(isDialogVisible()).toBe(false);
    expect(button(triggerA).attributes('aria-expanded')).toBe('false');
  });
});
