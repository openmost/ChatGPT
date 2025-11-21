<template>
  <div class="ai-chat-loader">
    <span class="ai-chat-spinner"></span>
    {{ waitingText }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';

export default defineComponent({
  props: {
    aiName: {
      type: String,
      required: true,
    },
    aiColor: {
      type: String,
      default: '#3450a3',
    },
  },
  computed: {
    waitingText(): string {
      return translate('ChatGPT_WaitingForResponse');
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-loader {
  color: #2e2e2e;
  display: flex;
  align-content: center;
  align-items: center;
  gap: .5rem;
}

.ai-chat-spinner {
  width: 22px;
  height: 22px;
  border: 4px solid v-bind(aiColor);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
