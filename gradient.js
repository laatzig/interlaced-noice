
var mouseIntensity = 0.00001;
var squareResolution = 4;
var timeScale=0.01;
var rez = 0.001;
cols = ["#fd5925", "#ffede7", "#1c5872", "#c19384", "#9a2a06", "#3ba7e5", "#061e29", "#ef972d", "#84541a"]

c = n = rez;
var t = 0.3;
var x = 0;
var y = 0;
var stepSize = squareResolution*squareResolution;

function setup() {
  var canvasDiv = document.getElementById('myCanvas');
  var width = canvasDiv.offsetWidth;
  var height = canvasDiv.offsetHeight;
  var sketchCanvas = createCanvas(width,height);
  sketchCanvas.scale(2)
  sketchCanvas.parent("myCanvas");
    frameRate(30);
    strokeWeight(3);
    noiseDetail(2);
    background(0);
    
  }
  
function draw() {
    var startValueWidth = squareResolution*x+squareResolution;
    var startValueHeigth = squareResolution*y+squareResolution;
    var mouseW = mouseX*mouseIntensity;
    var mouseH = mouseY*mouseIntensity;
    for (i = startValueWidth; i < width; i +=stepSize) {
      for (j = startValueHeigth; j < height; j+=stepSize) {
        n = noise(i * rez+mouseW, j * rez + (t * 0.1)+mouseH,t) * 9;
        c=floor(n)
        stroke(cols[c]);
        point(i,j)
      }
    }
    if (t > 0.2){t*=0.9}
    else(t*=(1-timeScale))
  

    //x is the current horizontal pixel
    //y is the current vertical row
    if(x===0){x=2}
    else if (x===2) {x=1}
    else if(x===1){x=3}
    else if (x===3){x=0}

    if(x===0){
    //if(x===0||x===1){
      if(y===0){y=2;
        //x=0
      }
      else if (y===2){y=1
        //;x=1
      }
      else if (y===1){y=3;
        //x=1
      }
      else {y=0;
        //x=0
      }

    }
    

  }
  

  function windowResized() {
    
    var canvasDiv = document.getElementById('myCanvas');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    resizeCanvas(width,height);
    background(0);
  }

  function generateRandomColors(n) {
    var randomColors = [];
    for (var i = 0; i < n; i++) {
      var color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random hex code
      randomColors.push(color);
    }
    return randomColors;
  }