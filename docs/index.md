## Documentation

Integrate AI-powered analytics insights and chat functionality into your Matomo instance using ChatGPT or any OpenAI-compatible API.

## Features

### AI-Powered Report Insights

Get instant AI-generated insights for any Matomo report. The plugin adds an "Insights" button to all report widgets that analyzes your data and provides actionable recommendations.

- Works with all report types (visitors, actions, referrers, goals, custom dimensions, custom reports, etc.)
- Supports data tables, evolution graphs, and series visualizations
- Conversation mode: ask follow-up questions about your report data

### Dedicated AI Chat

A full-featured chat interface for asking questions about your analytics data.

- Accessible from the main menu under "ChatGPT"
- Real-time streaming responses (with automatic fallback for unsupported servers)
- Errors returned by the model API are displayed as a notice directly in the chat, so misconfiguration is easy to spot

### Flexible Model Configuration

Choose from preset models or specify custom model names:

**Preset Models:**
- GPT 5.5 (default)
- GPT 5.4 / GPT 5.4 Mini / GPT 5.4 Nano
- GPT 5.1
- GPT 5 Mini / GPT 5 Nano / GPT 5 (Latest)
- GPT 4.1 / GPT 4.1 Mini / GPT 4.1 Nano
- GPT 4o / GPT 4o Mini / GPT 4o (Latest)
- GPT 4 / GPT 4 Turbo

The preset list only includes conversational models suited for chatting about report data. Reasoning models (o-series) and `*-pro` variants are intentionally excluded — they are tuned for one-shot deep analysis rather than back-and-forth discussion and would produce a poor chat experience.

**Custom Models:**
Specify any model name to use models not in the preset list, perfect for new OpenAI models, self-hosted LLMs, or other providers. If a custom model is rejected by the configured endpoint, the upstream error message will be shown in the chat.

### Custom Host Support

Connect to any OpenAI-compatible API endpoint:
- OpenAI (default)
- Azure OpenAI
- Self-hosted solutions (Ollama, LocalAI, vLLM, etc.)
- Other providers (Anthropic via proxy, Mistral, etc.)

### Dark Theme Support

The chat and insight components use Matomo's native CSS theme variables, so the UI automatically follows your Matomo theme — both light and dark — without any additional configuration.

## Installation

### From Marketplace

1. Go to the Administration panel as a super user
2. Navigate to the Marketplace section and select "Plugins"
3. Search for "**ChatGPT**"
4. Install and activate the plugin

### Manual Installation

1. Download the plugin from [GitHub](https://github.com/openmost/ChatGPT)
2. Extract to your `/plugins` folder
3. Activate the plugin in Matomo's Plugin settings

## Configuration

### System Settings (Global)

Navigate to **Administration > General Settings > ChatGPT** to configure:

| Setting | Description |
|---------|-------------|
| **Host** | API endpoint URL. Default: `https://api.openai.com/v1/chat/completions` |
| **API Key** | Your OpenAI API key (required for OpenAI, optional for custom hosts) |
| **Model (Preset)** | Select from available model presets |
| **Model (Custom)** | Override preset with a custom model name |
| **Chat Base Prompt** | System prompt for chat conversations |
| **Insight Base Prompt** | System prompt for report insights |

### Measurable Settings (Per-Site)

All system settings can be overridden per website in the site's Measurable Settings. Leave fields empty to use system defaults.

This is useful for:
- Using different models for different sites
- Customizing prompts for specific website contexts
- Using separate API keys per site

## Usage

### Getting Report Insights

1. Navigate to any report in Matomo
2. Click the "Insights" button (sparkle icon) in the report header
3. View AI-generated insights in the side panel
4. Ask follow-up questions to dive deeper into the data

### Using the Chat

1. Go to **ChatGPT** in the main menu
2. Type your question about analytics
3. Receive AI-powered responses with streaming support
4. Continue the conversation with follow-up questions

## API Reference

The plugin provides the following API methods:

| Method | Description |
|--------|-------------|
| `ChatGPT.getResponse` | Get AI response for messages (non-streaming) |
| `ChatGPT.getStreamingResponse` | Get AI response with SSE streaming |
| `ChatGPT.getInsight` | Get AI insights for report data |
| `ChatGPT.getModels` | Get list of available preset models |

### Parameters

**ChatGPT.getResponse**
- `idSite` - Site ID
- `period` - Period (day, week, month, year)
- `date` - Date string
- `messages` - Conversation messages in ChatGPT format

**ChatGPT.getInsight**
- `idSite` - Site ID
- `period` - Period
- `date` - Date string
- `reportId` - Report identifier
- `messages` - Conversation messages

All API methods require appropriate view permissions for the requested site.

## Multi-Language Support

The plugin interface is available in:
- English
- German (Deutsch)
- Spanish (Español)
- French (Français)
- Italian (Italiano)
- Dutch (Nederlands)
- Swedish (Svenska)

## Requirements

- Matomo 5.0.0 or higher
- PHP 7.4 or higher
- Valid API key (for OpenAI) or accessible custom host

## Support

- **Issues**: [GitHub Issues](https://github.com/openmost/ChatGPT/issues)
- **Documentation**: [Plugin Homepage](https://openmost.io/products/chatgpt/)
- **Email**: ronan@openmost.io
