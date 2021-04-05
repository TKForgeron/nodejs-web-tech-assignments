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

function loadQuestions(topic, quiz) {
    let topicId = topic;
    let quizId = quiz;
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
                    q = new Question(row.id, row.title, row.image, row.question, row.explanation, row.answer, row.reference);
                    questions.push(q);
                } else {
                    // otherOptions in multiple choice questions are called options (keep this in mind)!!!
                    mq = new MultipleChoice(row.id, row.title, row.image, row.question, row.explanation, row.answer, row.otherOptions, row.reference);
                    questions.push(mq);
                }
            });
            createInitialElements();
            questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
        }
        // try {
        //     console.log(questions.length);
        //     questions[currentQuestionIndex].show(questionInputSectionId, questionOutputSectionId);
        // }catch (e){
        //     console.warn("Questions are (still) loading...");
        // }
    };

    let path = "/topics/"+topicId+"/quizzes/"+quizId+"/questions";
    request.open("get", path);
    request.send();
    return false        // To prevent the default behavior of the button?
}

window.addEventListener("DOMContentLoaded", loadTopics);