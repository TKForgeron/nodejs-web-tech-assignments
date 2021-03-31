const dbUpdater = require('../../models/dbUpdate');
const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  const userStatsArray = req.body;

  userStatsArray.forEach((stat, index) => {
    const existingUserStats = dbFinder.findStatsByUserId(stat.userId_fk);

    if (
      !existingUserStats &&
      (existingUserStats != {} || existingUserStats != [])
    ) {
      console.log(`adding new user stats`);

      dbAdder.addUserStat(
        userStatsArray[index].userId_fk,
        userStatsArray[index].quizId_fk,
        userStatsArray[index].quizProgress,
        userStatsArray[index].quizSuccessRate
      );
    } else {
      existingUserStats.forEach(userStatObj => {
        dbUpdater
          .updateUserStat(userStatObj.id, changes)
          .then(res => {
            console.log(
              `userStat: ${userStatObj.id} successfully updated, result: ${res}`
            );
          })
          .catch(err => {
            console.log(`userStat: ${userStatObj.id} not updated, ${err}`);
          });
      });
    }
  });
};
