var selectableElements = [
                            [document.getElementById("header"), "Header"],
                            [document.getElementById("body"), "Body"],
                            [document.getElementById("article"),"Article"],
                            [document.getElementById("section"),"Section"],
                            [document.getElementById("aside"),"Aside"],
                            [document.getElementById("footer"),"Footer"]
                        ];

var dropdownBox = document.createElement("select");
dropdownBox.classList.add("header__menu");                    

var backgroundColorBox = document.createElement("select");
backgroundColorBox.classList.add("header__menu");

var fontSizeBox = document.createElement("select");
fontSizeBox.classList.add("header__menu");

var applyButton = document.createElement("button");
applyButton.classList.add("header__button");

// Call this with selectableElements to add all the html elements to the select drop down menu
function addToDropDown(selectableCollection) {
    for (let i = 0; i < selectableCollection.length; i++) {
        // Get the tag plus associated element from the original array
        var collection = selectableCollection[i][0]
        var tag = selectableCollection[i][1]
        // Loop over each element and create an option for it, then append it to the selection box
        for(let j = 0; j < collection.length; j++){
            // The value of each option is set to the corresponding html element, the text is set to whichever element plus a number starting from 1
            var option = document.createElement("option");
            option.setAttribute("value",colletion[j]);
            option.text = tag + " " + (j + 1).toString();   
            dropdownBox.appendChild(option);
        }
    }
}