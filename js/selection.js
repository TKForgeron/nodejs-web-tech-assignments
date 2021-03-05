var selectableElements = [
                            [document.getElementsByTagName("header"), "Header"],
                            [document.getElementsByTagName("body"), "Body"],
                            [document.getElementsByTagName("article"),"Article"],
                            [document.getElementsByTagName("section"),"Section"],
                            [document.getElementsByTagName("aside"),"Aside"],
                            [document.getElementsByTagName("footer"),"Footer"]
                        ];

var selectableColors = ["red","green","blue","yellow","white","black"];

var selectableFontSizes = ["8","10","12","14"];

var dropdownBox = document.createElement("select");
dropdownBox.classList.add("header__menu");                    

var dropdownBoxObjects = [];

var backgroundColorBox = document.createElement("select");
backgroundColorBox.classList.add("header__menu");

var fontSizeBox = document.createElement("select");
fontSizeBox.classList.add("header__menu");

var applyButton = document.createElement("button");
applyButton.classList.add("header__button");
applyButton.appendChild(document.createTextNode("Apply"));

// Call this with selectableElements to add all the html elements to the select drop down menu
// This is the advanced version because it actually takes html elements as well rather than just tags, so we need to change the functionality so much (compared to addToBasicDropDown()) that we might as well make it a different function.
function addToAdvancedDropDown(selectableCollection) {
    for (let i = 0; i < selectableCollection.length; i++) {
        // Get the tag plus associated element from the original array
        var collection = selectableCollection[i][0];
        var tag = selectableCollection[i][1];
        
        // Loop over each element and create an option for it, then append it to the selection box.
        // Apparently you cannot retreive the value from a selectbox? So we have to push the value onto an empty array to ensure we have the same index and then use this array to manipulate the css.
        for(let j = 0; j < collection.length; j++){
            // The value of each option is set to the corresponding html element, the text is set to whichever element plus a number starting from 1
            var option = document.createElement("option");
            //option.setAttribute("value",colletion[j]);
            option.text = tag + " " + (j + 1).toString();   
            dropdownBox.add(option);
            dropdownBoxObjects.push(collection[j]);
        }
    }
}
// Takes a list of strings (tags) and a html select elements and adds the given tags as options
function addToBasicDropDown(selectableCollection, selectBox){
    for (let i = 0; i < selectableCollection.length; i++) {
        // Get the tag we want
        var tag = selectableCollection[i]
        var option = document.createElement("option");
        option.text = tag;   
        selectBox.add(option);        
    }
}
// When we click apply we do the things that are requested
// We add px to the end for the fontsize settings, rather than doing it in the original list because this is more flexible.
applyButton.addEventListener("click", function(){
    dropdownBoxObjects[dropdownBox.selectedIndex].style.backgroundColor = selectableColors[backgroundColorBox.selectedIndex];
    dropdownBoxObjects[dropdownBox.selectedIndex].style.fontSize = selectableFontSizes[fontSizeBox.selectedIndex] + "px";
});

addToAdvancedDropDown(selectableElements);
addToBasicDropDown(selectableColors,backgroundColorBox);
addToBasicDropDown(selectableFontSizes,fontSizeBox);
header = document.getElementsByTagName("header")[0];
header.appendChild(dropdownBox);
header.appendChild(backgroundColorBox);
header.appendChild(fontSizeBox);
header.appendChild(applyButton);