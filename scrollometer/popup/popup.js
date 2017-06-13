console.log("popup triggered");

// DANGER ZONE --- Destroy db?
// var clearItemsOnce = browser.storage.sync.clear();
// clearItemsOnce.then(onGot, onError);

var gettingItems = browser.storage.sync.get();
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
  sumListItem.innerHTML = "full cumulative dist: " + pxToM(sum) + " meters";
  distInM = pxToM(sum);
  //listEl.appendChild(sumListItem);
  browser.browserAction.setBadgeText({text: (distInM).toString()});

  let tweetIt = document.getElementById('tweet-it');
  var textToTweet = "I've scrolled " + distInM + " meters today. #Scrollometer #realvirtualdistance";
  if (textToTweet.length > 140) {
    alert('Tweet should be less than 140 Chars');
  }
  else {
    var twtLink = 'http://twitter.com/home?status=' +encodeURIComponent(textToTweet);
  }
  tweetIt.innerHTML = "Tweet your Scrollometer!"
  tweetIt.href = twtLink;
  tweetIt.addEventListener("click", function(){
    console.log("tweeting from Taborama");
    window.open(twtLink,'_blank');
    window.close();
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

var options = document.querySelector("button");
options.addEventListener("click", function(){
  browser.runtime.openOptionsPage();
  window.close();
});
