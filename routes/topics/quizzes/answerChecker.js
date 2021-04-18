// This router handles the checking of answers for the assessment
// The entire checking of answers and returning a response is thus done through the server
const express = require('express');
const server = express();
server.post(
  '/:quizId/questions/:questionId',
  require('../../../controllers/dbCheckers/checkAnswerController')
);

module.exports = server;
