<template>
  <div class="ai-chat-page-wrapper">
    <Chat/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chat from '../Components/Chat/Chat.vue';

export default defineComponent({
  components: {
    Chat,
  },
});
</script>

<style lang="less" scoped>
.ai-chat-page-wrapper {

}
</style>
