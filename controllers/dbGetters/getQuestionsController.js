const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  const id = req.params.id;

  dbFinder
    .findQuestionsByQuizId(id)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(err =>
      res.status(500).json({
        message: "Unable to perform 'findQuestionsByQuizId' operation",
      })
    );
};
