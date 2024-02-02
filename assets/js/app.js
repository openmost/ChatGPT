window.addEventListener("widget:loaded", function (e) {
  let parameters = e.detail[0].parameters;
  let element = e.detail[0].element[0];
  let reportId = parameters.module + "." + parameters.action;

  console.log("-------------------");
  console.log(reportId);
  console.log(element);
  let titleWrapper = element.querySelector(".enrichedHeadline");

  let insightTrigger = document.createElement("div");
  insightTrigger.classList.add("ai-chat-insight-trigger-vue-wrapper");
  insightTrigger.setAttribute("vue-entry", "ChatGPT.InsightTrigger");
  insightTrigger.setAttribute("report-id", reportId);
  titleWrapper.append(insightTrigger);

  piwikHelper.compileVueEntryComponents(insightTrigger);
});
