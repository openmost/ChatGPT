<template>
  <div class="markdown-wrapper" v-html="sanitizedHtml" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Converter } from 'showdown';
import sanitizeHtml from './sanitizeHtml';

const converter = new Converter({
  headerLevelStart: 3,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  disableForced4SpacesIndentedSublists: true,
});

export default defineComponent({
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
  computed: {
    sanitizedHtml(): string {
      const rawHtml = converter.makeHtml(this.markdown);
      return sanitizeHtml(rawHtml);
    },
  },
});
</script>

<style lang="less">
.markdown-wrapper {
  font-size: 1rem !important;
  line-height: normal !important;
  max-width: 100%;
  // no overflow on the wrapper: overflow-x would force overflow-y to auto and make each
  // message bubble scrollable, only wide content (tables, code blocks) scrolls horizontally
  overflow-wrap: anywhere;

  & > :first-child {
    margin-top: 0 !important;
  }

  & > :last-child {
    margin-bottom: 0 !important;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 1rem;
    padding: 0;
    color: inherit;
    font-weight: 600;
  }

  h1 {
    font-size: 1.875rem !important;
  }

  h2 {
    font-size: 1.625rem !important;
  }

  h3 {
    font-size: 1.5rem !important;
  }

  h4 {
    font-size: 1.375rem !important;
  }

  h5 {
    font-size: 1.25rem !important;
  }

  h6 {
    font-size: 1.125rem !important;
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
    font-size: .875em !important;
    background-color: unset;
    border-radius: unset;
  }

  pre {
    overflow: auto;
    margin-top: 0;
    margin-bottom: 1rem;
    max-width: 100%;
    width: 100%;

    code {
      color: #fff !important;
      max-width: 100%;
      width: 100%;
    }
  }

  ul, ol {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding-left: 19px;

    li {
      list-style-type: unset !important;

      &:not(:last-child){
        margin-bottom: .5rem;
      }

      & > p:first-child {
        display: inline;
      }
    }
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: number;
  }

  table {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    margin-bottom: 1rem;
    border-collapse: collapse;

    tr {

      td, th {
        padding: 4px;
        border: 1px solid var(--theme-color-border, #cccccc);
      }

      th {
        font-weight: 700;
      }
    }
  }
}
</style>
