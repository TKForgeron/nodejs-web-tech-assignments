var controlSectionId = "controls";
var questionImageId = "question__image";
var questionOutputSectionId = "question__output";
var questionInputSectionId = "question__input";
var questionSubmitId = "question__submitBtn";
var questionRetryId = "question__retryBtn"
var controlsNextId = "controls__next";
var controlsBackId = "controls__back";
var currentQuestionIndex = 0;
// This just creates the navbar.
function createNav(){
    var nav = document.getElementsByTagName("nav")[0];
    var navItemClass = "nav__item";
    var navItemAClass = "nav__link";

    var unorderedNavList = document.createElement("ul");
    unorderedNavList.classList.add("nav__bar");
    unorderedNavList.classList.add("list--noBullets");

    var indexItem = document.createElement("li");
    indexItem.classList.add(navItemClass);
    var indexAHref = document.createElement("a");
    indexAHref.classList.add(navItemAClass);
    indexAHref.setAttribute("href","index.html");
    indexAHref.appendChild(document.createTextNode("Home"));
    indexItem.appendChild(indexAHref);

    var historyItem = document.createElement("li");
    historyItem.classList.add(navItemClass);
    var historyAHref = document.createElement("a");
    historyAHref.classList.add(navItemAClass);
    historyAHref.setAttribute("href","history.html");
    historyAHref.appendChild(document.createTextNode("History"));
    historyItem.appendChild(historyAHref);

    var versionsItem = document.createElement("li");
    versionsItem.classList.add(navItemClass);
    var versionsAHref = document.createElement("a");
    versionsAHref.classList.add(navItemAClass);
    versionsAHref.setAttribute("href","versionsFrameworks.html");
    versionsAHref.appendChild(document.createTextNode("Versions & Frameworks"));
    versionsItem.appendChild(versionsAHref);

    var examplesItem = document.createElement("li");
    examplesItem.classList.add(navItemClass);
    var examplesAHref = document.createElement("a");
    examplesAHref.classList.add(navItemAClass);
    examplesAHref.setAttribute("href","examples.html");
    examplesAHref.appendChild(document.createTextNode("Examples"));
    examplesItem.appendChild(examplesAHref);

    var guidesItem = document.createElement("li");
    guidesItem.classList.add(navItemClass);
    var guidesAHref = document.createElement("a");
    guidesAHref.classList.add(navItemAClass);
    guidesAHref.setAttribute("href","guides.html");
    guidesAHref.appendChild(document.createTextNode("Helpful guides"));
    guidesItem.appendChild(guidesAHref);

    var spacerItem = document.createElement("li");
    spacerItem.classList.add(navItemClass + "--spacer");

    var assessmentItem = document.createElement("li");
    assessmentItem.classList.add(navItemClass);
    assessmentItem.classList.add(navItemClass + "--right");
    var assessmentAHref = document.createElement("a");
    assessmentAHref.classList.add(navItemAClass + "--active");
    assessmentAHref.setAttribute("href","assessment.html");
    assessmentAHref.appendChild(document.createTextNode("Assessment"));
    assessmentItem.appendChild(assessmentAHref);

    unorderedNavList.appendChild(indexItem);
    unorderedNavList.appendChild(historyItem);
    unorderedNavList.appendChild(versionsItem);
    unorderedNavList.appendChild(examplesItem);
    unorderedNavList.appendChild(guidesItem);
    unorderedNavList.appendChild(spacerItem);
    unorderedNavList.appendChild(assessmentItem);
    nav.appendChild(unorderedNavList);
}
// This just creates the footer
function createFooter(){
    var footer = document.getElementsByTagName("footer")[0];

    var footerP = document.createElement("p");
    footerP.appendChild(document.createTextNode("Made by Douwe, Tim and Maarten."));

    var footerImg = document.createElement("img");
    footerImg.classList.add("footer__image");
    footerImg.setAttribute("src","images/uulogotext.png");
    footerImg.setAttribute("alt", "UU Logo with Text reading Universiteit Utrecht")

    footer.appendChild(footerP);
    footer.appendChild(footerImg);
}
// We create an intial framework of html elements which we will manipulate to add or remove questions and check user answers
function createInitialElements() {
    var main = document.getElementsByTagName("main")[0];

    var comment = document.createComment("This div could not be an article/section because it logically would never contain a <h1>..<h6>, which would cause errors in the W3C validator");

    var container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("container--questionBlock");

    var cardQuestion = document.createElement("section");
    cardQuestion.classList.add("card");
    cardQuestion.classList.add("card--noWidthMagicForQuestion");
    cardQuestion.classList.add("question");

    var questionImage = document.createElement("img");
    questionImage.setAttribute("id", questionImageId);
    questionImage.classList.add("question__image");

    var questionOutput = document.createElement("section");
    questionOutput.setAttribute("id", questionOutputSectionId);

    var questionInput = document.createElement("section");
    questionInput.setAttribute("id", questionInputSectionId);

    var controlsBack = document.createElement("button");
    controlsBack.setAttribute("id",controlsBackId);
    controlsBack.appendChild(document.createTextNode("\u003C"));

    var controlsNext = document.createElement("button");
    controlsNext.setAttribute("id",controlsNextId);
    controlsNext.appendChild(document.createTextNode('\u003E'))

    cardQuestion.appendChild(questionImage);
    cardQuestion.appendChild(questionOutput);
    cardQuestion.appendChild(questionInput);

    var controlSection = document.createElement("section");
    controlSection.setAttribute("id", controlSectionId);
    controlSection.appendChild(controlsBack);
    controlSection.appendChild(controlsNext);

    container.appendChild(cardQuestion);
    container.appendChild(controlSection);

    main.appendChild(comment);
    main.appendChild(container);
};

