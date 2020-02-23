/*anki_globals code, see anki_globals*/
function checkParams() { for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ throw "This function expected a non-null or undefined parameter, but recieved a parameter that was " + arguments[i] + "\n"; } } } function saveFrontToBack(name, value) { try { checkParams(name, value); try { sessionStorage.setItem(name, value);} catch (e) { try { window[name]=value;} catch (e) { console.log("When trying to save " + name + " with the value " + value + " a fatal error was encountered:\n" + e); }} } catch (e) { console.log(e + "Name or value was undefined or null."); }} function loadFromFront(name, isArray, preserve) { try { checkParams(name); var tempSessionStorageItem; try{ tempSessionStorageItem = sessionStorage.getItem(name); if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; if (!preserve) { sessionStorage.setItem(name,""); } } catch (e){ try { tempSessionStorageItem=window[name]; if (!preserve) {window[name]="";} if(typeof tempSessionStorageItem === "string" && isArray) {tempSessionStorageItem=tempSessionStorageItem.split(",")}; } catch (err) { console.log("When trying to load " + name + " a fatal error was encountered:\n" + err); }} return tempSessionStorageItem; } catch (e) { console.log(e + "Name was undefined or null."); } } function isFront() { return !document.querySelector("#back-indicator-token"); } function getGenericErrorMessage(err) { var errorMessage = "Encountered an error while executing code involving these variables:\n"; for (var i = 0; i < arguments.length; i++) { if (arguments[i]==null){ errorMessage += arguments[i]; } else { if (typeof arguments[i]=== 'object') { errorMessage+=JSON.stringify(arguments[i]); } else{ errorMessage += arguments[i]; } } errorMessage += "\n"; } errorMessage += "This is the error message:\n" + err; return errorMessage; } function switchDisplayStates(element, state1, state2) { return function(e){ var elementTemp; try { elementTemp = document.querySelector(element); if (elementTemp.style.display==state1){ elementTemp.style.display=state2; } else { elementTemp.style.display=state1; } } catch (err) { console.log(getGenericErrorMessage(err, element, state1, state2, elementTemp)); } }; } function tryNoArgs(functionToTry){ try { functionToTry(); } catch (e) { console.log(e); } }

var questionedElements = document.querySelectorAll('.questionedElements > div');
if(isFront()){
    var orderArr = [];
    questionedElements.forEach((item, j) => {
        var childrenReorderables = item.querySelectorAll("i");
        var upperBound = childrenReorderables.length;
        var numberArray = Array.from(Array(upperBound).keys());
        for (var k = 0; k < childrenReorderables.length; k++) {
            childrenReorderables[k].style.order = numberArray.splice(Math.floor(Math.random()*numberArray.length), 1);
            childrenReorderables[k].setAttribute("index", k);
            orderArr.push(childrenReorderables[k].style.order);
            childrenReorderables[k].onclick = function (e) {
                for (var i = 0; i < e.target.parentNode.querySelectorAll("i").length; i++) {
                    item = e.target.parentNode.querySelectorAll("i")[i];
                    if(Number(item.style.order)===Number(e.target.style.order) - 1){
                        item.style.order = Number(item.style.order)+1;
                        e.target.style.order = Number(e.target.style.order) - 1;
                        orderArr[e.target.getAttribute("index")]=e.target.style.order;
                        orderArr[item.getAttribute("index")]=item.style.order;
                        break;
                    }
                }

                saveFrontToBack('orderSentenceArr', orderArr);};
            }
        saveFrontToBack('orderSentenceArr', orderArr);

        });

    }

else{
    var orderArr = loadFromFront('orderSentenceArr', true);
    if(typeof orderArr === "string") {orderArr=orderArr.split(",");}
    questionedElements.forEach((item, j) => {
        for (var k = 0; k < item.children[0].children.length; k++) {

            item.children[0].children[k].style.order = orderArr[k];
    }});}

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
