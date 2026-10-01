## FAQ

__How do I install and configure this plugin?__

1. Install and activate **ChatGPT** from **Administration > Platform > Marketplace**.
2. As a super user, open **Administration > System > ChatGPT** and set the host, API key and model in the **Connection** card, or connect a provider in **Administration > System > AI Providers**.
3. Optionally, override the settings for a website in **Administration > Websites > ChatGPT**.

You can also download the plugin from [GitHub](https://github.com/openmost/ChatGPT), extract it to your `plugins/` folder and activate it.

__What do I need to make it work?__

One of: an OpenAI API key (https://platform.openai.com/), an OpenAI-compatible endpoint served over HTTPS, or a provider connected in AI Providers. On a custom host, the API key is optional: without a key, no Authorization header is sent.

__Which API key is used?__

One key is enough. The plugin uses, in this order: the API key set for the website in **Administration > Websites > ChatGPT**, then the provider connected in **Administration > System > AI Providers**, then the API key of the general settings. Keys are never copied from one place to another.

When AI Providers is connected, it takes over: the host, API key and model of the general settings are displayed read-only, and are used again if AI Providers is deactivated. A key set for a website still overrides AI Providers for that website.

__How do I remove a saved API key?__

Use the **Delete key** button of the **Connection** card, on the general settings page or on the settings page of the website. Leaving the field empty keeps the saved key.

__Can I use models other than OpenAI's?__

Yes. Any OpenAI-compatible chat completions endpoint served over HTTPS works, such as Azure OpenAI or a self-hosted server. You can also connect any provider supported by AI Providers. Type the model name in the **Model (Custom)** field when it is not in the preset list.

__Which models are in the preset list?__

- Latest recommended (default): follows the model recommended by each plugin release, currently GPT 6 Astra
- GPT 6 Astra, GPT 6.1 Sol, GPT 6 Sol, GPT 6 Luna
- GPT 5.6 Sol, GPT 5.6 Terra, GPT 5.6 Luna
- GPT 5.5, GPT 5.4, GPT 5.4 mini, GPT 5.4 nano
- GPT 5.2, GPT 5.1, GPT 5, GPT 5 mini, GPT 5 nano
- GPT 4.1, GPT 4.1 mini, GPT 4o, GPT 4o mini

Reasoning models (o-series), `*-pro` and `*-codex` variants are not listed: they are tuned for one-shot analysis or code, not for a conversation about report data.

__The chat says my model is not available__

OpenAI retires old models, and some models are not available to every account. Choose another model in the settings, for example "Latest recommended". The chat links to the settings page you can change.

__What is the agent mode?__

When a provider is connected in AI Providers and the **McpServer** plugin is enabled, the chat and the insight panel work as an agent: they query your live reports, websites, goals, dimensions and segments through the Matomo tools to answer with real figures. A timeline shows each tool used.

To enable it, connect a provider in AI Providers, then install, activate and enable McpServer in **Administration > System > General settings > McpServer**. The chat recommends each missing step, with a direct link for super users.

__Can the agent change things in Matomo?__

Only if McpServer allows write methods (Raw Matomo API tool access), and only with your confirmation: before any create, update or delete, the agent describes the exact change and waits for your explicit confirmation in the conversation. This rule cannot be removed by a custom prompt. The agent never has more access than the current user.

__Do I need to expose my Matomo instance or configure OAuth for the agent?__

No. The agent calls the Matomo tools inside your Matomo, with the permissions of the logged in user. It also works on private and intranet instances.

__Does the plugin work without the agent mode?__

Yes. Without AI Providers or McpServer, the chat and the insights use the host, API key and model of the plugin settings. With AI Providers but without McpServer, the connected provider answers without tools.

__What do insights analyse?__

The whole report you are looking at, not only the visible rows: its rows, totals and metrics, with the active segment, period and comparisons. Insights work on data tables, evolution graphs, goals, custom reports and the other reports Matomo declares as widgets.

__Can I customise the prompts?__

Yes, in the **Prompts** card of the general settings or of a website. The **Reset to default** button restores the default prompts, and on a website, **Use the general prompts** makes it follow the general prompts again. Default prompts of previous versions are upgraded automatically, custom prompts are kept.

__Is my data sent to OpenAI?__

Insights send the data of the report you are looking at (labels, metrics, totals, period, segment and comparisons) and the conversation to the configured endpoint: OpenAI by default, your custom host, or the provider connected in AI Providers. In agent mode, the results of the tools the agent calls are sent too. Raw visitor data is never sent, unless the report itself contains it, such as the Visits Log. Conversations are not stored by the plugin.

__Is there a usage limit?__

Yes, 30 AI requests per hour, per user and per website, to protect your API budget.

__Which languages are supported?__

English, Arabic, Chinese (Simplified and Traditional), Dutch, French, German, Italian, Japanese, Polish, Portuguese, Spanish and Swedish.

__What are the requirements?__

- Matomo 5.10.0 or higher, below 6
- For the agent mode: a provider connected in AI Providers (bundled with Matomo 5.13 and later) and the McpServer plugin (Matomo 5.8 or higher, PHP 8.1 or higher). On older setups, the chat keeps working with the plugin settings.

__How do I get support?__

Email ronan@openmost.com, or open an issue on [GitHub](https://github.com/openmost/ChatGPT/issues). More on https://openmost.com/matomo/extensions/chatgpt.
