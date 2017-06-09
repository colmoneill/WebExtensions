console.log("content script trigger");

var initVertPos = window.scrollY,
    initHorizPos = window.scrollX,
    fullWidth = window.innerWidth,
    fullHeight = window.innerHeight,
    devicePixelRatio = window.devicePixelRatio,
    previousPos = 0,
    cumulativeDist = 0,
    prevCumulativeDist = 0,
    scrollo = 0,
    default_ppi = 96,
    currentdate = new Date(),
    datetime = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/"
              + currentdate.getFullYear() + " @ "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":"
              + currentdate.getSeconds();
    var address = window.location.href,
    address=/^(http(s)?:\/\/)?(.+)$/i.exec(address),
    address=address[3];
    //console.log(address);
    address= "'" + address + "'";
    //console.log(address);

var scrollListener = window.addEventListener("scroll", function(){
  console.log("prevCumulativeDist at start of event listener " + prevCumulativeDist);
  var currentPos = window.scrollY;
  var delta = (currentPos - previousPos);
  cumulativeDist = prevCumulativeDist;
  cumulativeDist = cumulativeDist + Math.abs(delta);
  previousPos = currentPos;
  prevCumulativeDist = cumulativeDist;
  // console.log(cumulativeDist);
  console.log(address);
  var saveValues = {
    'cumulativeDist': cumulativeDist,
    'entrytime' : datetime
  };
  stringToSave = {};
  stringToSave[address] = saveValues;
  console.log(stringToSave);
  chrome.storage.sync.set(stringToSave, function () {
     console.log('Saved', address, saveValues);
  });
  //setStorage(stringToSave);
});

//var intervalID = window.setInterval(function(){setStorage(stringToSave)}, 10000);

function setStorage(item) {
  chrome.storage.sync.set(item, function () {
    console.log('Saved', item);
  });
}

function onSet(item) {
  console.log("set " + item + " to storage");
}

function onError(error) {
  console.log(`Error: ${error}`);
}
