<template>
  <Transition name="ai-chat-overlay">
    <section
      v-show="isOpen"
      :id="overlayId"
      ref="panel"
      class="ai-chat-overlay ai-chat-theme"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @keydown="onPanelKeydown"
    >
      <header class="ai-chat-overlay__header">
        <span
          class="ai-chat-overlay__mark"
          aria-hidden="true"
        >
          <IconAi :ai-name="aiName" />
        </span>
        <div class="ai-chat-overlay__heading">
          <h2
            :id="titleId"
            class="ai-chat-overlay__title"
          >{{ insightsTitle }}</h2>
          <p
            v-if="reportTitle"
            class="ai-chat-overlay__report"
            :title="reportTitle"
          >{{ reportTitle }}</p>
        </div>
        <button
          type="button"
          class="ai-chat-icon-button ai-chat-overlay__close"
          :aria-label="closeText"
          :title="closeText"
          @click="close"
        >
          <ChatIcon name="close" :size="18" />
        </button>
      </header>
      <div class="ai-chat-overlay__body">
        <Chat
          v-if="report"
          :key="report.triggerId"
          ref="chat"
          variant="panel"
          :ai-name="aiName"
          :ai-label="aiLabel"
          :ai-color="aiColor"
          :api-method="apiMethod"
          :widget-params="report.widgetParams"
        />
      </div>
    </section>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { translate } from 'CoreHome';
import IconAi from '../Icon/IconAi.vue';
import ChatIcon from '../Icon/ChatIcon.vue';
import Chat from '../Chat/Chat.vue';
import {
  closeInsight,
  getReturnFocusTarget,
  insightState,
  InsightReport,
  OVERLAY_ID,
} from './insightStore';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// one class per plugin: closing this panel because another AI plugin opens its own must not
// unlock the scroll that plugin has just locked
const PAGE_SCROLL_LOCK_CLASS = 'ai-chat-page-scroll-locked-chatgpt';

export default defineComponent({
  components: {
    Chat,
    ChatIcon,
    IconAi,
  },
  props: {
    aiName: { type: String, required: true },
    aiLabel: { type: String, required: true },
    aiColor: { type: String, default: '#00A67E' },
    apiMethod: { type: String, required: true },
  },
  data() {
    return {
      overlayId: OVERLAY_ID,
      titleId: `${OVERLAY_ID}-title`,
    };
  },
  computed: {
    isOpen(): boolean {
      return insightState.open;
    },
    report(): InsightReport | null {
      return insightState.report as InsightReport | null;
    },
    requestId(): number {
      return insightState.requestId;
    },
    reportTitle(): string {
      return this.report?.title || '';
    },
    insightsTitle(): string {
      return translate('ChatGPT_Insights');
    },
    closeText(): string {
      return translate('ChatGPT_CloseInsights');
    },
  },
  watch: {
    // every opening, or switch to another report, asks for an insight; closing never does
    async requestId() {
      await nextTick();
      const chat = this.$refs.chat as InstanceType<typeof Chat> | undefined;
      if (!chat) {
        return;
      }
      chat.focusInput();
      chat.onSubmit();
    },
    isOpen(open: boolean) {
      document.documentElement.classList.toggle(PAGE_SCROLL_LOCK_CLASS, open);
      if (open) {
        document.addEventListener('keydown', this.onDocumentKeydown);
        return;
      }
      document.removeEventListener('keydown', this.onDocumentKeydown);
      this.restoreFocus();
    },
  },
  mounted() {
    // another page, period or segment: the insight of the open report is outdated
    window.addEventListener('hashchange', this.close);
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.close);
    document.removeEventListener('keydown', this.onDocumentKeydown);
    document.documentElement.classList.remove(PAGE_SCROLL_LOCK_CLASS);
  },
  methods: {
    close() {
      closeInsight();
    },
    restoreFocus() {
      const panel = this.$refs.panel as HTMLElement | undefined;
      const active = document.activeElement;
      // a click elsewhere in the page already moved the focus, leave it there
      if (active && active !== document.body && panel && !panel.contains(active)) {
        return;
      }
      getReturnFocusTarget()?.focus();
    },
    onDocumentKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        this.close();
      }
    },
    // keeps the Tab focus inside the dialog
    onPanelKeydown(event: KeyboardEvent) {
      if (event.key !== 'Tab') {
        return;
      }
      const panel = this.$refs.panel as HTMLElement;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
        // v-show hides the "scroll to latest" button with an inline display
        .filter((element) => !element.closest('[style*="display: none"]'));
      if (!focusable.length) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-overlay {
  --ai-chat-accent: v-bind(aiColor);
  --ai-chat-column-padding: 1rem 1.25rem 1.25rem;
  --ai-chat-composer-padding: .5rem 1rem .875rem;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: min(460px, 100vw);
  height: 100vh;
  height: 100dvh;
  border-left: 1px solid var(--ai-chat-border);
  background: var(--ai-chat-surface);
  box-shadow: -12px 0 32px -12px rgba(0, 0, 0, .25);
  font-size: 14px;
  text-align: left;
}

.ai-chat-overlay__header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: .75rem;
  box-sizing: border-box;
  // the height of the Matomo top bar, so both headers line up when the panel is open
  height: 64px;
  padding: 0 .75rem 0 1.25rem;
  border-bottom: 1px solid var(--ai-chat-hairline);
}

.ai-chat-overlay__mark {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--ai-chat-accent-soft);
  color: var(--ai-chat-accent);

  :deep(svg) {
    display: block;
    width: 17px;
    height: 17px;
  }
}

.ai-chat-overlay__heading {
  flex: 1;
  min-width: 0;
}

.ai-chat-overlay__title {
  margin: 0;
  padding: 0;
  color: var(--ai-chat-text-strong);
  font-size: 1rem;
  font-weight: 650;
  line-height: 1.3;
  text-transform: none;
}

.ai-chat-overlay__report {
  margin: .125rem 0 0;
  padding: 0;
  overflow: hidden;
  color: var(--ai-chat-text-muted);
  font-size: .8125rem;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ai-chat-overlay__close {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  padding: 0;
}

.ai-chat-overlay__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}

.ai-chat-overlay-enter-active,
.ai-chat-overlay-leave-active {
  transition: transform .22s cubic-bezier(.2, .8, .2, 1), opacity .22s ease;
}

.ai-chat-overlay-enter-from,
.ai-chat-overlay-leave-to {
  transform: translateX(24px);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .ai-chat-overlay-enter-active,
  .ai-chat-overlay-leave-active {
    transition: none;
  }
}
</style>
