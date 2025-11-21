<template>
  <div ref="conversationWrapper" class="ai-chat-conversation-wrapper">
    <ul class="ai-chat-conversation" v-if="messages.length">
      <ChatMessage
        v-for="(message, index) in messages"
        :ref="index === messages.length - 1 ? 'lastMessage' : undefined"
        :message="message"
        :key="index"
        :ai-name="aiName"
        :ai-color="aiColor"
        :is-streaming="streaming && index === messages.length - 1 && message.role === 'assistant'"
      />
    </ul>
    <ChatLoading
      v-if="loading && !streaming && !errored"
      :ai-name="aiName"
      :ai-color="aiColor"
    />
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
    errored: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    streaming: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      default: () => [],
    },
    aiName: {
      type: String,
      required: true,
    },
    aiColor: {
      type: String,
      default: '#3450a3',
    },
  },
  methods: {
    scrollDown() {
      setTimeout(() => {
        const wrapper = this.$refs.conversationWrapper as HTMLElement | undefined;
        type VueRef = { $el?: HTMLElement } | HTMLElement;
        const lastMsg = this.$refs.lastMessage as VueRef[] | undefined;
        if (wrapper && lastMsg && lastMsg[0]) {
          // Scroll to the top of the last message
          const ref = lastMsg[0];
          const el = ('$el' in ref && ref.$el) ? ref.$el : ref as HTMLElement;
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (wrapper) {
          wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
        }
      }, 10);
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-conversation-wrapper {
  flex-grow: 1;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 730px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 1.5rem 0;
  max-height: calc(100% - 91px);

  .ai-chat-conversation {
    padding-left: 0;
    margin-bottom: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
