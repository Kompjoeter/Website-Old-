var cellSize = 4; //Max size in pixels of shape to draw.
var canvasHolder;
var canvas;
var picture;

function preload()
{
    picture = new Picture('assets/img04.png',cellSize);
}

function setup() 
{
    //Create canvas and bind it to pre-made HTML div.
    canvasHolder = document.getElementById('canvas-holder');
    canvas = createCanvas(canvasHolder.offsetWidth,canvasHolder.offsetWidth);  
    canvas.parent('canvas-holder');

    picture.gridCreate();  //Divide picture size by cellSize and make a 2D-Array which will hold all color-values.
    noLoop();
}

function draw()
{
    background(255); //Set background to white, just to be sure. If some parts of the canvas are left empty and a color is extracted from it,
    //that color will be white (brightness 100%) and thus no shapes will be drawn at that position (Or rather, shape of size 0).
    image(picture.img,0,0,canvasHolder.offsetWidth,picture.img.height*width/picture.img.width); //Draw Source Image to Canvas
    
    picture.extractRgba(); //Substract Colors from Source Image, store in 2D Array (picture.grid).

    clear(); //Clear the canvas. Source images is only needed to extract colors, shouldn't be visible.

    //background('#ececea');
    stroke(0,0);
    fill('#484848');

    for(var y = 0; y < picture.gridY; y++)
    {
        for(let x = 0; x < picture.gridX; x++)
        {
            let rgbaColor = picture.grid[x][y];
            let hsbColor = rgbToHsb(rgbaColor[0],rgbaColor[1],rgbaColor[2]);
            let circleSize = 0;

            if (hsbColor.bri <= 25)
            {
                circleSize = cellSize;
            }
            else if (hsbColor.bri <= 50)
            {
                circleSize = (cellSize /4)*3;
            }
            else if (hsbColor.bri <= 75)
            {
                circleSize = (cellSize /4)*2;
            }

            circle(((picture.cellSize)+x*(picture.cellSize)),((picture.cellSize)+y*(picture.cellSize)),circleSize);
        }
    }
}


function windowResized()
{
    if (window.innerWidth >= 768)
    {
        cellSize = 4;
    }
    else
    {
        cellSize = 4;
    }
    picture.cellSize = cellSize;
    resizeCanvas(canvasHolder.offsetWidth,canvasHolder.offsetWidth);
}


  //Converts to color HSB object (code from here http://www.csgnetwork.com/csgcolorsel4.html with some improvements)
  //Improvements not by me, but by Marco Demaio at https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work
  function rgbToHsb(r, g, b)
  {    
    r /= 255; g /= 255; b /= 255; // Scale to unity.   
    var minVal = Math.min(r, g, b),
    maxVal = Math.max(r, g, b),
    delta = maxVal - minVal,
    HSB = {hue:0, sat:0, bri:maxVal},
    del_R, del_G, del_B;

    if( delta !== 0 )
    {
        HSB.sat = delta / maxVal;
        del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
        del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
        del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

        if (r === maxVal) {HSB.hue = del_B - del_G;}
        else if (g === maxVal) {HSB.hue = (1 / 3) + del_R - del_B;}
        else if (b === maxVal) {HSB.hue = (2 / 3) + del_G - del_R;}

        if (HSB.hue < 0) {HSB.hue += 1;}
        if (HSB.hue > 1) {HSB.hue -= 1;}
    }

    HSB.hue *= 360;
    HSB.sat *= 100;
    HSB.bri *= 100;

    return HSB;
  }
