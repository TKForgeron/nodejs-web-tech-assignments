var questionImageId = "question__image";
var questionInputSectionId = "question__input";
var questionOutputSectionId = "question__output";
var questionSubmitId = "question__submitBtn";
var controlsNextId = "controls__next";
var controlsBackId = "controls__back";
var currentQuestionIndex = 0;
// var questionQuestionId = "question__question";

// The goal of this function is to create the initial html elements and put them in order
// Afterwards questions can be appended and removed from those elements when pressing the "next question" or "submit" button
// This would also greatly benefit from not being in a function, allowing variables to be accessed at will, but that would probably end up messing up a whole lot of code
// So if you feel like this is a fine way to approach the problem then by all means take it out of the function
// All that needs to be added are eventhandlers for submit, back and next
// They should manipulate some elements to change the question
// Keep track of which question we're on by keeping an array of all question objects, and just increase or decrease the counter when pressing one of the buttons respectively
function createInitialElements() {
    var main = document.getElementsByTagName("main")[0];

    var comment = document.createComment("This div could not be an article/section because it logically would never contain a <h1>..<h6>, which would cause errors in the W3C validator");

    var container = document.createElement("div");
    container.classList.add("container");

    var controlsImageBack = document.createElement("img");
    controlsImageBack.setAttribute("src","images/back.svg");
    controlsImageBack.setAttribute("alt","Back button");
    controlsImageBack.setAttribute("id",controlsBackId);
    controlsImageBack.classList.add("controls");

    var controlsImageNext = document.createElement("img");
    controlsImageNext.setAttribute("src","images/next.svg");
    controlsImageNext.setAttribute("alt","Next button");
    controlsImageNext.setAttribute("id",controlsNextId);
    controlsImageNext.classList.add("controls");

    var cardQuestion = document.createElement("section");
    cardQuestion.classList.add("card");
    cardQuestion.classList.add("question");

    var questionImage = document.createElement("img");
    questionImage.setAttribute("id", questionImageId);
    questionImage.setAttribute("alt","Image concerning the question is not correctly loaded");
    questionImage.classList.add("card__image");

    var questionOutput = document.createElement("section");
    questionOutput.setAttribute("id", questionOutputSectionId);
    // // MANIPULATE THIS TO CHANGE THE TITLE OF A QUESTION
    // var questionTitle = document.createElement("h2");
    // questionTitle.setAttribute("id", "question__title");
    // // MANIPULATE THIS TO CHANGE THE CONTENTS OF A QUESTION
    // var questionQuestion = document.createElement("p");
    // questionQuestion.setAttribute("id", questionQuestionId);
    // THIS SECTIONS CONTAINS A SUBMIT BUTTON AND A TEXTBOX OR MULTIPLE CHOICE BUTTONS DEPENDING ON THE QUESTION
    // MANIPULATE THIS TO DIFFERENTIATE BETWEEN DIFFERENT QUESTION TYPES
    // INSERT TEXTBOX OR MULTIPLECHOICE BUTTON INFRONT OF SUBMIT BUTTON
    var questionInput = document.createElement("section");
    questionInput.setAttribute("id", questionInputSectionId);
    
    cardQuestion.appendChild(questionImage);
    cardQuestion.appendChild(questionOutput);
    cardQuestion.appendChild(questionInput);

    container.appendChild(controlsImageBack);
    container.appendChild(cardQuestion);
    container.appendChild(controlsImageNext);

    main.appendChild(comment);
    main.appendChild(container);
};

