<template>
  <div class="ai-chat-messages">
    <div class="ai-chat-messages-list">
      <ChatMessage
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        :ai-name="aiName"
        :ai-color="aiColor"
        :is-streaming="streaming && index === messages.length - 1 && message.role === 'assistant'"
      />

      <ChatLoading
        v-if="loading && !streaming && !errored"
        :ai-name="aiName"
        :ai-color="aiColor"
      />
    </div>

    <Alert v-if="errored" severity="danger">{{ errorMessage }}</Alert>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Alert } from 'CoreHome';
import ChatMessage from './ChatMessage.vue';
import ChatLoading from './ChatLoading.vue';

export default defineComponent({
  components: {
    Alert,
    ChatMessage,
    ChatLoading,
  },
  props: {
    errored: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    streaming: { type: Boolean, default: false },
    messages: { type: Array, default: () => [] },
    aiName: { type: String, required: true },
    aiColor: { type: String, default: '#3450a3' },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  min-height: 0;

  .ai-chat-messages-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 770px;
    margin: 0 auto;
    list-style-type: none;
  }

  .alert {
    max-width: 770px;
    margin: 1rem auto !important;
  }
}
</style>
