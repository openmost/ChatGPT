<template>
  <li class="ai-chat-loader">
    <span class="ai-chat-spinner"></span>
    Waiting for response...
  </li>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="less">
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
  border: 4px solid #00A67E;
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
