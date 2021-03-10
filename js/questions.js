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
        createInputElement("text", "openQuestion","",sectionToGenerateIn)
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

const q1 = new Question(
    "0",
    "Prototypal Inheritance",
    "images/questions/q1.png",
    "In this question, we have a Dog constructor function. Our dog obviously knows the speak command. What gets logged in the following example when we ask Pogo to speak?",
    "Every time we create a new Dog instance, we set the speak property of that instance to be a function returning the string woof. Since this is being set every time we create a new Dog instance, the interpreter never has to look farther up the prototype chain to find a speak property. As a result, the speak method on Dog.prototype.speak never gets used.",
    "Woof"
);

const q2 = new MultipleChoice(
    "1",
    "Changing HTML content",
    "images/questions/'q2.jpg",
    "Which is the correct JavaScript syntax to change the HTML content given below?",
    "This is the correct syntax to change the HTML context in the image. Please take a detailed look at it!",
    "document.getElementById(“test”).innerHTML = “Hello DataFlair!”;",
    ["document.getElementById(test).innerHTML = “Hello DataFlair!”;", "document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;", "document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;"]
);

const q3 = new Question(
    "2",
    "Indexing",
    "images/questions/q3.png",
    "Predict the output of the following JavaScript code.",
    "The index starts with 0 in JavaScript. Here, x searches for the last occurrence of “G” in the text.",
    "8"
);

const q4 = new MultipleChoice(
    "3",
    "Event scheduling",
    "images/questions/q4.png",
    "In what order will the numbers 1-4 be logged to the console when the code below is executed?",
    "1 and 4 are displayed first since they are logged by simple calls to console.log() without any delay. 2 is displayed after 3 because 2 is being logged after a delay of 1000 msecs (i.e., 1 second) whereas 3 is being logged after a delay of 0 msecs. Note that, despite 3 having a delay of 0 msecs, its code will only be executed after the current call stack is cleared.",
    "1, 4, 3, 2",
    ["1, 2, 3, 4", "4, 3, 2, 1", "4, 2, 1, 3"]
);

const q5 = new Question(
    "4",
    "Functions",
    "images/questions/q5.png",
    "Consider the following code. What will be displayed on the console?",
    "First, 5 and 10 will be added up using the function add. Hereafter, the result of that addition will be divided by 2. Last up, the mean of the two numbers, the value that we just calculated, will be shown on the console by console.log().",
    "7.5"
);

const questions = [q1,q2,q3,q4,q5];

/* Opening and closing the explanation section */
var explanation = document.getElementById("explanation__background");
var explanationButton = document.getElementById("explanation__image");
explanationButton.onclick = function() {explanation.style.display = "block";}
window.onclick = function(event) {
    if (event.target == explanation) {
        explanation.style.display = "none";
    }
}