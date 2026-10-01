<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div :class="['ai-chat-steps', `ai-chat-steps--${overallStatus}`]">
    <button
      type="button"
      class="ai-chat-steps__toggle"
      :aria-expanded="expanded ? 'true' : 'false'"
      :aria-controls="listId"
      :title="summary"
      @click="expanded = !expanded"
    >
      <span :class="['ai-chat-steps__status', `ai-chat-steps__status--${overallStatus}`]" />
      <span class="ai-chat-steps__summary">{{ summary }}</span>
      <span
        v-if="failedCount > 0 && overallStatus !== 'running'"
        class="ai-chat-steps__failed"
      >{{ translate('ChatGPT_AgentStepsFailed', failedCount) }}</span>
      <ChatIcon
        name="chevron"
        :size="14"
        class="ai-chat-steps__chevron"
      />
    </button>
    <ol
      v-show="expanded"
      :id="listId"
      class="ai-chat-steps__list"
    >
      <li
        v-for="step in steps"
        :key="step.id"
        :class="['ai-chat-step', `ai-chat-step--${step.status}`]"
      >
        <span :class="['ai-chat-steps__status', `ai-chat-steps__status--${step.status}`]" />
        <span class="ai-chat-step__text">
          <span class="ai-chat-step__title">{{ step.title || step.name }}</span>
          <code
            v-if="step.name && step.name !== step.title"
            class="ai-chat-step__name"
          >{{ step.name }}</code>
          <span class="ai-chat-sr-only">{{ statusLabel(step) }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { translate } from 'CoreHome';
import ChatIcon from '../Icon/ChatIcon.vue';
import { AgentStep, AgentStepStatus } from '../../types';

let stepsCount = 0;

export default defineComponent({
  components: {
    ChatIcon,
  },
  props: {
    steps: {
      type: Array as PropType<AgentStep[]>,
      required: true,
    },
  },
  data() {
    stepsCount += 1;
    return {
      expanded: false,
      listId: `ai-chat-steps-${stepsCount}`,
    };
  },
  computed: {
    runningStep(): AgentStep | undefined {
      return [...this.steps].reverse().find((step) => step.status === 'running');
    },
    failedCount(): number {
      return this.steps.filter((step) => step.status === 'error').length;
    },
    overallStatus(): AgentStepStatus {
      if (this.runningStep) {
        return 'running';
      }
      return this.failedCount === this.steps.length ? 'error' : 'done';
    },
    summary(): string {
      if (this.runningStep) {
        return translate('ChatGPT_AgentToolStep', this.runningStep.title || this.runningStep.name);
      }
      return translate('ChatGPT_AgentStepsSummary', this.steps.length);
    },
  },
  methods: {
    translate,
    statusLabel(step: AgentStep): string {
      if (step.status === 'running') {
        return translate('ChatGPT_AgentStepRunning');
      }
      return step.status === 'error'
        ? translate('ChatGPT_AgentStepError')
        : translate('ChatGPT_AgentStepDone');
    },
  },
});
</script>

<style lang="less" scoped>
.ai-chat-steps {
  max-width: 100%;
  min-width: 0;
  margin: 0 0 .75rem;
  font-size: .8125rem;
  line-height: 1.4;
}

.ai-chat-steps__toggle {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  box-sizing: border-box;
  max-width: 100%;
  height: 28px;
  margin: 0;
  padding: 0 .625rem 0 .625rem;
  border: 1px solid var(--ai-chat-hairline);
  border-radius: 999px;
  background: var(--ai-chat-surface);
  color: var(--ai-chat-text-muted);
  font: inherit;
  text-align: left;
  text-transform: none;
  box-shadow: none;
  cursor: pointer;

  &:hover {
    color: var(--ai-chat-text);
    border-color: var(--ai-chat-border);
  }
}

.ai-chat-steps__summary {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ai-chat-steps__failed {
  flex-shrink: 0;
  color: var(--ai-chat-danger);
}

.ai-chat-steps__chevron {
  flex-shrink: 0;
  transition: transform .15s ease;

  [aria-expanded="true"] > & {
    transform: rotate(90deg);
  }
}

// a dot for done, a ring for running, a red dot for failed
.ai-chat-steps__status {
  position: relative;
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ai-chat-accent);

  &--running {
    background: transparent;
    border: 2px solid var(--ai-chat-accent);
    border-right-color: transparent;
    width: 10px;
    height: 10px;
    animation: ai-chat-steps-spin .9s linear infinite;
  }

  &--error {
    background: var(--ai-chat-danger);
  }
}

.ai-chat-steps__list {
  position: relative;
  margin: .5rem 0 0 .875rem;
  padding: 0 0 0 1rem;
  list-style: none;
  border-left: 1px solid var(--ai-chat-hairline);
}

.ai-chat-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: .5rem;
  margin: 0;
  padding: .25rem 0;
  list-style: none;
  color: var(--ai-chat-text-muted);

  .ai-chat-steps__status {
    position: absolute;
    top: .6em;
    left: calc(-1rem - 4.5px);
  }

  .ai-chat-steps__status--running {
    left: calc(-1rem - 5.5px);
    top: .5em;
  }

  &--error {
    color: var(--ai-chat-danger);
  }
}

.ai-chat-step__text {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: .125rem .5rem;
  min-width: 0;
  overflow-wrap: anywhere;
}

.ai-chat-step__title {
  color: var(--ai-chat-text);

  .ai-chat-step--error & {
    color: var(--ai-chat-danger);
  }
}

.ai-chat-step__name {
  padding: 0;
  background: none;
  color: var(--ai-chat-text-muted);
  font-family: var(--ai-chat-font-mono);
  font-size: .75rem;
  overflow-wrap: anywhere;
}

@keyframes ai-chat-steps-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ai-chat-steps__status--running {
    animation: none;
    border-right-color: var(--ai-chat-accent);
    opacity: .6;
  }

  .ai-chat-steps__chevron {
    transition: none;
  }
}
</style>
