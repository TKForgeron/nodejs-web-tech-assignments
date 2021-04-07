const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  //req.body not working
  const userAnswer = req.params.providedAnswer; // { answer: 'test' }

  questionIdFromUrl = parseInt(req.params.questionId);

  // find answer to question in db, then check answer, and return TRUE/FALSE
  dbFinder
    .findQuestionAnswerById(questionIdFromUrl)
    .then(answer => {
      res.status(200).json(userAnswer == answer);
      console.log(`userAnswer: ${userAnswer}, answer: ${answer}`);
    })
    .catch(err => {
      res.status(500).json({
        message: `cannot find answer to question ${questionIdFromUrl}`,
      });
      console.log(err);
    });

  // const questionIdFromBody = parseInt(userAnswerObj.quizId);

  // if (questionIdFromBody != questionIdFromUrl) {
  //   console.log(
  //     `You're posting a question that does not belong to this quiz. \n questionIdFromBody: ${questionIdFromBody} questionIdFromUrl: ${questionIdFromUrl}`
  //   );
  // }
};
