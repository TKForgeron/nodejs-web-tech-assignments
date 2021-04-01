module.exports = req => {
  console.log('login successful');
  req.session.loggedin = true;
  req.session.username = req.body.username;
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
};