class Question {
    constructor(id, title, image, question, explanation, answer){
        this.id = id;
        this.type = "open";
        this.formName = this.type + this.id;
        this.title = title;
        this.image = image;
        this.question = question;
        this.answer = answer;
        this.explanation = explanation;
        this.userAnswer = "";
    };
    answerFeedback() {
        var notAnsweredYet = "Please give your answer here";
        // check it against this.answer
        if (this.answeredCorrectly()) {
            document.forms[this.formName][this.type].value += " &#10003;"; // put check mark behind user's input
        } else if (!this.userAnswer) {
            document.forms[this.formName][this.type].value = notAnsweredYet; // set text box value to "Please give your answer here"
        } else if (this.userAnswer == notAnsweredYet) {
            alert("Please give an answer.");
        }else {
            document.forms[this.formName][this.type].value += " &#10007;"; // put cross mark behind user's input
        }


        
    }
    answeredCorrectly() {
        // get user's answer & set this.userAnswer
        this.userAnswer = document.forms[this.formName][this.type].value;
        return this.userAnswer.toLowerCase() == this.answer.toLowerCase();
    };
    show(inputSectionId, outputSectionId) {
        // determine image source
        document.getElementById(questionImageId).setAttribute("src", this.image);

        var outputSection = document.getElementById(outputSectionId);

        // create HTML heading containing title
        var title = document.createElement("h2");
        title.setAttribute("id", "question" + this.id);
        var titleText = document.createTextNode(`${this.id}. ${this.title}`);
        title.appendChild(titleText);

        // create HTML paragraph containing question
        var question = document.createElement("p");
        var questionText = document.createTextNode(this.question);
        question.appendChild(questionText);

        // append them to desired HTML node
        outputSection.appendChild(title);
        outputSection.appendChild(question);

        var inputSection = document.getElementById(inputSectionId);

        // create input section (may differ per subclass, e.g. MultipleChoice)
        var formObject = this.generateForm();
        inputSection.appendChild(formObject);
    };
    generateForm() { // loose coupling
        var form = document.createElement("form");
        form.setAttribute("name", this.formName);
        form.addEventListener("submit", function(e){
            e.preventDefault();
        });

        var inputTextBox = document.createElement("input");
        inputTextBox.setAttribute("name", this.type);
        inputTextBox.setAttribute("type", "text");
        inputTextBox.setAttribute("value", this.userAnswer); // to 'remember' user's answer upon coming back from another question

        var questionSubmit = document.createElement("button");
        questionSubmit.setAttribute("id", questionSubmitId);
        questionSubmit.appendChild(document.createTextNode("Submit"));
        questionSubmit.addEventListener("click", () => {
            alert(this.answeredCorrectly());
        });

        form.appendChild(inputTextBox);
        form.appendChild(questionSubmit);
        return form;
    };
};

class MultipleChoice extends Question {
    constructor(id, title, image, question, explanation, answer, otherOptions) {
        super(id, title, image, question, explanation, answer);
        this.type = "closed";
        this.options = otherOptions;
    };
    getAllOptions(){
        return this.options.concat([this.answer]);        
    };
    generateForm(){ // loose coupling
        return this.generateOptionRadios();
    };
    answeredCorrectly() {
        // get radio button options
        var ele = document.getElementsByName(this.formName)[0].elements;

        // get checked radio btn and set this.userAnswer to that value
        for(let i = 0; i < ele.length; i++) {
            if(ele[i].checked){
                this.userAnswer = ele[i].value;
            }
        }
        return this.userAnswer.toLowerCase() == this.answer.toLowerCase();
    };
    generateOptionRadios(){
        var form = document.createElement("form");
        form.setAttribute("name", this.formName);
        form.addEventListener("submit", function(e){
            e.preventDefault();
        });

        var options = this.getAllOptions();
        shuffle(options).forEach((option) => {
            var radioOption = document.createElement("input");
            radioOption.setAttribute("type", "radio");
            radioOption.setAttribute("value", option);
            radioOption.setAttribute("name", this.type);

            var radioLabel = document.createElement("label");
            radioLabel.setAttribute("id", option);
            radioLabel.setAttribute("for", option);
            radioLabel.appendChild(document.createTextNode(option));

            form.appendChild(radioOption);
            form.appendChild(radioLabel);
            form.appendChild(document.createElement("br"));
        });

        var questionSubmit = document.createElement("button");
        questionSubmit.setAttribute("id", questionSubmitId);
        questionSubmit.appendChild(document.createTextNode("Submit"));
        questionSubmit.addEventListener("click", () => {
            alert(this.answeredCorrectly());
        });
        form.appendChild(questionSubmit);

        return form;
    };
};
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
    };

    return array;
};

