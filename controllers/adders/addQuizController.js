const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  dbAdder
    .addQuiz(JSON.stringify(req.body))
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add quiz' });
    });
};
