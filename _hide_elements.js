/*anki_globals code, see anki_globals*/
function checkParams() { for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ throw "This function expected a non-null or undefined parameter, but recieved a parameter that was " + arguments[i] + "\n"; } } } function saveFrontToBack(name, value) { try { checkParams(name, value); try { sessionStorage.setItem(name, value);} catch (e) { try { window[name]=value;} catch (e) { console.log("When trying to save " + name + " with the value " + value + " a fatal error was encountered:\n" + e); }} } catch (e) { console.log(e + "Name or value was undefined or null."); }} function loadFromFront(name, isArray, preserve) { try { checkParams(name); var tempSessionStorageItem; try{ tempSessionStorageItem = sessionStorage.getItem(name); if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; if (!preserve) { sessionStorage.setItem(name,""); } } catch (e){ try { tempSessionStorageItem=window[name]; if (!preserve) {window[name]="";} if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; } catch (err) { console.log("When trying to load " + name + " a fatal error was encountered:\n" + err); }} return tempSessionStorageItem; } catch (e) { console.log(e + "Name was undefined or null."); } } function isFront() { return !document.querySelector("#back-indicator-token"); } function getGenericErrorMessage(err) { var errorMessage = "Encountered an error while executing code involving these variables:\n"; for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ errorMessage += arguments[i]; } else { if (typeof arguments[i]=== 'object') { errorMessage+=JSON.stringify(arguments[i]); } else{ errorMessage += arguments[i]; } } errorMessage += "\n"; } errorMessage += "This is the error message:\n" + err; return errorMessage; } function switchDisplayStates(element, state1, state2) { return function(e){ var elementTemp; try { elementTemp = document.querySelector(element); if (elementTemp.style.display==state1){ elementTemp.style.display=state2; } else { elementTemp.style.display=state1; } } catch (err) { console.log(getGenericErrorMessage(err, element, state1, state2, elementTemp)); } }; } function tryNoArgs(functionToTry){ try { functionToTry(); } catch (e) { console.log(e); } }

mediaContainer = document.querySelector('.media-container');
document.querySelectorAll('.replaybutton').forEach((item, i) => {
    item.querySelector("svg").outerHTML = '<svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"> <path d="M50,92C48.896,92 48.896,88 50,88C63.533,88 76.143,80.72 82.908,69C89.675,57.28 89.675,42.72 82.908,31C76.143,19.28 63.533,12 50,12C36.467,12 23.857,19.28 17.091,31C10.325,42.72 10.325,57.28 17.091,69C20.535,74.966 18.593,81.072 11.623,86.193C11.275,86.449 11.132,86.898 11.268,87.31C11.403,87.724 11.785,88 12.218,88L50,88C51.104,88 51.104,92 50,92L12.218,92C10.052,92 8.143,90.617 7.468,88.56C6.791,86.5 7.51,84.254 9.255,82.971C17.177,77.15 14.505,72.521 13.628,71C6.149,58.047 6.149,41.953 13.628,29C21.107,16.047 35.043,8 50,8C64.958,8 78.895,16.047 86.373,29C93.851,41.953 93.852,58.047 86.373,71C78.894,83.953 64.958,92 50,92Z" style="fill:white;fill-rule:nonzero;stroke:white;stroke-width:5.5px;"/> <g transform="matrix(1.11092,0,0,1.16497,-3.09835,-7.49299)"> <ellipse cx="48.19" cy="49.367" rx="38.417" ry="37.732" style="fill:white;"/> </g> <ellipse cx="19.57" cy="82.264" rx="6.145" ry="5.511" style="fill:white;"/> </svg>';
    mediaContainer.append(item);
});


function isEmptyNodes(node) {
    if (node.nodeName !== "DIV") { return false;
    } else if (!node.textContent.match(/^\s*$/)){
    } else if (node.children.length === 0){ return true;
    } else {
        for (var i = 0; i < node.children.length; i++) {
            if (!isEmptyNodes(node.children[i])) {return false;} }
        return true;
    } }

function setDisplayNone(selector){
    var querySelection = document.querySelectorAll(selector);
    for (var i = 0; i < querySelection.length; i++) {
        if(isEmptyNodes(querySelection[i])){
            querySelection[i].outerHTML = "";
        } } }

