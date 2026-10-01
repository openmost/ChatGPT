/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

export type AgentStepStatus = 'running' | 'done' | 'error';

// a tool called by the agent while answering
export interface AgentStep {
  id: string;
  name: string;
  title: string;
  status: AgentStepStatus;
}

export interface Message {
  role: string;
  content: string;
  steps?: AgentStep[];
}

export interface StreamChoice {
  delta?: { role?: string; content?: string };
  message?: { role?: string; content?: string };
}

/**
 * The settings link is set when the error is caused by the model and the user can change it.
 */
export interface ApiError {
  message: string;
  settingsUrl?: string;
  settingsLabel?: string;
}

export interface ApiResponse {
  choices?: StreamChoice[];
  error?: ApiError;
}

// a step that unlocks the agent mode, the texts are translation keys
export interface Recommendation {
  id: string;
  message: string;
  // empty when the user cannot take the step
  action: string;
  url: string;
  askAdministrator: boolean;
}

export interface AgentStatus {
  mode: 'agent' | 'chat';
  // AI Providers answers, or the host and key of the plugin settings
  engine: 'aiProviders' | 'plugin';
  keySource: 'site' | 'aiProviders' | 'system' | 'none';
  mcp: string;
  ai: string;
  providerName: string | null;
  toolCount: number;
  // false when McpServer only exposes read-only tools
  canPerformActions: boolean;
  recommendations: Recommendation[];
}

export interface AgentEvent {
  type: 'text' | 'tool_call' | 'tool_result' | 'error';
  content?: string;
  id?: string;
  name?: string;
  title?: string;
  isError?: boolean;
  message?: string;
}
