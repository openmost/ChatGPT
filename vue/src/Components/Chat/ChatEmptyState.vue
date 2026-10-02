<template>
  <div class="ai-chat-empty">
    <span
      class="ai-chat-empty__mark"
      aria-hidden="true"
    >
      <IconAi :ai-name="aiName" />
    </span>
    <h2 class="ai-chat-empty__title">{{ translate('ChatGPT_EmptyStateTitle') }}</h2>
    <p class="ai-chat-empty__text">{{ translate('ChatGPT_EmptyStateText', aiLabel) }}</p>
    <ul
      class="ai-chat-empty__suggestions"
      :aria-label="translate('ChatGPT_SuggestionsLabel')"
    >
      <li
        v-for="suggestion in suggestions"
        :key="suggestion"
      >
        <button
          type="button"
          class="ai-chat-empty__suggestion"
          @click="$emit('suggest', suggestion)"
        >{{ suggestion }}</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';
import IconAi from '../Icon/IconAi.vue';

export default defineComponent({
  components: {
    IconAi,
  },
  props: {
    aiName: { type: String, required: true },
    aiLabel: { type: String, required: true },
  },
  emits: ['suggest'],
  computed: {
    suggestions(): string[] {
      return [
        translate('ChatGPT_SuggestionWeeklyKpis'),
        translate('ChatGPT_SuggestionTopPages'),
        translate('ChatGPT_SuggestionTrafficSources'),
        translate('ChatGPT_SuggestionGoals'),
      ];
    },
  },
  methods: {
    translate,
  },
});
</script>

<style lang="less" scoped>
.ai-chat-empty {
  padding: 2.5rem 0 1rem;
}

.ai-chat-empty__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 0 0 1.25rem;
  border-radius: 12px;
  background: var(--ai-chat-accent-soft);
  color: var(--ai-chat-accent);

  :deep(svg) {
    display: block;
    width: 22px;
    height: 22px;
  }
}

.ai-chat-empty__title {
  margin: 0 0 .5rem;
  padding: 0;
  color: var(--ai-chat-text-strong);
  font-size: 1.5rem;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: -.01em;
  text-transform: none;
}

.ai-chat-empty__text {
  max-width: 34rem;
  margin: 0 0 1.75rem;
  padding: 0;
  color: var(--ai-chat-text-muted);
  font-size: .9375rem;
  line-height: 1.55;
}

.ai-chat-empty__suggestions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: .625rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.ai-chat-empty__suggestion {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: .75rem .875rem;
  border: 1px solid var(--ai-chat-border);
  border-radius: 10px;
  background: var(--ai-chat-surface);
  color: var(--ai-chat-text);
  font: inherit;
  font-size: .875rem;
  line-height: 1.45;
  text-align: left;
  text-transform: none;
  box-shadow: none;
  cursor: pointer;
  overflow-wrap: anywhere;

  &:hover {
    border-color: var(--ai-chat-accent-strong);
    background: var(--ai-chat-accent-soft);
  }
}
</style>
