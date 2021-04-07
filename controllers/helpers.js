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
  req.session.progressArray = [[[],[]],[[],[]]];
  req.session.progressArray[0][0] = 37;
  // topic 1, quiz 1
  req.session.quiz1_1Progress = 0;
  req.session.quiz1_1SuccessRate = 0;

  // topic 1, quiz 2
  req.session.quiz1_2Progress = 0;
  req.session.quiz1_2SuccessRate = 0;

  // topic 2, quiz 1
  req.session.quiz2_1Progress = 0;
  req.session.quiz2_1SuccessRate = 0;

  // topic 2, quiz 2
  req.session.quiz2_2Progress = 0;
  req.session.quiz2_2SuccessRate = 0;

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
