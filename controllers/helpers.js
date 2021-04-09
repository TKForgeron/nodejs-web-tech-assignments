module.exports = {
  isJson,
  setSessionVars,
  createProgressObj,
  renderProfile,
};

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function setSessionVars(req) {
  console.log('login successful, session variables set');
  req.session.loggedin = true;
  req.session.username = req.body.username;
  //Nester array, first array indicated topic, second array (nested) indicates quiz
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
  // deze moeten uit de database komen
  req.session.successArray[0][0] = 0;
  req.session.successArray[0][1] = 0;
  req.session.successArray[1][0] = 0;
  req.session.successArray[1][1] = 0;

  return req;
}

function createProgressObj(
  userId_fk,
  quizId_fk,
  quizProgress,
  quizSuccessRate
) {
  return {
    userId_fk: userId_fk,
    quizId_fk: quizId_fk,
    quizProgress: quizProgress,
    quizSuccessRate: quizSuccessRate,
  };
}

function renderProfile(res, req, dataForProfilePage) {
  return res.render('profile', {
    title: 'Profile',
    username: req.session.username,
    topic1: dataForProfilePage.allTopicsArray[0],
    topic2: dataForProfilePage.allTopicsArray[1],
    topic1Quiz1: dataForProfilePage.allQuizzesArray[0],
    topic1Quiz2: dataForProfilePage.allQuizzesArray[1],
    topic2Quiz1: dataForProfilePage.allQuizzesArray[2],
    topic2Quiz2: dataForProfilePage.allQuizzesArray[3],
    questionsPerQuiz: dataForProfilePage.questionsPerQuiz,
    sessionProgress11: req.session.progressArray[0][0],
    sessionProgress12: req.session.progressArray[0][1],
    sessionProgress21: req.session.progressArray[1][0],
    sessionProgress22: req.session.progressArray[1][1],
    sessionSuccess11: Math.floor(req.session.successArray[0][0] * 100),
    sessionSuccess12: Math.floor(req.session.successArray[0][1] * 100),
    sessionSuccess21: Math.floor(req.session.successArray[1][0] * 100),
    sessionSuccess22: Math.floor(req.session.successArray[1][1] * 100),
    overallSuccess11: Math.floor(dataForProfilePage.totalSuccessArray[0]),
    overallSuccess12: Math.floor(dataForProfilePage.totalSuccessArray[1]),
    overallSuccess21: Math.floor(dataForProfilePage.totalSuccessArray[2]),
    overallSuccess22: Math.floor(dataForProfilePage.totalSuccessArray[3]),
  });
}
