const dbFinder = require('../models/dbFind');

module.exports = (req, res, next) => {
  if (req.session.loggedin) {
    const username = req.session.username;
    let userExists = false;

    dbFinder
      .findUserByUsername(username)
      .then((userExists = true))
      .catch(err => {
        console.log(err);
      });

    if (userExists) {
      if (username == 'admin') {
        // authorize for full CRUD on db
        // for now api can only be used by admin:
        next();
      } else {
        // authorize for partial CRUD on db
        // but for now allow full...
        // next();
        // of nee, toch niet.
        console.log('not admin trying to access api');
      }
    } else {
      console.log('cannot find user');
      res.redirect('/register');
    }
  } else {
    console.log('not logged in');
    res.redirect('/login');
  }
};
