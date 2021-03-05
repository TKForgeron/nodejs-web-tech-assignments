var selectableElements = [
                            [document.getElementsByTagName("header"), "Header"],
                            [document.getElementsByTagName("body"), "Body"],
                            [document.getElementsByTagName("article"),"Article"],
                            [document.getElementsByTagName("section"),"Section"],
                            [document.getElementsByTagName("aside"),"Aside"],
                            [document.getElementsByTagName("footer"),"Footer"]
                        ];

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
function addToDropDown(selectableCollection) {
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
// When we click apply we do the things that are requested
// Currently just disables the element as a placeholder
applyButton.addEventListener("click", function(){
    dropdownBoxObjects[dropdownBox.selectedIndex].style.display = "none";
});

addToDropDown(selectableElements);
header = document.getElementsByTagName("header")[0];
header.appendChild(dropdownBox);
header.appendChild(applyButton);