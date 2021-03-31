const dbAdder = require('../../models/dbAdd');
const dbFinder = require('../../models/dbFind');
const dbUpdater = require('../../models/dbUpdate');
const dbRemover = require('../../models/dbRemove');

module.exports = (req, res) => {
  const topicId = req.params.topicId;
  const quizId = req.params.quizId;
  const questionId = req.params.questionId;

  const binnenkomendJSON = req.body; // { quiz: 0, question: 2, answer: 'test' }

  if (binnenkomendJSON.quiz != quizId) {
    console.log(
      `You're posting a question that does not belong to this quiz. \n quizId: ${quizId} quizId_fk: ${binnenkomendJSON.quiz}`
    );
  }
  // find answer to question in db, then check answer, and return TRUE/FALSE

  dbAdder
    .addQuiz(req.body)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add quiz' });
    });
};
