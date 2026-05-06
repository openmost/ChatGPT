<template>
  <div class="ai-chat-form-wrapper">
    <form class="ai-chat-form" @submit.prevent="onSubmit">
      <div class="input-field ai-chat-input-wrapper">
        <input
          v-model="prompt"
          type="text"
          name="chat-prompt"
          :placeholder="placeholderText"
          class="ai-chat-input"
        />
      </div>
      <input
        type="submit"
        class="btn"
        :value="submitText"
        :disabled="loading || !prompt.trim()"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';

export default defineComponent({
  props: {
    aiLabel: { type: String, required: true },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      prompt: '',
    };
  },
  computed: {
    submitText(): string {
      return translate('ChatGPT_Submit');
    },
    placeholderText(): string {
      return translate('ChatGPT_MessagePlaceholder', this.aiLabel);
    },
  },
  methods: {
    onSubmit() {
      if (!this.prompt.trim()) return;
      this.$emit('prompt', { role: 'user', content: this.prompt });
      this.prompt = '';
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-form-wrapper {
  flex-shrink: 0;
  padding: 1rem;
  background: var(--theme-color-background-highContrast);
  border-top: 1px solid var(--theme-color-border);

  .ai-chat-form {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 730px;
    margin: 0 auto;

    .ai-chat-input-wrapper {
      flex: 1;
      margin: 0;

      .ai-chat-input {
        width: 100%;
        margin: 0;
        box-sizing: border-box;
      }
    }
  }
}
</style>