class Question {
    constructor(id, title, image, question, explanation, answer, reference){
        this.id = id;
        this.type = "open";
        this.formName = this.type + this.id;
        this.title = title;
        this.image = image;
        this.question = question;
        this.answer = answer;
        this.explanation = explanation;
        this.userAnswer = "";
        this.showingFeedback = false;
        this.reference = [];
        this.reference.separator = ". ";
        this.reference = reference.split(this.reference.separator).concat(this.reference.separator); // array of author, title, date, etc.
        console.log(this.reference);
        this.reference.author = this.reference[0];
        this.reference.date = this.reference[1];
        this.reference.title = this.reference[2];
        this.reference.link = this.reference[3];
        this.reference.separator = this.reference[4]; // could come in handy later
    };
    answerFeedback() {
        var formSection = document.forms[this.formName];
        var feedbackMark = document.createElement("p");
        // first check whether feedback was already given (by previous run of this function)
        // first check whether user had answered
        if (formSection[this.type].value){
            // then check whether it is correct
            if (this.answeredCorrectly()) {
                // put check mark behind user's input
                feedbackMark.setAttribute("style","color:green;font-size:2em");
                feedbackMark.appendChild(document.createTextNode('\u2713'));
                formSection.appendChild(feedbackMark);
                this.showingFeedback = true;
            } else {
                // put cross mark behind user's input
                feedbackMark.setAttribute("style","color:red;font-size:2em");
                feedbackMark.appendChild(document.createTextNode(`\u2717`));
                formSection.appendChild(feedbackMark);
                this.showingFeedback = true;
            }
            // output explanation
            var explanationText = this.generateExplanation();

            var outputSection = document.getElementById(questionOutputSectionId);
            // outputSection.appendChild(explanationText);
            outputSection.insertBefore(explanationText, outputSection.childNodes[outputSection.childNodes.length - 1]);

        } else {
            alert("Please give an answer");
            this.showingFeedback = false;
        }
    };
    generateExplanation() {
        var correctAnswer = document.createElement("strong");
        correctAnswer.appendChild(document.createTextNode(this.answer));

        var explanationText = document.createElement("p");
        explanationText.setAttribute("id", "question__explanation");

        explanationText.appendChild(correctAnswer);
        explanationText.appendChild(document.createTextNode(". " + this.explanation));

        return explanationText;
    }
    answeredCorrectly() {
        // get user's answer & set this.userAnswer
        this.userAnswer = document.forms[this.formName][this.type].value;
        return this.userAnswer.toLowerCase() == this.answer.toLowerCase();
    };
    show(inputSectionId, outputSectionId) {
        // determine image source
        var questionImage = document.getElementById(questionImageId);
        questionImage.setAttribute("alt",`Image of question ${this.id}: ${this.title}`);
        questionImage.setAttribute("src", this.image);

        // create HTML heading node containing title
        var title = this.generateTitle();

        // create HTML paragraph node containing question
        var question = this.generateQuestion();

        // create HTML details node containing reference
        var detailsElement = this.generateReference();

        // append them to desired HTML node
        var outputSection = document.getElementById(outputSectionId);
        outputSection.appendChild(title);
        outputSection.appendChild(question);
        outputSection.appendChild(detailsElement);

        // create input section (may differ per subclass, e.g. MultipleChoice)
        var formObject = this.generateForm();

        var inputSection = document.getElementById(inputSectionId);
        inputSection.appendChild(formObject);
    };
    generateQuestion() {
        var question = document.createElement("p");
        var questionText = document.createTextNode(this.question);
        question.appendChild(questionText);

        return question;
    }
    generateTitle() {
        var title = document.createElement("h2");
        title.setAttribute("id", "question" + this.id);
        title.appendChild(document.createTextNode(`${this.id}. ${this.title}`));

        return title;
    }
    generateReference() {
        // create reference element, just like in the other pages, its contained in a details node
        var detailsElement = document.createElement("details");
        detailsElement.classList.add("references");
        detailsElement.setAttribute("id", this.reference.slice(0, this.reference.length - 1).join(this.reference.separator)); // set whole reference (cleaned) as id

        var summaryElement = document.createElement("summary");
        var strongElement = document.createElement("strong");
        strongElement.appendChild(document.createTextNode("Reference"));
        summaryElement.appendChild(strongElement);

        var referenceParagraph = document.createElement("p");
        referenceParagraph.classList.add("reference__item");

        var referenceTitle = document.createElement("em");
        referenceTitle.appendChild(document.createTextNode(this.reference.title + ". "));

        var referenceLink = document.createElement("a");
        referenceLink.classList.add("reference__link");
        referenceLink.setAttribute("href", this.reference.link);
        referenceLink.setAttribute("target", "_blank");
        referenceLink.setAttribute("title", "Go to reference");
        referenceLink.appendChild(document.createTextNode(this.reference.link));

        referenceParagraph.appendChild(document.createTextNode(this.reference.author + ". "));
        referenceParagraph.appendChild(document.createTextNode(this.reference.date + ". "));
        referenceParagraph.appendChild(referenceTitle);
        referenceParagraph.appendChild(referenceLink);

        detailsElement.appendChild(summaryElement);
        detailsElement.appendChild(referenceParagraph);

        return detailsElement;
    }
    generateForm() { // loose coupling
        var form = document.createElement("form");
        form.setAttribute("name", this.formName);
        form.addEventListener("submit", (e) => e.preventDefault());

        var inputTextBox = document.createElement("input");
        inputTextBox.setAttribute("name", this.type);
        inputTextBox.setAttribute("type", "text");
        inputTextBox.setAttribute("value", this.userAnswer); // to 'remember' user's answer upon coming back from another question

        var questionSubmit = document.createElement("button");
        questionSubmit.setAttribute("id", questionSubmitId);
        questionSubmit.appendChild(document.createTextNode("Submit"));       
        questionSubmit.addEventListener("click",() => {
            if(this.showingFeedback == false){
            this.showingFeedback = true;
            this.answerFeedback();
            
            }
        });

        var questionRetry = document.createElement("button");
        questionRetry.setAttribute("id", questionRetryId);
        questionRetry.appendChild(document.createTextNode("Retry")); 
        questionRetry.addEventListener("click", () => {
            clearQuestionElements();            
            questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
        });

        form.appendChild(inputTextBox);
        form.appendChild(questionSubmit);
        form.appendChild(questionRetry);

        return form;
    };
};

