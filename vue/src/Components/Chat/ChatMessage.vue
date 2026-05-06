<template>
  <li :class="chatResponseClasses">
    <div class="ai-chat-response-content-wrapper">
      <div class="ai-chat-response-body">
        <Markdown :markdown="message.content"/>
        <span v-if="isStreaming" class="streaming-cursor">▊</span>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Markdown from '../Markdown.vue';

export default defineComponent({
  components: {
    Markdown,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
    aiName: {
      type: String,
      required: true,
    },
    aiColor: {
      type: String,
      default: '#3450a3',
    },
    isStreaming: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    chatResponseClasses(): Array<string> {
      const classes = [
        'ai-chat-response',
        `ai-chat-${this.message.role}-response`,
      ];
      if (this.isStreaming) {
        classes.push('ai-chat-streaming');
      }
      return classes;
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-response {
  width: 100%;

  &.ai-chat-user-response {
    display: flex;
    justify-content: flex-end;

    .ai-chat-response-content-wrapper {
      background-color: var(--theme-color-background-contrast, #fff);
      padding: 6px 16px;
      border-radius: 16px;
    }
  }

  &.ai-chat-assistant-response {

  }

  .ai-chat-response-content-wrapper {

    .streaming-cursor {
      display: inline-block;
      color: v-bind(aiColor);
      animation: blink 1s step-end infinite;
      margin-left: 2px;
      font-weight: normal;
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
