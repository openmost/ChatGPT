<template>
  <div :class="['ai-chat-insight-offcanvas', { active: displayOffcanvas }]">
    <div class="ai-chat-insight-offcanvas-header">
      <div class="title-wrapper">
        <IconAi :ai-name="aiName"/>
        <h3>{{ insightsTitle }}</h3>
      </div>
      <button class="close-button" @click="onClose">
        <IconClose/>
      </button>
    </div>
    <div class="ai-chat-insight-offcanvas-body">
      <Chat
        ref="chat"
        :ai-name="aiName"
        :ai-label="aiLabel"
        :ai-color="aiColor"
        :api-method="apiMethod"
        :widget-params="widgetParams"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';
import IconAi from '../Icon/IconAi.vue';
import IconClose from '../Icon/IconClose.vue';
import Chat from '../Chat/Chat.vue';

export default defineComponent({
  components: {
    IconAi,
    Chat,
    IconClose,
  },
  props: {
    displayOffcanvas: { type: Boolean, default: false },
    widgetParams: { type: Object, required: true },
    aiName: { type: String, required: true },
    aiLabel: { type: String, required: true },
    aiColor: { type: String, default: '#3450a3' },
    apiMethod: { type: String, required: true },
  },
  computed: {
    insightsTitle(): string {
      return translate('ChatGPT_Insights');
    },
  },
  watch: {
    displayOffcanvas(newVal: boolean) {
      if (newVal) {
        document.addEventListener('keydown', this.handleKeydown);
      } else {
        document.removeEventListener('keydown', this.handleKeydown);
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.onClose();
      }
    },
    onClose() {
      this.$emit('close');
    },
    onSubmit() {
      (this.$refs.chat as InstanceType<typeof Chat>).onSubmit();
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-insight-offcanvas {
  z-index: 50;
  background-color: var(--theme-color-background-contrast, #fff);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: -450px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  transition: .2s ease right;

  &.active {
    right: 0;
  }

  .ai-chat-insight-offcanvas-header {
    flex-shrink: 0;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--theme-color-border, #cccccc);
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 64px;

    .title-wrapper {
      display: flex;
      gap: 0.75rem;
      align-items: center;

      svg {
        display: block;
        width: 1.125rem;
        height: auto;
      }

      h3 {
        margin: 0;
        font-weight: 700;
      }
    }

    .close-button {
      cursor: pointer;
      background: transparent;
      border: none;
      padding: 0.25rem;
      display: flex;
      opacity: 0.7;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }

  .ai-chat-insight-offcanvas-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;

    :deep(.ai-chat-messages) {
      padding: 1rem !important;
    }
  }
}
</style>
