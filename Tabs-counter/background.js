var counter = 0;
function updateLabel() {
  getCurrentWindowTabs().then((tabs) => {
    for (tab in tabs) {
      counter += 1;
    }
  });
  console.log("background.js updating label" + counter);
  browser.browserAction.setBadgeText({text: (counter).toString()});
}

function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

browser.tabs.onCreated.addListener(updateLabel);
browser.tabs.onUpdated.addListener(updateLabel);
browser.tabs.onRemoved.addListener(updateLabel);
