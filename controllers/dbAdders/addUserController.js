const bcrypt = require('bcrypt');
const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');
const helpers = require('../helpers');

module.exports = async function (req, res) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  let user = req.body;
  let sessionUsername = user.username;

  // // if there is already a user with that username, save in 'userWithSameUsername', else set 'userWithSameUsername' to false for later if statement
  // let userWithSameUsername = '';
  // dbFinder
  //   .findUserByUsername(user.username)
  //   .then(usr => {
  //     userWithSameUsername = usr;
  //     console.log(usr);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     userWithSameUsername = false;
  //   });

  // // make sure username is unique
  // if (userWithSameUsername) {
  //   res.status(500).json({ message: 'username already exists' });
  //   console.log('sameUser: ' + userWithSameUsername);
  // } else {
  dbAdder
    .addUser(JSON.stringify(user))
    .then(result => {
      if (result == undefined) {
        throw new Error('registration failed'); // oops, still going to catch.
      } else {
        console.log(
          `then of registerUser (in POST, addUserController.js): ${result}`
        );
        req = helpers.setSessionVars(req);
        res.status(200).redirect('/profile');
      }
    })
    .catch(err => {
      console.log(
        'catch of registerUser (in POST, addUserController.js): ' + err
      );
      res.status(500).redirect('/register');
    });
  // }
};
