console.log("yo, i'm triggered by the popup");
cumulativeDist = chrome.storage.local.get("cumulativeDist", gotItem);

function gotItem(item) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  } else {
    console.log(item);
    cumulativeDist = item;
    console.log(cumulativeDist);
    var popup = document.getElementById("popup");
    popup.innerHTML = "amount scrolled is: " + cumulativeDist.cumulativeDist;

  }
}
setTimeout(function(){ console.log(cumulativeDist) }, 500);
