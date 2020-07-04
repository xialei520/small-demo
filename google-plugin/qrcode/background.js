//background.js
chrome.browserAction.onClicked.addListener(function (tab) {
    // var newURL = "https://www.xialei.store";
    console.log('8888')
    chrome.tabs.create({ url: newURL });
});
