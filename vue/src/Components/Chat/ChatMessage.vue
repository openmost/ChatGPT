<template>
  <li
    :class="['ai-chat-message', `ai-chat-message--${isUser ? 'user' : 'assistant'}`, {
      'ai-chat-message--with-steps': !isUser && message.steps && message.steps.length,
    }]"
    :data-message-index="index"
  >
    <div
      v-if="isUser"
      class="ai-chat-message__question"
    >
      <span class="ai-chat-sr-only">{{ translate('ChatGPT_You') }}</span>
      {{ message.content }}
    </div>

    <template v-else>
      <span
        class="ai-chat-message__avatar"
        aria-hidden="true"
      >
        <IconAi :ai-name="aiName" />
      </span>
      <div class="ai-chat-message__answer">
        <span class="ai-chat-sr-only">{{ aiLabel }}</span>
        <ChatAgentSteps
          v-if="message.steps && message.steps.length"
          :steps="message.steps"
        />
        <Markdown
          v-if="message.content"
          :markdown="message.content"
          :class="{ 'ai-chat-markdown--streaming': isStreaming }"
        />
        <span
          v-else-if="isStreaming"
          class="ai-chat-message__caret"
          aria-hidden="true"
        />
        <div
          v-if="!isStreaming && message.content"
          class="ai-chat-message__actions"
        >
          <button
            type="button"
            class="ai-chat-icon-button"
            :aria-label="copied ? copiedText : copyText"
            :title="copied ? copiedText : copyText"
            @click="copyAnswer"
          >
            <ChatIcon :name="copied ? 'check' : 'copy'" :size="14" />
            <span aria-hidden="true">{{ copied ? copiedText : copyText }}</span>
          </button>
        </div>
      </div>
    </template>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { translate } from 'CoreHome';
import Markdown from '../Markdown.vue';
import ChatAgentSteps from './ChatAgentSteps.vue';
import IconAi from '../Icon/IconAi.vue';
import ChatIcon from '../Icon/ChatIcon.vue';
import { Message } from '../../types';
import writeToClipboard from '../clipboard';

const COPIED_FEEDBACK_MS = 2000;

export default defineComponent({
  components: {
    ChatAgentSteps,
    ChatIcon,
    IconAi,
    Markdown,
  },
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    aiName: {
      type: String,
      required: true,
    },
    aiLabel: {
      type: String,
      default: '',
    },
    isStreaming: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      copied: false,
      copiedTimer: 0,
    };
  },
  computed: {
    isUser(): boolean {
      return this.message.role === 'user';
    },
    copyText(): string {
      return translate('ChatGPT_CopyAnswer');
    },
    copiedText(): string {
      return translate('ChatGPT_AnswerCopied');
    },
  },
  beforeUnmount() {
    window.clearTimeout(this.copiedTimer);
  },
  methods: {
    translate,
    async copyAnswer() {
      try {
        await writeToClipboard(this.message.content);
      } catch {
        return;
      }
      this.copied = true;
      window.clearTimeout(this.copiedTimer);
      this.copiedTimer = window.setTimeout(() => {
        this.copied = false;
      }, COPIED_FEEDBACK_MS);
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-message {
  display: flex;
  min-width: 0;
  max-width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  &--user {
    justify-content: flex-end;
  }

  &--assistant {
    gap: .75rem;
    align-items: flex-start;
  }
}

.ai-chat-message__question {
  max-width: min(85%, 36rem);
  min-width: 0;
  padding: .625rem 1rem;
  border-radius: 18px 18px 4px 18px;
  background: var(--ai-chat-surface-raised);
  color: var(--ai-chat-text);
  font-size: .9375rem;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.ai-chat-message__avatar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  // centred on the first text line, or on the 28px tool steps pill
  margin-top: -2px;

  .ai-chat-message--with-steps > & {
    margin-top: 0;
  }
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

.ai-chat-message__answer {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
}

.ai-chat-message__actions {
  display: flex;
  gap: .25rem;
  margin: .375rem 0 0 -.5rem;
}

.ai-chat-message__caret,
.ai-chat-message__answer :deep(.ai-chat-markdown--streaming > :last-child:not(ul):not(ol):not(.ai-chat-table-scroll):not(.ai-chat-code-scroll)::after),
.ai-chat-message__answer :deep(.ai-chat-markdown--streaming > ul:last-child > li:last-child::after),
.ai-chat-message__answer :deep(.ai-chat-markdown--streaming > ol:last-child > li:last-child::after) {
  content: "";
  display: inline-block;
  width: .55em;
  height: .55em;
  margin-left: .3em;
  border-radius: 50%;
  background: var(--ai-chat-accent);
  vertical-align: middle;
  animation: ai-chat-caret-pulse 1s ease-in-out infinite;
}

// phones give the whole width to the answer
@media (max-width: 600px) {
  .ai-chat-message__avatar {
    display: none;
  }
}

@keyframes ai-chat-caret-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .35; transform: scale(.75); }
}

@media (prefers-reduced-motion: reduce) {
  .ai-chat-message__caret,
  .ai-chat-message__answer :deep(.ai-chat-markdown--streaming *::after) {
    animation: none;
  }
}
</style>
