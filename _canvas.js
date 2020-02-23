/*anki_globals code, see anki_globals*/
function checkParams() { for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ throw "This function expected a non-null or undefined parameter, but recieved a parameter that was " + arguments[i] + "\n"; } } } function saveFrontToBack(name, value) { try { checkParams(name, value); try { sessionStorage.setItem(name, value);} catch (e) { try { window[name]=value;} catch (e) { console.log("When trying to save " + name + " with the value " + value + " a fatal error was encountered:\n" + e); }} } catch (e) { console.log(e + "Name or value was undefined or null."); }} function loadFromFront(name, isArray, preserve) { try { checkParams(name); var tempSessionStorageItem; try{ tempSessionStorageItem = sessionStorage.getItem(name); if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; if (!preserve) { sessionStorage.setItem(name,""); } } catch (e){ try { tempSessionStorageItem=window[name]; if (!preserve) {window[name]="";} if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; } catch (err) { console.log("When trying to load " + name + " a fatal error was encountered:\n" + err); }} return tempSessionStorageItem; } catch (e) { console.log(e + "Name was undefined or null."); } } function isFront() { return !document.querySelector("#back-indicator-token"); } function getGenericErrorMessage(err) { var errorMessage = "Encountered an error while executing code involving these variables:\n"; for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ errorMessage += arguments[i]; } else { if (typeof arguments[i]=== 'object') { errorMessage+=JSON.stringify(arguments[i]); } else{ errorMessage += arguments[i]; } } errorMessage += "\n"; } errorMessage += "This is the error message:\n" + err; return errorMessage; } function switchDisplayStates(element, state1, state2) { return function(e){ var elementTemp; try { elementTemp = document.querySelector(element); if (elementTemp.style.display==state1){ elementTemp.style.display=state2; } else { elementTemp.style.display=state1; } } catch (err) { console.log(getGenericErrorMessage(err, element, state1, state2, elementTemp)); } }; } function tryNoArgs(functionToTry){ try { functionToTry(); } catch (e) { console.log(e); } }

function setStrokeWidth(strokeWidthPassing) {
    return function(){strokeWidth=strokeWidthPassing;};
}

function saveImage(){ saveFrontToBack('sketchpad', canvas.toDataURL("image/png"));}

//Code for canvas
/* Variables for referencing the canvas and 2dcanvas context */var canvas,ctx;
/* Variables to keep track of the mouse position and left-button status*/ var mouseX,mouseY,mouseDown=0;
/*Variables to keep track of the touch position*/ var touchX,touchY;
/* Keep track of the old/last position when drawing a line - We set it to -1 at the start to indicate that we don't have a good value for it yet*/ var lastX,lastY=-1;
var strokeColor = "rgba(0,0,0,1)";
var strokeWidth = 3;

//Drawing functions

// Draws a line between the specified position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawLine(ctx,x,y) {
    if (lastX==-1) { lastX=x; lastY=y; }
    ctx.strokeStyle = strokeColor; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(lastX,lastY); ctx.lineTo(x,y);
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.closePath();
    lastX=x; lastY=y;}

function sketchpad_mouseDown() { mouseDown=1; drawLine(ctx,mouseX,mouseY); } // Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseUp() { mouseDown=0; lastX=-1; lastY=-1; saveImage(); }
function sketchpad_mouseMove(e) { getMousePos(e); if (mouseDown==1) { drawLine(ctx,mouseX,mouseY); } }
function getMousePos(e) {
    if (!e)
    var e = event;
    if (e.offsetX) { mouseX = e.offsetX; mouseY = e.offsetY; console.log("offset");}
    else if (e.layerX) { mouseX = e.layerX; mouseY = e.layerY; console.log("layer");}}

function sketchpad_touchStart() { getTouchPos(); drawLine(ctx,touchX,touchY); event.preventDefault(); }
function sketchpad_touchEnd() { lastX=-1; lastY=-1; saveImage(); }
function sketchpad_touchMove(e) { getTouchPos(e); drawLine(ctx,touchX,touchY); event.preventDefault(); }
function getTouchPos(e) {
    if (!e)
    var e = event;
    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop; } } }


var futureBGImage = document.querySelector('#future-bg-image');
canvas = document.getElementById('sketchpad');
ctx = canvas.getContext('2d');

if (ctx) {
    if(futureBGImage){
        canvas.width = futureBGImage.width; canvas.height = futureBGImage.height;
        document.querySelector('#sketchpadContainer').style.backgroundImage = "url(" + futureBGImage.src +")";
        futureBGImage.outerHTML ="";
    } else{
        canvas.width = document.querySelector("#sketchpadContainer").offsetWidth; canvas.height = document.querySelector("#sketchpadContainer").offsetHeight;}
    // React to mouse events on the canvas, and mouseup on the entire document
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false); canvas.addEventListener('mousemove', sketchpad_mouseMove, false); window.addEventListener('mouseup', sketchpad_mouseUp, false);
    // React to touch events on the canvas
    canvas.addEventListener('touchstart', sketchpad_touchStart, false); canvas.addEventListener('touchend', sketchpad_touchEnd, false); canvas.addEventListener('touchmove', sketchpad_touchMove, false);
}

document.querySelector('#color-picker-toggle').onclick=switchDisplayStates("#color-picker", "flex", "none");
document.querySelector('#stroke-size-small').onclick=setStrokeWidth(3);
document.querySelector('#stroke-size-medium').onclick=setStrokeWidth(13);
document.querySelector('#stroke-size-large').onclick=setStrokeWidth(40);

var colorSelectorNodeList = document.querySelectorAll('#color-picker > div');
for (var i = 0; i < colorSelectorNodeList.length; i++) {
    colorSelectorNodeList[i].onclick=function(e){
        strokeColor = getComputedStyle(e.target).backgroundColor; }; }

if(!isFront()){document.getElementById('sketchpad').style.background="url('"+loadFromFront("sketchpad")+"')";}
