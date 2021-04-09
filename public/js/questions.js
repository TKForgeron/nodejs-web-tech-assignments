// GLOBALS
var controlSectionId = 'controls';
var questionImageId = 'question__image';
var questionOutputSectionId = 'question__output';
var questionInputSectionId = 'question__input';
var questionSubmitId = 'question__submitBtn';
var questionRetryId = 'question__retryBtn';
var controlsNextId = 'controls__next';
var controlsBackId = 'controls__back';
var currentQuestionIndex = 0;
var questions = [];


// We create an intial framework of html elements which we will manipulate to add or remove questions and check user answers
function createInitialElements() {
  var main = document.getElementsByTagName('main')[0];

  var comment = document.createComment(
    'This div could not be an article/section because it logically would never contain a <h1>..<h6>, which would cause errors in the W3C validator'
  );

  var container = document.createElement('div');
  container.classList.add('container');
  container.classList.add('container--questionBlock');

  var cardQuestion = document.createElement('section');
  cardQuestion.classList.add('card');
  cardQuestion.classList.add('card--noWidthMagicForQuestion');
  cardQuestion.classList.add('question');

  var questionImage = document.createElement('img');
  questionImage.setAttribute('id', questionImageId);
  questionImage.classList.add('question__image');

  var questionOutput = document.createElement('section');
  questionOutput.setAttribute('id', questionOutputSectionId);

  var questionInput = document.createElement('section');
  questionInput.setAttribute('id', questionInputSectionId);

  var controlsBack = document.createElement('button');
  controlsBack.setAttribute('id', controlsBackId);
  controlsBack.appendChild(document.createTextNode('\u003C'));

  var controlsNext = document.createElement('button');
  controlsNext.setAttribute('id', controlsNextId);
  controlsNext.appendChild(document.createTextNode('\u003E'));

  cardQuestion.appendChild(questionImage);
  cardQuestion.appendChild(questionOutput);
  cardQuestion.appendChild(questionInput);

  var controlSection = document.createElement('section');
  controlSection.setAttribute('id', controlSectionId);
  controlSection.appendChild(controlsBack);
  controlSection.appendChild(controlsNext);

  container.appendChild(cardQuestion);
  container.appendChild(controlSection);

  main.appendChild(comment);
  main.appendChild(container);
}

