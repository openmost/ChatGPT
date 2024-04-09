<template>
  <div ref="conversationWrapper" class="ai-chat-conversation-wrapper">

    <ul class="ai-chat-conversation" v-if="messages.length">
      <ChatMessage
        v-for="(message, index) in messages"
        :message="message"
        :key="index"
        :ai="ai"
        :primary-color="primaryColor"
      />
    </ul>

    <ChatLoading v-if="loading && !errored" :ai="ai" :primary-color="primaryColor"/>
    <Alert v-if="errored" severity="danger">Ooops, AI have encountered an error.</Alert>
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
    loading: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      default: () => [],
    },
    ai: {
      type: String,
      required: true,
    },
    primaryColor: {
      type: String,
      default: '#3450a3',
    },
  },
  methods: {
    scrollDown() {
      setTimeout(() => {
        this.$refs.conversationWrapper.scrollTo(0, document.body.scrollHeight);
      }, 1);
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
