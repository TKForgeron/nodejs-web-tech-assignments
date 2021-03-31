const express = require('express');
const router = express();

// add question to quiz (to db)
router.post(
  '/:topicId/quizzes/:quizId/questions',
  require('../../../../controllers/adders/addQuestionController')
);

router.get(
  '/:topicId/quizzes/:quizId/questions',
  require('../../../../controllers/getters/getQuestionsController')
);

router.patch(
  '/:topicId/quizzes/:quizId/questions/:questionId',
  require('../../../../controllers/updaters/updateQuestionController')
);

router.delete(
  '/:topicId/quizzes/:quizId/questions/:questionId',
  require('../../../../controllers/removers/removeQuestionController')
);

module.exports = router;
