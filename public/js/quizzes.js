function loadTopics (){
    //alert("FUCKKKKK");

    const article = document.getElementsByTagName("article")[0];
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
            const topics = JSON.parse(this.responseText);
            topics.forEach((object)=>{
                let list = document.createElement("ul");
                list.className = "topicsList";
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
    const list = document.getElementsByClassName("topicsList")[topicId-1];
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
            const quizzes = JSON.parse(this.responseText);
            quizzes.forEach((object)=>{
                let li = document.createElement("li");
                let link = document.createElement("a");
                link.href = "/assessment.html";
                link.textContent = object.title;
                li.appendChild(link);
                list.appendChild(li);
            });
        }
    };

    let path = "/topics/"+topicId+"/quizzes";
    xmlHttp.open("get", path);
    xmlHttp.send();
}


window.addEventListener("DOMContentLoaded", loadTopics);