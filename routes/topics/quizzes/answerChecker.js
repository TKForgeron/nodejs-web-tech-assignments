const express = require('express');
const server = express();
//Yes this technically posts to /topicId already but that was not accessible for some reason
server.post(
  '/:quizId/questions/:questionId',
  require('../../../controllers/dbCheckers/checkAnswerController')
);

module.exports = server;
