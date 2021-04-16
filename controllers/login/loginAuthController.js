const bcrypt = require('bcrypt');
const dbFinder = require('../../models/dbFind');
const sessionVarsSetter = require('./sessionVariablesController');

module.exports = async (req, res) => {
  const username = req.body.username;
  const passwordGuess = req.body.password;

  let userFromDB = '';
  await dbFinder
    .findUserByUsername(username)
    .then(usr => {
      userFromDB = usr;
      console.log('usr: ' + usr);
    })
    .catch(err => {
      console.log(err);
      userFromDB = false;
    });
  console.log(`username: ${username}, userFromDB: ${userFromDB}`);
  // check if user exists
  if (userFromDB) {
    const passwordCorrect = userFromDB.password;

    // check password
    if (await bcrypt.compare(passwordGuess, passwordCorrect)) {
      req = await sessionVarsSetter(req);

      // check whether user is admin
      if (username == 'admin') {
        res.status(200).redirect('/admin');
      } else {
        res.status(200).redirect('/profile');
      }
    } else {
      res.json({ message: 'password incorrect' });
    }

    console.log(
      `username: ${username}, guessedPwd: ${passwordGuess}, encryptedPwdFromDB: ${passwordCorrect}`
    );
  } else {
    res.redirect('/login?unsuccessful');
  }
};
