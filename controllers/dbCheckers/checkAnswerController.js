const dbAdder = require('../../models/dbAdd');
const dbFinder = require('../../models/dbFind');
const dbUpdater = require('../../models/dbUpdate');
const dbRemover = require('../../models/dbRemove');

module.exports = (req, res) => {
  // const topicId = req.params.topicId; // niet nodig
  const quizId = req.params.quizId;
  const questionId = req.params.questionId;

  const userAnswerObj = req.body; // { quiz: 1, question: 2, answer: 'test' }

  userAnswerObj.quiz = parseInt(userAnswerObj.quiz);

  if (userAnswerObj.quiz != quizId) {
    console.log(
      `You're posting a question that does not belong to this quiz. \n quizId: ${quizId} quizId_fk: ${binnenkomendJSON.quiz}`
    );
  }

  // find answer to question in db, then check answer, and return TRUE/FALSE
  dbFinder
    .findQuestionAnswerById(userAnswerObj.quiz)
    .then(answer => {
      res.status(200).json(answer);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot find answer to the question' });
    });
};
