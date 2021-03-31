const express = require('express');
const dbFinder = require('../models/dbFind');
const server = express();

server.post(
  '/topics/:topicId/quizzes/:quizId',
  require('../controllers/checkAnswerController')
);

module.exports = server;
