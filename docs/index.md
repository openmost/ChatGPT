## Documentation

### Features

#### Insights on any report

- An **Insights** button (AI icon) next to the report header opens an insight panel that analyses the report you are looking at, then lets you ask follow-up questions.
- The whole report is analysed, not only the rows visible on screen: the plugin sends a compact payload with the rows, the report totals and the names and units of the metrics.
- The analysis follows what you see: the active segment, the period and date, and the compared periods or segments.
- Works with data tables, evolution graphs, goals, ecommerce, custom dimensions, custom reports, row evolution and the other reports Matomo declares as widgets.
- When a widget has no report data, or the report cannot be loaded (for example a missing access), a clear message is displayed instead of sending the error to the model.
- The panel is an accessible dialog: keyboard navigation, focus kept inside the panel, Escape to close.

#### Chat

- A **ChatGPT** page in the main menu, with suggested questions to start a conversation and a "New conversation" button.
- Streaming answers, with an automatic fallback when the endpoint does not stream.
- Auto-scroll that follows the answer while it is written, stops when you scroll up, and a button to jump back to the latest message.
- Markdown answers with scrollable tables and code blocks, and buttons to copy an answer or a code block.
- Enter sends the message, Shift+Enter adds a new line.

#### Agent mode, with AI Providers and MCP Server

When a provider is connected in **AI Providers** and the **McpServer** plugin is enabled, the chat and the insight panel work as an agent:

- The agent queries your live reports, websites, goals, dimensions and segments by itself, for any period, to answer with real figures.
- A timeline shows each Matomo tool used for an answer and its status.
- Tools run inside Matomo with the permissions of the current user: no public URL, OAuth client or extra token is needed.
- Write actions (for example creating a goal, an annotation or a segment) are only possible when McpServer allows write methods, and only after the agent has described the exact change and you have confirmed it explicitly in the conversation. This rule is added outside the editable prompts, so it cannot be removed by a custom prompt.
- When something is missing, the chat recommends the next step, one at a time: activate AI Providers, connect a provider, install, activate or enable MCP Server, allow write methods. Super users get a direct link for each step, other users are asked to contact their Matomo administrator.

The agent mode is optional. Without AI Providers or McpServer, the plugin keeps working with its own settings. With AI Providers but without McpServer, the connected provider answers without tools.

#### Connection and models

- **One key is enough**, used in this order: the API key set for the website, then the provider connected in AI Providers, then the general API key of the plugin. Keys are never copied from one place to another.
- When a provider is connected in AI Providers, it takes over: the host, API key and model of the general settings are displayed read-only, and are used again if AI Providers is deactivated. A key set for a website still overrides AI Providers for that website (the agent mode is then not used for that website).
- Works with OpenAI (default) and any OpenAI-compatible endpoint served over HTTPS, such as Azure OpenAI or a self-hosted server. The API key is optional on a custom host.
- The general API key is only sent to the general host: a website using its own host never receives it.
- Preset models, including **Latest recommended** (the default, which follows the model recommended by each plugin release, currently GPT 6 Astra), or any custom model name.
- When a model is deprecated, retired or not available to your OpenAI account, the chat explains it and links to the settings instead of showing the raw API error.

#### Prompts

- Default prompts written for analytics: the chat answers as a senior analytics consultant (direct answer, key figures, prioritised recommendations, no invented figures), and insights follow a fixed structure (summary, key figures, notable patterns, recommendations).
- Default prompts of previous versions are upgraded automatically to the new defaults, in the language of each user. Custom prompts are kept.
- A prompt equal to the default is not stored, so future improvements of the defaults reach you. A **Reset to default** button restores the default prompts.

#### More

- Interface translated into 13 languages: English, Arabic, Chinese (Simplified and Traditional), Dutch, French, German, Italian, Japanese, Polish, Portuguese, Spanish and Swedish.
- Follows the Matomo light and dark themes.
- Rate limit of 30 AI requests per hour, per user and per website.
- HTTP API: `ChatGPT.getResponse`, `ChatGPT.getStreamingResponse`, `ChatGPT.getInsights`, `ChatGPT.getSiteSettings`, `ChatGPT.setSiteSettings` and `ChatGPT.setSystemSettings`.

### Requirements

- Matomo 5.0.0 or higher, below 6 (`>=5.0.0,<6.0.0-b1`).
- PHP: the version required by your Matomo 5 (PHP 8.1 or higher for the agent mode, required by McpServer)
- One of: an OpenAI API key, an OpenAI-compatible HTTPS endpoint, or a provider connected in AI Providers
- Optional, for the agent mode: the **AI Providers** plugin (bundled with Matomo 5.13 and later) with a connected provider, and the **McpServer** plugin from the Marketplace (Matomo 5.8 or higher, PHP 8.1 or higher). On older setups the agent mode is not offered and the chat keeps working with the plugin settings. Write actions also require write methods to be allowed in the McpServer settings (Raw Matomo API tool access).

### Installation / Configuration

1. Install and activate **ChatGPT** from **Administration > Platform > Marketplace**.
2. As a super user, open **Administration > System > ChatGPT**:
   - **Connection** card: host (an HTTPS URL), API key and model. Each card is saved on its own. The saved key is never displayed, and a **Delete key** button removes it.
   - **Prompts** card: chat and insight base prompts, with a **Reset to default** button.
   - If a provider is connected in **Administration > System > AI Providers**, the connection fields are read-only and AI Providers is used.
3. Optionally, override the settings for a website in **Administration > Websites > ChatGPT** (website admin access): host, API key, model and prompts, with a **Delete key** button and a **Use the general prompts** button. Empty fields use the general settings.
4. For the agent mode, connect a provider in AI Providers, then install, activate and enable **McpServer** (**Administration > System > General settings > McpServer**). The chat guides you through each missing step.

Then open the **ChatGPT** page in the main menu, or click the **Insights** button in the header of a report.

### Privacy and data

- Insights send the data of the report you are looking at (labels, metrics and totals), its period, segment and comparisons, and the conversation, to the configured endpoint: OpenAI by default, your custom host, or the provider connected in AI Providers.
- The chat sends your messages and the prompt. In agent mode, the results of the Matomo tools the agent calls are also sent to the provider.
- Raw visitor data is never sent, unless the report itself contains it, for example the Visits Log (limited to 100 visits).
- Insight requests are restricted to the report and data methods of widgets declared by Matomo, never to an arbitrary API method, and run with the permissions of the current user.
- API keys are stored in the Matomo settings and are never sent back to the browser. Conversations are not stored by the plugin.
