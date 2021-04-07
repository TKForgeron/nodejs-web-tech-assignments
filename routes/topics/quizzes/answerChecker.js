const express = require('express');
const server = express();

server.post(
  '/:quizId/questions/:questionId/:providedAnswer',
  require('../../../controllers/dbCheckers/checkAnswerController')
);

module.exports = server;
