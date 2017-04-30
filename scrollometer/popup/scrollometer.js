console.log("yo, i'm triggered by the popup");

let gettingItem = browser.storage.local.get();
gettingItem.then(onGot, onError);

function onGot(item) {
  console.log(item);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var initVertPos = window.scrollY,
    initHorizPos = window.scrollX,
    fullWidth = window.innerWidth,
    fullHeight = window.innerHeight,
    devicePixelRatio = window.devicePixelRatio,
    previousPos = 0,
    cumulativeDist = 0,
    prevCumulativeDist = 0,
    default_ppi = 96,
    currentdate = new Date(),
    datetime = "Last entry: " + currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/"
              + currentdate.getFullYear() + " @ "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":"
              + currentdate.getSeconds();

cumulativeDist = browser.storage.local.get("cumulativeDist", gotItem);
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

function logTabs(tabs) {
  for (let tab of tabs) {
    // tab.url requires the `tabs` permission
    console.log(tab.url);
    let address = tab.url;
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var querying = browser.tabs.query({currentWindow: true, active: true});
querying.then(logTabs, onError);

var scrollo = 0;
var scrollListener = window.addEventListener("scroll", function(){
  console.log("prevCumulativeDist at start of event listener " + prevCumulativeDist);
  var currentPos = window.scrollY;
  var delta = (currentPos - previousPos);
  cumulativeDist = prevCumulativeDist;
  cumulativeDist = cumulativeDist + Math.abs(delta);
  previousPos = currentPos;
  prevCumulativeDist = cumulativeDist;
  var scrollStatus = {address:address, datetime:datetime, cumulativeDist:cumulativeDist};
  browser.storage.local.set(scrollStatus);
});
