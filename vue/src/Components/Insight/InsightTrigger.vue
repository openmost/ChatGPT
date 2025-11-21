<template>
  <div>
    <button
      class="ai-chat-insight-trigger-button"
      :title="buttonTitle"
      @click="onClick"
    >
      <IconAi :ai-name="aiName"/>
    </button>

    <InsightOffcanvas
      ref="offCanvas"
      :display-offcanvas="displayOffcanvas"
      :widget-params="widgetParams"
      :ai-name="aiName"
      :ai-label="aiLabel"
      :ai-color="aiColor"
      :api-method="apiMethod"
      @close="onClose"/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';
import InsightOffcanvas from './InsightOffcanvas.vue';
import IconAi from '../Icon/IconAi.vue';

export default defineComponent({
  components: {
    IconAi,
    InsightOffcanvas,
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
    apiMethod: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      displayOffcanvas: false,
    };
  },
  computed: {
    buttonTitle(): string {
      return translate('ChatGPT_AskQuestion', this.aiLabel);
    },
  },
  methods: {
    onClick() {
      this.displayOffcanvas = !this.displayOffcanvas;
      (this.$refs.offCanvas as InstanceType<typeof InsightOffcanvas>).onSubmit();
    },
    onClose() {
      this.displayOffcanvas = false;
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-insight-trigger-button {
  background-color: transparent;
  padding: 3px;
  cursor: pointer;
  float: right;
  border: 1px solid v-bind(aiColor);
  color: v-bind(aiColor);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: .2s ease all;
  width: 1.5rem;
  height: 1.5rem;

  &:hover,
  &:focus {
    color: #fff;
    background-color: v-bind(aiColor);
  }

  svg {
    width: 12px;
    height: auto;
  }
}
</style>
