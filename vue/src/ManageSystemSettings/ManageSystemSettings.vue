<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div>
    <ContentBlock :content-title="translate('ChatGPT_SettingsConnectionTitle')">
      <p>{{ translate('ChatGPT_SystemSettingsIntro') }}</p>

      <Alert
        v-if="aiProvidersNotice"
        severity="info"
      >
        {{ aiProvidersNotice.message }}
        <span
          v-if="aiProvidersNotice.link"
          v-html="$sanitize(aiProvidersNotice.link)"
        />
      </Alert>

      <div
        v-for="field in connectionFields"
        :key="field.name"
      >
        <Field
          :uicontrol="field.uicontrol"
          :name="`chatGptSystem_${field.name}`"
          :title="field.title"
          :description="field.description"
          :options="field.options || undefined"
          :disabled="field.disabled"
          v-model="values[field.name]"
        />
      </div>

      <div id="chatGptSystemNotice_connection" />
      <div class="chatGptActions">
        <SaveButton
          class="chatGptSaveConnection"
          :saving="isSaving.connection"
          @confirm="save('connection')"
        />
        <!-- enabled even when AI Providers takes over, so an old key can still be removed -->
        <button
          v-if="hasApiKey"
          type="button"
          class="btn btn-outline chatGptDeleteApiKey"
          :disabled="isDeletingApiKey"
          @click="confirmDeleteApiKey()"
        >
          {{ translate('ChatGPT_DeleteApiKey') }}
        </button>
      </div>
    </ContentBlock>

    <ContentBlock :content-title="translate('ChatGPT_SettingsPromptsTitle')">
      <div
        v-for="field in promptFields"
        :key="field.name"
        class="chatGptPromptField"
      >
        <Field
          :uicontrol="field.uicontrol"
          :name="`chatGptSystem_${field.name}`"
          :title="field.title"
          :description="field.description"
          :disabled="field.disabled"
          v-model="values[field.name]"
        />
      </div>

      <div id="chatGptSystemNotice_prompts" />
      <div class="chatGptActions">
        <SaveButton
          class="chatGptSavePrompts"
          :saving="isSaving.prompts"
          @confirm="save('prompts')"
        />
        <button
          v-if="hasCustomPrompt"
          type="button"
          class="btn btn-outline chatGptResetPrompts"
          :title="translate('ChatGPT_ResetPromptToDefaultHelp')"
          @click="resetPrompts()"
        >
          {{ translate('ChatGPT_ResetPromptToDefault') }}
        </button>
      </div>
    </ContentBlock>

    <div
      class="ui-confirm"
      ref="confirmDeleteApiKeyModal"
    >
      <h2>{{ translate('ChatGPT_DeleteApiKeyConfirmTitle') }}</h2>
      <p>{{ translate('ChatGPT_DeleteApiKeyConfirmText') }}</p>
      <input
        role="yes"
        type="button"
        :value="translate('General_Yes')"
      />
      <input
        role="no"
        type="button"
        :value="translate('General_No')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
} from 'vue';
import {
  AjaxHelper,
  Alert,
  ContentBlock,
  Matomo,
  NotificationsStore,
  translate,
} from 'CoreHome';
import { Field, SaveButton } from 'CorePluginsAdmin';

const API_KEY_PLACEHOLDER = '******';

export const PROMPT_FIELDS = ['chatBasePrompt', 'insightBasePrompt'];

type Card = 'connection' | 'prompts';

export interface SystemSettingOption {
  key: string;
  value: string;
}

export interface AiProvidersNotice {
  message: string;
  // HTML sentence with the link to AI Providers, empty for the users who cannot open it
  link: string;
}

export interface SystemSettingField {
  name: string;
  uicontrol: string;
  title: string;
  description: string;
  options: SystemSettingOption[] | null;
  disabled: boolean;
}

/**
 * General settings of the plugin, rendered on the ChatGPT page of the System administration.
 * Each card saves only its own fields, the unsaved edits of the other card are kept.
 */
