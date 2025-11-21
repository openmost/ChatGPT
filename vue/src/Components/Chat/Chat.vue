<template>
  <div class="ai-chat-interface-wrapper">
    <ChatMessagesList
      ref="messagesList"
      :loading="loading"
      :errored="errored"
      :error-message="errorMessage"
      :messages="displayMessages"
      :ai-name="aiName"
      :ai-color="aiColor"
      :streaming="streaming"
    />
    <ChatForm :loading="loading || streaming" :ai-label="aiLabel" @prompt="onSubmit"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AjaxHelper, MatomoUrl } from 'CoreHome';
import ChatForm from './ChatForm.vue';
import ChatMessagesList from './ChatMessagesList.vue';

interface MessageState {
  role: string;
  content: string;
}

interface StreamChoice {
  delta?: {
    role?: string;
    content?: string;
  };
  message?: {
    role?: string;
    content?: string;
  };
}

interface StreamResponse {
  choices?: StreamChoice[];
  error?: {
    message: string;
  };
}

export default defineComponent({
  components: {
    ChatMessagesList,
    ChatForm,
  },
  props: {
    aiName: {
      type: String,
      required: true,
    },
    aiLabel: {
      type: String,
      required: true,
    },
    aiColor: {
      type: String,
      default: '#3450a3',
    },
    apiMethod: {
      type: String,
      required: true,
    },
    streamingApiMethod: {
      type: String,
      default: 'ChatGPT.getStreamingResponse',
    },
    widgetParams: {
      type: Object,
      default: () => ({}),
    },
    useStreaming: {
      type: Boolean,
      default: true, // Controlled by system settings (ChatGPT.enableStreaming)
    },
  },
  mounted() {
    this.fetchSettings();
  },
  data() {
    return {
      loading: false,
      streaming: false,
      errored: false,
      errorMessage: '',
      messages: [] as MessageState[],
      streamingContent: '',
      abortController: null as AbortController | null,
      streamingEnabled: false, // Will be set from settings
    };
  },
  computed: {
    shouldUseStreaming(): boolean {
      return this.useStreaming && this.streamingEnabled;
    },
    displayMessages(): MessageState[] {
      if (this.streaming && this.streamingContent) {
        return [
          ...this.messages,
          { role: 'assistant', content: this.streamingContent },
        ];
      }
      return this.messages;
    },
  },
  methods: {
    onSubmit(userPrompt?: MessageState) {
      if (userPrompt) {
        this.messages.push(userPrompt);
      }

      this.loading = true;
      this.errored = false;
      this.errorMessage = '';
      this.scrollDown();

      if (this.shouldUseStreaming) {
        this.fetchStreaming();
      } else {
        this.fetchNonStreaming();
      }
    },

    fetchSettings() {
      AjaxHelper.fetch({ method: 'ChatGPT.getSettings' })
        .then((response: { enableStreaming?: boolean }) => {
          if (response && typeof response.enableStreaming === 'boolean') {
            this.streamingEnabled = response.enableStreaming;
          }
        })
        .catch(() => {
          // Silently fail - streaming will remain disabled
        });
    },

    async fetchStreaming() {
      this.streaming = false; // Will be set to true when first byte arrives
      this.streamingContent = '';

      // Cancel any previous request
      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();

      try {
        // Build URL params - force_api_session enables session-based auth
        const params = new URLSearchParams({
          module: 'API',
          method: this.streamingApiMethod,
          format: 'original',
          force_api_session: '1',
          idSite: String(MatomoUrl.parsed.value.idSite || ''),
          period: String(MatomoUrl.parsed.value.period || 'day'),
          date: String(MatomoUrl.parsed.value.date || 'today'),
        });

        // Try to get token_auth from various sources for non-session auth
        type MatomoWindow = Window & {
          piwik?: { token_auth?: string };
          broadcast?: { getValueFromUrl: (k: string) => string };
        };
        const win = window as MatomoWindow;
        const tokenAuth = win.piwik?.token_auth
          || win.broadcast?.getValueFromUrl('token_auth')
          || MatomoUrl.parsed.value.token_auth
          || '';

        if (tokenAuth) {
          params.append('token_auth', String(tokenAuth));
        }

        const response = await fetch(`index.php?${params.toString()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            messages: JSON.stringify(this.messages),
            widgetParams: JSON.stringify(this.widgetParams),
          }),
          credentials: 'include', // Always send cookies for session auth
          signal: this.abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        await this.processStream(reader);

        // Finalize the message
        if (this.streamingContent) {
          this.messages.push({
            role: 'assistant',
            content: this.streamingContent,
          });
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
        const errorMsg = error instanceof Error ? error.message : String(error);
        this.handleError(errorMsg);
      } finally {
        this.loading = false;
        this.streaming = false;
        this.streamingContent = '';
        this.abortController = null;
        this.scrollDown();
      }
    },

    async processStream(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<void> {
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
              this.parseStreamData(data);
            }
          }
        });

        await processChunk();
      };

      await processChunk();
    },

    parseStreamData(data: string): void {
      try {
        const parsed: StreamResponse = JSON.parse(data);
        if (parsed.error) {
          this.handleError(parsed.error.message);
          return;
        }
        if (parsed.choices?.[0]?.delta?.content) {
          // First byte received - switch from loading to streaming mode
          if (!this.streaming) {
            this.streaming = true;
            this.loading = false;
          }
          this.streamingContent += parsed.choices[0].delta.content;
          this.scrollDown();
        }
      } catch {
        // Skip non-JSON lines
      }
    },

    fetchNonStreaming() {
      AjaxHelper
        .fetch({
          method: this.apiMethod,
        }, {
          postParams: {
            messages: this.messages,
            widgetParams: this.widgetParams,
          },
        })
        .then((response: StreamResponse) => {
          if (!response || typeof response !== 'object') {
            this.handleError('Invalid response from server');
            return;
          }

          if (response.error) {
            const errorMsg = response.error.message || 'An error occurred';
            this.handleError(errorMsg);
            return;
          }

          if (this.isValidResponse(response)) {
            const { message } = (response.choices as StreamChoice[])[0];
            if (message) {
              this.messages.push({
                role: String(message.role || 'assistant'),
                content: String(message.content || ''),
              });
            }
          }
        })
        .catch((error: Error) => {
          const errorMsg = error instanceof Error ? error.message : String(error);
          this.handleError(errorMsg);
        })
        .finally(() => {
          this.loading = false;
          this.scrollDown();
        });
    },

    isValidResponse(response: unknown): boolean {
      if (!response || typeof response !== 'object') {
        return false;
      }
      const r = response as Record<string, unknown>;
      if (!Array.isArray(r.choices) || r.choices.length === 0) {
        return false;
      }
      const choice = r.choices[0] as Record<string, unknown>;
      if (!choice.message || typeof choice.message !== 'object') {
        return false;
      }
      return true;
    },

    scrollDown() {
      this.$nextTick(() => {
        const list = this.$refs.messagesList as { scrollDown?: () => void } | undefined;
        if (list && list.scrollDown) {
          list.scrollDown();
        }
      });
    },

    handleError(error: string) {
      this.errored = true;
      this.errorMessage = error;
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
.ai-chat-interface-wrapper {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  max-height: 100%;
}
</style>
