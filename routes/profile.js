var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    var username = req.session.username;
    // This placeholder should hold the stats taken from the database
    var placeholder = 0;    
    return res.render('profile', {
      title: 'Profile',
      welcomeMessage: 'Welcome ' + username,
      topic1quiz1ProgressSession:'Topic 1 quiz 1 session progress and sucess rate: ' + req.session.quiz1_1Progress + ', ' + req.session.quiz1_1SuccessRate,
      topic1quiz2ProgressSession:'Topic 1 quiz 2 session progress and sucess rate: ' + req.session.quiz1_2Progress + ', ' + req.session.quiz1_2SuccessRate,
      topic2quiz1ProgressSession:'Topic 2 quiz 1 session progress and sucess rate: ' + req.session.quiz2_1Progress + ', ' + req.session.quiz2_1SuccessRate,
      topic2quiz2ProgressSession:'Topic 2 quiz 2 session progress and sucess rate: ' + req.session.quiz2_2Progress + ', ' + req.session.quiz2_2SuccessRate,
      topic1quiz1ProgressTotal:'Topic 1 quiz 1 lifetime progress and sucess rate: ' + placeholder + ', ' + placeholder,
      topic1quiz2ProgressTotal:'Topic 1 quiz 2 lifetime progress and sucess rate: ' + placeholder + ', ' + placeholder,
      topic2quiz1ProgressTotal:'Topic 2 quiz 1 lifetime progress and sucess rate: ' + placeholder + ', ' + placeholder,
      topic2quiz2ProgressTotal:'Topic 2 quiz 2 lifetime progress and sucess rate: ' + placeholder + ', ' + placeholder,
    });
  } else {
    console.log('You should login first');
    res.redirect('/login');
  }
});

module.exports = router;
