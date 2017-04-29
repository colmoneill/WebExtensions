function logTabs(tabs) {
  console.log(tabs);
}

console.log("i'm triggered from the background script")

browser.tabs.query({currentWindow: true}, logTabs);
