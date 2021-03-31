const bcrypt = require('bcrypt');
const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');

module.exports = async function (req, res) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  let user = JSON.stringify(req.body);
  let sessionUsername = user.username;

  if (dbFinder.findUserByUsername(user.username)) {
    res.status(500).json({ message: 'username already exists' });
  } else {
    dbAdder
      .addUser(user)
      .then(result => {
        console.log(`then of registerUser (in POST, dbUser.js): ${result}`);
        res.status(200);
        req.session.loggedin = true;
        req.session.username = sessionUsername;
        req.session.progress = 0;
        res.redirect('/profile');
      })
      .catch(error => {
        console.log('catch of registerUser (in POST, dbUser.js)');
        res
          .status(500)
          .json({ message: "Unable to perform 'registerUser' operation" });
      });
  }
};
