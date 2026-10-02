<template>
  <form
    class="ai-chat-form"
    @submit.prevent="onSubmit"
  >
    <div class="ai-chat-form__box">
      <label
        :for="inputId"
        class="ai-chat-sr-only"
      >{{ placeholderText }}</label>
      <textarea
        :id="inputId"
        ref="input"
        v-model="prompt"
        name="chat-prompt"
        class="ai-chat-form__input"
        :rows="rows"
        :placeholder="placeholderText"
        :aria-describedby="hintId"
        @keydown.enter="onEnter"
      />
      <button
        type="submit"
        class="ai-chat-form__send"
        :aria-label="submitText"
        :title="submitText"
        :disabled="loading || !prompt.trim()"
      >
        <ChatIcon name="send" :size="18" />
      </button>
    </div>
    <p
      :id="hintId"
      class="ai-chat-form__hint"
    >{{ hintText }}</p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';
import ChatIcon from '../Icon/ChatIcon.vue';

const MAX_ROWS = 6;
let formCount = 0;

export default defineComponent({
  components: {
    ChatIcon,
  },
  props: {
    aiLabel: { type: String, required: true },
    loading: { type: Boolean, default: false },
  },
  emits: ['prompt'],
  data() {
    formCount += 1;
    return {
      prompt: '',
      inputId: `ai-chat-input-${formCount}`,
      hintId: `ai-chat-input-hint-${formCount}`,
    };
  },
  computed: {
    submitText(): string {
      return translate('ChatGPT_Submit');
    },
    placeholderText(): string {
      return translate('ChatGPT_MessagePlaceholder', this.aiLabel);
    },
    hintText(): string {
      return translate('ChatGPT_ComposerHint');
    },
    // grows with the typed lines, browsers supporting field-sizing grow with wrapped lines too
    rows(): number {
      return Math.min(MAX_ROWS, Math.max(1, this.prompt.split('\n').length));
    },
  },
  methods: {
    onEnter(event: KeyboardEvent) {
      // Shift+Enter adds a line, and Enter validating an IME composition must not send
      if (event.shiftKey || event.isComposing) {
        return;
      }
      event.preventDefault();
      this.onSubmit();
    },
    onSubmit() {
      if (this.loading || !this.prompt.trim()) {
        return;
      }
      this.$emit('prompt', { role: 'user', content: this.prompt });
      this.prompt = '';
    },
    submitPrompt(text: string) {
      this.prompt = text;
      this.onSubmit();
    },
    focus() {
      const input = this.$refs.input as HTMLTextAreaElement | undefined;
      if (input) {
        input.focus();
      }
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-form {
  width: 100%;
  margin: 0;
}

.ai-chat-form__box {
  display: flex;
  align-items: flex-end;
  gap: .5rem;
  padding: 5px 5px 5px .875rem;
  border: 1px solid var(--ai-chat-border);
  border-radius: var(--ai-chat-radius);
  background: var(--ai-chat-surface);
  transition: border-color .15s ease, box-shadow .15s ease;

  &:focus-within {
    border-color: var(--ai-chat-accent-strong);
    box-shadow: 0 0 0 3px var(--ai-chat-accent-soft);
  }
}

.ai-chat-form__input {
  flex: 1;
  min-width: 0;
  // one line is exactly the height of the send button, six lines before it scrolls
  box-sizing: border-box;
  height: auto;
  min-height: 36px;
  max-height: calc(6 * 22px + 14px);
  margin: 0;
  padding: 7px 0;
  border: 0;
  outline: none;
  background: transparent;
  box-shadow: none;
  color: var(--ai-chat-text);
  font: inherit;
  font-size: .9375rem;
  line-height: 22px;
  resize: none;
  field-sizing: content;
  overflow-y: auto;

  &::placeholder {
    color: var(--ai-chat-text-muted);
    opacity: 1;
  }

  // the box shows the focus, the textarea itself has no ring
  &:focus-visible {
    outline: none;
  }
}

.ai-chat-form__send {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: var(--ai-chat-accent);
  color: var(--ai-chat-on-accent);
  box-shadow: none;
  cursor: pointer;

  &:disabled {
    background: var(--ai-chat-surface-raised);
    color: var(--ai-chat-text-muted);
    cursor: default;
  }
}

.ai-chat-form__hint {
  margin: .375rem 0 0;
  padding: 0;
  color: var(--ai-chat-text-muted);
  font-size: .75rem;
  line-height: 1.4;
  text-align: center;
}

@media (hover: none) {
  .ai-chat-form__hint {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ai-chat-form__box {
    transition: none;
  }
}
</style>
