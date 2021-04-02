const express = require('express');
const router = express();

// add question to quiz (to db)
router.post(
  '/:topicId/quizzes/:quizId/questions',
  require('../../../../controllers/dbAdders/addQuestionController')
);

// get question from quiz
router.get(
  '/:topicId/quizzes/:quizId/questions',
  require('../../../../controllers/dbGetters/getQuestionsController')
);

// update question in quiz
router.patch(
  '/:topicId/quizzes/:quizId/questions/:questionId',
  require('../../../../controllers/dbUpdaters/updateQuestionController')
);

// delete question from quiz
router.delete(
  '/:topicId/quizzes/:quizId/questions/:questionId',
  require('../../../../controllers/dbRemovers/removeQuestionController')
);

module.exports = router;
