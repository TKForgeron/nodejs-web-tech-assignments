const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  const quiz = { title: req.body.title };
  const topicId = req.params.topicId;

  dbAdder
    .addQuiz(JSON.stringify(quiz), topicId)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add quiz' });
    });
};
