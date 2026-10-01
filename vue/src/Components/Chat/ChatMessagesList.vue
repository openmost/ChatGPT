<template>
  <div class="ai-chat-messages">
    <div
      ref="root"
      class="ai-chat-scroll"
      @scroll="onScroll"
      @wheel.passive="onManualScroll"
      @touchmove.passive="onManualScroll"
      @keydown="onScrollKey"
      @pointerdown="onPointerDown"
    >
      <div
        ref="content"
        class="ai-chat-column"
      >
        <div
          v-if="recommendation"
          class="ai-chat-notice"
          role="note"
        >
          {{ translate(recommendation.message) }}
          <a
            v-if="recommendation.url"
            :href="recommendation.url"
            class="ai-chat-notice-action"
          >{{ translate(recommendation.action) }}</a>
          <template v-else-if="recommendation.askAdministrator">
            {{ translate('ChatGPT_AskAdministrator') }}
          </template>
        </div>

        <slot
          v-if="!messages.length && !loading && !errored"
          name="empty"
        />

        <ol
          v-if="messages.length || loading"
          class="ai-chat-thread"
        >
          <ChatMessage
            v-for="(message, index) in messages"
            :key="index"
            :index="index"
            :message="message"
            :ai-name="aiName"
            :ai-label="aiLabel"
            :is-streaming="streaming && index === messages.length - 1
              && message.role === 'assistant'"
          />

          <ChatLoading
            v-if="loading && !streaming && !errored"
            :index="messages.length"
            :ai-name="aiName"
          />
        </ol>

        <div
          v-if="errored"
          class="ai-chat-error"
          role="alert"
        >
          <ChatIcon name="error" :size="18" class="ai-chat-error__icon" />
          <div class="ai-chat-error__text">
            <p class="ai-chat-error__message">{{ errorMessage }}</p>
            <a
              v-if="errorSettingsUrl"
              :href="errorSettingsUrl"
              class="ai-chat-settings-link"
            >{{ errorSettingsLabel }}</a>
          </div>
        </div>
      </div>
    </div>

    <button
      v-show="showScrollButton"
      type="button"
      class="ai-chat-scroll-latest"
      :aria-label="scrollToLatestText"
      :title="scrollToLatestText"
      @click="scrollToLatest"
    >
      <ChatIcon name="arrow-down" :size="18" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType } from 'vue';
import { translate } from 'CoreHome';
import ChatMessage from './ChatMessage.vue';
import ChatLoading from './ChatLoading.vue';
import ChatIcon from '../Icon/ChatIcon.vue';
import { Message, Recommendation } from '../../types';

