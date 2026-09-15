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

export interface ApiResponse {
  choices?: StreamChoice[];
  error?: { message: string };
}

export interface AgentStatus {
  mode: 'agent' | 'chat';
  mcp: string;
  ai: string;
  providerName: string | null;
  toolCount: number;
  // false when McpServer only exposes read-only tools
  canPerformActions: boolean;
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
