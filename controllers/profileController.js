module.exports = (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.username;
    const kit = req.session.progressArray[0][0];

    if (username == 'admin') {
      res.redirect('/admin');
    } else {
      // This placeholder should hold the stats taken from the database
      var placeholder = 0;
      return res.render('profile', {
        title: 'Profile',
        welcomeMessage: 'Welcome ' + username,
        sessionProgress11: "You've made this much progress on topic 1 quiz 1 this session: " + req.session.progressArray[0][0],
        sessionProgress12: "You've made this much progress on topic 1 quiz 2 this session: " + req.session.progressArray[0][1],
        sessionProgress21: "You've made this much progress on topic 2 quiz 1 this session: " + req.session.progressArray[1][0],
        sessionProgress22: "You've made this much progress on topic 1 quiz 2 this session: " + req.session.progressArray[1][1],
        sessionSuccess11: "Your success rate on topic 1 quiz 1 is: " + req.session.successArray[0][0]*100 + "% this session",
        sessionSuccess12: "Your success rate on topic 1 quiz 2 is: " + req.session.successArray[0][1]*100 + "% this session",
        sessionSuccess21: "Your success rate on topic 2 quiz 1 is: " + req.session.successArray[1][0]*100 + "% this session",
        sessionSuccess22: "Your success rate on topic 2 quiz 2 is: " + req.session.successArray[1][1]*100 + "% this session"
      });
    }
  } else {
    console.log('You should login first');
    res.redirect('/login');
  }
};
