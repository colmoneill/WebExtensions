console.log("background-script loading");

var gettingItems = browser.storage.sync.get();
browser.browserAction.setBadgeBackgroundColor({color: "blue"});
gettingItems.then(onGot, onError);

function onGot(item) {
  const data = item;
  var sum = 0;
  Object.keys(data).forEach(function(prop) {
    // `prop` is the property name
    var pageTitle = prop;
    var cumulativeDist = data[prop].cumulativeDist;
    sum += parseInt(cumulativeDist);
    var entrytime = data[prop].entrytime;
    let listEl = document.querySelector("ul");
    const listItem = document.createElement("li");

    for (items in pageTitle){
      //console.log("scrolled " + cumulativeDist + " on " + pageTitle + " last recorded at " + "entrytime");
      listItem.textContent = "scrolled " + pxToCm(cumulativeDist) + " cm on " + pageTitle;
      listEl.appendChild(listItem);
    }
  });
  let sumListItem = document.querySelector("h2");
  sumListItem.innerHTML = "full cumulative dist: " + pxToM(sum) + "meters";
  distInM = pxToM(sum);
  //listEl.appendChild(sumListItem);
  browser.browserAction.setBadgeText({text: (distInM).toString()});
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function pxToCm(distance){
  return (distance * 0.0264);
}

function pxToM(distance){
  return (distance * 0.000264);
}

if (counter === 9) {
  //console.log("ten tabs");
  notify("Woah, that's " + constCounter.toString() + " tabs, now we're multitasking!");
}

function notify(message) {
  //console.log("calling notify function");
  browser.notifications.create({
    "type": "basic",
    "title": "tab count",
    "iconUrl": browser.extension.getURL("icons/plusplusplus48.png"),
    "message": message
  });
}
