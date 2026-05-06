## FAQ

__How do I install this plugin?__

This plugin is available in the official Matomo Marketplace:

1. Go to the Administration panel
2. Navigate to the Marketplace section and select "Plugins"
3. Search for "**ChatGPT**"
4. Install and activate the plugin
5. Configure your API settings in **Administration > General Settings > ChatGPT**

Alternatively, download the plugin from GitHub and extract it to your `/plugins` folder.

__What do I need to make it work?__

You need an OpenAI API key, which you can obtain at https://platform.openai.com/. If you're using a custom host (like a self-hosted LLM), an API key may be optional.

__Can I use models other than OpenAI's?__

Yes! The plugin supports any OpenAI-compatible API endpoint. You can connect to:

- Azure OpenAI
- Self-hosted solutions (Ollama, LocalAI, vLLM)
- Other providers (Mistral, Anthropic via proxy, etc.)

Simply configure the custom host URL in the plugin settings.

__Which models are supported?__

The plugin includes presets for the following conversational chat-completion models:

- GPT 5.5 (default)
- GPT 5.4 / GPT 5.4 Mini / GPT 5.4 Nano
- GPT 5.1
- GPT 5 Mini / GPT 5 Nano / GPT 5 (Latest)
- GPT 4.1 / GPT 4.1 Mini / GPT 4.1 Nano
- GPT 4o / GPT 4o Mini / GPT 4o (Latest)
- GPT 4 / GPT 4 Turbo

You can also specify any custom model name for models not in the preset list.

__Why aren't reasoning models (o1, o3) or *-pro variants in the list?__

Reasoning models and `*-pro` variants (`gpt-5-pro`, `gpt-5.5-pro`, `o1-pro`, `o3-pro`, etc.) are tuned for one-shot deep analysis with multi-second "thinking" latency, not for back-and-forth conversation. They were removed from the preset list because they produced a poor chat experience for discussing report data. They also use a different OpenAI endpoint (`/v1/responses`) that this plugin does not target. If you really want to try one, you can still type its name in the **Model (Custom)** field — any error returned by the API will be displayed directly in the chat.

__What happens if my model name is wrong or the API returns an error?__

The plugin now surfaces upstream API errors as a danger notice directly inside the chat (for both streaming and non-streaming requests). You'll see the actual error message returned by OpenAI (or your custom host) — for example, an invalid model name, quota issue, or authentication problem — instead of a silent failure.

__Does the plugin support dark mode?__

Yes. The chat and insight components are styled with Matomo's native CSS theme variables (`--theme-color-background-contrast`, `--theme-color-border`, etc.), so they automatically follow whichever Matomo theme is active — light or dark — with no extra configuration.

__Is the plugin available to all users in my Matomo instance?__

Yes, once activated, all users with view permissions can access the AI features for their permitted sites.

__Can I configure different settings per website?__

Yes! Use Measurable Settings to override the system-wide host, API key, model, and prompts for specific websites. Leave fields empty to use system defaults.

__How do I get insights for a report?__

1. Navigate to any report in Matomo
2. Click the "Insights" button (AI icon) in the report header
3. View AI-generated insights in the side panel
4. Ask follow-up questions to dive deeper into the data

__Does the plugin support streaming responses?__

Yes, real-time streaming responses are supported. The plugin automatically falls back to non-streaming mode if your server doesn't support Server-Sent Events (SSE).

__Can I customize the AI's behavior?__

Yes, you can customize:

- **Chat Base Prompt**: Controls how the AI responds in chat conversations
- **Insight Base Prompt**: Controls how the AI analyzes report data

These can be set globally or per website.

__What languages are supported?__

The plugin interface is translated into:

- English
- German (Deutsch)
- Spanish (Español)
- French (Français)
- Italian (Italiano)
- Dutch (Nederlands)
- Swedish (Svenska)

__What are the requirements?__

- Matomo 5.0.0 or higher
- PHP 7.4 or higher
- Valid API key (for OpenAI) or accessible custom host

__Is my data sent to OpenAI?__

When you use the Insights feature or Chat, the relevant report data and your messages are sent to the configured API endpoint (OpenAI by default). If you have data privacy concerns, consider using a self-hosted LLM solution.

__How can I contribute to this plugin?__

You can contribute by:

- Reporting issues on [GitHub](https://github.com/openmost/ChatGPT/issues)
- Forking the project and submitting pull requests
- Contacting the developer at ronan@openmost.io

__How long will this plugin be maintained?__

The plugin is actively maintained. The developer uses Matomo on many projects and will continue to patch and improve the plugin.
