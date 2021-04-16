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
    const oldPw = req.body.oldPassword;

    // check password
    if (await bcrypt.compare(oldPw, passwordCorrect)) {
      let newPw = req.body.newPassword;
      const newUsername = req.body.newUsername;
      const newName = req.body.newName;
      // check whether new password form was filled out
      if (newPw) {
        // check whether new password is valid according to RegEx
        if (helper.isValidPassword(newPw)) {
          newPw = await bcrypt.hash(newPw, 10);
          userFromDB.password = newPw;
        } else {
          console.log('invalid new password');
        }
      }

      if (newUsername) {
        userFromDB.username = newUsername;
      }

      if (newName) {
        userFromDB.name = newName;
      }
      delete userFromDB.created_at;
      delete userFromDB.updated_at;
      console.log(userFromDB);
      dbUpdater
        .updateUser(userFromDB.id, userFromDB)
        .then(result => {
          console.log(result);
          req.session.editProfileError = false;
          res.status(200).redirect('/profile');
        })
        .catch(err => {
          console.log(err);
          req.session.editProfileError = true;
          res.redirect('/profile/edit/unsuccessful');
        });
    } else {
      res.redirect('/profile/edit/unsuccessful');
    }
  } else {
    res.redirect('/profile/edit/unsuccessful');
  }
};
