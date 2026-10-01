<template>
  <div class="ai-chat-markdown" v-html="sanitizedHtml" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Converter } from 'showdown';
import { translate } from 'CoreHome';
import writeToClipboard from './clipboard';
import sanitizeHtml from './sanitizeHtml';
import wrapWideBlocks from './wrapWideBlocks';

const COPIED_FEEDBACK_MS = 2000;

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
      return wrapWideBlocks(sanitizeHtml(rawHtml));
    },
  },
  // the copy buttons of the code blocks are rendered HTML, one listener serves them all; being
  // real buttons, the keyboard activates them with a click event too
  mounted() {
    (this.$el as HTMLElement).addEventListener('click', this.onClick);
  },
  beforeUnmount() {
    (this.$el as HTMLElement).removeEventListener('click', this.onClick);
  },
  methods: {
    async onClick(event: MouseEvent) {
      const button = (event.target as Element).closest('.ai-chat-code-copy');
      const code = button?.parentElement?.querySelector('pre');
      if (!button || !code) {
        return;
      }
      try {
        await writeToClipboard(code.textContent || '');
      } catch {
        return;
      }
      button.textContent = translate('ChatGPT_CodeCopied');
      window.setTimeout(() => {
        button.textContent = translate('ChatGPT_CopyCode');
      }, COPIED_FEEDBACK_MS);
    },
  },
});
</script>

<style lang="less">
@import './Chat/markdown.less';
</style>
