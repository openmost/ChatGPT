<template>
  <div class="ai-chat-insight-trigger">
    <button
      ref="button"
      type="button"
      class="ai-chat-insight-trigger-button"
      :title="buttonTitle"
      :aria-label="buttonTitle"
      aria-haspopup="dialog"
      :aria-expanded="isActive ? 'true' : 'false'"
      :aria-controls="isActive ? overlayId : undefined"
      @click="onClick"
    >
      <IconAi :ai-name="aiName" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';
import IconAi from '../Icon/IconAi.vue';
import {
  isTriggerActive,
  nextTriggerId,
  OVERLAY_ID,
  toggleInsight,
} from './insightStore';

export default defineComponent({
  components: {
    IconAi,
  },
  props: {
    widgetParams: {
      type: Object,
      required: true,
    },
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
    // vue-entry parses attributes as JSON, a numeric title arrives as a number
    reportTitle: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      triggerId: nextTriggerId(),
      overlayId: OVERLAY_ID,
    };
  },
  computed: {
    buttonTitle(): string {
      return translate('ChatGPT_AskQuestion', this.aiLabel);
    },
    isActive(): boolean {
      return isTriggerActive(this.triggerId);
    },
  },
  methods: {
    onClick() {
      toggleInsight({
        triggerId: this.triggerId,
        title: String(this.reportTitle),
        widgetParams: this.widgetParams as Record<string, unknown>,
      }, this.$refs.button as HTMLElement);
    },
  },
});
</script>

<style lang="less" scoped>
// Same look as the Matomo 5 selectors (calendar, site, segment), square, the logo keeps its colours
.ai-chat-insight-trigger-button {
  float: right;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  padding: 8px;
  background-color: var(--theme-color-background-contrast);
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  color: v-bind(aiColor);
  cursor: pointer;
  transition: border-color .15s ease;

  &:hover,
  &:focus-visible,
  &[aria-expanded="true"] {
    border-color: var(--theme-color-link);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--theme-color-focus-ring);
  }

  // :deep() as IconAi has several root nodes, its svg never gets this scope attribute
  :deep(svg) {
    display: block;
    width: 16px;
    height: 16px;
  }
}
</style>
