<template>
  <div class="ai-chat-page">
    <Chat
      :ai-name="aiName"
      :ai-label="aiLabel"
      :ai-color="aiColor"
      :api-method="apiMethod"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chat from '../Components/Chat/Chat.vue';

export default defineComponent({
  components: {
    Chat,
  },
  props: {
    aiName: { type: String, required: true },
    aiLabel: { type: String, required: true },
    aiColor: { type: String, default: '#3450a3' },
    apiMethod: { type: String, required: true },
  },
});
</script>

<style lang="less">
#root {
  margin-bottom: 0 !important;
  min-height: 100vh !important;
}

#pageFooter {
  min-height: 0 !important;
  margin-bottom: 0 !important;
}

.ai-chat-page {
  height: calc(100vh - 180px);
  margin-left: -18px;
  margin-right: -18px;
  min-height: 400px;
  display: flex;
  flex-direction: column;

  .ai-chat-interface {
    height: calc(100% - 34px);
  }

  .ai-chat-form-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
}
</style>
