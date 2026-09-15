<template>
  <div class="ai-chat-interface">
    <ChatMessagesList
      :loading="loading"
      :errored="errored"
      :error-message="errorMessage"
      :notice="agentNotice"
      :messages="displayMessages"
      :ai-name="aiName"
      :ai-color="aiColor"
      :streaming="streaming"
    />
    <ChatForm
      :loading="loading || streaming"
      :ai-label="aiLabel"
      @prompt="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AjaxHelper, MatomoUrl, translate } from 'CoreHome';
import ChatForm from './ChatForm.vue';
import ChatMessagesList from './ChatMessagesList.vue';
import {
  AgentEvent,
  AgentStatus,
  AgentStep,
  ApiResponse,
  Message,
} from '../../types';

// alert displayed when the chat cannot use the Matomo tools, by unavailable dependency status
const MCP_NOTICES: Record<string, string> = {
  not_installed: 'ChatGPT_AgentMcpNotInstalled',
  not_activated: 'ChatGPT_AgentMcpNotActivated',
  disabled: 'ChatGPT_AgentMcpDisabled',
  unavailable: 'ChatGPT_AgentMcpUnavailable',
};

const AI_NOTICES: Record<string, string> = {
  not_configured: 'ChatGPT_AgentAiNotConfigured',
  unsupported: 'ChatGPT_AgentAiUnsupported',
  unavailable: 'ChatGPT_AgentAiNotConfigured',
};

function getContextParams(): Record<string, string> {
  return {
    idSite: String(MatomoUrl.parsed.value.idSite || ''),
    period: String(MatomoUrl.parsed.value.period || 'day'),
    date: String(MatomoUrl.parsed.value.date || 'today'),
  };
}

