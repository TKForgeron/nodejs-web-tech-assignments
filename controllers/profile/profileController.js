const dbFinder = require('../../models/dbFind');
const helpers = require('../controllerHelpers');

module.exports = async (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.username;
    console.log(req.session.userId);

    if (username == 'admin') {
      res.redirect('/admin');
    } else {
      let statObjectsArray = [];
      let overallSuccessArray = [];
      let totalSuccessArray = [];
      let allTopicsArray = [];
      let allQuizzesArray = [];
      let questionsPerQuiz = undefined;

      await dbFinder
        .findAllTopics()
        .then(topics => {
          allTopicsArray = topics;
        })
        .catch(err => {
          console.log(err);
        });

      await dbFinder
        .findAllQuizzes()
        .then(quizzes => {
          allQuizzesArray = quizzes;
        })
        .catch(err => {
          console.log(err);
        });

      await dbFinder
        .findStatsByUserId(req.session.userId.id)
        .then(stats => {
          console.log("stats");
          console.log(stats);
          statObjectsArray = stats;
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: 'could not retrieve your stats',
          });
        });

      await dbFinder
        .findAllQuestions()
        .then(qs => {
          questionsPerQuiz = qs.filter(q => q.quizId_fk == 1).length; // all quizzes should have the same amount of questions
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "Unable to perform 'findAllQuestions' operation",
          });
        });

      
      for (let index = 1; index <= 4; index++) {
        overallSuccessArray[index - 1] = statObjectsArray.filter(stat => {
          if (!stat.quizSuccessRate == '') {
            return stat.quizId_fk == index; // there are 4 quizzes
          } else {
            return false;
          }
        });
      }
      
      overallSuccessArray = overallSuccessArray.map(
        statsPerQuiz =>
          (statsPerQuiz = statsPerQuiz.map(
            statPerQuiz => (statPerQuiz = statPerQuiz.quizSuccessRate)
          ))
      );

      overallSuccessArray.forEach((overallSuccess, index) => {
        totalSuccessArray[index] =
          (overallSuccess.reduce((a, b) => a + b, 0) / overallSuccess.length) *
          100;
      });
      console.log(totalSuccessArray);
      
      let editProfileError = false;
      editProfileError = req.session.editProfileError;
      return helpers.renderProfile(res, req, {
        allTopicsArray,
        allQuizzesArray,
        totalSuccessArray,
        questionsPerQuiz,
        editProfileError,
      });
    }
  } else {
    console.log('You should login first');
    res.redirect('/login');
  }
};
