// Session variables get set here
const dbFinder = require('../../models/dbFind');

module.exports = async req => {
  
  req.session.loggedin = true;
  const username = req.body.username;
  req.session.username = username;
  req.session.name = req.body.name;

  await dbFinder
    .findUserIdByUsername(username)
    .then(id => {
      req.session.userId = id;
    })
    .catch(err => {
      console.log(err);
    });

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

  req.session.successArray[0][0] = 0;
  req.session.successArray[0][1] = 0;
  req.session.successArray[1][0] = 0;
  req.session.successArray[1][1] = 0;

  return req;
};
