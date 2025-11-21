<template>
  <div class="ai-chat-interface-wrapper">
    <ChatMessagesList
      ref="messagesList"
      :loading="loading"
      :errored="errored"
      :error-message="errorMessage"
      :messages="messages"
      :ai-name="aiName"
      :ai-color="aiColor"
    />
    <ChatForm :loading="loading" :ai-label="aiLabel" @prompt="onSubmit"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AjaxHelper } from 'CoreHome';
import ChatForm from './ChatForm.vue';
import ChatMessagesList from './ChatMessagesList.vue';

interface MessageState {
  role: string,
  content: string,
}

export default defineComponent({
  components: {
    ChatMessagesList,
    ChatForm,
  },
  props: {
    aiName: {
      type: String,
      required: true,
    },
    aiLabel: {
      type: String,
      required: true,
    },
    aiColor: {
      type: String,
      default: '#3450a3',
    },
    apiMethod: {
      type: String,
      required: true,
    },
    widgetParams: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      errored: false,
      errorMessage: '',
      messages: [],
    };
  },
  methods: {
    onSubmit(userPrompt: MessageState) {
      this.loading = true;
      this.errored = false;
      this.errorMessage = '';

      if (userPrompt) {
        this.messages.push(userPrompt);
      }
      this.scrollDown();

      AjaxHelper
        .fetch({
          method: this.apiMethod,
        }, {
          postParams: {
            messages: this.messages,
            widgetParams: this.widgetParams,
          },
        })
        .then((response) => {
          if (!response || typeof response !== 'object') {
            this.handleError('Invalid response from server');
            return;
          }

          if (response.error) {
            const errorMsg = response.error.message || 'An error occurred';
            this.handleError(errorMsg);
            return;
          }

          if (this.isValidResponse(response)) {
            const message = response.choices[0].message;
            this.messages.push({
              role: String(message.role || 'assistant'),
              content: String(message.content || ''),
            });
          }
        })
        .catch((error) => {
          const errorMsg = error instanceof Error ? error.message : String(error);
          this.handleError(errorMsg);
        })
        .finally(() => {
          this.loading = false;
          this.scrollDown();
        });
    },
    isValidResponse(response: unknown): boolean {
      if (!response || typeof response !== 'object') {
        return false;
      }
      const r = response as Record<string, unknown>;
      if (!Array.isArray(r.choices) || r.choices.length === 0) {
        return false;
      }
      const choice = r.choices[0] as Record<string, unknown>;
      if (!choice.message || typeof choice.message !== 'object') {
        return false;
      }
      return true;
    },
    scrollDown() {
      this.$refs.messagesList.scrollDown();
    },
    handleError(error: string) {
      this.errored = true;
      this.errorMessage = error;
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-interface-wrapper {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  max-height: 100%;
}
</style>
