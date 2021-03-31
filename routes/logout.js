var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  // THIS POST REQUEST NEEDS:
  // [{userId, quizId, quizProgress, quizSuccessRate}] (in req.body)

  // send session progress to database
  const updateProgressToDB = require('../controllers/dbUpdaters/updateProgressController');
  updateProgressToDB(req, res);

  // then destroy session and redirect to index
  req.session.destroy();
  res.redirect('/index.html');
});

module.exports = router;
