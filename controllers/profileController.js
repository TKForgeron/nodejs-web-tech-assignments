const dbFinder = require('../models/dbFind');

module.exports = async (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.username;
    let statObjectsArray = [];
    let overallSuccessArray = [];
    let totalSuccessArray = [];
    // const userId = undefined;

    if (username == 'admin') {
      res.redirect('/admin');
    } else {
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

      return res.render('profile', {
        title: 'Profile',
        welcomeMessage: 'Welcome ' + username,
        sessionProgress11:
          "You've made this much progress on topic 1 quiz 1 this session: " +
          req.session.progressArray[0][0],
        sessionProgress12:
          "You've made this much progress on topic 1 quiz 2 this session: " +
          req.session.progressArray[0][1],
        sessionProgress21:
          "You've made this much progress on topic 2 quiz 1 this session: " +
          req.session.progressArray[1][0],
        sessionProgress22:
          "You've made this much progress on topic 1 quiz 2 this session: " +
          req.session.progressArray[1][1],
        sessionSuccess11:
          'Your success rate on topic 1 quiz 1 is: ' +
          Math.floor(req.session.successArray[0][0] * 100) +
          '% this session',
        sessionSuccess12:
          'Your success rate on topic 1 quiz 2 is: ' +
          Math.floor(req.session.successArray[0][1] * 100) +
          '% this session',
        sessionSuccess21:
          'Your success rate on topic 2 quiz 1 is: ' +
          Math.floor(req.session.successArray[1][0] * 100) +
          '% this session',
        sessionSuccess22:
          'Your success rate on topic 2 quiz 2 is: ' +
          Math.floor(req.session.successArray[1][1] * 100) +
          '% this session',
        totalSuccess11:
          'Your overall success rate on topic 1 quiz 1 is: ' +
          Math.floor(totalSuccessArray[0]) +
          '%',
        totalSuccess12:
          'Your overall success rate on topic 1 quiz 2 is: ' +
          Math.floor(totalSuccessArray[1]) +
          '%',
        totalSuccess21:
          'Your overall success rate on topic 2 quiz 1 is: ' +
          Math.floor(totalSuccessArray[2]) +
          '%',
        totalSuccess22:
          'Your overall success rate on topic 2 quiz 2 is: ' +
          Math.floor(totalSuccessArray[3]) +
          '%',
      });
    }
  } else {
    console.log('You should login first');
    res.redirect('/login');
  }
};
