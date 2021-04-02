const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  const quizId_fk = req.params.quizId;

  dbFinder
    .findQuestionsByQuizId(quizId_fk)
    .then(questions => {
      res.status(200).json(questions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Unable to perform 'findQuestionsByQuizId' operation",
      });
    });
};