export default defineComponent({
  name: 'ManageSystemSettings',
  components: {
    Alert,
    ContentBlock,
    Field,
    SaveButton,
  },
  props: {
    fields: {
      type: Array as PropType<SystemSettingField[]>,
      required: true,
    },
    settings: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
    aiProvidersNotice: {
      type: Object as PropType<AiProvidersNotice | null>,
      default: null,
    },
    // default prompts in the language of the user, a prompt equal to its default is not stored
    defaultPrompts: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
  },
  setup(props) {
    const values = reactive<Record<string, string>>({ ...props.settings });
    const isSaving = reactive<Record<Card, boolean>>({ connection: false, prompts: false });
    const hasApiKey = ref(!!props.settings.apiKey);
    const isDeletingApiKey = ref(false);
    const confirmDeleteApiKeyModal = ref<HTMLElement | null>(null);

    const connectionFields = computed(
      () => props.fields.filter((field) => !PROMPT_FIELDS.includes(field.name)),
    );
    const promptFields = computed(
      () => props.fields.filter((field) => PROMPT_FIELDS.includes(field.name)),
    );

    const isDefaultPrompt = (name: string) => (
      (values[name] || '').trim() === (props.defaultPrompts[name] || '').trim()
    );

    // a prompt set in the config file cannot be edited, it is left as is
    const hasCustomPrompt = computed(() => promptFields.value.some(
      (field) => !field.disabled && !isDefaultPrompt(field.name),
    ));

    const resetPrompts = () => {
      promptFields.value.forEach((field) => {
        if (!field.disabled) {
          values[field.name] = props.defaultPrompts[field.name] || '';
        }
      });
    };

    const notify = (card: Card, context: 'success' | 'error', message: string) => {
      NotificationsStore.show({
        message,
        context,
        type: 'transient',
        id: `chatGptSystemSettingsNotice_${card}`,
        placeat: `#chatGptSystemNotice_${card}`,
      });
    };

    const save = (card: Card) => {
      isSaving[card] = true;

      // the fields that cannot be edited and the fields of the other card are left out, they keep
      // their saved values
      const cardFields = card === 'prompts' ? promptFields.value : connectionFields.value;
      const postParams: Record<string, string> = {};
      cardFields.forEach((field) => {
        if (!field.disabled) {
          postParams[field.name] = values[field.name] || '';
        }
      });

      AjaxHelper.post(
        { method: 'ChatGPT.setSystemSettings' },
        postParams,
        { createErrorNotification: false },
      ).then(() => {
        if (card === 'connection' && 'apiKey' in postParams) {
          // an empty key keeps the saved key
          hasApiKey.value = hasApiKey.value || !!values.apiKey;
          values.apiKey = hasApiKey.value ? API_KEY_PLACEHOLDER : '';
        }
        if (card === 'prompts') {
          // an empty prompt is saved as the default
          PROMPT_FIELDS.forEach((name) => {
            if (name in postParams && !(values[name] || '').trim()) {
              values[name] = props.defaultPrompts[name] || '';
            }
          });
        }
        notify(card, 'success', translate('General_YourChangesHaveBeenSaved'));
      }).catch((error: Error) => {
        notify(card, 'error', (error && error.message) || translate('ChatGPT_AnErrorOccurred'));
      }).finally(() => {
        isSaving[card] = false;
      });
    };

    // an empty key keeps the saved key: only this explicit request removes it
    const deleteApiKey = () => {
      isDeletingApiKey.value = true;
      AjaxHelper.post(
        { method: 'ChatGPT.setSystemSettings' },
        { deleteApiKey: 1 },
        { createErrorNotification: false },
      ).then(() => {
        hasApiKey.value = false;
        values.apiKey = '';
        notify('connection', 'success', translate('ChatGPT_DeleteApiKeyDone'));
      }).catch((error: Error) => {
        const message = (error && error.message) || translate('ChatGPT_AnErrorOccurred');
        notify('connection', 'error', message);
      }).finally(() => {
        isDeletingApiKey.value = false;
      });
    };

    const confirmDeleteApiKey = () => {
      Matomo.helper.modalConfirm(confirmDeleteApiKeyModal.value as HTMLElement, {
        yes: deleteApiKey,
      });
    };

    return {
      translate,
      values,
      isSaving,
      hasApiKey,
      isDeletingApiKey,
      confirmDeleteApiKeyModal,
      confirmDeleteApiKey,
      connectionFields,
      promptFields,
      hasCustomPrompt,
      resetPrompts,
      save,
    };
  },
});
</script>

<style lang="less" scoped>
// the secondary actions sit on the line of the Save button, and wrap below it on narrow screens
.chatGptActions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}
</style>
