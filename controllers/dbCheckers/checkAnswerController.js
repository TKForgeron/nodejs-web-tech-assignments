const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  // const topicId = req.params.topicId; // niet nodig
  const userAnswerObj = req.body; // { quizId: 1, questionId: 2, answer: 'test' }

  console.log(req.body);

  questionIdFromParams = parseInt(req.params.questionId);

  // find answer to question in db, then check answer, and return TRUE/FALSE
  dbFinder
    .findQuestionAnswerById(questionIdFromParams)
    .then(answer => {
      res.status(200).json(userAnswerObj.answer == answer);
      console.log(
        `userAnswerObj.answer: ${userAnswerObj.answer}, answer: ${answer}`
      );
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `cannot find answer to question ${questionId}` });
      console.log(err);
    });

  // const questionIdFromBody = parseInt(userAnswerObj.quizId);

  // if (questionIdFromBody != questionIdFromParams) {
  //   console.log(
  //     `You're posting a question that does not belong to this quiz. \n questionIdFromBody: ${questionIdFromBody} questionIdFromParams: ${questionIdFromParams}`
  //   );
  // }
};