class MultipleChoice extends Question {
    constructor(id, title, image, question, explanation, answer, otherOptions, reference) {
        super(id, title, image, question, explanation, answer, reference);
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
        form.addEventListener("submit", (e) => e.preventDefault());

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
        questionSubmit.addEventListener("click",() => {
            if(this.showingFeedback == false){
            this.answerFeedback();
            this.showingFeedback = true;
            }
        });

        var questionRetry = document.createElement("button");
        questionRetry.setAttribute("id", questionRetryId);
        questionRetry.appendChild(document.createTextNode("Retry")); 
        questionRetry.addEventListener("click", () => {
            clearQuestionElements();
            questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
        });

        form.appendChild(questionSubmit);
        form.appendChild(questionRetry);
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
// Clears all non-framework elements that will be replaced by the next question
// We remove everything to make sure no artifacts from the previous question are left over
function clearQuestionElements(){
    var outputSection = document.getElementById(questionOutputSectionId);
    var inputSection = document.getElementById(questionInputSectionId);
    var inputSection = document.getElementById(questionInputSectionId);
    inputSection.style.boxShadow = "initial";
    while(outputSection.lastChild){
        outputSection.removeChild(outputSection.lastChild)
    }
    while(inputSection.lastChild){
        inputSection.removeChild(inputSection.lastChild);
    }
    questions[currentQuestionIndex].showingFeedback = false;
}

const q1 = new Question(
    1,
    "Prototypal Inheritance",
    "images/questions/q1.png",
    "In this question, we have a Dog constructor function. Our dog obviously knows the speak command. What gets logged in this example when we ask Pogo to speak?",
    "Every time we create a new Dog instance, we set the speak property of that instance to be a function returning the string woof. Since this is being set every time we create a new Dog instance, the interpreter never has to look farther up the prototype chain to find a speak property. As a result, the speak method on Dog.prototype.speak never gets used.",
    "Woof",
    "Scialli, N. (2020, May 27). 10 JavaScript Quiz Questions and Answers to Sharpen Your Skills. https://typeofnan.dev/10-javascript-quiz-questions-and-answers/"
);

const q2 = new MultipleChoice(
    2,
    "Changing HTML content",
    "images/questions/q2.png",
    "Which is the correct JavaScript syntax to change the first paragraph in the HTML content given?",
    "This is the correct syntax to change the HTML context in the image. Please take a detailed look at it!",
    "document.getElementById(“test”).innerHTML = “Hello DataFlair!”;",
    ["document.getElementById(test).innerHTML = “Hello DataFlair!”;"
                ,"document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;"
                ,"document.getElementByTagName(“p”)[1].innerHTML = “Hello DataFlair!”;"
                ],
    "DataFlair. (n.d.). Top JavaScript Quiz Questions – Learn, Explore, Play, Repeat! https://data-flair.training/blogs/javascript-quiz/"
);

const q3 = new Question(
    3,
    "Indexing",
    "images/questions/q3.png",
    "Predict the output of this JavaScript code.",
    "The index starts with 0 in JavaScript. Here, x searches for the last occurrence of “G” in the text.",
    "8",
    "GeeksforGeeks. (2020, June 2). JavaScript Quiz | Set-1. https://www.geeksforgeeks.org/javascript-quiz-set-1/"
);

const q4 = new MultipleChoice(
    4,
    "Event scheduling",
    "images/questions/q4.png",
    "In what order will the numbers 1-4 be logged to the console when this code is executed?",
    "1 and 4 are displayed first since they are logged by simple calls to console.log() without any delay. 2 is displayed after 3 because 2 is being logged after a delay of 1000 msecs (i.e., 1 second) whereas 3 is being logged after a delay of 0 msecs. Note that, despite 3 having a delay of 0 msecs, its code will only be executed after the current call stack is cleared.",
    "1, 4, 3, 2",
    ["1, 2, 3, 4", "4, 3, 2, 1", "4, 2, 1, 3"],
    "TypeOfNaN. (n.d.). Event Scheduling. https://quiz.typeofnan.dev/event-scheduling/"
);

const q5 = new Question(
    5,
    "Functions",
    "images/questions/q5.png",
    "Consider this code. What will be displayed on the console?",
    "First, 5 and 10 will be added up using the function add. Hereafter, the result of that addition will be divided by 2. Last up, the mean of the two numbers, the value that we just calculated, will be shown on the console by console.log().",
    "7.5",
    "Quizitor. (2021, May, 3). In-class, question 7"
);

const questions = [q1, q2, q3, q4, q5];
createNav();
createInitialElements();
createFooter();

questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);

// We first wipe out all input and output elements and then show the next or previous question.
document.getElementById(controlsBackId).addEventListener("click", () => {
    if(currentQuestionIndex > 0){
        clearQuestionElements();
        currentQuestionIndex--;
        questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
    }
});

document.getElementById(controlsNextId).addEventListener("click", () => {
    if(currentQuestionIndex < questions.length - 1){
        clearQuestionElements();
        currentQuestionIndex++;
        questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
    }
});

// Causes a very nice dropshadow effect on the inputsection,
// pressing retry or next will remove it because of event propagation. If this were to use the bubbling phase
// it would still be applied after pressing the retry button and thus the retry button would not remove the effect
document.getElementById(questionInputSectionId).addEventListener("click", () => {    
    var inputSection = document.getElementById(questionInputSectionId);
    inputSection.style.boxShadow = "10px 10px 10px 10px grey";
}, true);