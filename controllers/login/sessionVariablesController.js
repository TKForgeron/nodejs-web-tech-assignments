const dbFinder = require('../../models/dbFind');

module.exports = async req => {
  console.log('login successful, setting session variables');
  req.session.loggedin = true;
  const username = req.body.username;
  req.session.username = username;
  // Nester array, first array indicated topic, second array (nested) indicates quiz
  req.session.progressArray = [
    [[], []],
    [[], []],
  ];

  req.session.successArray = [
    [[], []],
    [[], []],
  ];

  req.session.progressArray[0][0] = 0;
  req.session.progressArray[0][1] = 0;
  req.session.progressArray[1][0] = 0;
  req.session.progressArray[1][1] = 0;

  return req;
};