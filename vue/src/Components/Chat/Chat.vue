<template>
  <div class="ai-chat-interface-wrapper">
    <ChatMessagesList
      ref="messagesList"
      :loading="loading"
      :errored="errored"
      :messages="messages"
      :ai-name="aiName"
      :ai-color="aiColor"
    />
    <ChatForm :loading="loading" :ai-label="aiLabel" @prompt="onSubmit"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AjaxHelper } from 'CoreHome';
import ChatForm from './ChatForm.vue';
import ChatMessagesList from './ChatMessagesList.vue';

interface MessageState {
  role: string,
  content: string,
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
    reportId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      errored: false,
      messages: [],
    };
  },
  methods: {
    onSubmit(userPrompt: MessageState) {
      this.loading = true;
      if (userPrompt) {
        this.messages.push(userPrompt);
      }
      this.scrollDown();
      AjaxHelper
        .fetch({
          method: this.apiMethod,
          reportId: this.reportId,
        }, {
          postParams: {
            messages: this.messages,
          },
        })
        .then((response) => {
          if (response.choices && response.choices.length > 0) {
            this.messages.push({
              role: response.choices[0].message.role,
              content: response.choices[0].message.content,
            });
          }
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          this.scrollDown();
        });
    },
    scrollDown() {
      this.$refs.messagesList.scrollDown();
    },
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
