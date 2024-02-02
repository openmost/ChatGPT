<template>
  <div class="markdown-wrapper" v-html="markdownToHtml"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Converter } from 'showdown';

const converter = new Converter();
export default defineComponent({
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
  computed: {
    markdownToHtml(): string {
      return converter.makeHtml(this.markdown);
    },
  },
});
</script>

<style lang="less">
.markdown-wrapper {
  font-size: 1rem;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 1rem;
    padding: 0;
    color: inherit;
    font-weight: 700;
  }

  h1 {
    font-size: calc(1.375rem + 1.5vw);
  }

  h2 {
    font-size: calc(1.325rem + .9vw);
  }

  h3 {
    font-size: calc(1.3rem + .6vw);
  }

  h4 {
    font-size: calc(1.275rem + .3vw);
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1.125rem;
  }

  p {
    font-size: 1rem !important;
    margin-top: 0 !important;
    margin-bottom: 1rem !important;
    padding-bottom: 0 !important;
  }

  hr {
    height: unset;
    margin-top: unset;
    margin-bottom: unset;
    border-top: unset;
  }

  code {
    font-family: monospace;
    color: #e261a1;
    padding: 0;
    font-size: .875em;
    background-color: unset;
    border-radius: unset;
  }

  pre {
    overflow: auto;
    margin-top: 0;
    margin-bottom: 1rem;

    code {
      color: #fff !important;
    }
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 1rem;

    li {
      list-style-type: unset;

      &:not(:last-child) {
        margin-bottom: .5rem;
      }
    }
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: number;
  }
}
</style>
