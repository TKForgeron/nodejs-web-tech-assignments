const dbFinder = require('../../models/dbFind');
const bcrypt = require('bcrypt');
const helpers = require('../controllerHelpers');

module.exports = async (req, res) => {
  // regular expression to check for password complexity taken from https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
  let re = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  let valid = re.test(req.body.password);
  if (valid == false) {
    console.log('invalid password');
    res.redirect('/register?unsuccessful');
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = req.body;

    dbAdder
      .addUser(JSON.stringify(user))
      .then(result => {
        if (result == undefined) {
          throw new Error('registration failed'); // oops, still going to catch.
        } else {
          console.log(
            'catch of registerUser (in POST, addUserController.js): ' + err
          );
          req.body.username = user.username;
          req = sessionVarsSetter(req);
          res.status(200).redirect('/profile');
        }
      })
      .catch(err => {
        console.log(
          'catch of registerUser (in POST, addUserController.js): ' + err
        );
        res.status(500).redirect('/register');
      });
  }
};
