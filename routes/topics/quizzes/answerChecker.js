const express = require('express');
const server = express();

server.post(
  '/topics/:topicId/quizzes/:quizId',
  require('../../../controllers/dbCheckers/checkAnswerController')
);

module.exports = server;