class Question {
  constructor(
    id,
    title,
    image,
    question,
    explanation,
    answer,
    reference,
    quizId,
    topicId
  ) {
    this.id = id;
    this.type = 'open';
    this.formName = this.type + this.id;
    this.title = title;
    this.image = image;
    this.question = question;
    this.answer = answer;
    this.explanation = explanation;
    this.userAnswer = '';
    this.showingFeedback = false;
    // reference is made an object so styling (and other use) can be done per part of the reference
    this.reference = [];
    this.reference.separator = '. ';
    this.reference = reference
      .split(this.reference.separator)
      .concat(this.reference.separator);
    this.reference.author = this.reference[0];
    this.reference.date = this.reference[1];
    this.reference.title = this.reference[2];
    this.reference.link = this.reference[3];
    this.reference.separator = this.reference[4]; // could come in handy later
    this.quizId = quizId;
    this.topicId = topicId;
  }
  checkAnswer() {
    console.log("checking answer with useranswer ");
    const xmlHttp = new XMLHttpRequest();
    this.userAnswer = this.answeredCorrectly();
    
    const sendObj = JSON.stringify({
                answer: this.userAnswer,
                questionId: this.id,
                quizId: this.quizId,
                topicId: this.topicId
              });
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let feedback = xmlHttp.responseText;
        console.log(feedback);
        this.answerFeedback(feedback);
      } else{
        if (window.confirm('You have to log in before attempting a quiz! Click \'OK\' to redirect to the login page'))
        {
          window.location.href='login';
        };
      }
    };
    // Disgusting path cause post doesn't work so we need these parameters. topicId is not included in answerChecker.js post handling so we had to add it at the end as well.
    let path = `/topics/${this.topicId}/quizzes/${this.quizId}/questions/${this.id}`;    
    xmlHttp.open('post', path);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(sendObj);
    return false; // To prevent te default behavior of the button
  }
  answerFeedback(feedback) {
    var formSection = document.forms[this.formName];
    var feedbackMark = document.createElement('p');

    // first check whether feedback was already given (by previous run of this function)
    // first check whether user had answered
    
    if (formSection[this.type].value) {
      console.log("giving feedback soon");
      // then check whether it is correct
      if (feedback == "true" || feedback == true) {
        console.log("feedback true");
        // put check mark behind user's input
        feedbackMark.setAttribute('style', 'color:green;font-size:2em');
        feedbackMark.appendChild(document.createTextNode('\u2713'));
        formSection.appendChild(feedbackMark);
        this.showingFeedback = true;
      } else if (feedback == "false" || feedback == false) {
        console.log("feedback false");
        // put cross mark behind user's input
        feedbackMark.setAttribute('style', 'color:red;font-size:2em');
        feedbackMark.appendChild(document.createTextNode(`\u2717`));
        formSection.appendChild(feedbackMark);
        this.showingFeedback = true;
      }
      // output explanation
      var explanationText = this.generateExplanation();

      var outputSection = document.getElementById(questionOutputSectionId);
      outputSection.insertBefore(
        explanationText,
        outputSection.childNodes[outputSection.childNodes.length - 1]
      ); // add explanation node before reference node
    } else {
      alert('Please give an answer');
      this.showingFeedback = false;
    }
  }
  generateExplanation() {
    var correctAnswer = document.createElement('strong');
    correctAnswer.appendChild(document.createTextNode(this.answer));

    var explanationText = document.createElement('p');
    explanationText.setAttribute('id', 'question__explanation');

    explanationText.appendChild(correctAnswer);
    explanationText.appendChild(
      document.createTextNode('. ' + this.explanation)
    );

    return explanationText;
  }
  answeredCorrectly() {
     // get user's answer & set this.userAnswer
     this.userAnswer = document.forms[this.formName][this.type].value;
     return this.userAnswer.toLowerCase();
  }
  show(inputSectionId, outputSectionId) {
    // determine image source
    var questionImage = document.getElementById(questionImageId);
    questionImage.setAttribute(
      'alt',
      `Image of question ${this.id}: ${this.title}`
    );
    questionImage.setAttribute('src', this.image);

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
  }
  generateQuestion() {
    var question = document.createElement('p');
    var questionText = document.createTextNode(this.question);
    question.appendChild(questionText);

    return question;
  }
  generateTitle() {
    var title = document.createElement('h2');
    title.setAttribute('id', 'question' + this.id);
    title.appendChild(document.createTextNode(`${this.id}. ${this.title}`));

    return title;
  }
  generateReference() {
    // create reference element, just like in the other pages, its contained in a details node
    var detailsElement = document.createElement('details');
    detailsElement.classList.add('references');
    detailsElement.setAttribute(
      'id',
      this.reference
        .slice(0, this.reference.length - 1)
        .join(this.reference.separator)
    ); // set whole reference (cleaned) as id

    var summaryElement = document.createElement('summary');
    var strongElement = document.createElement('strong');
    strongElement.appendChild(document.createTextNode('Reference'));
    summaryElement.appendChild(strongElement);

    var referenceParagraph = document.createElement('p');
    referenceParagraph.classList.add('reference__item');

    var referenceTitle = document.createElement('em');
    referenceTitle.appendChild(
      document.createTextNode(this.reference.title + '. ')
    );

    var referenceLink = document.createElement('a');
    referenceLink.classList.add('reference__link');
    referenceLink.setAttribute('href', this.reference.link);
    referenceLink.setAttribute('target', '_blank');
    referenceLink.setAttribute('title', 'Go to reference');
    referenceLink.appendChild(document.createTextNode(this.reference.link));

    referenceParagraph.appendChild(
      document.createTextNode(this.reference.author + '. ')
    );
    referenceParagraph.appendChild(
      document.createTextNode(this.reference.date + '. ')
    );
    referenceParagraph.appendChild(referenceTitle);
    referenceParagraph.appendChild(referenceLink);

    detailsElement.appendChild(summaryElement);
    detailsElement.appendChild(referenceParagraph);

    return detailsElement;
  }
  generateForm() {
    // loose coupling
    var form = document.createElement('form');
    form.setAttribute('name', this.formName);
    form.addEventListener('submit', e => e.preventDefault());
    var inputTextBox = document.createElement('input');
    inputTextBox.setAttribute('name', this.type);
    inputTextBox.setAttribute('type', 'text');
    inputTextBox.setAttribute('value', this.userAnswer); // to 'remember' user's answer upon coming back from another question

    var questionSubmit = document.createElement('button');
    questionSubmit.setAttribute('id', questionSubmitId);
    questionSubmit.appendChild(document.createTextNode('Submit'));
    //questionSubmit.addEventListener('click', () => {
    //   if (this.showingFeedback == false) {
    //     this.showingFeedback = true;
    //     this.answerFeedback();
    //   }
    // });
    questionSubmit.addEventListener('click', () => {
      if(this.showingFeedback == false){
        this.checkAnswer();
      }
    });

    var questionRetry = document.createElement('button');
    questionRetry.setAttribute('id', questionRetryId);
    questionRetry.appendChild(document.createTextNode('Retry'));
    questionRetry.addEventListener('click', () => {
      clearQuestionElements();
      questions[currentQuestionIndex].show(
        questionInputSectionId,
        questionOutputSectionId
      );
    });

    form.appendChild(inputTextBox);
    form.appendChild(questionSubmit);
    form.appendChild(questionRetry);

    return form;
  }
}

