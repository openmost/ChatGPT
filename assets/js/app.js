window.addEventListener('widget:loaded', function (e) {
  var parameters = e.detail[0].parameters;
  var element = e.detail[0].element[0];
  var titleWrapper = element.querySelector('.enrichedHeadline');

  if (!titleWrapper) {
    return;
  }

  var insightTrigger = document.createElement('div');
  insightTrigger.classList.add('ai-chat-insight-trigger-vue-wrapper');
  insightTrigger.setAttribute('vue-entry', 'ChatGPT.InsightTrigger');
  insightTrigger.setAttribute('widget-params', JSON.stringify(parameters));
  insightTrigger.setAttribute('ai-name', 'chat-gpt');
  insightTrigger.setAttribute('ai-label', 'ChatGPT');
  insightTrigger.setAttribute('ai-color', '#00A67E');
  insightTrigger.setAttribute('api-method', 'ChatGPT.getResponse');
  titleWrapper.append(insightTrigger);

  piwikHelper.compileVueEntryComponents(insightTrigger);
});
