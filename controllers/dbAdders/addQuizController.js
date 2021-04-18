// Adds a quiz to the database
const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  // const quiz = { title: req.body.title };
  const quiz = JSON.stringify(req.body);
  const topicId = parseInt(req.params.topicId);

  dbAdder
    .addQuiz(quiz, topicId)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add quiz' });
    });
};
