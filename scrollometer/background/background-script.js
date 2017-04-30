console.log("background script triggered");
let gettingStorage = browser.storage.local.get("tabinfo");
gettingStorage.then(onGot, onError);

function onGot(item) {
  console.log(item);
}
function onError(error) {
  console.log(`Error: ${error}`);
}
