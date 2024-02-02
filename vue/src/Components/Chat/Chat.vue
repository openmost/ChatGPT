<template>
  <div class="ai-chat-interface-wrapper">
    <ChatMessagesList :loading="loading" :errored="errored" :messages="messages"/>
    <ChatForm @formSubmit="onFormSubmit" @success="onSuccess" @error="onError"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChatForm from './ChatForm.vue';
import ChatMessagesList from './ChatMessagesList.vue';

interface MessageState {
  author: string,
  body: string,
}

interface DataState {
  errored: boolean;
  loading: boolean;
  messages: Array<MessageState>;
}

export default defineComponent({
  components: {
    ChatMessagesList,
    ChatForm,
  },
  data(): DataState {
    return {
      errored: false,
      loading: false,
      messages: [],
    };
  },
  methods: {
    onFormSubmit(prompt: string) {
      this.messages.push({
        author: 'user',
        body: prompt,
      });
      this.loading = true;
      this.scrollDown();
    },
    onSuccess(response: string) {
      this.messages.push({
        author: 'ai',
        body: response,
      });
      this.loading = false;
      this.scrollDown();
    },
    onError() {
      this.errored = true;
    },
    scrollDown() {
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 1);
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-conversation-wrapper {
  position: relative;
}
</style>
