<template>
  <div class="ai-chat-insight-trigger">
    <!-- Markup of the Matomo report header buttons, the logo keeps its colours -->
    <div class="mtm-selector mtm-selector--iconOnly">
      <button
        ref="button"
        type="button"
        class="mtm-selector__trigger ai-chat-insight-trigger-button"
        :title="buttonTitle"
        :aria-label="buttonTitle"
        aria-haspopup="dialog"
        :aria-expanded="isActive ? 'true' : 'false'"
        :aria-controls="isActive ? overlayId : undefined"
        @click="onClick"
      >
        <span class="mtm-selector__icon" aria-hidden="true">
          <IconAi :ai-name="aiName" />
        </span>
      </button>
    </div>
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
.ai-chat-insight-trigger {
  display: flex;
}

.ai-chat-insight-trigger-button {
  color: v-bind(aiColor);

  // Square box the size of the Matomo icon font in the other buttons, a wide logo fits inside it.
  // :deep() as IconAi has several root nodes, its svg never gets this scope attribute
  :deep(svg) {
    display: block;
    width: 16px;
    height: 16px;
  }
}
</style>
