<template>
  <div class="ai-chat-page-wrapper">
    <Chat
      ref="chat"
      :loading="loading"
      :errored="errored"
      :messages="messages"
      :ai-name="aiName"
      :ai-label="aiLabel"
      :ai-color="aiColor"
      @prompt="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { AjaxHelper } from 'CoreHome';
import { defineComponent } from 'vue';
import Chat from '../Components/Chat/Chat.vue';

interface MessageState {
  role: string,
  content: string,
}

export default defineComponent({
  components: {
    Chat,
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
  },
  data() {
    return {
      loading: false,
      errored: false,
      messages: [],
    };
  },
  methods: {
    onSubmit(userPrompt) {
      this.loading = true;
      if (userPrompt) {
        this.messages.push(userPrompt);
      }
      this.$refs.chat.scrollDown();
      AjaxHelper
        .fetch({
          method: this.apiMethod,
        }, {
          postParams: {
            messages: this.messages,
          },
        })
        .then((response) => {
          if (response.choices && response.choices.length > 0) {
            this.messages.push(response.choices[0].message);
          }
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          this.$refs.chat.scrollDown();
        });
    },
  },
});
</script>

<style lang="less">
.ai-chat-page-wrapper {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;

  .ai-chat-conversation-wrapper {
    //max-height: none;
  }

  .ai-chat-form-wrapper {
    position: fixed;
    bottom: 20px;
  }
}
</style>
