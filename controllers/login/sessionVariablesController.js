const dbFinder = require('../../models/dbFind');

module.exports = async req => {
  console.log('login successful, setting session variables');
  req.session.loggedin = true;
  const username = req.body.username;
  req.session.username = username;
  // Nester array, first array indicated topic, second array (nested) indicates quiz
  req.session.progressArray = [
    [[], []],
    [[], []],
  ];

  req.session.successArray = [
    [[], []],
    [[], []],
  ];

  req.session.progressArray[0][0] = 0;
  req.session.progressArray[0][1] = 0;
  req.session.progressArray[1][0] = 0;
  req.session.progressArray[1][1] = 0;

  //   let userStats = [];
  //   // get success from db, if not exists set to 0
  //   await dbFinder
  //     .findStatsByUsername(username)
  //     .then(res => {
  //       userStats = res;
  //     })
  //     .catch(err => console.log(err));
  //   console.log('userStats: ');
  //   console.log(userStats);
  //   //   await dbFinder.findTopicByQuizId()

  //   //   req.session.successArray[0][0] = 0;
  //   //   req.session.successArray[0][1] = 0;
  //   //   req.session.successArray[1][0] = 0;
  //   //   req.session.successArray[1][1] = 0;

  return req;
};

// expects: ([JS object])
function avgSuccessRatePerQuiz(stats, quizId) {
  let statsByQuizId = stats.filter(stat => {
    return stat.quizId_fk == quizId;
  });
  let quizSuccessRates = statsByQuizId.map(stat => {
    stat = stat.quizSuccessRate;
  });
  function arrayAvg(arr) {
    arr.reduce((a, b) => a + b, 0) / arr.length;
  }
  arrayAvg(quizSuccessRates);
}
