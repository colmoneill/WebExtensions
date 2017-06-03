console.log("background-script loading");

var gettingItems = browser.storage.sync.get();
gettingItems.then(onGot, onError);

function onGot(item) {
  console.log(item);
}

function onError(error) {
  console.log(`Error: ${error}`);
}
