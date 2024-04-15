<template>
  <div>
    <button class="ai-chat-insight-trigger-button" @click="onClick">
      <IconMagic/>
    </button>

    <InsightOffcanvas
      ref="offCanvas"
      :display-offcanvas="displayOffcanvas"
      :report-id="reportId"
      :ai-name="aiName"
      :ai-label="aiLabel"
      :ai-color="aiColor"
      :api-method="apiMethod"
      @close="onClose"/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InsightOffcanvas from './InsightOffcanvas.vue';
import IconMagic from '../Icon/IconMagic.vue';

export default defineComponent({
  components: {
    InsightOffcanvas,
    IconMagic,
  },
  props: {
    reportId: {
      type: String,
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
  methods: {
    onClick() {
      this.displayOffcanvas = !this.displayOffcanvas;
      this.$refs.offCanvas.onSubmit();
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
  padding: 0;
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
