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

let openQuestion = new Question(
    1,
    "Open Question",
    "images/serverSide.svg",
    "What is an open question?",
    "Explanation",
    "CORRECT",
);

let mpQuestion = new MultipleChoice(
    1,
    "Multiple Choice Question",
    "images/clientSide.svg",
    "Which is a multiple choice question?",
    "Explanation",
    "true",
    ["", "false","0"]
);

// It still has to be determined which questions are going to be open and which questions are going to be multiple choice (I think 1,3,5 mp, the rest open)
let q1 = new Question(
    id= "q1",
    title= "Prototypal Inheritance",
    image="images/questions/q1.png",
    question= "In this question, we have a Dog constructor function. Our dog obviously knows the speak command. What gets logged in the following example when we ask Pogo to speak?",
    explanation= "",
    answer= "Woof"
);

let q2 = new Question(
    id= "q2",
    title= "Changing HTML content",
    image="images/questions/'q2.jpg",
    question= "Which is the correct JavaScript syntax to change the HTML content given below?",
    explanation= "Every time we create a new Dog instance, we set the speak property of that instance to be a function returning the string woof. Since this is being set every time we create a new Dog instance, the interpreter never has to look farther up the prototype chain to find a speak property. As a result, the speak method on Dog.prototype.speak never gets used.",
    answer= "document.getElementById(“test”).innerHTML = “Hello DataFlair!”;"
);

let q3 = new Question(
    id= "q3",
    title= "Indexing",
    image="images/questions/q3.png",
    question= "Predict the output of the following JavaScript code.",
    explanation= "The index starts with 0 in JavaScript. Here, x searches for the last occurrence of “G” in the text.",
    answer= "8"
);

let q4 = new Question(
    id= "q4",
    title= "Event scheduling",
    image="images/questions/q4.png",
    question= "In what order will the numbers 1-4 be logged to the console when the code below is executed?",
    explanation= "1 and 4 are displayed first since they are logged by simple calls to console.log() without any delay. 2 is displayed after 3 because 2 is being logged after a delay of 1000 msecs (i.e., 1 second) whereas 3 is being logged after a delay of 0 msecs. Note that, despite 3 having a delay of 0 msecs, its code will only be executed after the current call stack is cleared.",
    answer= "1, 4, 3, 2"
);

let q5 = new Question(
    id= "q5",
    title= "Functions",
    image="images/questions/q5.png",
    question= "Consider the following code. What will be displayed on the console?",
    explanation= "",
    answer= "7.5"
);