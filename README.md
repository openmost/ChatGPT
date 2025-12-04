# Matomo ChatGPT Plugin

Integrate AI-powered analytics insights and chat functionality into your Matomo instance using ChatGPT or any OpenAI-compatible API.

## Description

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
- GPT-5.1 / GPT-5
- GPT-4.1 / GPT-4.1 Mini / GPT-4.1 Nano
- GPT-4o / GPT-4o Mini
- GPT-4 Turbo
- o3 / o3 Mini
- o1 / o1 Mini / o1 Pro

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
- Spanish (Espaol)
- French (Franais)
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

- Matomo 5.0.0 or higher
- PHP 7.4 or higher
- Valid API key (for OpenAI) or accessible custom host

## API Methods

The plugin provides the following API methods:

| Method | Description |
|--------|-------------|
| `ChatGPT.getResponse` | Get AI response for messages (non-streaming) |
| `ChatGPT.getStreamingResponse` | Get AI response with SSE streaming |
| `ChatGPT.getInsight` | Get AI insights for report data |
| `ChatGPT.getModels` | Get list of available preset models |

All API methods require appropriate view permissions for the requested site.

## Support

- **Issues**: [GitHub Issues](https://github.com/openmost/ChatGPT/issues)
- **Documentation**: [Plugin Homepage](https://openmost.io/products/chatgpt/)
- **Email**: ronan@openmost.io

## License

GPL v3+

## Credits

Developed by [Openmost](https://openmost.io)
