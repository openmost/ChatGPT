<template>
  <div>
    <button class="ai-chat-insight-trigger-button" @click="onClick">
      <IconMagic/>
    </button>

    <InsightOffcanvas
      :display-offcanvas="displayOffcanvas"
      :markdown="markdown"
      :loading="loading"
      :errored="errored"
      @close="onClose"/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AjaxHelper } from 'CoreHome';
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
  },
  data() {
    return {
      displayOffcanvas: false,
      loading: false,
      errored: false,
      markdown: '',
    };
  },
  methods: {
    onClick() {
      this.displayOffcanvas = !this.displayOffcanvas;
      this.loading = true;
      AjaxHelper
        .fetch({
          method: 'ChatGPT.getInsights',
          reportId: this.reportId,
        })
        .then((response) => {
          if (response.choices && response.choices.length) {
            this.markdown = response.choices[0].message.content;
          } else {
            this.errored = true;
            console.error(response.message);
            this.markdown = response.message;
          }
        })
        .catch((error) => {
          console.error(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onClose() {
      this.errored = false;
      this.displayOffcanvas = false;
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-insight-trigger-button {
  cursor: pointer;
  float: right;
  padding: 4px;
  border: 1px solid #00A67E;
  background-color: #fff;
  color: #00A67E;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: .2s ease all;

  &:hover,
  &:focus {
    color: #fff;
    background-color: #00A67E;
  }

  svg {
    width: 12px;
    height: auto;
  }
}
</style>
