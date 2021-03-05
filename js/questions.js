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