class MultipleChoice extends Question {
  constructor(
    id,
    title,
    image,
    question,
    explanation,
    answer,
    otherOptions,
    reference,
    quizId,
    topicId
  ) {
    super(
      id,
      title,
      image,
      question,
      explanation,
      answer,
      reference,
      quizId,
      topicId
    );
    this.type = 'closed';
    this.options = otherOptions;
  }
  getAllOptions() {
    return this.options.concat([this.answer]);
  }
  generateForm() {
    // loose coupling
    return this.generateOptionRadios();
  }
  answeredCorrectly() {
    // get radio button options
    var ele = document.getElementsByName(this.formName)[0].elements;
    console.log("yay");
    // get checked radio btn and set this.userAnswer to that value
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {        
        this.userAnswer = ele[i].value;
        
      }
    }
    console.log(this.userAnswer);
    return this.userAnswer.toLowerCase();
  }
  generateOptionRadios() {
    var form = document.createElement('form');
    form.setAttribute('name', this.formName);
    form.addEventListener('submit', e => e.preventDefault());

    var options = this.getAllOptions();
    shuffle(options).forEach(option => {
      var radioOption = document.createElement('input');
      radioOption.setAttribute('type', 'radio');
      radioOption.setAttribute('value', option);
      radioOption.setAttribute('name', this.type);

      var radioLabel = document.createElement('label');
      radioLabel.setAttribute('id', option);
      radioLabel.setAttribute('for', option);
      radioLabel.appendChild(document.createTextNode(option));

      form.appendChild(radioOption);
      form.appendChild(radioLabel);
      form.appendChild(document.createElement('br'));
    });

    var questionSubmit = document.createElement('button');
    questionSubmit.setAttribute('id', questionSubmitId);
    questionSubmit.appendChild(document.createTextNode('Submit'));
    questionSubmit.addEventListener('click', () => {
      if (this.showingFeedback == false) {
        this.checkAnswer();        
      }
    });

    var questionRetry = document.createElement('button');
    questionRetry.setAttribute('id', questionRetryId);
    questionRetry.appendChild(document.createTextNode('Retry'));
    questionRetry.addEventListener('click', () => {
      clearQuestionElements();
      questions[currentQuestionIndex].show(
        questionInputSectionId,
        questionOutputSectionId
      );
    });

    form.appendChild(questionSubmit);
    form.appendChild(questionRetry);
    return form;
  }
}
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    // While there remain elements to shuffle
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
// Clears all non-framework elements that will be replaced by the next question
// We remove everything to make sure no artifacts from the previous question are left over
function clearQuestionElements() {
  var outputSection = document.getElementById(questionOutputSectionId);
  var inputSection = document.getElementById(questionInputSectionId);
  var inputSection = document.getElementById(questionInputSectionId);
  inputSection.style.boxShadow = 'initial';
  while (outputSection.lastChild) {
    outputSection.removeChild(outputSection.lastChild);
  }
  while (inputSection.lastChild) {
    inputSection.removeChild(inputSection.lastChild);
  }
  questions[currentQuestionIndex].showingFeedback = false;
}

