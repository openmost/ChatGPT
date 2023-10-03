# Matomo ChatGPT Plugin

## Description

This plugin has been created in order to integrate ChatGPT into Matomo as a widget.
It is nothing complicated, it just consists in writing your prompts through the Matomo User Interface rather than using ChatGPT.
The difference is that it is using here the ChatGPT API rather than the ChatGPT User Interface.
Current version is using text-davinci-002 OpenAI API.
In order to get started, you need to create an OpenAI API token --> Then you add this token into Personnal Settings in Matomo --> Then you add the widget and you are good to go.

## Important

It is currently not possible to use this plugin without disabling csp within the config file:
csp_enabled = 0

