// Controller for the admin page
module.exports = (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.username;

    if (username == 'admin') {
      let loginOrLogout = 'login';
      if (req.session.loggedin) {
        loginOrLogout = 'logout';
      }
      return res.render('admin', {
        loginOrLogout: loginOrLogout,
        title: 'admin page',
        message: username,
        // messageTwo: progress,
      });
    } else {
      
      res.status(401).redirect('/login');
    }
  } else {
    
    res.redirect('/login');
  }
};
