/*anki_globals code, see anki_globals*/
function checkParams() { for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ throw "This function expected a non-null or undefined parameter, but recieved a parameter that was " + arguments[i] + "\n"; } } } function saveFrontToBack(name, value) { try { checkParams(name, value); try { sessionStorage.setItem(name, value);} catch (e) { try { window[name]=value;} catch (e) { console.log("When trying to save " + name + " with the value " + value + " a fatal error was encountered:\n" + e); }} } catch (e) { console.log(e + "Name or value was undefined or null."); }} function loadFromFront(name) { try { checkParams(name); var tempSessionStorageItem; try{ tempSessionStorageItem = sessionStorage.getItem(name); sessionStorage.setItem(name,"");} catch (e){ try { tempSessionStorageItem=window[name]; window[name]=""; } catch (err) { console.log("When trying to load " + name + " a fatal error was encountered:\n" + err); }} return tempSessionStorageItem; } catch (e) { console.log(e + "Name was undefined or null."); } } function isFront() { return !document.querySelector("#back-indicator-token"); } function getGenericErrorMessage(err) { var errorMessage = "Encountered an error while executing code involving these variables:\n"; for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ errorMessage += arguments[i]; } else { if (typeof arguments[i]=== 'object') { errorMessage+=JSON.stringify(arguments[i]); } else{ errorMessage += arguments[i]; } } errorMessage += "\n"; } errorMessage += "This is the error message:\n" + err; return errorMessage; } function switchDisplayStates(element, state1, state2) { return function(e){ var elementTemp; try { elementTemp = document.querySelector(element); if (elementTemp.style.display==state1){ elementTemp.style.display=state2; } else { elementTemp.style.display=state1; } } catch (err) { console.log(getGenericErrorMessage(err, element, state1, state2, elementTemp)); } }; } function tryNoArgs(functionToTry){ try { functionToTry(); } catch (e) { console.log(e); } }

if(isFront()){
    tryNoArgs(function () {
        document.querySelectorAll(".contentBox").forEach((item, i) => {
            item.onclick=function(e){
                var otherContentBoxes = item.parentNode.parentNode.children;
                var currentIndex;
                for (var i = 0; i<otherContentBoxes.length; i++){
                    otherContentBoxes[i].children[0].classList.remove("selectedBox");
                    if(item==otherContentBoxes[i].children[0]){currentIndex=i;}}
                item.classList.add("selectedBox");
                saveFrontToBack('selectedIndex', currentIndex);  };});});}
else {
    tryNoArgs(function () {
        document.querySelectorAll(".contentBox")[loadFromFront('selectedIndex')].classList.add("selectedBox");});}
