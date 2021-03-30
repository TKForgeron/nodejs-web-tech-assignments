const express = require('express');
const dbAdder = require('../../models/dbAdd'); // C
const dbFinder = require('../../models/dbFind'); // R
const dbUpdater = require('../../models/dbUpdate'); // U
const dbRemover = require('../../models/dbRemove'); // D
const server = express();

server.use(express.json());

server.post('/quizzes', (req, res) => {
  dbAdder
    .addQuiz(req.body)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add quiz' });
    });
});

server.get('quizzes', (req, res) => {
  dbFinder
    .findAllQuizzes()
    .then(quizzes => {
      res.status(200).json(quizzes);
    })
    .catch(error => {
      res.status(500).json({ message: 'could not retrieve quizzes' });
    });
});

server.get('quizzes/:id', (req, res) => {
  dbFinder
    .findQuizById(req.params.id)
    .then(quiz => {
      if (quiz) {
        res.status(200).json(quiz);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unable to perform 'findQuizById' operation" })
    );
});

server.delete('quizzes/:id', (req, res) => {
  const { id } = req.params;
  dbRemover
    .removeQuiz(id)
    .then(deletedRecordsAmt => {
      if (deletedRecordsAmt > 0) {
        res.status(200).json({ message: `Record ${id} successfully deleted` });
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unable to perform 'removeQuiz' operation" })
    );
});

server.patch('/quizzes/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  dbUpdater
    .updateQuiz(id, changes)
    .then(quiz => {
      if (quiz) {
        res.status(200).json(quiz);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to perform 'update' operation" });
    });
});

// add question to quiz (to db)
server.post('/quizzes/:id/questions', (req, res) => {
  const { id } = parseInt(req.params, 10);
  const question = req.body;

  dbFinder
    .findQuizById(id)
    .then(quiz => {
      if (!quiz) {
        res.status(404).json({ message: 'Record not found' });
      }

      if (id != question.quizId_fk) {
        res.status(422).json({
          message: `URL quizId_fk: ${id}, body quizId_fk: ${question.quizId_fk}. Please make sure the id stated in the URL matches the id passed through the body`,
        });
      }

      // if all NOTNULLABLE fields are filled out, add then question
      if (!question.quizId_fk) {
        question['quizId_fk'] = id;
      } else if (!question.title || !question.explanation || !question.answer) {
        res.status(422).json({
          message:
            'Please provide title, answer, and explanation to the question',
        });
      } else {
        dbAdder
          .addQuestion(question, id)
          .then(q => {
            res.status(200).json(q);
          })
          .catch(err =>
            res.status(500).json({
              message:
                "Unable to add question, i.e. perform the 'addQuestion' operation",
            })
          );
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Unable to perform 'findQuizById' operation" });
    });
});

server.get('/quizzes/:id/questions', (req, res) => {
  const id = req.params.id;

  dbFinder
    .findQuestionsByQuizId(id)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(err =>
      res.status(500).json({
        message: "Unable to perform 'findQuestionsByQuizId' operation",
      })
    );
});

server.delete('questions/:id', (req, res) => {
  const { id } = req.params;
  dbRemover
    .removeQuestion(id)
    .then(deletedRecordsAmt => {
      if (deletedRecordsAmt > 0) {
        res.status(200).json({ message: `Record ${id} successfully deleted` });
      } else {
        res.status(404).json({ message: `Record ${id} not found` });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unable to perform 'removeQuestion' operation" })
    );
});

module.exports = server;
