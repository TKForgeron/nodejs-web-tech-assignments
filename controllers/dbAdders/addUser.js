const bcrypt = require('bcrypt');
const dbAdder = require('../../models/dbAdd');

module.exports = async function (req, res) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  let user = JSON.stringify(req.body);
  let actualUsername = user.username;

  dbAdder
    .addUser(user)
    .then(result => {
      console.log(`then of registerUser (in POST, dbUser.js): ${result}`);
      res.status(200);
      req.session.loggedin = true;
      req.session.username = actualUsername;
      req.session.progress = 0;
      res.redirect('/profile');
    })
    .catch(error => {
      console.log('catch of registerUser (in POST, dbUser.js)');
      res
        .status(500)
        .json({ message: "Unable to perform 'registerUser' operation" });
    });
};
