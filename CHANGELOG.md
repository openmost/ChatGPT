## Changelog

### 5.7.0

> **No action required.** Settings saved for your websites are kept, and custom prompts are not changed.

**New: agent mode with the McpServer plugin**

- With a provider connected in AI Providers (Matomo 5.13 or higher) and the McpServer plugin enabled, the chat and the insight panel work as an agent: they query your live reports, websites, goals, dimensions and segments through the Matomo tools, inside Matomo, with the permissions of the current user.
- Write actions are only performed when McpServer allows write methods, and only after the agent has described the change and the user has confirmed it explicitly, whatever the base prompt says.
- The chat recommends, one step at a time, how to unlock the agent mode: activate AI Providers, connect a provider, install, activate or enable MCP Server, allow its write methods. Super users get a direct link for each step.
- One key is enough, in this order: the API key of the website, then the provider connected in *Administration > System > AI Providers*, then the general API key. When AI Providers is connected, it takes over the chat, the insights and the agent, and the general connection fields become read-only. A website key still overrides AI Providers for that website.
- Without AI Providers or McpServer, the plugin works as before with its own host, API key and model settings.

**Settings**

- New *Administration > System > ChatGPT* page for the general settings, with a *Connection* card and a *Prompts* card saved separately, and a *Delete key* button. The settings are no longer listed in *Administration > General settings*.
- Website settings moved from the website edit form to a dedicated *Administration > Websites > ChatGPT* page. New API methods `ChatGPT.getSiteSettings`, `ChatGPT.setSiteSettings` and `ChatGPT.setSystemSettings`. Saved API keys are never sent back to the browser.
- New default chat and insight prompts, written for analytics. Default prompts of previous versions are upgraded automatically in the language of each user, custom prompts are kept, and a *Reset to default* button restores the defaults.
- New "Latest recommended" model, the default for new installs (currently GPT 6 Astra), and an updated model list without the models deprecated by OpenAI. A deprecated or unavailable model is explained in the chat with a link to the settings. The model saved by previous versions is kept.
- The API key is optional on a custom host (self-hosted or compatible endpoint), as the documentation states: the chat, the insights and the plugin assets work with a keyless custom host, and no Authorization header is sent without a key. The default OpenAI host still requires a key.
- The host is checked with the same HTTPS rule when the settings are saved and when a request is sent, and the configuration errors of a request (host, API key, model, HTTPS) are translated.

**Chat and insights**

- Redesigned chat: accessible, keyboard friendly insight panel, copy buttons, scrollable tables and code blocks, a timeline of the tools used by the agent, ChatGPT-like auto-scroll, and suggested questions on the ChatGPT page.
- Insights analyse the full report as a compact payload with its totals, follow the active segment, period and comparisons, and also work on evolution graphs, goals, custom reports and more. Errors are displayed as clean messages, without technical details.
- Interface translated into 13 languages, including the rate limit message. The help texts point to *Administration > System > AI Providers*.
- Openmost messages can appear in Matomo, for example on the Events page, once whatever the number of Openmost plugins activated. Banners can be dismissed and link to the Openmost website in the language of the user.

**Security**

- Insight requests are restricted to the report and data methods of the widgets declared by Matomo.
- The general API key is only sent to the general host, a website using its own host never receives it.
- AI answers are sanitized with DOMPurify before being displayed, which fixes links that could run JavaScript.
- The general host must be an HTTPS URL: an `http://` host, which made every request fail, is now refused on save with a clear error.

**Compatibility**

- Requires Matomo 5.10.0 or higher, for the theme variables used by the chat. The agent mode needs AI Providers (Matomo 5.13 or higher) and McpServer (Matomo 5.8 or higher, PHP 8.1 or higher).
- Smaller package: the Vue source maps, which Matomo does not load, are no longer shipped.

### 5.6.2

- Security: restrict insight requests to Matomo reports.

### 5.6.1

Support fallback color value for Matomo < 5.10

### 5.6.0

**Refreshed model list and visible error reporting**

#### New Features
- **Refreshed preset model list**: Added the GPT 5.5, GPT 5.4, GPT 5.1 and GPT 5 conversational families. Default model is now GPT 5.5.
- **Curated for chat**: The preset list now only contains models suited for back-and-forth discussion of report data. Reasoning models (o-series) and `*-pro` variants have been removed because they target one-shot deep analysis rather than conversation, which produced a poor chat experience.

