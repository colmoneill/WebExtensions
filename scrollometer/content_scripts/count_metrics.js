console.log("content script trigger");

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


if (browser.storage.sync.get('prevCumulativeDist') > 1 ){
  var prevCumulativeDist = parseInt(browser.storage.local.get('prevCumulativeDist'), 10);
  console.log("previous cumulative distance found, using it");
}
else {
  var prevCumulativeDist = 0;
  console.log("no previous cumulative distance found, starting from 0");
}

if (browser.storage.local.get('pixels_per_inch')){
  console.log("got calibrated PPI value, using it");
  var pixels_per_inch = browser.storage.local.get('pixels_per_inch');
}
else {
  console.log("No available PPI value, using default");
  var pixels_per_inch = default_ppi
}

function pxToCm(distance){
  return (distance * 0.0264);
}

function pxToM(distance){
  return (distance * 0.000264);
}


// callback to set() just checks for errors
function onSet() {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  } else {
    console.log("OK");
  }
}
