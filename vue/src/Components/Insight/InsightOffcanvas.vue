<template>
  <div :class="offcanvasClass">
    <div class="ai-chat-insight-offcanvas-header">
      <div class="title-wrapper">
        <IconMagic/>
        <h3>Insights</h3>
      </div>
      <div class="actions-wrapper">
        <button class="close-button" @click="onClose">
          <IconClose/>
        </button>
      </div>
    </div>
    <div class="ai-chat-insight-offcanvas-body">

      <Alert v-if="errored" severity="danger">{{ markdown }}</Alert>

      <ChatLoading v-if="loading"/>

      <Markdown v-if="!errored && !loading" :markdown="markdown"/>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Alert } from 'CoreHome';

import IconMagic from '../Icon/IconMagic.vue';
import IconClose from '../Icon/IconClose.vue';
import ChatLoading from '../Chat/ChatLoading.vue';
import Markdown from '../Markdown.vue';

export default defineComponent({
  components: {
    Alert,
    Markdown,
    ChatLoading,
    IconMagic,
    IconClose,
  },
  props: {
    displayOffcanvas: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    errored: {
      type: Boolean,
      required: true,
    },
    markdown: {
      type: String,
      default: '',
    },
  },
  computed: {
    offcanvasClass(): Array<string> {
      return [
        'ai-chat-insight-offcanvas',
        this.displayOffcanvas ? 'active' : '',
      ];
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-insight-offcanvas {
  z-index: 50;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: -450px;
  bottom: 0;
  transition: .2s ease all;

  &.active {
    right: 0;
  }

  .ai-chat-insight-offcanvas-header {
    padding: 20px 2.5rem;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-wrapper {
      display: flex;
      gap: 1rem;
      align-items: center;

      svg {
        width: 1.125rem;
        height: auto;
      }

      h3 {
        margin: 0;
        color: inherit;
        font-weight: 700;
      }
    }

    .actions-wrapper {

      .close-button {
        cursor: pointer;
        background-color: transparent;
        border: none;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        transition: .2s ease opacity;

        &:focus,
        &:hover {
          background-color: transparent;
          opacity: .75;
        }
      }
    }

  }

  .ai-chat-insight-offcanvas-body {
    padding: 20px 2.5rem;
    overflow-y: auto;
    height: calc(100vh - 65px);
    scrollbar-width: none;

    * {
      font-size: 1rem;
      line-height: normal;
    }
  }
}
</style>
