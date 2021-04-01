const express = require('express');
const router = express.Router();
const updateProgressToDB = require('../controllers/dbUpdaters/updateProgressController');

router.post('/', (req, res) => {
  // THIS POST REQUEST (req.body) NEEDS:
  // [{userId, quizId, quizProgress, quizSuccessRate}]
  // send session progress to database
  console.log('req.body: ' + req.body);
  const progressArr = [];
  const progressObj = {};
  progressObj.userId_fk = 1;
  progressObj.username = req.session.username;
  progressObj.quizProgress = req.session.quiz1Progress;
  progressObj.quizSuccessRate = req.session.quiz1SuccessRate;
  updateProgressToDB(progressArr);

  // then destroy session and redirect to index
  req.session.destroy();
  res.redirect('/index.html');
});

module.exports = router;
