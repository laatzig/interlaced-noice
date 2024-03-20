
var mouseIntensity = 0.00001;
var squareResolution = 4;
var timeScale=0.01;
var rez = 0.001;
var ditherMethod="random"; //select between "random" and "pattern"
var cols = ["#fd5925", "#ffede7", "#1c5872", "#c19384", "#9a2a06", "#3ba7e5", "#061e29", "#ef972d", "#84541a"]

var nCols= cols.length;
var grid = [];
var framesN = squareResolution*squareResolution;
var currentIteration = 0;
var numIterations ,gridLength ,nextMax ,pixelsPerFrame;

 

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
    strokeWeight(3);
    noiseDetail(2);
    background(0);
  computeGrid(ditherMethod);
  
    
  }
  
function draw() {

    var mouseW = mouseX*mouseIntensity;
    var mouseH = mouseY*mouseIntensity;
   

    for (i = currentIteration*pixelsPerFrame; i < nextMax; i++ ) {
        n = noise((grid[i][0])*rez + mouseW, (grid[i][1])*rez + (t * 0.1)+mouseH,t) * nCols;
        c=floor(n)
        stroke(cols[c]);
        point(grid[i][0],grid[i][1])
    }

    if (t > 0.2){t*=0.9}
    else(t*=(1-timeScale))

    if(currentIteration<numIterations){
      currentIteration++; 
      nextMax = min((1+currentIteration) * pixelsPerFrame, gridLength)
    }
    else if (currentIteration === numIterations){
      currentIteration = 0;
      nextMax = pixelsPerFrame;
      //uncomment for turbo trip
      //cols = generateRandomColors(1000);
      //nCols=cols.length;
    }

   
    
    
  }
  

  function windowResized() {
    
    var canvasDiv = document.getElementById('myCanvas');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    resizeCanvas(width,height);
    background(0);
    computeGrid(ditherMethod);
  
  }

  


  function computeGrid(type){
    grid = [];

    
    if(type === "pattern"){

      
        for(var b=0; b<=framesN;b++){

          var startValueWidth = squareResolution*x+.5*squareResolution;
          var startValueHeight = squareResolution*y+.5*squareResolution;
          
          for (i = startValueWidth; i < width; i +=stepSize) {
            for (j = startValueHeight; j < height; j+=stepSize) {
              grid.push([i,j])
            }
          }
          
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
    }

    else if (type === "random"){

          
            
            for (i = .5*squareResolution; i < width; i +=squareResolution) {
              for (j = .5*squareResolution; j < height; j+=squareResolution) {
                grid.push([i,j])
              }
            }
            grid=randomShuffle(grid);


    }
  
  gridLength = grid.length
  pixelsPerFrame = floor(gridLength/(framesN+1)+1)
  nextMax = pixelsPerFrame;
  currentIteration = 0;
  numIterations = framesN
  
  
  }



  function randomShuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function generateRandomColors(n) {
    var randomColors = [];
    for (var i = 0; i < n; i++) {
      var color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random hex code
      randomColors.push(color);
    }
    return randomColors;
  }
  