/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { reactive, readonly } from 'vue';

// One insights panel per page: every report trigger drives this single store and the single
// InsightOverlay instance mounted by assets/js/app.js, so two panels can never stack.

export interface InsightReport {
  triggerId: string;
  title: string;
  widgetParams: Record<string, unknown>;
}

interface InsightState {
  open: boolean;
  report: InsightReport | null;
  // incremented on every opening, the overlay asks for a new insight each time
  requestId: number;
}

// other AI plugins (MistralAI) dispatch the same event, so their panel and this one never overlap
export const OVERLAY_OPEN_EVENT = 'matomo-ai-insight-overlay:open';
const OWNER = 'ChatGPT';

export const OVERLAY_ID = 'ai-chat-insight-overlay-chatgpt';

const state = reactive<InsightState>({
  open: false,
  report: null,
  requestId: 0,
});

let triggerCount = 0;
let returnFocusTarget: HTMLElement | null = null;

export const insightState = readonly(state);

export function nextTriggerId(): string {
  triggerCount += 1;
  return `ai-chat-insight-trigger-${triggerCount}`;
}

export function isTriggerActive(triggerId: string): boolean {
  return state.open && state.report?.triggerId === triggerId;
}

export function openInsight(report: InsightReport, trigger: HTMLElement | null): void {
  state.report = { ...report };
  state.open = true;
  state.requestId += 1;
  returnFocusTarget = trigger;

  window.dispatchEvent(new CustomEvent(OVERLAY_OPEN_EVENT, { detail: { owner: OWNER } }));
}

export function closeInsight(): void {
  state.open = false;
}

/**
 * The same trigger closes the panel, another report's trigger switches it to that report.
 */
export function toggleInsight(report: InsightReport, trigger: HTMLElement | null): void {
  if (isTriggerActive(report.triggerId)) {
    closeInsight();
    return;
  }

  openInsight(report, trigger);
}

/**
 * The trigger that opened the panel, when it is still in the page (a reloaded widget replaces it).
 */
export function getReturnFocusTarget(): HTMLElement | null {
  return returnFocusTarget && returnFocusTarget.isConnected ? returnFocusTarget : null;
}

export function resetInsightStore(): void {
  state.open = false;
  state.report = null;
  state.requestId = 0;
  returnFocusTarget = null;
}

if (typeof window !== 'undefined') {
  window.addEventListener(OVERLAY_OPEN_EVENT, (event) => {
    const { detail } = event as CustomEvent<{ owner?: string }>;
    if (detail?.owner !== OWNER) {
      closeInsight();
    }
  });
}
