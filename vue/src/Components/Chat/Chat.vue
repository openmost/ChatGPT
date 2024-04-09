<template>
  <div class="ai-chat-interface-wrapper">
    <ChatMessagesList
      ref="messagesList"
      :loading="loading"
      :errored="errored"
      :messages="messages"
      :ai="ai"
      :primary-color="primaryColor"
    />
    <ChatForm :loading="loading" @prompt="onSubmit"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    ai: {
      type: String,
      required: true,
    },
    primaryColor: {
      type: String,
      default: '#3450a3',
    },
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
  methods: {
    onSubmit(userPrompt: MessageState) {
      this.$emit('prompt', userPrompt);
    },
    scrollDown() {
      this.$refs.messagesList.scrollDown();
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
