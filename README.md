# Matomo ChatGPT Plugin

Integrate AI-powered analytics insights and chat functionality into your Matomo instance using ChatGPT or any OpenAI-compatible API.

## Description

### 🤖 NEW — An AI agent connected to your Matomo

The chat is now an **agent** that works with your real Matomo data through the Matomo tools of the official **McpServer** plugin:

- **Looks up the data by itself**: reports, websites, goals, custom dimensions and segments, for any period
- **Performs actions** for you, such as creating or updating segments, once a super user sets **Raw API access** to **Full API access** in the McpServer settings (read-only otherwise)
- Available on the **ChatGPT page** and in the **Insights panel** of every report, which can now fetch additional data to answer your follow-up questions
- Shows each tool used while answering, so you know where the answer comes from
- Runs **inside Matomo** with the permissions of the current user: no public URL, no OAuth client and no extra token to configure
- Uses the AI provider configured in **Administration > System > AI Providers** (OpenAI, Anthropic, Google, AWS Bedrock or any OpenAI-compatible endpoint)

The agent is optional: when the McpServer plugin or an AI provider is not configured, a notice explains what to do and the chat keeps working as before with the plugin settings (Host, API key and model).

### AI-Powered Report Insights
Get instant AI-generated insights for any Matomo report. The plugin adds an "Insights" button to all report widgets that analyzes your data and provides actionable recommendations.

- Works with all report types (visitors, actions, referrers, goals, custom dimensions, custom reports, etc.)
- Supports data tables, evolution graphs, and series visualizations
- Conversation mode: ask follow-up questions about your report data

### Dedicated AI Chat
A full-featured chat interface for asking questions about your analytics data.

- Accessible from the main menu under "ChatGPT"
- Real-time streaming responses (with automatic fallback for unsupported servers)

### Flexible Model Configuration
Choose from preset models or specify custom model names.

**Preset Models:**
- GPT 5.5 (default)
- GPT 5.4 / GPT 5.4 Mini / GPT 5.4 Nano
- GPT 5.1
- GPT 5 Mini / GPT 5 Nano / GPT 5 (Latest)
- GPT 4.1 / GPT 4.1 Mini / GPT 4.1 Nano
- GPT 4o / GPT 4o Mini / GPT 4o (Latest)
- GPT 4 / GPT 4 Turbo

**Custom Models:**
Specify any model name to use models not in the preset list, perfect for:
- New OpenAI models
- Self-hosted LLMs (LLaMA, Mistral, etc.)
- Other OpenAI-compatible providers

### Multi-Site Configuration
Configure different AI settings per website using Measurable Settings:
- Override system-wide host, API key, and model per site
- Customize prompts for specific websites
- Leave empty to use system defaults

### Custom Host Support
Connect to any OpenAI-compatible API endpoint:
- OpenAI (default)
- Azure OpenAI
- Self-hosted solutions (Ollama, LocalAI, vLLM, etc.)
- Other providers (Anthropic via proxy, Mistral, etc.)

**Note:** API key is optional when using custom hosts, making it easy to connect to local LLM instances.

### Customizable Prompts
Tailor the AI's behavior with custom prompts:
- **Chat Base Prompt**: Customize how the AI responds in conversations
- **Insight Base Prompt**: Customize how the AI analyzes report data

### Multi-Language Support
Full translations available in:
- English
- German (Deutsch)
- Spanish (Español)
- French (Français)
- Italian (Italiano)
- Dutch (Nederlands)
- Swedish (Svenska)

## Installation

1. Download the plugin from the [Matomo Marketplace](https://plugins.matomo.org/ChatGPT)
2. Extract to your `plugins/` directory
3. Activate the plugin in Matomo's Plugin settings
4. Configure your API settings in **Administration > General Settings > ChatGPT**

## Configuration

### System Settings (Global)

| Setting | Description |
|---------|-------------|
| **Host** | API endpoint URL. Default: `https://api.openai.com/v1/chat/completions` |
| **API Key** | Your OpenAI API key (required for OpenAI, optional for custom hosts) |
| **Model (Preset)** | Select from available model presets |
| **Model (Custom)** | Override preset with a custom model name |
| **Chat Base Prompt** | System prompt for chat conversations |
| **Insight Base Prompt** | System prompt for report insights |

### Measurable Settings (Per-Site)

All system settings can be overridden per website. Leave fields empty to use system defaults.

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

## Requirements

- Matomo 6.0.0 or higher
- PHP 8.1 or higher
- Valid API key (for OpenAI) or accessible custom host

## API Methods

The plugin provides the following API methods:

| Method | Description |
|--------|-------------|
| `ChatGPT.getResponse` | Get AI response for messages (non-streaming) |
| `ChatGPT.getStreamingResponse` | Get AI response with SSE streaming |
| `ChatGPT.getInsights` | Get AI insights for report data |

All API methods require appropriate view permissions for the requested site.

## Support

- **Issues**: [GitHub Issues](https://github.com/openmost/ChatGPT/issues)
- **Documentation**: [Plugin Homepage](https://openmost.com/matomo/extensions/chatgpt)
- **Email**: ronan@openmost.com

## License

GPL v3+

## Credits

Developed by [Openmost](https://openmost.com)
