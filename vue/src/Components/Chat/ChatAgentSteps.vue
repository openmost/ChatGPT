<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <ul class="ai-chat-agent-steps">
    <li
      v-for="step in steps"
      :key="step.id"
      :class="`ai-chat-agent-step ai-chat-agent-step--${step.status}`"
    >
      <span
        v-if="step.status === 'running'"
        class="ai-chat-agent-step__spinner"
      />
      <span
        v-else
        :class="step.status === 'error' ? 'icon-error' : 'icon-ok'"
      />
      <span class="ai-chat-agent-step__label">{{ label(step) }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { translate } from 'CoreHome';
import { AgentStep } from '../../types';

export default defineComponent({
  props: {
    steps: {
      type: Array as PropType<AgentStep[]>,
      required: true,
    },
  },
  methods: {
    label(step: AgentStep): string {
      return translate('ChatGPT_AgentToolStep', step.title || step.name);
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-agent-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 0 .75rem;
  padding: 0;
  list-style: none;
}

.ai-chat-agent-step {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .8125rem;
  color: var(--theme-color-text-lighter, #666);
  list-style: none;

  &.ai-chat-agent-step--error {
    color: var(--theme-color-base-series, #d4291f);
  }

  .icon-ok,
  .icon-error {
    font-size: .75rem;
  }
}

.ai-chat-agent-step__spinner {
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ai-chat-agent-step-rotation 1s linear infinite;
}

@keyframes ai-chat-agent-step-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
