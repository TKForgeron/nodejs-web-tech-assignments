const dbFinder = require('../models/dbFind');
const helpers = require('./helpers');

module.exports = async (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.username;

    if (username == 'admin') {
      res.redirect('/admin');
    } else {
      let statObjectsArray = [];
      let overallSuccessArray = [];
      let totalSuccessArray = [];
      let allTopicsArray = [];
      let allQuizzesArray = [];

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
        .findUserIdByUsername(username)
        .then(async id => {
          await dbFinder
            .findStatsByUserId(id.id)
            .then(stats => {
              statObjectsArray = stats;
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: "Unable to perform 'findStatsByUsername' operation",
              });
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "Unable to perform 'findUserIdByUsername' operation",
          });
        });

      for (let index = 1; index <= 4; index++) {
        overallSuccessArray[index - 1] = statObjectsArray.filter(stat => {
          return stat.quizId_fk == index; // there are 4 quizzes
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

      return helpers.renderProfile(res, req, {
        allTopicsArray,
        allQuizzesArray,
        totalSuccessArray,
      });
    }
  } else {
    console.log('You should login first');
    res.redirect('/login');
  }
};