function massNotDisplay(selectorArray){
    for (var i = 0; i < selectorArray.length; i++) {
        try { setDisplayNone(selectorArray[i]);
        } catch (e) { console.log(e.message); } } }

var nsfwImages = document.querySelectorAll(".nsfw");
for (var i = 0; i < nsfwImages.length; i++) {
    if(nsfwImages[i].getAttribute('data-src')){break;}
    nsfwImages[i].setAttribute('data-src', nsfwImages[i].src);
    nsfwImages[i].src = "_show_nsfw.png";
    nsfwImages[i].onclick = function(event) {
        console.log(event);
        console.log(event.target.src=event.target.getAttribute('data-src'));
        event.target.src=event.target.getAttribute('data-src');
    };
}

if (document.querySelector("#typeans")){
    document.querySelector("#typeans").innerHTML=document.querySelector("#typeans").innerHTML.replace("✔", "");}

try {
    document.querySelectorAll(".backSide .contentBox.if-mult-choice-correct").forEach((item, i) => {
        item.outerHTML = "";
    });
} catch (e) {
    console.log(e);
}

//for anything that is a box, delete leading and trailing spaces, if two boxes meet, merge their margins
var boxSelectorString = ".contentBox, .reorderText i, #back-indicator-token~* i, .selectText u, .selectText strike, #typeans, :not(pre) > code, .highlightMain, .replaybutton, font, a, .key";
document.querySelectorAll(boxSelectorString).forEach((item, i) => {
    if (item.previousSibling && item.previousSibling.nodeName==="#text"){
        var sliceindex = item.previousSibling.textContent.length-1;
        while (item.previousSibling.textContent[sliceindex]===" ") {
            sliceindex--;
        }
        item.previousSibling.textContent=item.previousSibling.textContent.slice(0,sliceindex+1);
    }
    if (item.nextSibling && item.nextSibling.nodeName==="#text"){
        var sliceindex = 0;
        while (item.nextSibling.textContent[sliceindex]===" ") {
            sliceindex++;
        }
        item.nextSibling.textContent=item.nextSibling.textContent.slice(sliceindex);
    }
    if (!item.dataset.modified && item.nextSibling && item.nextSibling.matches && item.nextSibling.matches(boxSelectorString)){
        item.style.marginRight = (parseFloat(window.getComputedStyle(item).marginRight)/2)+"px";
        item.nextSibling.style.marginLeft = (parseFloat(window.getComputedStyle(item.nextSibling).marginLeft)/2)+"px";
        item.dataset.modified = true;
    }
});

document.querySelectorAll(boxSelectorString+", .ipa").forEach((item, i) => {
    var prevInnerHtml = item.innerHTML;
    item.innerHTML = item.innerHTML.trim();
    if (prevInnerHtml !== item.innerHTML){console.log("trimmed: [" + prevInnerHtml + "] -> [" +item.innerHTML + "]");}
});


massNotDisplay([".frontSide:not(#color-picker)", ".bodySection", ".questionedElements", ".questionedContentSection", ".extraInfoSection", ".extraInfoSection > div", ".headerSection", "#answer", ".inputSection"]);
window.scroll(0,100000);

document.querySelectorAll(".questionedElements > div > div > div").forEach(function(item, i){
    if(item.innerHTML.includes("：")){
        item.parentNode.style.textAlign="left";
        stringBeforeColon = item.innerHTML.slice(0, item.innerHTML.indexOf("："));
        stringAfterColon = item.innerHTML.slice(item.innerHTML.indexOf("：")+1);
        item.innerHTML = "<b>" + stringBeforeColon + "</b>：" + stringAfterColon;
     }})

 if(!isFront()){
     var cardCounter = Number(loadFromFront("card-counter", false, true)) || 0;
     if(cardCounter>50 /*Since the script loads twice on each card actually 25*/){
         octoMotivate = document.querySelector("#octo-motivate");
         octoMotivate.style.display = "block";
         octoMotivate.onclick = function (e) {
             e.target.style.display = "none";
         }
         saveFrontToBack("card-counter", 0)
     }else{
         console.log(cardCounter);
         saveFrontToBack("card-counter", cardCounter+1);
     }
 }
