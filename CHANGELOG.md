## Changelog

### 5.5.0

**Major Update: Settings Refactoring & Custom Host Support**

#### New Features
- **Custom Model Support**: Added ability to specify custom model names to override presets
- **Optional API Key**: API key is now optional when using custom hosts (self-hosted LLMs)
- **Automatic Streaming Detection**: Streaming now auto-detects and falls back to non-streaming if unsupported

#### Improvements
- Refactored model selection: split into "Model (Preset)" dropdown and "Model (Custom)" text field
- Centralized model definitions in main plugin file for consistency
- Improved settings architecture with shared trait for system and measurable settings
- Better chat UI layout with proper flexbox sizing
- Updated default model to GPT-4o
- Added translations for all new settings in 7 languages (EN, DE, ES, FR, IT, NL, SV)

#### Bug Fixes
- Fixed chat messages list height not filling container
- Fixed streaming fallback behavior
- Removed unused code and API methods

#### Breaking Changes
- Removed `model` setting, replaced with `modelPreset` and `modelCustom`
- Removed `enableStreaming` setting (now automatic)
- Removed `getRateLimitStatus` and `getSettings` API methods

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
