function loadTopics() {
  const article = document.getElementsByTagName('article')[0];
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const topics = JSON.parse(this.responseText);
      topics.forEach(tpc => {
        let list = document.createElement('ul');
        list.className = 'topics__list';
        let li = document.createElement('li');
        li.textContent = tpc.name;
        list.appendChild(li);
        article.appendChild(list);
        loadQuizzes(tpc.id);
      });
    }
  };

  xmlHttp.open('get', '/topics');
  xmlHttp.send();
}

function loadQuizzes(topic) {
  const topicId = topic;
  const list = document.getElementsByClassName('topics__list')[topicId - 1];
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      const quizzes = JSON.parse(this.responseText);
      quizzes.forEach(qz => {
        let li = document.createElement('li');
        li.textContent = qz.title;
        list.appendChild(li);
        li.addEventListener('click', () => {
          loadQuestions(topicId, qz.id);
        });
      });
    }
  };

  let path = `/topics/${topicId}/quizzes`;
  xmlHttp.open('get', path);
  xmlHttp.send();
}

function loadQuestions(topicId, quizId) {
  const request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Clears out existing page content (to make place for the questions)
      let main = document.getElementsByTagName('main')[0];
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }

      // Loads the questions asked by the user
      const quiz = JSON.parse(this.responseText);
      quiz.forEach(qstn => {
        let q;
        let mcq;
        if (qstn.otherOptions || qstn.otherOptions == '') {
          // otherOptions in multiple choice questions are called options (keep this in mind)!!!
          mcq = new MultipleChoice(
            qstn.id,
            qstn.title,
            qstn.image,
            qstn.question,
            qstn.explanation,
            qstn.answer,
            qstn.otherOptions,
            qstn.reference,
            topicId,
            quizId
          );
          questions.push(mcq);
        } else {
          q = new Question(
            qstn.id,
            qstn.title,
            qstn.image,
            qstn.question,
            qstn.explanation,
            qstn.answer,
            qstn.reference,
            topicId,
            quizId
          );
          questions.push(q);
        }
      });
      createInitialElements();
      questions[currentQuestionIndex].show(
        questionInputSectionId,
        questionOutputSectionId
      );
    }
  };

  let path = `/topics/${this.topicId}/quizzes/${this.quizId}/questions`;
  request.open('get', path);
  request.send();
  return false; // To prevent the default behavior of the button?
}

window.addEventListener('DOMContentLoaded', loadTopics);
