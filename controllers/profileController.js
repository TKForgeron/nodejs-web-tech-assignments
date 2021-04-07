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
        actualThing: "Yay a thing" + kit
      });
    }
  } else {
    console.log('You should login first');
    res.redirect('/login');
  }
};
