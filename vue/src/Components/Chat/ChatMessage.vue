<template>
  <li :class="chatResponseClasses">
    <div class="ai-chat-response-avatar">
      <IconAi v-if="message.author === 'ai'"/>
      <IconUser v-if="message.author === 'user'"/>
    </div>
    <div class="ai-chat-response-content-wrapper">
      <span class="ai-chat-response-username">{{ chatAuthorName }}</span>
      <div class="ai-chat-response-body">
        <Markdown :markdown="message.body"/>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Markdown from '../Markdown.vue';
import IconAi from '../Icon/IconAi.vue';
import IconUser from '../Icon/IconUser.vue';

export default defineComponent({
  components: {
    IconUser,
    IconAi,
    Markdown,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chatResponseClasses(): Array<string> {
      return [
        'ai-chat-response',
        `ai-chat-${this.message.author}-response`,
      ];
    },
    chatAuthorName(): string {
      return this.message.author === 'user' ? 'You' : 'AI';
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-response {
  width: 100%;
  display: flex;
  gap: .5rem;

  &.ai-chat-ai-response .ai-chat-response-avatar {
    background-color: #00A67E;
    border-color: #00A67E;
  }

  &.ai-chat-user-response .ai-chat-response-avatar {
    background-color: #3450a3;
    color: #152b6c;
    border-color: #3450a3;
  }

  .ai-chat-response-avatar {
    border: 1px solid currentColor;
    width: 1.5rem;
    min-width: 1.5rem;
    height: 1.5rem;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: .875rem;
      height: auto;
    }
  }

  .ai-chat-response-content-wrapper {
    flex-grow: 1;
    max-width: calc(100% - 32px);

    .ai-chat-response-username {
      display: block;
      font-weight: 700;
      font-size: 1.125rem;
      margin-bottom: 4px;
    }
  }
}
</style>
