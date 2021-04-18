// Adds a question to the database
const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  const topicId = parseInt(req.params.topicId);
  const quizId = parseInt(req.params.quizId);
  const question = JSON.stringify(req.body);

  dbAdder
    .addQuestion(question, quizId)
    .then(question => {
      res.status(200).json(question);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add question' });
    });
};
