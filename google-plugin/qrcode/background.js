//background.js
chrome.browserAction.onClicked.addListener(function(tab){  
  var newURL = "https://www.xialei.store";
  chrome.tabs.create({ url:  newURL });
});
