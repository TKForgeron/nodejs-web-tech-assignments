module.exports = {
  isJson,
  setSessionVars,
  createProgressObj,
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
