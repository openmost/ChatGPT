<template>
  <div
    ref="root"
    class="ai-chat-messages"
    @scroll="onScroll"
  >
    <Alert
      v-if="notice"
      severity="info"
      class="ai-chat-notice"
    >
      {{ notice }}
    </Alert>

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

    <Alert
      v-if="errored"
      severity="danger"
    >
      {{ errorMessage }}
    </Alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType } from 'vue';
import { Alert } from 'CoreHome';
import ChatMessage from './ChatMessage.vue';
import ChatLoading from './ChatLoading.vue';
import { Message } from '../../types';

// distance from the bottom, in pixels, under which the conversation keeps following new content
const STICK_TO_BOTTOM_THRESHOLD = 80;

export default defineComponent({
  components: {
    Alert,
    ChatMessage,
    ChatLoading,
  },
  props: {
    errored: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    // information displayed above the conversation, eg when the Matomo tools are unavailable
    notice: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    streaming: { type: Boolean, default: false },
    messages: { type: Array as PropType<Message[]>, default: () => [] },
    aiName: { type: String, required: true },
    aiColor: { type: String, default: '#3450a3' },
  },
  data() {
    return {
      stickToBottom: true,
    };
  },
  computed: {
    // changes whenever the conversation grows: message, streamed text, agent step, loader, error
    scrollSignature(): string {
      const lastMessage = this.messages[this.messages.length - 1];
      return [
        this.messages.length,
        lastMessage?.content.length ?? 0,
        lastMessage?.steps?.map((step) => step.status).join(',') ?? '',
        this.loading,
        this.errored,
        this.notice,
      ].join('|');
    },
  },
  watch: {
    scrollSignature() {
      const lastMessage = this.messages[this.messages.length - 1];
      // the user just sent a message: follow the answer again
      if (lastMessage?.role === 'user') {
        this.stickToBottom = true;
      }

      if (this.stickToBottom) {
        this.scrollToBottom();
      }
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    onScroll() {
      const root = this.$refs.root as HTMLElement;
      const distanceToBottom = root.scrollHeight - root.scrollTop - root.clientHeight;
      this.stickToBottom = distanceToBottom < STICK_TO_BOTTOM_THRESHOLD;
    },
    scrollToBottom() {
      nextTick(() => {
        const root = this.$refs.root as HTMLElement | undefined;
        if (root) {
          root.scrollTop = root.scrollHeight;
        }
      });
    },
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

  .ai-chat-notice {
    margin-top: 0 !important;
  }
}
</style>
