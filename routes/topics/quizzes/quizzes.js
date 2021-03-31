const express = require('express');
const router = express();

router.post(
  '/:topicId/quizzes',
  require('../../../controllers/dbAdders/addQuizController')
);

router.get(
  '/:topicId/quizzes',
  require('../../../controllers/dbGetters/getQuizzesController')
); // returns all quizzes (without their content)

router.get(
  '/:topicId/quizzes/:quizId',
  require('../../../controllers/dbGetters/getQuizController') // public/data/quiz.json ... in dat format een array van alle questions bij de correcte quiz in response teruggeven
); // returns one quiz with its content (i.e. questions)

router.patch(
  '/:topicId/quizzes/:quizId',
  require('../../../controllers/dbUpdaters/updateQuizController')
);

router.delete(
  '/:topicId/quizzes/:quizId',
  require('../../../controllers/dbRemovers/removeQuizController')
);

module.exports = router;