// quizzes.js from here on
function loadTopics (){

  const article = document.getElementsByTagName("article")[0];
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
      const topics = JSON.parse(this.responseText);
      topics.forEach((object)=>{
        let list = document.createElement("ul");
        list.className = "topics__list";
        let li = document.createElement("li");
        li.textContent=object.name;
        list.appendChild(li);
        article.appendChild(list);
        loadQuizzes(object.id);
      });
    }
  };

  xmlHttp.open("get", "/topics");
  xmlHttp.send();
}

function loadQuizzes (topic){
  const topicId = topic;
  const list = document.getElementsByClassName("topics__list")[topicId-1];
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
      const quizzes = JSON.parse(this.responseText);
      quizzes.forEach((object)=>{
        let li = document.createElement("li");
        li.textContent = object.title;
        list.appendChild(li);
        console.log("works");
        li.addEventListener("click", () => {loadQuestions(topicId, object.id);});
      });
    }
  };

  let path = "/topics/"+topicId+"/quizzes";
  xmlHttp.open("get", path);
  xmlHttp.send();
}

function loadQuestions(topicId, quizId) {
  const request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {

      // Clears out existing page content (to make place for the questions)
      let main = document.getElementsByTagName("main")[0];
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }

      // Loads the questions asked by the user
      const quiz = JSON.parse(this.responseText);
      quiz.forEach((question) => {
        let q;
        let mq;
        if(!question.otherOptions) {
          q = new Question(question.id, question.title, question.image, question.question, question.explanation, question.answer, question.reference,quizId,topicId);
          questions.push(q);
        } else {
          // otherOptions in multiple choice questions are called options (keep this in mind)!!!
          mq = new MultipleChoice(question.id, question.title, question.image, question.question, question.explanation, question.answer, question.otherOptions.split(","), question.reference,quizId,topicId);
          questions.push(mq);
        }
      });
      createInitialElements();
      questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
      console.log("works too");

      // We first wipe out all input and output elements and then show the next or previous question.
      document.getElementById(controlsBackId).addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
          clearQuestionElements();
          currentQuestionIndex--;
          questions[currentQuestionIndex].show(
              questionInputSectionId,
              questionOutputSectionId
          );
        }
      });

      document.getElementById(controlsNextId).addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
          clearQuestionElements();
          currentQuestionIndex++;
          questions[currentQuestionIndex].show(
              questionInputSectionId,
              questionOutputSectionId
          );
        }
      });

      // Causes a very nice dropshadow effect on the inputsection,
      // pressing retry or next will remove it because of event propagation. If this were to use the bubbling phase
      // it would still be applied after pressing the retry button and thus the retry button would not remove the effect
      document.getElementById(questionInputSectionId).addEventListener(
          'click',
          () => {
            var inputSection = document.getElementById(questionInputSectionId);
            inputSection.style.boxShadow = '10px 10px 10px 10px grey';
          },
          true
      );
    }
  };

  let path = "/topics/"+topicId+"/quizzes/"+quizId+"/questions";
  request.open("get", path);
  request.send();
  return false        // To prevent the default behavior of the button?
}

window.addEventListener("DOMContentLoaded", loadTopics);
