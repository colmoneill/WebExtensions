var counter = 0;
function updateLabel() {
  getCurrentWindowTabs().then((tabs) => {
    console.log(tabs);
    for (tab in tabs) {
      counter += 1;
    }
    browser.browserAction.setBadgeText({text: (counter).toString()});
    console.log("background.js updating label" + counter);
  });
  if (counter > 10) {
    console.log("over ten tabs, you're doing great!")
  };
  counter = 0;
}
function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}



browser.tabs.onCreated.addListener(updateLabel);
browser.tabs.onUpdated.addListener(updateLabel);
browser.tabs.onRemoved.addListener(updateLabel);
