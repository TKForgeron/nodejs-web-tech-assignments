const dbUpdater = require('../../models/dbUpdate');
const dbFinder = require('../../models/dbFind');
const bcrypt = require('bcrypt');
const helper = require('../controllerHelpers');

module.exports = async (req, res) => {
  let userFromDB = '';
  req.session.editProfileError = false;

  await dbFinder
    .findUserByUsername(req.session.username)
    .then(usr => {
      userFromDB = usr;
    })
    .catch(err => {
      console.log(err);
      userFromDB = false;
    });

  // check whether user exists
  if (userFromDB) {
    const passwordCorrect = userFromDB.password;

    // check password
    if (await bcrypt.compare(req.body.oldPassword, passwordCorrect)) {
      // check whether new password form was filled out
      if (req.body.newPassword) {
        // check whether new password is valid according to RegEx
        if (!helper.isValidPassword(req.body.newPassword)) {
          console.log('invalid new password');
        } else {
          req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
          userFromDB.password = req.body.newPassword;
        }
      }

      if (req.body.newUsername) {
        userFromDB.username = req.body.newUsername;
      }

      if (req.body.newName) {
        userFromDB.name = req.body.newName;
      }
      console.log(userFromDB);
      dbUpdater
        .updateUser(userFromDB.id, userFromDB)
        .then(result => {
          console.log(result);
          req.session.editProfileError = false;
        })
        .catch(err => {
          console.log();
          console.log(err);
          req.session.editProfileError = true;
        });
    } else {
      res.redirect('/profile/edit/unsuccessful');
    }
  } else {
    res.redirect('/profile/edit/unsuccessful');
  }
};
