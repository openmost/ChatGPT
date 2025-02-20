## Documentation

### 1- Install the plugin from the marketplace or via GitHub

Install this plugin from the Marketplace as super user or download the plugin and install it on your server from FTP in
the `/plugins` folder.

### 2- Adjust your settings

To activate ChatGPT, you have to set your API Key to the System Settings as a superuser.
Once you set your API Key, a chatbox will appear on the dedicated page.

You can also choose between many models:

- o1 mini `o1-mini` 
- GPT 4o `gpt-4o` 
- GPT 4o mini `gpt-4o-mini` 
- GPT 4 `gpt-4` 
- GPT 4 Turbo `gpt-4-turbo` 
- GPT 3.5 turbo `gpt-3.5-turbo` 

And adjust the base prompt for the chat and the insight. You are free to make your own prompt to enhance the answer of
AI.

### 3 - Enjoy reports insights

Click on the button located at the right of every datatable reports in the Matomo UI. It'll trigger an overlay with
generated insights for this report.

### 4 - Share with others

Now you tried and love this plugin, don't hesitate to share the good news !


## API Support

You can use this plugin via API with two endpoints :

`ChatGPT.getResponse` with parameters `$idSite`, `$period`, `$date`, `$messages`

`ChatGPT.getInsights` with parameters `$idSite`, `$period`, `$date`, `$reportId`, `$messages`

Where `$messages` is in the ChatGPT conversation format.
