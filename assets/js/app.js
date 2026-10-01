(function () {
  var OVERLAY_HOST_ID = 'ai-chat-insight-overlay-host-chatgpt';

  // A single insights panel for the whole page, every report trigger drives it through a shared store
  function mountInsightOverlay() {
    if (document.getElementById(OVERLAY_HOST_ID)) {
      return;
    }

    var host = document.createElement('div');
    host.id = OVERLAY_HOST_ID;
    host.setAttribute('vue-entry', 'ChatGPT.InsightOverlay');
    host.setAttribute('ai-name', 'chat-gpt');
    host.setAttribute('ai-label', 'ChatGPT');
    host.setAttribute('ai-color', '#00A67E');
    host.setAttribute('api-method', 'ChatGPT.getInsights');
    document.body.appendChild(host);

    piwikHelper.compileVueEntryComponents(host);
  }

  window.addEventListener('widget:loaded', function (e) {
    var parameters = e.detail[0].parameters;
    var element = e.detail[0].element[0];
    // Matomo 5 report headers have no toolbar, the trigger floats at the right of the title
    var titleWrapper = element.querySelector('.enrichedHeadline');

    if (!titleWrapper) {
      return;
    }

    // the enriched headline also holds the help and feedback texts, only its .title is the name
    var titleElement = element.querySelector('.enrichedHeadline .title')
      || element.querySelector('.widgetName');
    var reportTitle = titleElement ? titleElement.textContent.trim() : '';

    mountInsightOverlay();

    var insightTrigger = document.createElement('div');
    insightTrigger.classList.add('ai-chat-insight-trigger-vue-wrapper');
    insightTrigger.setAttribute('vue-entry', 'ChatGPT.InsightTrigger');
    insightTrigger.setAttribute('widget-params', JSON.stringify(parameters));
    insightTrigger.setAttribute('ai-name', 'chat-gpt');
    insightTrigger.setAttribute('ai-label', 'ChatGPT');
    insightTrigger.setAttribute('ai-color', '#00A67E');
    insightTrigger.setAttribute('report-title', reportTitle);
    titleWrapper.append(insightTrigger);

    piwikHelper.compileVueEntryComponents(insightTrigger);
  });
})();
