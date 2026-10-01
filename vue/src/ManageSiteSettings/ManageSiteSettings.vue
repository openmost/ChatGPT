<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div>
    <ContentBlock :content-title="translate('ChatGPT_SettingsConnectionTitle')">
      <p>{{ translate('ChatGPT_SiteSettingsIntro') }}</p>

      <Alert
        v-if="aiProvidersConnected"
        severity="info"
      >
        {{ translate('ChatGPT_SiteSettingsAiProvidersNotice') }}
        <span
          v-if="aiProvidersLink"
          v-html="$sanitize(aiProvidersLink)"
        />
      </Alert>

      <div
        v-for="field in connectionFields"
        :key="field.name"
      >
        <Field
          :uicontrol="field.uicontrol"
          :name="`chatGpt_${field.name}`"
          :title="field.title"
          :inline-help="field.description"
          :options="field.options"
          v-model="values[field.name]"
        />
      </div>

      <div id="chatGptSiteNotice_connection" />
      <div class="chatGptActions">
        <SaveButton
          class="chatGptSaveConnection"
          :saving="isSaving.connection"
          @confirm="save('connection')"
        />
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
      <p>{{ translate('ChatGPT_SiteSettingsPromptsIntro') }}</p>

      <div
        v-for="field in promptFields"
        :key="field.name"
        class="chatGptPromptField"
      >
        <Field
          :uicontrol="field.uicontrol"
          :name="`chatGpt_${field.name}`"
          :title="field.title"
          :inline-help="field.description"
          v-model="values[field.name]"
        />
      </div>

      <div id="chatGptSiteNotice_prompts" />
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
          :title="translate('ChatGPT_UseGeneralPromptHelp')"
          @click="resetPrompts()"
        >
          {{ translate('ChatGPT_UseGeneralPrompt') }}
        </button>
      </div>

      <div
        v-if="generalSettingsUrl"
        class="chatGptGeneralSettingsLink"
      >
        {{ translate('ChatGPT_SiteSettingsGeneralSettings') }}
        <a :href="generalSettingsUrl">{{ translate('ChatGPT_SystemSettingsLink') }}</a>
      </div>
    </ContentBlock>

    <div
      class="ui-confirm"
      ref="confirmDeleteApiKeyModal"
    >
      <h2>{{ translate('ChatGPT_DeleteApiKeyConfirmTitle') }}</h2>
      <p>{{ translate('ChatGPT_DeleteSiteApiKeyConfirmText') }}</p>
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

const PROMPT_FIELDS = ['chatBasePrompt', 'insightBasePrompt'];

const API_KEY_PLACEHOLDER = '******';

type Card = 'connection' | 'prompts';

export interface SiteSettingOption {
  key: string;
  value: string;
}

export interface SiteSettingField {
  name: string;
  uicontrol: string;
  title: string;
  description: string;
  options?: SiteSettingOption[];
}

/**
 * ChatGPT settings of a site, rendered on the ChatGPT page of the Websites administration.
 * Empty values use the general settings, the site is chosen with the site selector of the page.
 * Each card saves only its own fields, the unsaved edits of the other card are kept.
 */
export default defineComponent({
  name: 'ManageSiteSettings',
  components: {
    Alert,
    ContentBlock,
    Field,
    SaveButton,
  },
  props: {
    idSite: {
      type: [Number, String],
      required: true,
    },
    fields: {
      type: Array as PropType<SiteSettingField[]>,
      required: true,
    },
    settings: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
    generalSettingsUrl: {
      type: String,
      default: '',
    },
    // a key set for the website then overrides AI Providers
    aiProvidersConnected: {
      type: Boolean,
      default: false,
    },
    // HTML sentence with the link to AI Providers, empty for the users who cannot open it
    aiProvidersLink: {
      type: String,
      default: '',
    },
    // prompts of the general settings, used by the website when its own prompt is empty
    generalPrompts: {
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

    const hasCustomPrompt = computed(
      () => PROMPT_FIELDS.some((name) => !!(values[name] || '').trim()),
    );

    // the website goes back to the general prompts, the fields are left empty rather than copied
    const resetPrompts = () => {
      PROMPT_FIELDS.forEach((name) => {
        values[name] = '';
      });
    };

    const notify = (card: Card, context: 'success' | 'error', message: string) => {
      NotificationsStore.show({
        message,
        context,
        type: 'transient',
        id: `chatGptSiteSettingsNotice_${card}`,
        placeat: `#chatGptSiteNotice_${card}`,
      });
    };

    const save = (card: Card) => {
      isSaving[card] = true;

      // the fields of the other card are left out, they keep their saved values
      const cardFields = card === 'prompts' ? promptFields.value : connectionFields.value;
      const postParams: Record<string, string | number> = { idSite: props.idSite };
      cardFields.forEach((field) => {
        postParams[field.name] = values[field.name] || '';
      });

      AjaxHelper.post(
        { method: 'ChatGPT.setSiteSettings' },
        postParams,
        { createErrorNotification: false },
      ).then(() => {
        if (card === 'connection') {
          // an empty key keeps the saved key
          hasApiKey.value = hasApiKey.value || !!values.apiKey;
          values.apiKey = hasApiKey.value ? API_KEY_PLACEHOLDER : '';
        }
        if (card === 'prompts') {
          // a prompt equal to the general prompt is saved empty
          PROMPT_FIELDS.forEach((name) => {
            const general = (props.generalPrompts[name] || '').trim();
            if (general && (values[name] || '').trim() === general) {
              values[name] = '';
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
        { method: 'ChatGPT.setSiteSettings' },
        { idSite: props.idSite, deleteApiKey: 1 },
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
      connectionFields,
      promptFields,
      hasCustomPrompt,
      resetPrompts,
      hasApiKey,
      isDeletingApiKey,
      confirmDeleteApiKeyModal,
      confirmDeleteApiKey,
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

// a div: the Matomo card resets the margin of its paragraphs
.chatGptGeneralSettingsLink {
  margin-top: 2rem;
}
</style>
