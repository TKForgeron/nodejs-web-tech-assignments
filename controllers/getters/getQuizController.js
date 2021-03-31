const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  dbFinder
    .findQuizById(req.params.quizId)
    .then(quiz => {
      if (!quiz) {
        res.status(404).json({ message: 'Record not found' });
      } else {
        dbFinder.findQuestionsByQuizId(quiz.topicId_fk).then(questions => {
          res.status(200).json(questions);
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unable to perform 'findQuizById' operation" })
    );
};
