console.log("popup triggered");

// Destroy db?
// var clearItemsOnce = browser.storage.sync.clear();
// clearItemsOnce.then(onGot, onError);

var gettingItems = browser.storage.sync.get();
gettingItems.then(onGot, onError);

function onGot(item) {
  const data = item;
  Object.keys(data).forEach(function(prop) {
    // `prop` is the property name
    var pageTitle = prop;
    var cumulativeDist = data[prop].cumulativeDist;
    var entrytime = data[prop].entrytime;
    //console.log(data[prop].entrytime)
    let listEl = document.querySelector("ul");
    const listItem = document.createElement("li");

    for (items in pageTitle){
      console.log("scrolled " + cumulativeDist + " on " + pageTitle + " last recorded at " + "entrytime");
      listItem.textContent = "scrolled " + pxToCm(cumulativeDist) + " cm on " + pageTitle;
      listEl.appendChild(listItem);
    }
  });
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
