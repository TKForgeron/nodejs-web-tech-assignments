const helpers = require('../helpers');
const dbFinder = require('../../models/dbFind');

module.exports = async (req, res) => {
  const username = req.session.username;

  // send session progress to database
  let userId = await dbFinder.findUserIdByUsername(username);
  userId = userId.id;

  const progressObj1 = helpers.createProgressObj(
    userId,
    1,
    req.session.progressArray[0][0],
    req.session.successArray[0][0]
  );
  const progressObj2 = helpers.createProgressObj(
    userId,
    2,
    req.session.progressArray[0][1],
    req.session.successArray[0][1]
  );
  const progressObj3 = helpers.createProgressObj(
    userId,
    3,
    req.session.progressArray[1][0],
    req.session.successArray[1][0]
  );
  const progressObj4 = helpers.createProgressObj(
    userId,
    4,
    req.session.progressArray[1][1],
    req.session.successArray[1][1]
  );
  const progressArr = [progressObj1, progressObj2, progressObj3, progressObj4];

  const updateProgressToDB = require('../dbUpdaters/updateProgressController');
  updateProgressToDB(progressArr);

  // then destroy session and redirect to index
  req.session.destroy();
  res.redirect('/index.html');
};
