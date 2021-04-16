module.exports = {
  isJson,
  createProgressObj,
  shuffle,
  renderProfile,
  isValidPassword,
};

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
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
  let loginOrLogout = 'login';
  if (req.session.loggedin) {
    loginOrLogout = 'logout';
  }
  if (
    !dataForProfilePage.editProfileError ||
    dataForProfilePage.editProfileError == undefined
  ) {
    dataForProfilePage.editProfileError = false;
  }
  return res.render('profile', {
    title: 'Profile',
    editProfileError: dataForProfilePage.editProfileError,
    loginOrLogout: loginOrLogout,
    name: req.session.name,
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

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    // While there remain elements to shuffle
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// taken from https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
function isValidPassword(pw) {
  // regular expression to check for password complexity
  const re = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return re.test(pw);
}
