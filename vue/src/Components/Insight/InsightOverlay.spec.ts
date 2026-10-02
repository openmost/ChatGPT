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
import InsightOverlay from './InsightOverlay.vue';
import InsightTrigger from './InsightTrigger.vue';
import { OVERLAY_OPEN_EVENT, resetInsightStore } from './insightStore';

const chatCalls: string[] = [];

// the overlay only drives the chat: record the insight requests and the focus moves
vi.mock('../Chat/Chat.vue', async () => {
  const { defineComponent, h } = await import('vue');

  return {
    default: defineComponent({
      props: { widgetParams: { type: Object, default: () => ({}) } },
      methods: {
        onSubmit() {
          chatCalls.push(`submit:${String(this.widgetParams.action)}`);
        },
        focusInput() {
          (this.$el as HTMLElement).querySelector('textarea')?.focus();
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

vi.mock('CoreHome', () => ({
  translate: (key: string, ...values: unknown[]) => (values.length ? `${key}:${values.join(',')}` : key),
}));

const wrappers: VueWrapper[] = [];

function mountTrigger(action: string, title: string): VueWrapper {
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

function mountOverlay(): VueWrapper {
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

function button(trigger: VueWrapper) {
  return trigger.find('button');
}

const OWNER = 'ChatGPT';
const OTHER_OWNERS = ['MistralAI', 'Claude', 'AskAI'];

function scrollLockClass(owner: string): string {
  return `ai-chat-page-scroll-locked-${owner.toLowerCase()}`;
}

function dialog(): HTMLElement {
  return document.querySelector('[role="dialog"]') as HTMLElement;
}

function isDialogVisible(): boolean {
  return dialog().style.display !== 'none';
}

describe('InsightOverlay', () => {
  let triggerA: VueWrapper;
  let triggerB: VueWrapper;

  beforeEach(async () => {
    resetInsightStore();
    chatCalls.splice(0);
    mountOverlay();
    triggerA = mountTrigger('getCategory', 'Event Categories');
    triggerB = mountTrigger('getAction', 'Event Actions');
    await flushPromises();
  });

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    document.documentElement.classList.remove(...[OWNER, ...OTHER_OWNERS].map(scrollLockClass));
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
    expect(chatCalls).toEqual(['submit:getCategory']);
    expect(document.activeElement?.classList.contains('chat-stub-input')).toBe(true);
    expect(document.querySelector('.ai-chat-overlay__report')?.textContent).toBe('Event Categories');
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
    expect(chatCalls).toEqual(['submit:getCategory', 'submit:getAction']);
    expect(document.querySelector('.ai-chat-overlay__report')?.textContent).toBe('Event Actions');
  });

  it('closes when the same trigger is clicked again, without any request', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();
    (button(triggerA).element as HTMLElement).focus();
    await button(triggerA).trigger('click');
    await flushPromises();

    expect(isDialogVisible()).toBe(false);
    expect(button(triggerA).attributes('aria-expanded')).toBe('false');
    expect(chatCalls).toEqual(['submit:getCategory']);
    expect(document.activeElement).toBe(button(triggerA).element);
  });

  it('closes on Escape and gives the focus back to the trigger', async () => {
    await button(triggerB).trigger('click');
    await flushPromises();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await flushPromises();

    expect(isDialogVisible()).toBe(false);
    expect(document.activeElement).toBe(button(triggerB).element);
    expect(document.documentElement.classList.contains(scrollLockClass(OWNER))).toBe(false);
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
    last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(close);

    close.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Tab', shiftKey: true, bubbles: true, cancelable: true,
    }));
    expect(document.activeElement).toBe(last);
  });

  it.each(OTHER_OWNERS)('closes when the insights panel of %s opens', async (owner) => {
    await button(triggerA).trigger('click');
    await flushPromises();
    expect(document.documentElement.classList.contains(scrollLockClass(OWNER))).toBe(true);
    // the other plugin locks the page scroll for its own panel at the same time
    document.documentElement.classList.add(scrollLockClass(owner));

    window.dispatchEvent(new CustomEvent(OVERLAY_OPEN_EVENT, { detail: { owner } }));
    await flushPromises();

    expect(isDialogVisible()).toBe(false);
    expect(button(triggerA).attributes('aria-expanded')).toBe('false');
    expect(document.documentElement.classList.contains(scrollLockClass(OWNER))).toBe(false);
    expect(document.documentElement.classList.contains(scrollLockClass(owner))).toBe(true);
  });

  it('stays open when the opening event comes from its own panel', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();

    window.dispatchEvent(new CustomEvent(OVERLAY_OPEN_EVENT, { detail: { owner: OWNER } }));
    await flushPromises();

    expect(isDialogVisible()).toBe(true);
  });

  it('opens again after another AI plugin closed it', async () => {
    await button(triggerA).trigger('click');
    await flushPromises();
    const [otherOwner] = OTHER_OWNERS;
    window.dispatchEvent(new CustomEvent(OVERLAY_OPEN_EVENT, { detail: { owner: otherOwner } }));
    await flushPromises();

    await button(triggerA).trigger('click');
    await flushPromises();

    expect(isDialogVisible()).toBe(true);
    expect(button(triggerA).attributes('aria-expanded')).toBe('true');
  });

  it('announces its opening with its name, so the other plugins close their panel', async () => {
    const owners: unknown[] = [];
    const listener = (event: Event) => owners.push((event as CustomEvent).detail?.owner);
    window.addEventListener('matomo-ai-insight-overlay:open', listener);

    await button(triggerA).trigger('click');
    await flushPromises();
    window.removeEventListener('matomo-ai-insight-overlay:open', listener);

    expect(OVERLAY_OPEN_EVENT).toBe('matomo-ai-insight-overlay:open');
    expect(owners).toEqual([OWNER]);
  });
});
