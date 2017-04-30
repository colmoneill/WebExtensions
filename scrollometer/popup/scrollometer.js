console.log("yo, i'm triggered by the popup");
cumulativeDist = chrome.storage.local.get("cumulativeDist", gotItem);
var tabs = {};

function gotItem(item) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  } else {
    console.log(item);
    cumulativeDist = item;
    console.log(cumulativeDist);
    var popup = document.getElementById("popup");
    popup.innerHTML = "amount scrolled up to now is: " + cumulativeDist.cumulativeDist;
  }
}

var querying = browser.tabs.query({});
console.log(querying)

console.log(querying.url[0])
