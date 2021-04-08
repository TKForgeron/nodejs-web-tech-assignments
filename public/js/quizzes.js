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
          quiz.forEach((row) => {
              let q;
              let mq;
              if(!row.otherOptions) {
                  q = new Question(row.id, row.title, row.image, row.question, row.explanation, row.answer, row.reference,quizId,topicId);
                  questions.push(q);
              } else {
                  // otherOptions in multiple choice questions are called options (keep this in mind)!!!
                  mq = new MultipleChoice(row.id, row.title, row.image, row.question, row.explanation, row.answer, row.otherOptions, row.reference,quizId,topicId);
                  questions.push(mq);
              }
          });
          createInitialElements();
          questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
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