const express = require('express');
const router = express();

router.post(
  '/:topicId/quizzes',
  require('../../../controllers/adders/addQuizController')
);

router.get(
  '/:topicId/quizzes',
  require('../../../controllers/getters/getQuizzesController')
); // returns all quizzes (without their content)

router.get(
  '/:topicId/quizzes/:quizId',
  require('../../../controllers/getters/getQuizController') // public/data/quiz.json ... in dat format een array van alle questions bij de correcte quiz in response teruggeven
); // returns one quiz with its content (i.e. questions)

router.patch(
  '/:topicId/quizzes/:quizId',
  require('../../../controllers/updaters/updateQuizController')
);

router.delete(
  '/:topicId/quizzes/:quizId',
  require('../../../controllers/removers/removeQuizController')
);

module.exports = router;
