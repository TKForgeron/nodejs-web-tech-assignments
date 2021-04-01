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
    req.session.quiz1_1Progress,
    req.session.quiz1_1SuccessRate
  );
  const progressObj2 = helpers.createProgressObj(
    userId,
    2,
    req.session.quiz1_2Progress,
    req.session.quiz1_2SuccessRate
  );
  const progressObj3 = helpers.createProgressObj(
    userId,
    3,
    req.session.quiz2_1Progress,
    req.session.quiz2_1SuccessRate
  );
  const progressObj4 = helpers.createProgressObj(
    userId,
    4,
    req.session.quiz2_2Progress,
    req.session.quiz2_2SuccessRate
  );
  const progressArr = [progressObj1, progressObj2, progressObj3, progressObj4];

  const updateProgressToDB = require('../dbUpdaters/updateProgressController');
  updateProgressToDB(progressArr);

  // then destroy session and redirect to index
  req.session.destroy();
  res.redirect('/index.html');
};
