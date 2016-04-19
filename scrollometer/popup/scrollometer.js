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

if (localStorage.prevCumulativeDist){
  var prevCumulativeDist = parseInt(localStorage.prevCumulativeDist, 10);
  console.log("previous cumulative distance found, using it");
}
else {
  var prevCumulativeDist = 0;
  console.log("no previous cumulative distance found, starting from 0");
}

if (localStorage.pixels_per_inch){
  console.log("got calibrated PPI value, using it");
  var pixels_per_inch = localStorage.pixels_per_inch
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

var bigdiv = document.getElementById("bigdiv")
bigdiv.innerHTML = "This page offers <code>" + fullHeight + " px</code> of potential or " + pxToCm(fullHeight)*devicePixelRatio  + " cm <br><br> Your device pixel ratio is " + devicePixelRatio + "<br><br>You have a set PPI of " + pixels_per_inch + " <br><br> and You've scrolled " + cumulativeDist + " px or " + pxToM(cumulativeDist) + " meters! <br> on <code>" + window.location.host + "</code>";

var scrollListener = window.addEventListener("scroll", function(){
  //console.log("prevCumulativeDist at start of event listener " + prevCumulativeDist);
  var currentPos = window.scrollY;
  var delta = (currentPos - previousPos);
  cumulativeDist = prevCumulativeDist;
  cumulativeDist = cumulativeDist + Math.abs(delta);
  smalldiv.innerHTML = "Distance: " + pxToM(cumulativeDist) + " m";
  bigdiv.innerHTML = "This page offers <code>" + fullHeight + " px</code> of potential or " + pxToCm(fullHeight)*devicePixelRatio  + " cm <br><br> Your device pixel ratio is " + devicePixelRatio + " <br><br> and You've scrolled " + cumulativeDist + " px or " + pxToM(cumulativeDist) + " meters! <br> on <code>" + window.location.host + "</code>";
  previousPos = currentPos;
  prevCumulativeDist = cumulativeDist;
  localStorage.prevCumulativeDist = [parseInt(prevCumulativeDist, 10) , datetime ];
  //console.log("prevCumulativeDist at END of event listener " + prevCumulativeDist);
});
