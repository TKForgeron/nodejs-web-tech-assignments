const bcrypt = require('bcrypt');
const dbFinder = require('../models/dbFind');

module.exports = (req, res) => {
  const username = req.body.username;
  const passwordGuess = req.body.password;

  const userFromDB = dbFinder.findUserByUsername(username);

  // check if user exists
  if (userFromDB && userFromDB != {}) {
    const passwordCorrect = userFromDB.password;

    //check password
    if (bcrypt.compare(passwordGuess, passwordCorrect)) {
      console.log('login successful');
      req.session.loggedin = true;
      req.session.username = username;
      req.session.progress = 0; // progress is set no 0 on every login
      res.redirect('/profile');
    } else {
      res.json({ message: 'password incorrect' });
    }

    console.log(
      `username: ${username}, guessedPwd: ${passwordGuess}, encryptedPwdFromDB: ${passwordCorrect}`
    );
  }
};
