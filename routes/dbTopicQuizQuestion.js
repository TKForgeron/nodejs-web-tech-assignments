const express = require('express');
const dbFinder = require('../models/dbFind'); // R
const dbUpdater = require('../models/dbUpdate'); // U
const dbRemover = require('../models/dbRemove'); // D
const server = express();

server.post('/topics', require('../controllers/createTopicController'));

server.get('/topics', require('../controllers/getTopicsController'));

server.post(
  '/topics/:topicId/quizzes',
  require('../controllers/createQuizController')
);

server.get(
  'topics/:topicId/quizzes',
  require('../controllers/getQuizzesController') // nog fixen
);

server.get(
  'topics/:topicId/quizzes/:quizId',
  require('../controllers/getQuizController')
); // public/data/quiz.json ... in dat format een array van alle questions bij de correcte quiz in response teruggeven

server.delete('quizzes/:id', require('../controllers/removeQuizController'));

server.patch('/quizzes/:id', require('../controllers/updateQuizController'));

// add question to quiz (to db)
server.post(
  '/quizzes/:id/questions',
  require('../controllers/createQuestionController')
);

server.get(
  '/quizzes/:id/questions',
  require('../controllers/getQuestionsController')
);

server.delete(
  'questions/:id',
  require('../controllers/removeQuestionController')
);

module.exports = server;
