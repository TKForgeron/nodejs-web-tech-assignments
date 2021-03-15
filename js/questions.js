class Question {
    constructor(id, title, image, question, explanation, answer){
        this.id = id;
        this.title = title;
        this.image = image;
        this.question = question;
        this.answer = answer;
        this.explanation = explanation;
        this.userAnswer = "";
    }
    checkAnswer() {
        /*
        maak voor elke input een id aan
        use iteration through getElementById to check which one is checked
        set this.userAnswer to that one
         */
        // var input = document.getElementById("answerField").value;
        var input = this.userAnswer;
        var isCorrect = input.toLowerCase() == this.answer.toLowerCase();
        console.log(isCorrect);
        return isCorrect;
    }
    show(titleId, imageId, questionId, sectionToShowIn) {
        document.getElementById(titleId).innerHTML = this.title;
        document.getElementById(imageId).src = this.image;
        document.getElementById(questionId).innerHTML = this.question;
        this.generateInputPossibility(sectionToShowIn);
    }
    generateInputPossibility(sectionToGenerateIn) {
        createInputElement("text", "openQuestion","",sectionToGenerateIn);
    }
}

class MultipleChoice extends Question {
    constructor(id, title, image, question, explanation, answer, otherOptions) {
        super(id, title, image, question, explanation, answer);
        this.options = otherOptions;
    }
    getAllOptions(){
        this.options.push(this.answer);
        return this.options;
    }
    show(titleId, imageId, questionId, sectionToShowIn) {
        document.getElementById(titleId).innerHTML = this.title;
        document.getElementById(imageId).src = this.image;
        document.getElementById(questionId).innerHTML = this.question;
        this.generateInputPossibility(sectionToShowIn);
    }
    generateInputPossibility(sectionToGenerateIn){
        this.generateOptionRadios(sectionToGenerateIn);
    }
    generateOptionRadios(sectionToGenerateIn){
        var options = this.getAllOptions();
        shuffle(options).forEach(helper);
        function helper(option) {
            createInputElement("radio", "multipleChoice",option, sectionToGenerateIn);
        }
    }
}
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {    // While there remain elements to shuffle
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// https://stackoverflow.com/questions/118693/how-do-you-dynamically-create-a-radio-button-in-javascript-that-works-in-all-bro
function createInputElement(type, name, value, nodeIdToCreateIn) {
    type = type.toLowerCase();
    var inputHtml = '<input type="' + type + '" name="' + name + '"';

    if (type == "radio") {
        inputHtml += ' value="' + value + '"';
    }

    inputHtml += '/>';
    inputHtml += ' '+ value +'';

    var radioObject = stringToHTML(inputHtml);
    document.getElementById(nodeIdToCreateIn).appendChild(radioObject);
}
// https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/
function stringToHTML(str) {
    var support = (function () {
        if (!window.DOMParser) return false;
        var parser = new DOMParser();
        try {
            parser.parseFromString('x', 'text/html');
        } catch(err) {
            return false;
        }
        return true;
    })();

    // If DOMParser is supported, use it
    if (support) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    }
    // Otherwise, fallback to old-school method
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
}
// The goal of this function is to create the initial html elements and put them in order
// Afterwards questions can be appended and removed from those elements when pressing the "next question" or "submit" button
// This would also greatly benefit from not being in a function, allowing variables to be accessed at will, but that would probably end up messing up a whole lot of code
// So if you feel like this is a fine way to approach the problem then by all means take it out of the function
// All that needs to be added are eventhandlers for submit, back and next
// They should manipulate some elements to change the question
// Keep track of which question we're on by keeping an array of all question objects, and just increase or decrease the counter when pressing one of the buttons respectively
function createInitialElements() {
    var main = document.getElementsByTagName("main")[0];
    var container = document.createElement("div");
    container.classList.add("container");

    var controlsImageBack = document.createElement("img");
    controlsImageBack.setAttribute("src","images/back.svg");
    controlsImageBack.setAttribute("alt","Back button");
    controlsImageBack.setAttribute("id","controls__back");
    controlsImageBack.classList.add("controls");

    var controlsImageNext = document.createElement("img");
    controlsImageNext.setAttribute("src","images/next.svg");
    controlsImageNext.setAttribute("alt","Next button");
    controlsImageNext.setAttribute("id","controls__next");
    controlsImageNext.classList.add("controls");

    var cardQuestion = document.createElement("section");
    cardQuestion.classList.add("card__question");

    var questionOutput = document.createElement("section");
    questionOutput.setAttribute("id","question__output");
    // MANIPULATE THIS TO CHANGE THE TITLE OF A QUESTION
    var questionTitle = document.createElement("h2");
    questionTitle.classList.add("question__title");
    // MANIPULATE THIS TO CHANGE THE CONTENTS OF A QUESTION
    var questionQuestion = document.createElement("p");
    questionQuestion.classList.add("question__question");
    // THIS SECTIONS CONTAINS A SUBMIT BUTTON AND A TEXTBOX OR MULTIPLE CHOICE BUTTONS DEPENDING ON THE QUESTION
    // MANIPULATE THIS TO DIFFERENTIATE BETWEEN DIFFERENT QUESTION TYPES
    // INSERT TEXTBOX OR MULTIPLECHOICE BUTTON INFRONT OF SUBMIT BUTTON
    var questionInput = document.createElement("section");
    questionInput.setAttribute("id", "question__input");

    var questionSubmit = document.createElement("submit");
    questionSubmit.classList.add("question__submit");
    questionSubmit.appendChild(document.createTextNode("Submit"));

    questionInput.appendChild(questionSubmit);

    questionOutput.appendChild(questionTitle);
    questionOutput.appendChild(questionQuestion);

    cardQuestion.appendChild(questionOutput);
    cardQuestion.appendChild(questionInput);

    container.appendChild(controlsImageBack);
    container.appendChild(cardQuestion);
    container.appendChild(controlsImageNext);

    main.appendChild(container);
}

