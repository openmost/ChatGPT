<template>
  <div class="ai-chat-interface">
    <ChatMessagesList
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

interface Message {
  role: string;
  content: string;
}

interface StreamChoice {
  delta?: { role?: string; content?: string };
  message?: { role?: string; content?: string };
}

interface ApiResponse {
  choices?: StreamChoice[];
  error?: { message: string };
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
      abortController: null as AbortController | null,
      streamingSupported: true,
    };
  },
  computed: {
    displayMessages(): Message[] {
      if (this.streaming && this.streamingContent) {
        return [...this.messages, { role: 'assistant', content: this.streamingContent }];
      }
      return this.messages;
    },
  },
  methods: {
    onSubmit(userPrompt?: Message) {
      if (userPrompt) {
        this.messages.push(userPrompt);
      }
      this.loading = true;
      this.errored = false;
      this.errorMessage = '';

      if (this.useStreaming && this.streamingSupported) {
        this.fetchStreaming();
      } else {
        this.fetchNonStreaming();
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
          idSite: String(MatomoUrl.parsed.value.idSite || ''),
          period: String(MatomoUrl.parsed.value.period || 'day'),
          date: String(MatomoUrl.parsed.value.date || 'today'),
        });

        const tokenAuth = this.getTokenAuth();
        if (tokenAuth) {
          params.append('token_auth', tokenAuth);
        }

        const postBody = new URLSearchParams({
          messages: JSON.stringify(this.messages),
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

        await this.processStream(reader);

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
            messages: this.messages,
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