const q1 = new Question(
    1,
    "Prototypal Inheritance",
    "images/questions/q1.png",
    "In this question, we have a Dog constructor function. Our dog obviously knows the speak command. What gets logged in this example when we ask Pogo to speak?",
    "Every time we create a new Dog instance, we set the speak property of that instance to be a function returning the string woof. Since this is being set every time we create a new Dog instance, the interpreter never has to look farther up the prototype chain to find a speak property. As a result, the speak method on Dog.prototype.speak never gets used.",
    "Woof"
);

const q2 = new MultipleChoice(
    2,
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
    3,
    "Indexing",
    "images/questions/q3.png",
    "Predict the output of this JavaScript code.",
    "The index starts with 0 in JavaScript. Here, x searches for the last occurrence of “G” in the text.",
    "8"
);

const q4 = new MultipleChoice(
    4,
    "Event scheduling",
    "images/questions/q4.png",
    "In what order will the numbers 1-4 be logged to the console when this code is executed?",
    "1 and 4 are displayed first since they are logged by simple calls to console.log() without any delay. 2 is displayed after 3 because 2 is being logged after a delay of 1000 msecs (i.e., 1 second) whereas 3 is being logged after a delay of 0 msecs. Note that, despite 3 having a delay of 0 msecs, its code will only be executed after the current call stack is cleared.",
    "1, 4, 3, 2",
    ["1, 2, 3, 4", "4, 3, 2, 1", "4, 2, 1, 3"]
);

const q5 = new Question(
    5,
    "Functions",
    "images/questions/q5.png",
    "Consider this code. What will be displayed on the console?",
    "First, 5 and 10 will be added up using the function add. Hereafter, the result of that addition will be divided by 2. Last up, the mean of the two numbers, the value that we just calculated, will be shown on the console by console.log().",
    "7.5"
);

const questions = [q1, q2, q3, q4, q5];

createInitialElements();
// var mainBlock = document.getElementsByTagName("main")[0];
// console.log(mainBlock);
// document.getElementsByTagName("main")[0].addEventListener("load", createInitialElements);

questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);


// document.getElementById(questionSubmitId).addEventListener("click", questions.[currentQuestionIndex].answerFeedback());

// We first wipe out all input and output elements and then show the next or previous question.
document.getElementById(controlsBackId).addEventListener("click", () => {
    if(currentQuestionIndex > 0){
        var outputSection = document.getElementById(questionOutputSectionId);
        var inputSection = document.getElementById(questionInputSectionId);
        while(outputSection.lastChild){
            outputSection.removeChild(outputSection.lastChild)
        }
        while(inputSection.lastChild){
            inputSection.removeChild(inputSection.lastChild);
        }
        currentQuestionIndex--;
        questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
    }
});

document.getElementById(controlsNextId).addEventListener("click", () => {
    if(currentQuestionIndex < questions.length-1){
        var outputSection = document.getElementById(questionOutputSectionId);
        var inputSection = document.getElementById(questionInputSectionId);
        while(outputSection.lastChild){
            outputSection.removeChild(outputSection.lastChild)
        }
        while(inputSection.lastChild){
            inputSection.removeChild(inputSection.lastChild);
        }
        currentQuestionIndex++;
        questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
    }
});

/* Opening and closing the explanation section 
var explanation = document.getElementById("explanation__background");
var explanationButton = document.getElementById("explanation__image");
explanationButton.onclick = function() {explanation.style.display = "block";};
window.onclick = function(event) {
    if (event.target == explanation) {
        explanation.style.display = "none";
    };
};
*/