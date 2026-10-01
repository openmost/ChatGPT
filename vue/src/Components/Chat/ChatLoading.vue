<template>
  <li
    class="ai-chat-loading"
    :data-message-index="index"
  >
    <span
      class="ai-chat-loading__avatar"
      aria-hidden="true"
    >
      <IconAi :ai-name="aiName" />
    </span>
    <span class="ai-chat-loading__dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
    <span class="ai-chat-sr-only">{{ waitingText }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';
import IconAi from '../Icon/IconAi.vue';

export default defineComponent({
  components: {
    IconAi,
  },
  props: {
    aiName: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    waitingText(): string {
      return translate('ChatGPT_WaitingForResponse');
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-loading {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ai-chat-loading__avatar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--ai-chat-hairline);
  border-radius: 50%;
  background: var(--ai-chat-surface);
  color: var(--ai-chat-accent);

  :deep(svg) {
    display: block;
    width: 15px;
    height: 15px;
  }
}

.ai-chat-loading__dots {
  display: inline-flex;
  gap: 4px;
  padding: .625rem .75rem;
  border-radius: 999px;
  background: var(--ai-chat-surface-raised);

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ai-chat-text-muted);
    animation: ai-chat-loading-bounce 1.2s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: .15s;
    }

    &:nth-child(3) {
      animation-delay: .3s;
    }
  }
}

@keyframes ai-chat-loading-bounce {
  0%, 60%, 100% { opacity: .35; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
}

@media (prefers-reduced-motion: reduce) {
  .ai-chat-loading__dots span {
    animation: none;
    opacity: .6;
  }
}
</style>