#### Improvements
- **Visible error notices**: Errors returned by the upstream model API (invalid model, quota, auth, etc.) are now surfaced as a danger notice inside the chat instead of failing silently. This works for both streaming and non-streaming requests.
- **HTTP status detection in streaming**: The streaming endpoint now inspects the upstream `Content-Type` and HTTP status, so non-SSE error responses are converted into a structured error event the client can render.
- **Snappier error UI**: When an error event is received, the loading spinner is cleared immediately so the notice appears without delay.
- **Dark theme support**: All chat and insight components use Matomo's native CSS theme variables (`--theme-color-background-contrast`, `--theme-color-border`, etc.), so the UI automatically follows Matomo's light/dark theme without any extra configuration.

#### Notes for Custom Models
The "Model (Custom)" field still accepts any model name, including custom or self-hosted ones. If you enter a model that the configured endpoint cannot serve (for example, a `*-pro` variant on `/v1/chat/completions`), the upstream error message will now be shown directly in the chat.

### 5.5.7

- update: documentation
- update: lists and markdown style

### 5.5.5

- fix: constant declaration issue cause issue on updating

### 5.5.0

**Major Update: Settings Refactoring, Streaming & UI Improvements**

#### New Features
- **Custom Model Support**: Added ability to specify custom model names to override presets
- **Optional API Key**: API key is now optional when using custom hosts (self-hosted LLMs)
- **Unified Streaming**: Both Chat and Insights now use the same streaming endpoint with automatic mode detection
- **Automatic Streaming Fallback**: Streaming auto-detects and falls back to non-streaming if unsupported
- **Escape Key Support**: Close Insights offcanvas panel by pressing Escape

#### Improvements
- Refactored model selection: split into "Model (Preset)" dropdown and "Model (Custom)" text field
- Centralized model definitions in main plugin file for consistency
- Improved settings architecture with shared `SettingsBase` trait for system and measurable settings
- Better chat UI layout with proper flexbox sizing
- Updated default model to GPT-4o
- Added translations for all new settings in 7 languages (EN, DE, ES, FR, IT, NL, SV)
- Improved POST parameter parsing for messages and widgetParams
- Unified `getStreamingResponse` API handles both chat and insight modes based on widgetParams
- Cleaner API with removed unused methods

#### Bug Fixes
- Fixed user messages not being sent to AI in streaming mode
- Fixed Insights not using correct prompt and report data
- Fixed chat messages list height not filling container
- Fixed streaming fallback behavior
- Fixed TypeScript errors in Vue components

#### Breaking Changes
- Removed `model` setting, replaced with `modelPreset` and `modelCustom`
- Removed `enableStreaming` setting (streaming is now automatic)
- Removed `getAvailableModels` API method (now using static model list)
- Removed `clearModelsCache` API method
- Removed `getRateLimitStatus` API method
- Removed `getSettings` API method

### 5.4.1

update: Support premium plugins

### 5.4.0

Here is the huge update you requested!
Now support every reports type (custom dim, custom reports, series lines etc...)
Handle streaming
Better error handling
Speed improvements

### 5.3.0

Update: ChatGPT models list:

- o1-mini
- gpt-4o-mini

### 5.2.5

Update : plugin category and _cover.png

### 5.2.4

Update: Support gpt-4-turbo and gpt-4o

### 5.2.3

Update: Handle error message in chat response

### 5.2.2

Update: Refactor Chat.vue component with AJAX Helper

### 5.2.1

Update: API method name in js file

### 5.2.0

Add : Measurable settings with override system settings ability
Add : API Call logger info

### 5.1.2

Fix: Chat form placeholder IA name

### 5.1.1

Update : Pass all params as PostParams in AjaxHelper function

### 5.1.0

Update conversation memory, IA can remember previous messages
Update Add conversation mode to Insights

### 5.0.7

Update documentation url

### 5.0.6

Support error messages handling

### 5.0.5

Update Marketplace links

### 5.0.4

Fix security issue in API

### 5.0.3

Fix security issue in API privileges

### 5.0.2

Update documentation

### 5.0.1

Update insight trigger positioning

### 5.0.0

Setup plugin from v4.2.0
