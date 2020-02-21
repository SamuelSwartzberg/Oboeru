/*anki_globals code, see anki_globals*/
function checkParams() { for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ throw "This function expected a non-null or undefined parameter, but recieved a parameter that was " + arguments[i] + "\n"; } } } function saveFrontToBack(name, value) { try { checkParams(name, value); try { sessionStorage.setItem(name, value);} catch (e) { try { window[name]=value;} catch (e) { console.log("When trying to save " + name + " with the value " + value + " a fatal error was encountered:\n" + e); }} } catch (e) { console.log(e + "Name or value was undefined or null."); }} function loadFromFront(name) { try { checkParams(name); var tempSessionStorageItem; try{ tempSessionStorageItem = sessionStorage.getItem(name); sessionStorage.setItem(name,"");} catch (e){ try { tempSessionStorageItem=window[name]; window[name]=""; } catch (err) { console.log("When trying to load " + name + " a fatal error was encountered:\n" + err); }} return tempSessionStorageItem; } catch (e) { console.log(e + "Name was undefined or null."); } } function isFront() { return !document.querySelector("#back-indicator-token"); } function getGenericErrorMessage(err) { var errorMessage = "Encountered an error while executing code involving these variables:\n"; for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ errorMessage += arguments[i]; } else { if (typeof arguments[i]=== 'object') { errorMessage+=JSON.stringify(arguments[i]); } else{ errorMessage += arguments[i]; } } errorMessage += "\n"; } errorMessage += "This is the error message:\n" + err; return errorMessage; } function switchDisplayStates(element, state1, state2) { return function(e){ var elementTemp; try { elementTemp = document.querySelector(element); if (elementTemp.style.display==state1){ elementTemp.style.display=state2; } else { elementTemp.style.display=state1; } } catch (err) { console.log(getGenericErrorMessage(err, element, state1, state2, elementTemp)); } }; } function tryNoArgs(functionToTry){ try { functionToTry(); } catch (e) { console.log(e); } }

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
massNotDisplay([".frontSide:not(#color-picker)", ".bodySection", ".questionedElements", ".questionedContentSection", ".extraInfoSection", ".headerSection", "#answer", ".inputSection"]);
window.scroll(0,100000);

document.querySelectorAll(".questionedElements > div > div > div").forEach(function(item, i){
    if(item.innerHTML.includes("：")){
        item.parentNode.style.textAlign="left";
        stringBeforeColon = item.innerHTML.slice(0, item.innerHTML.indexOf("："));
        stringAfterColon = item.innerHTML.slice(item.innerHTML.indexOf("：")+1);
        item.innerHTML = "<b>" + stringBeforeColon + "</b>：" + stringAfterColon;
     }})
