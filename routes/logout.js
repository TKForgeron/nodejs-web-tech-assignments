const express = require('express');
const router = express.Router();
const updateProgressToDB = require('../controllers/dbUpdaters/updateProgressController');

router.post('/', (req, res) => {
  // THIS POST REQUEST (body) NEEDS:
  // [{userId, quizId, quizProgress, quizSuccessRate}] (in req.body)

  // send session progress to database
  console.log('req.body: ' + req.body);
  updateProgressToDB(req.body);

  // then destroy session and redirect to index
  req.session.destroy();
  res.redirect('/index.html');
});

module.exports = router;