// distance from the bottom, in pixels, above which the "scroll to latest" button shows
const AT_BOTTOM_THRESHOLD = 48;
// space kept above the start of the answer when it is anchored at the top of the conversation
const ANCHOR_GAP = 16;
const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default defineComponent({
  components: {
    ChatIcon,
    ChatMessage,
    ChatLoading,
  },
  props: {
    errored: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    errorSettingsUrl: { type: String, default: '' },
    errorSettingsLabel: { type: String, default: '' },
    // step displayed above the conversation to unlock the agent mode
    recommendation: { type: Object as PropType<Recommendation | null>, default: null },
    loading: { type: Boolean, default: false },
    streaming: { type: Boolean, default: false },
    messages: { type: Array as PropType<Message[]>, default: () => [] },
    aiName: { type: String, required: true },
    aiLabel: { type: String, default: '' },
  },
  data() {
    return {
      // off as soon as the user scrolls by hand, back on with the next question
      autoScroll: true,
      // index of the message the current turn starts with, null follows the bottom
      anchorIndex: null as number | null,
      showScrollButton: false,
      resizeObserver: null as ResizeObserver | null,
    };
  },
  computed: {
    // changes whenever the conversation grows, for browsers without ResizeObserver and the tests
    scrollSignature(): string {
      const lastMessage = this.messages[this.messages.length - 1];
      return [
        this.messages.length,
        lastMessage?.content.length ?? 0,
        lastMessage?.steps?.map((step) => step.status).join(',') ?? '',
        this.loading,
        this.errored,
        this.recommendation?.id ?? '',
      ].join('|');
    },
    scrollToLatestText(): string {
      return translate('ChatGPT_ScrollToLatest');
    },
  },
  watch: {
    loading(isLoading: boolean) {
      if (isLoading) {
        this.startTurn();
      }
    },
    scrollSignature() {
      nextTick(() => this.updateScroll());
    },
  },
  mounted() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updateScroll());
      this.resizeObserver.observe(this.$refs.content as HTMLElement);
      this.resizeObserver.observe(this.$refs.root as HTMLElement);
    }
    if (this.loading) {
      this.startTurn();
    } else {
      nextTick(() => this.updateScroll());
    }
  },
  beforeUnmount() {
    this.resizeObserver?.disconnect();
  },
  methods: {
    translate,
    startTurn() {
      const lastMessage = this.messages[this.messages.length - 1];
      // the question the user just sent, or the answer to come for an insight without question
      this.anchorIndex = lastMessage?.role === 'user'
        ? this.messages.length - 1
        : this.messages.length;
      this.autoScroll = true;
      nextTick(() => this.updateScroll());
    },
    /**
     * Follows the answer while the turn fits in the view, then keeps the start of the turn at the
     * top so the answer is read from its beginning. Only this container scrolls, never the page.
     */
    updateScroll() {
      const root = this.$refs.root as HTMLElement | undefined;
      if (!root) {
        return;
      }

      if (this.autoScroll) {
        const maxTop = Math.max(0, root.scrollHeight - root.clientHeight);
        let target = maxTop;
        if (this.anchorIndex !== null) {
          const anchor = root.querySelector<HTMLElement>(
            `[data-message-index="${this.anchorIndex}"]`,
          );
          if (anchor) {
            target = Math.min(maxTop, Math.max(0, anchor.offsetTop - ANCHOR_GAP));
          }
        }
        if (Math.abs(root.scrollTop - target) > 1) {
          root.scrollTop = target;
        }
      }

      this.updateScrollButton();
    },
    updateScrollButton() {
      const root = this.$refs.root as HTMLElement | undefined;
      if (!root) {
        return;
      }
      const distanceToBottom = root.scrollHeight - root.scrollTop - root.clientHeight;
      this.showScrollButton = distanceToBottom > AT_BOTTOM_THRESHOLD;
    },
    onScroll() {
      this.updateScrollButton();
    },
    onManualScroll() {
      const root = this.$refs.root as HTMLElement;
      // a wheel over a conversation too short to scroll changes nothing, keep following
      if (root.scrollHeight > root.clientHeight) {
        this.autoScroll = false;
      }
    },
    onScrollKey(event: KeyboardEvent) {
      if (SCROLL_KEYS.includes(event.key)) {
        this.onManualScroll();
      }
    },
    // a press on the scrollbar itself, not on the messages
    onPointerDown(event: PointerEvent) {
      if (event.target === this.$refs.root) {
        this.onManualScroll();
      }
    },
    scrollToLatest() {
      const root = this.$refs.root as HTMLElement;
      this.anchorIndex = null;
      this.autoScroll = true;
      const top = Math.max(0, root.scrollHeight - root.clientHeight);
      if (typeof root.scrollTo === 'function') {
        root.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      } else {
        root.scrollTop = top;
      }
      this.updateScrollButton();
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-messages {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}

.ai-chat-scroll {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.ai-chat-column {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--ai-chat-column-width, 46rem);
  margin: 0 auto;
  padding: var(--ai-chat-column-padding, 1.25rem 1rem 1.5rem);
}

.ai-chat-thread {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ai-chat-notice {
  margin: 0 0 1.25rem;
  padding: .75rem 1rem;
  border: 1px solid color-mix(in srgb, var(--ai-chat-link) 35%, transparent);
  border-radius: var(--ai-chat-radius-small);
  background: color-mix(in srgb, var(--ai-chat-link) 8%, var(--ai-chat-surface));
  color: var(--ai-chat-text);
  font-size: .8125rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.ai-chat-notice-action {
  margin-left: .25em;
  color: var(--ai-chat-link);
  font-weight: 600;
  text-decoration: underline;
}

.ai-chat-error {
  display: flex;
  gap: .625rem;
  margin: 1.25rem 0 0;
  padding: .75rem 1rem;
  border: 1px solid color-mix(in srgb, var(--ai-chat-danger) 45%, transparent);
  border-radius: var(--ai-chat-radius-small);
  background: color-mix(in srgb, var(--ai-chat-danger) 8%, var(--ai-chat-surface));
  color: var(--ai-chat-text);
  font-size: .875rem;
  line-height: 1.5;
}

.ai-chat-error__icon {
  flex-shrink: 0;
  margin-top: .1rem;
  color: var(--ai-chat-danger);
}

.ai-chat-error__text {
  min-width: 0;
  overflow-wrap: anywhere;
}

.ai-chat-error__message {
  margin: 0;
  padding: 0;
  font-size: inherit;
}

.ai-chat-settings-link {
  display: inline-block;
  margin-top: .25rem;
  color: var(--ai-chat-link);
  font-weight: 600;
  text-decoration: underline;
}

.ai-chat-scroll-latest {
  position: absolute;
  bottom: .75rem;
  left: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0 0 0 -18px;
  padding: 0;
  border: 1px solid var(--ai-chat-border);
  border-radius: 50%;
  background: var(--ai-chat-surface);
  color: var(--ai-chat-text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  cursor: pointer;

  &:hover {
    background: var(--ai-chat-surface-raised);
  }
}
</style>
