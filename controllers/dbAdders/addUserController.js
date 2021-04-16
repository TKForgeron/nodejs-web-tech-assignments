const bcrypt = require('bcrypt');
const dbAdder = require('../../models/dbAdd');
const sessionVarsSetter = require('../login/sessionVariablesController');
const helper = require('../controllerHelpers');

module.exports = async (req, res) => {
  if (!helper.isValidPassword(req.body.password)) {
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
