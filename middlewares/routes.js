const express = require('express');
const { restart } = require('nodemon');
const quizzes = require('../models/dbHelpers');
const server = express();

server.use(express.json());

server.post('/api/quizzes', (req, res) => {
  quizzes
    .add(req.body)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add quiz' });
    });
});

server.get('api/quizzes', (req, res) => {
  quizzes
    .find()
    .then(quizzes => {
      res.status(200).json(quizzes);
    })
    .catch(error => {
      res.status(500).json({ message: 'could not retrieve quizzes' });
    });
});

server.get('api/quizzes/:id', (req, res) => {
  quizzes
    .findById(req.params.id)
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
        .json({ message: "Unable to perform 'findById' operation" })
    );
});

server.delete('api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  quizzes
    .remove(id)
    .then(deletedRecordsAmt => {
      if (deletedRecordsAmt > 0) {
        res.status(200).json({ message: 'Record successfully deleted' });
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Unable to perform 'remove' operation" })
    );
});

server.patch('/api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  quizzes
    .update(id, changes)
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

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`\n*** Server running on port ${port} ***\n`);
});
