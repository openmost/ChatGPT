<template>
  <ul class="ai-chat-conversation">
    <ChatMessage v-for="(message, index) in messages" :message="message" :key="index"/>
    <ChatLoading v-if="loading && !errored"/>
    <Alert v-if="errored" severity="danger">Ooops, AI have encountered an error.</Alert>
  </ul>
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
  },
});
</script>

<style lang="less" scoped>
.ai-chat-conversation {
  padding-bottom: 50px;
  padding-left: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 730px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
