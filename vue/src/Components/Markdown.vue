<template>
  <div class="markdown-wrapper" v-html="sanitizedHtml"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Converter } = require('showdown');

const converter = new Converter({
  headerLevelStart: 3,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  disableForced4SpacesIndentedSublists: true,
});

/**
 * Sanitizes HTML to prevent XSS attacks
 * Allows only safe HTML tags and attributes
 */
function sanitizeHtml(html: string): string {
  if (!html) {
    return '';
  }

  const allowedTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'ul', 'ol', 'li',
    'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins',
    'a', 'code', 'pre', 'blockquote',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'input', // for tasklists
  ];

  const allowedAttributes: Record<string, string[]> = {
    a: ['href', 'title', 'target', 'rel'],
    input: ['type', 'checked', 'disabled'],
    th: ['align'],
    td: ['align'],
  };

  // Create a temporary div to parse HTML safely
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  function sanitizeNode(node: Node): void {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (!allowedTags.includes(tagName)) {
        // Replace disallowed element with its text content
        const text = document.createTextNode(element.textContent || '');
        if (element.parentNode) {
          element.parentNode.replaceChild(text, element);
        }
        return;
      }

      // Remove disallowed attributes
      const attrs = Array.from(element.attributes);
      attrs.forEach((attr) => {
        const allowedAttrs = allowedAttributes[tagName] || [];
        if (!allowedAttrs.includes(attr.name)) {
          element.removeAttribute(attr.name);
        }
      });

      // Sanitize href attributes to prevent unsafe URLs
      if (tagName === 'a') {
        const href = element.getAttribute('href');
        const hrefLower = href?.toLowerCase() || '';
        // eslint-disable-next-line no-script-url
        const jsPrefix = 'javascript:';
        const dataPrefix = 'data:';
        const isUnsafe = hrefLower.startsWith(jsPrefix)
          || hrefLower.startsWith(dataPrefix);
        if (href && isUnsafe) {
          element.setAttribute('href', '#');
        }
        // Add security attributes for external links
        element.setAttribute('rel', 'noopener noreferrer');
      }

      // Only allow checkbox inputs for tasklists
      if (tagName === 'input') {
        const type = element.getAttribute('type');
        if (type !== 'checkbox') {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
          return;
        }
        element.setAttribute('disabled', 'disabled');
      }

      // Recursively sanitize children
      Array.from(element.childNodes).forEach(sanitizeNode);
    }
  }

  Array.from(tempDiv.childNodes).forEach(sanitizeNode);
  return tempDiv.innerHTML;
}

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
  overflow-x: auto;

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
