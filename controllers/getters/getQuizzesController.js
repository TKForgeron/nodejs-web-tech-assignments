const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  dbFinder
    .findAllQuizzes()
    .then(quizzes => {
      res.status(200).json(quizzes);
    })
    .catch(error => {
      res.status(500).json({ message: 'could not retrieve quizzes' });
    });
};
