/*anki_globals code, see anki_globals*/
function checkParams() { for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ throw "This function expected a non-null or undefined parameter, but recieved a parameter that was " + arguments[i] + "\n"; } } } function saveFrontToBack(name, value) { try { checkParams(name, value); try { sessionStorage.setItem(name, value);} catch (e) { try { window[name]=value;} catch (e) { console.log("When trying to save " + name + " with the value " + value + " a fatal error was encountered:\n" + e); }} } catch (e) { console.log(e + "Name or value was undefined or null."); }} function loadFromFront(name, isArray, preserve) { try { checkParams(name); var tempSessionStorageItem; try{ tempSessionStorageItem = sessionStorage.getItem(name); if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; if (!preserve) { sessionStorage.setItem(name,""); } } catch (e){ try { tempSessionStorageItem=window[name]; if (!preserve) {window[name]="";} if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; } catch (err) { console.log("When trying to load " + name + " a fatal error was encountered:\n" + err); }} return tempSessionStorageItem; } catch (e) { console.log(e + "Name was undefined or null."); } } function isFront() { return !document.querySelector("#back-indicator-token"); } function getGenericErrorMessage(err) { var errorMessage = "Encountered an error while executing code involving these variables:\n"; for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ errorMessage += arguments[i]; } else { if (typeof arguments[i]=== 'object') { errorMessage+=JSON.stringify(arguments[i]); } else{ errorMessage += arguments[i]; } } errorMessage += "\n"; } errorMessage += "This is the error message:\n" + err; return errorMessage; } function switchDisplayStates(element, state1, state2) { return function(e){ var elementTemp; try { elementTemp = document.querySelector(element); if (elementTemp.style.display==state1){ elementTemp.style.display=state2; } else { elementTemp.style.display=state1; } } catch (err) { console.log(getGenericErrorMessage(err, element, state1, state2, elementTemp)); } }; } function tryNoArgs(functionToTry){ try { functionToTry(); } catch (e) { console.log(e); } }

var questionedElements = document.querySelectorAll('.questionedElements.reorderText > div');
if(isFront()){
    var orderArr = [];
    questionedElements.forEach((item, j) => {
        var childrenReorderables = item.querySelectorAll("i");
        var upperBound = childrenReorderables.length;
        var numberArray = Array.from(Array(upperBound).keys(), x => x*10);
        for (var k = 0; k < childrenReorderables.length; k++) {
            childrenReorderables[k].style.order = numberArray.splice(Math.floor(Math.random()*numberArray.length), 1);
            childrenReorderables[k].setAttribute("index", k);
            orderArr.push(childrenReorderables[k].style.order);
            childrenReorderables[k].onclick = function (e) {
                for (var i = 0; i < e.target.parentNode.querySelectorAll("i").length; i++) {
                    item = e.target.parentNode.querySelectorAll("i")[i];
                    if(Number(item.style.order)===Number(e.target.style.order) - 10){
                        item.style.order = Number(item.style.order)+10;
                        e.target.style.order = Number(e.target.style.order) - 10;
                        orderArr[e.target.getAttribute("index")]=e.target.style.order;
                        orderArr[item.getAttribute("index")]=item.style.order;
                        break;
                    }
                }

                saveFrontToBack('orderSentenceArr', orderArr);};
            }
        saveFrontToBack('orderSentenceArr', orderArr);
        //Deal with elements that should remain static.
        var parentDivs = item.querySelectorAll("div");
        var nonReorderOrderArr = [];
        if (parentDivs) {
            parentDivs.forEach((parentDiv) => {
                if (parentDiv&&parentDiv.children&&parentDiv.children.length) {
                    console.log(parentDiv.children);
                    for (var m = 0; m < parentDiv.children.length; m++) { //for all children of a div containers, i and non-i
                        if(parentDiv.children[m].nodeName==="I" /*If the element is a i*/ && m>0 /*The first element will not hav previous nodes*/){
                            var prevNodeIndex = m-1; var offsetCounter = 1; //Get the index of the previous node
                            while (parentDiv.children[prevNodeIndex].nodeName!=="I") { //While that previous node isn't a i element, which we don't need to reorder
                                parentDiv.children[prevNodeIndex].style.order=(Number(parentDiv.children[m].getAttribute("index"))*10)-offsetCounter; //Set that element's order to the index of the last found i element (times ten, because that's the order step) minus the amount of non-i elemments we found, thereby preserving the order
                                prevNodeIndex--; offsetCounter++;
                            }
                        } else if (m===parentDiv.children.length-1 && parentDiv.children[m].nodeName!=="I") { //What if the last n nodes are text nodes?
                            console.log("hello i am the last element");
                            var prevNodeIndex = m; var offsetCounter = 1; //Get the index of this node, too
                            while (parentDiv.children[prevNodeIndex].nodeName!=="I") { //While that previous node isn't a i element, which we don't need to reorder
                                parentDiv.children[prevNodeIndex].style.order=1000000-offsetCounter; //Elements at end, so we don't have to worry about order except relatively to each other
                                prevNodeIndex--; offsetCounter++;
                            }
                        }
                    }
                    for (var z = 0; z < parentDiv.children.length; z++) {
                        if(parentDiv.children[z].nodeName!=="I"){
                            nonReorderOrderArr.push(parentDiv.children[z].style.order);
                        }
                    }
                    console.log(nonReorderOrderArr);
                    saveFrontToBack("nonReorderArr", nonReorderOrderArr);
                }});}});}

else{
    var orderArr = loadFromFront('orderSentenceArr', true);
    if(typeof orderArr === "string") {orderArr=orderArr.split(",");}
    questionedElements.forEach((item, j) => {
        var iElements = item.querySelectorAll("i");
        console.log(iElements);
        for (var k = 0; k < iElements.length; k++) {
            iElements[k].style.order = orderArr[k];
            if(k*10===Number(orderArr[k])){
                iElements[k].classList.add("good-element");
            } else {
                iElements[k].classList.add("bad-element");
            }}
        var parentDivs = item.querySelectorAll("div");
        parentDivs.forEach((parentDiv) => {
            var nonReorderOrderArr = loadFromFront("nonReorderArr");
            console.log(nonReorderOrderArr);
            var childCounter=0;
            for (var i = 0; i < parentDiv.children.length; i++) {
                if(parentDiv.children[i].nodeName!=="I"){
                    parentDiv.children[i].style.order = nonReorderOrderArr[childCounter];
                    childCounter++;
                }
            }});
});}

var uStrikeQuery = ".questionedElements > div > div u, .questionedElements > div > div strike";
var uStrikeQueryElements = document.querySelectorAll(uStrikeQuery);
if(isFront()){
    console.log("hello");
    var orderArruStrike = [];
    for (var i = 0; i < uStrikeQueryElements.length; i++) {
        uStrikeQueryElements[i].style.order = Math.floor(Math.random()*999999999); //large number so we avoid duplicate numbers, which preserve node order
        orderArruStrike.push(uStrikeQueryElements[i].style.order);
        console.log(orderArruStrike);
    }
    saveFrontToBack('orderArruStrike', orderArruStrike);
    console.log(loadFromFront('orderArruStrike', true, true));
}
else{
    var orderArruStrike = loadFromFront('orderArruStrike', true);
    console.log(orderArruStrike);
    for (var i = 0; i < uStrikeQueryElements.length; i++) {
        uStrikeQueryElements[i].style.order = orderArruStrike[i];
}}
