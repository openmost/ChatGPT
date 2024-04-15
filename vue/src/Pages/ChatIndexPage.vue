<template>
  <div class="ai-chat-page-wrapper">
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
    aiName: {
      type: String,
      required: true,
    },
    aiLabel: {
      type: String,
      required: true,
    },
    aiColor: {
      type: String,
      default: '#3450a3',
    },
    apiMethod: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="less">
.ai-chat-page-wrapper {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;

  .ai-chat-conversation-wrapper {
    //max-height: none;
  }

  .ai-chat-form-wrapper {
    position: fixed;
    bottom: 20px;
  }
}
</style>
