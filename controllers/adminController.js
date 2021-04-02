module.exports = (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.username;

    if (username == 'admin') {
      return res.render('admin', {
        title: 'admin page',
        message: username,
        // messageTwo: progress,
      });
    } else {
      console.log('You are not authorized, login with admin account');
      res.status(401).redirect('/login');
    }
  } else {
    console.log('You should login first');
    res.redirect('/login');
  }
};