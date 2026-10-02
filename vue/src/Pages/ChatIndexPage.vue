<template>
  <div class="ai-chat-page ai-chat-theme">
    <header class="ai-chat-page__bar">
      <span
        class="ai-chat-page__mark"
        aria-hidden="true"
      >
        <IconAi :ai-name="aiName" />
      </span>
      <h2 class="ai-chat-page__title">{{ aiLabel }}</h2>
      <button
        type="button"
        class="ai-chat-page__new"
        :aria-label="newConversationText"
        :title="newConversationText"
        @click="newConversation"
      >
        <ChatIcon name="plus" :size="16" />
        <span>{{ newConversationText }}</span>
      </button>
    </header>

    <div
      v-if="modelNotice && modelNotice.message"
      class="ai-chat-page__notice"
      role="note"
    >
      {{ modelNotice.message }}
      <a
        v-if="modelNotice.settingsUrl"
        :href="modelNotice.settingsUrl"
      >{{ modelNotice.settingsLabel }}</a>
    </div>

    <Chat
      :key="conversationKey"
      ref="chat"
      class="ai-chat-page__chat"
      variant="page"
      show-empty-state
      :ai-name="aiName"
      :ai-label="aiLabel"
      :ai-color="aiColor"
      :api-method="apiMethod"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { translate } from 'CoreHome';
import Chat from '../Components/Chat/Chat.vue';
import IconAi from '../Components/Icon/IconAi.vue';
import ChatIcon from '../Components/Icon/ChatIcon.vue';
import { ApiError } from '../types';

export default defineComponent({
  components: {
    Chat,
    ChatIcon,
    IconAi,
  },
  props: {
    aiName: { type: String, required: true },
    aiLabel: { type: String, required: true },
    aiColor: { type: String, default: '#00A67E' },
    apiMethod: { type: String, required: true },
    // the configured model is outdated, with the settings link for super users
    modelNotice: { type: Object as PropType<ApiError | null>, default: null },
  },
  data() {
    return {
      conversationKey: 0,
    };
  },
  computed: {
    newConversationText(): string {
      return translate('ChatGPT_NewConversation');
    },
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    newConversation() {
      // a new Chat instance: new conversation id, and the pending request is aborted
      this.conversationKey += 1;
      this.$nextTick(() => this.focusInput());
    },
    focusInput() {
      const chat = this.$refs.chat as InstanceType<typeof Chat> | undefined;
      if (chat) {
        chat.focusInput();
      }
    },
  },
});
</script>

<style lang="less">
// the chat page fills the viewport under the Matomo header, without the page footer spacing
body:has(.ai-chat-page) {
  #root {
    margin-bottom: 0 !important;
  }

  #pageFooter {
    display: none;
  }

  // no period or segment selector on this page, its empty row would only push the chat down
  #root .top_controls:not(:has(*)) {
    display: none !important;
  }
}
</style>

<style lang="less" scoped>
.ai-chat-page {
  --ai-chat-accent: v-bind(aiColor);
  --ai-chat-column-width: 48rem;
  --ai-chat-column-padding: 1.5rem 1.25rem 2rem;
  --ai-chat-composer-padding: .5rem 1.25rem 1rem;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // the Matomo header is 64px high, plus the top and bottom gutters
  height: calc(100vh - 96px);
  height: calc(100dvh - 96px);
  min-height: 420px;
  margin: 16px;
  overflow: hidden;
  border: 1px solid var(--ai-chat-hairline);
  border-radius: var(--ai-chat-radius);
  background: var(--ai-chat-surface);
  font-size: 14px;
  text-align: left;
}

.ai-chat-page__bar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: .75rem;
  padding: .75rem 1rem .75rem 1.25rem;
  border-bottom: 1px solid var(--ai-chat-hairline);
}

.ai-chat-page__mark {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--ai-chat-accent-soft);
  color: var(--ai-chat-accent);

  :deep(svg) {
    display: block;
    width: 16px;
    height: 16px;
  }
}

.ai-chat-page__title {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: var(--ai-chat-text-strong);
  font-size: 1rem;
  font-weight: 650;
  line-height: 1.3;
  text-transform: none;
}

.ai-chat-page__new {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: .375rem;
  height: 34px;
  margin: 0;
  padding: 0 .75rem;
  border: 1px solid var(--ai-chat-border);
  border-radius: var(--ai-chat-radius-small);
  background: var(--ai-chat-surface);
  color: var(--ai-chat-text);
  font: inherit;
  font-size: .8125rem;
  font-weight: 600;
  line-height: 1;
  text-transform: none;
  box-shadow: none;
  cursor: pointer;

  &:hover {
    background: var(--ai-chat-surface-raised);
  }
}

.ai-chat-page__notice {
  flex-shrink: 0;
  padding: .625rem 1.25rem;
  border-bottom: 1px solid color-mix(in srgb, var(--theme-color-warning, #a18a0b) 40%, transparent);
  background: color-mix(in srgb, var(--theme-color-warning, #a18a0b) 10%, var(--ai-chat-surface));
  color: var(--ai-chat-text);
  font-size: .8125rem;
  line-height: 1.5;
  overflow-wrap: anywhere;

  a {
    color: var(--ai-chat-link);
    font-weight: 600;
    text-decoration: underline;
  }
}

.ai-chat-page__chat {
  flex: 1;
}

@media (max-width: 600px) {
  .ai-chat-page {
    --ai-chat-column-padding: 1rem .875rem 1.5rem;
    --ai-chat-composer-padding: .5rem .75rem .75rem;

    height: calc(100vh - 150px);
    height: calc(100dvh - 150px);
    margin: 0;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }

  .ai-chat-page__new span {
    display: none;
  }

  .ai-chat-page__new {
    width: 34px;
    padding: 0;
    justify-content: center;
  }
}
</style>
