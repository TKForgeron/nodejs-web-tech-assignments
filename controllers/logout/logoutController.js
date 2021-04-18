// Logout logic can be found here
// This is where progress gets updated to the database
// If you don't logout your progress won't be tracked
const helpers = require('../controllerHelpers');
const dbFinder = require('../../models/dbFind');

module.exports = async (req, res) => {
  // send session progress to database
    const userId = req.session.userId;  
  const progressObj1 = helpers.createProgressObj(
    userId.id,
    1,
    req.session.progressArray[0][0],
    req.session.successArray[0][0]
  );
  const progressObj2 = helpers.createProgressObj(
    userId.id,
    2,
    req.session.progressArray[0][1],
    req.session.successArray[0][1]
  );
  const progressObj3 = helpers.createProgressObj(
    userId.id,
    3,
    req.session.progressArray[1][0],
    req.session.successArray[1][0]
  );
  const progressObj4 = helpers.createProgressObj(
    userId.id,
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