const q1 = new Question(
    0,
    "Prototypal Inheritance",
    "images/questions/q1.png",
    "In this question, we have a Dog constructor function. Our dog obviously knows the speak command. What gets logged in the following example when we ask Pogo to speak?",
    "Every time we create a new Dog instance, we set the speak property of that instance to be a function returning the string woof. Since this is being set every time we create a new Dog instance, the interpreter never has to look farther up the prototype chain to find a speak property. As a result, the speak method on Dog.prototype.speak never gets used.",
    "Woof"
);

const q2 = new MultipleChoice(
    1,
    "Changing HTML content",
    "images/questions/q2.jpg",
    "Which is the correct JavaScript syntax to change the HTML content given below?",
    "This is the correct syntax to change the HTML context in the image. Please take a detailed look at it!",
    "document.getElementById(“test”).innerHTML = “Hello DataFlair!”;",
    ["document.getElementById(test).innerHTML = “Hello DataFlair!”;"
                ,"document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;"
                ,"document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;"
                ]
);

const q3 = new Question(
    2,
    "Indexing",
    "images/questions/q3.png",
    "Predict the output of the following JavaScript code.",
    "The index starts with 0 in JavaScript. Here, x searches for the last occurrence of “G” in the text.",
    "8"
);

const q4 = new MultipleChoice(
    3,
    "Event scheduling",
    "images/questions/q4.png",
    "In what order will the numbers 1-4 be logged to the console when the code below is executed?",
    "1 and 4 are displayed first since they are logged by simple calls to console.log() without any delay. 2 is displayed after 3 because 2 is being logged after a delay of 1000 msecs (i.e., 1 second) whereas 3 is being logged after a delay of 0 msecs. Note that, despite 3 having a delay of 0 msecs, its code will only be executed after the current call stack is cleared.",
    "1, 4, 3, 2",
    ["1, 2, 3, 4", "4, 3, 2, 1", "4, 2, 1, 3"]
);

const q5 = new Question(
    4,
    "Functions",
    "images/questions/q5.png",
    "Consider the following code. What will be displayed on the console?",
    "First, 5 and 10 will be added up using the function add. Hereafter, the result of that addition will be divided by 2. Last up, the mean of the two numbers, the value that we just calculated, will be shown on the console by console.log().",
    "7.5"
);

const questions = [q1, q2, q3, q4, q5];

createInitialElements();

/* Opening and closing the explanation section */
var explanation = document.getElementById("explanation__background");
var explanationButton = document.getElementById("explanation__image");
explanationButton.onclick = function() {explanation.style.display = "block";};
window.onclick = function(event) {
    if (event.target == explanation) {
        explanation.style.display = "none";
    };
};