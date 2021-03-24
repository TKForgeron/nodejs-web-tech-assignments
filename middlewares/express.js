const express = require('express');
const app = express();


const questions =   [ {id: 1, topic: "javascript", title: "question 1"}
                    , {id: 2, topic: "javascript", title: "question 2"}
                    , {id: 3, topic: "javascript", title: "question 3"}
                    , {id: 1, topic: "node", title: "node question 1"}
                    , {id: 2, topic: "node", title: "node question 2"}
                    , {id: 3, topic: "node", title: "node question 3"}
                    , {id: 1, topic: "express", title: "express question 1"}
                    , {id: 2, topic: "express", title: "express question 2"}
                    , {id: 3, topic: "express", title: "express question 3"}
                    ]; // ID's moeten nog ff anders, want die horen uniek te zijn

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/:topic/:questionID', (req, res) => {
    const reqTopic = req.params.topic;
    const reqQuestion = req.params.questionID;
    
    const topic = questions.find(q => q.topic === reqTopic);
    const question = questions.find(q => q.id === parseInt(reqQuestion) && q.topic === reqTopic);
    
    if (!topic) { // requested topic does not exist
        res.status(404).send(`Sorry, ${reqTopic} could not be found!`);
    } else if (!question) { // requested question does not exist
        res.status(404).send(`Sorry, question ${reqQuestion} could not be found!`);
    } else { // requested data exists
        res.send(question);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));