export default defineComponent({
  components: {
    ChatMessagesList,
    ChatForm,
  },
  props: {
    aiName: { type: String, required: true },
    aiLabel: { type: String, required: true },
    aiColor: { type: String, default: '#3450a3' },
    apiMethod: { type: String, required: true },
    streamingApiMethod: { type: String, default: 'ChatGPT.getStreamingResponse' },
    widgetParams: { type: Object, default: () => ({}) },
    useStreaming: { type: Boolean, default: true },
  },
  data() {
    return {
      loading: false,
      streaming: false,
      errored: false,
      errorMessage: '',
      messages: [] as Message[],
      streamingContent: '',
      agentSteps: [] as AgentStep[],
      agentStatus: null as AgentStatus | null,
      agentStatusPromise: null as Promise<void> | null,
      conversationId: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`,
      receivedAgentEvent: false,
      abortController: null as AbortController | null,
      streamingSupported: true,
    };
  },
  created() {
    this.agentStatusPromise = this.loadAgentStatus();
  },
  computed: {
    displayMessages(): Message[] {
      if (this.streaming && (this.streamingContent || this.agentSteps.length)) {
        return [
          ...this.messages,
          { role: 'assistant', content: this.streamingContent, steps: this.agentSteps },
        ];
      }
      return this.messages;
    },
    isAgentMode(): boolean {
      return this.agentStatus?.mode === 'agent';
    },
    agentNotice(): string {
      const status = this.agentStatus;
      if (!status) {
        return '';
      }
      if (status.mode === 'agent') {
        return status.canPerformActions ? '' : translate('ChatGPT_AgentReadOnly');
      }
      if (status.mcp !== 'ready') {
        return MCP_NOTICES[status.mcp] ? translate(MCP_NOTICES[status.mcp]) : '';
      }
      return AI_NOTICES[status.ai] ? translate(AI_NOTICES[status.ai]) : '';
    },
  },
  methods: {
    async onSubmit(userPrompt?: Message) {
      if (userPrompt) {
        this.messages.push(userPrompt);
      }
      this.loading = true;
      this.errored = false;
      this.errorMessage = '';

      // the first message may be sent before the agent status is known (insights panel)
      if (this.agentStatusPromise) {
        await this.agentStatusPromise;
      }

      if (this.isAgentMode) {
        this.fetchAgent();
      } else if (this.useStreaming && this.streamingSupported) {
        this.fetchStreaming();
      } else {
        this.fetchNonStreaming();
      }
    },

    async loadAgentStatus(): Promise<void> {
      try {
        const params = new URLSearchParams({
          module: 'ChatGPT',
          action: 'agentStatus',
          ...getContextParams(),
        });
        const response = await fetch(`index.php?${params.toString()}`, { credentials: 'include' });
        this.agentStatus = response.ok ? await response.json() as AgentStatus : null;
      } catch {
        // keep the classic chat
        this.agentStatus = null;
      } finally {
        this.agentStatusPromise = null;
      }
    },

    getConversationPayload(): string {
      return JSON.stringify(this.messages.map(({ role, content }) => ({ role, content })));
    },

    async fetchAgent() {
      this.streaming = false;
      this.streamingContent = '';
      this.agentSteps = [];
      this.receivedAgentEvent = false;

      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();

      try {
        const params = new URLSearchParams({
          module: 'ChatGPT',
          action: 'agent',
          ...getContextParams(),
        });

        const postBody = new URLSearchParams({
          messages: this.getConversationPayload(),
          widgetParams: JSON.stringify(this.widgetParams),
          conversationId: this.conversationId,
          token_auth: this.getTokenAuth(),
          force_api_session: '1',
        });

        const response = await fetch(`index.php?${params.toString()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: postBody,
          credentials: 'include',
          signal: this.abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        await this.processStream(reader, (data) => this.parseAgentData(data));

        if (!this.receivedAgentEvent) {
          this.handleError(translate('ChatGPT_AnErrorOccurred'));
        } else if (this.streamingContent || this.agentSteps.length) {
          this.messages.push({
            role: 'assistant',
            content: this.streamingContent,
            steps: this.agentSteps,
          });
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        this.handleError(error instanceof Error ? error.message : String(error));
      } finally {
        this.loading = false;
        this.streaming = false;
        this.streamingContent = '';
        this.agentSteps = [];
        this.abortController = null;
      }
    },

    parseAgentData(data: string): void {
      let event: AgentEvent;
      try {
        event = JSON.parse(data);
      } catch {
        return;
      }

      this.receivedAgentEvent = true;

      if (event.type === 'error') {
        this.handleError(event.message || translate('ChatGPT_AnErrorOccurred'));
        return;
      }

      if (!this.streaming) {
        this.streaming = true;
        this.loading = false;
      }

      if (event.type === 'text' && event.content) {
        this.streamingContent = this.streamingContent
          ? `${this.streamingContent}\n\n${event.content}`
          : event.content;
      } else if (event.type === 'tool_call' && event.id) {
        this.agentSteps.push({
          id: event.id,
          name: event.name || '',
          title: event.title || event.name || '',
          status: 'running',
        });
      } else if (event.type === 'tool_result' && event.id) {
        const step = this.agentSteps.find((agentStep) => agentStep.id === event.id);
        if (step) {
          step.status = event.isError ? 'error' : 'done';
        }
      }
    },

    async fetchStreaming() {
      this.streaming = false;
      this.streamingContent = '';

      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();

      try {
        const params = new URLSearchParams({
          module: 'API',
          method: this.streamingApiMethod,
          format: 'original',
          force_api_session: '1',
          ...getContextParams(),
        });

        const tokenAuth = this.getTokenAuth();
        if (tokenAuth) {
          params.append('token_auth', tokenAuth);
        }

        const postBody = new URLSearchParams({
          messages: this.getConversationPayload(),
          widgetParams: JSON.stringify(this.widgetParams),
        });

        const response = await fetch(`index.php?${params.toString()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: postBody,
          credentials: 'include',
          signal: this.abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        await this.processStream(reader, (data) => this.parseStreamData(data));

        if (this.streamingContent) {
          this.messages.push({ role: 'assistant', content: this.streamingContent });
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;

        if (!this.streamingContent && this.streamingSupported) {
          this.streamingSupported = false;
          this.streaming = false;
          this.fetchNonStreaming();
          return;
        }
        this.handleError(error instanceof Error ? error.message : String(error));
      } finally {
        this.loading = false;
        this.streaming = false;
        this.streamingContent = '';
        this.abortController = null;
      }
    },

    getTokenAuth(): string {
      type MatomoWindow = Window & {
        piwik?: { token_auth?: string };
        broadcast?: { getValueFromUrl: (k: string) => string };
      };
      const win = window as MatomoWindow;
      return win.piwik?.token_auth
        || win.broadcast?.getValueFromUrl('token_auth')
        || String(MatomoUrl.parsed.value.token_auth || '');
    },

    async processStream(
      reader: ReadableStreamDefaultReader<Uint8Array>,
      onData: (data: string) => void,
    ): Promise<void> {
      const decoder = new TextDecoder();
      let buffer = '';

      const processChunk = async (): Promise<void> => {
        const { done, value } = await reader.read();
        if (done) return;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        lines.forEach((line) => {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data !== '[DONE]') {
              onData(data);
            }
          }
        });

        await processChunk();
      };

      await processChunk();
    },

    parseStreamData(data: string): void {
      try {
        const parsed: ApiResponse = JSON.parse(data);
        if (parsed.error) {
          this.handleError(parsed.error.message);
          return;
        }
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          if (!this.streaming) {
            this.streaming = true;
            this.loading = false;
          }
          this.streamingContent += content;
        }
      } catch {
        // Skip non-JSON lines
      }
    },

    fetchNonStreaming() {
      AjaxHelper
        .fetch({ method: this.apiMethod }, {
          postParams: {
            messages: this.messages.map(({ role, content }) => ({ role, content })),
            widgetParams: this.widgetParams,
          },
        })
        .then((response: ApiResponse) => {
          if (!response || typeof response !== 'object') {
            this.handleError('Invalid response from server');
            return;
          }
          if (response.error) {
            this.handleError(response.error.message || 'An error occurred');
            return;
          }
          const message = response.choices?.[0]?.message;
          if (message) {
            this.messages.push({
              role: String(message.role || 'assistant'),
              content: String(message.content || ''),
            });
          }
        })
        .catch((error: Error) => {
          this.handleError(error instanceof Error ? error.message : String(error));
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleError(error: string) {
      this.errored = true;
      this.errorMessage = error;
      this.loading = false;
      this.streaming = false;
    },

    cancelRequest() {
      if (this.abortController) {
        this.abortController.abort();
        this.abortController = null;
        this.loading = false;
        this.streaming = false;
        this.streamingContent = '';
      }
    },
  },

  beforeUnmount() {
    this.cancelRequest();
  },
});
</script>

<style lang="less" scoped>
.ai-chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
</style>
