const express = require('express');
const dbAdder = require('../models/dbAdd'); // C
const dbFinder = require('../models/dbFind'); // R
const dbUpdater = require('../models/dbUpdate'); // U
const dbRemover = require('../models/dbRemove'); // D
const server = express();

server.post('/topics', require('../controllers/createTopicController'));

server.get('topics', require('../controllers/getTopicsController'));

server.post('/quizzes', require('../controllers/createQuizController'));

server.get('quizzes', require('../controllers/getQuizzesController'));

server.get('quizzes/:id', require('../controllers/getQuizController'));

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
