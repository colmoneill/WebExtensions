var counter = 0;
function updateLabel() {
  getCurrentWindowTabs().then((tabs) => {
    for (tab in tabs) {
      counter += 1;
    }
    browser.browserAction.setBadgeText({text: (counter).toString()});
    //console.log("background.js updating label" + counter);
    constCounter = counter;
    //console.log("constCounter " + constCounter)
  });
  if (counter === 9) {
    console.log("ten tabs");
    notify("Woah, that's " + constCounter.toString() + " tabs, now we're multitasking!");
  }
  else if (counter === 19){
    console.log("20 tabs");
    notify("Woah, that's " + constCounter.toString() + " tabs, now we're multitasking!");
  }
  else if (counter === 29){
    console.log("30 tabs");
    notify("Woah, that's " + constCounter.toString() + " tabs, now we're multitasking!");
  };
  counter = 0;
}
function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

function notify(message) {
  console.log("calling notify function");
  browser.notifications.create({
    "type": "basic",
    "title": "tab count",
    "iconUrl": browser.extension.getURL("icons/plusplusplus48.png"),
    "message": message
  });
}

browser.tabs.onCreated.addListener(updateLabel);
browser.tabs.onUpdated.addListener(updateLabel);
browser.tabs.onRemoved.addListener(updateLabel);
