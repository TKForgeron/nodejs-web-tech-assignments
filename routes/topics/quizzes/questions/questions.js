const express = require('express');
const router = express();

// add question to quiz (to db)
router.post(
  '/:topicId/quizzes/:quizId/questions',
  require('../../../../controllers/dbAdders/addQuestionController')
);

router.get(
  '/:topicId/quizzes/:quizId/questions',
  require('../../../../controllers/dbGetters/getQuestionsController')
);

router.patch(
  '/:topicId/quizzes/:quizId/questions/:questionId',
  require('../../../../controllers/dbUpdaters/updateQuestionController')
);

router.delete(
  '/:topicId/quizzes/:quizId/questions/:questionId',
  require('../../../../controllers/dbRemovers/removeQuestionController')
);

module.exports = router;
