const dbUpdater = require('../../models/dbUpdate');
const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  const userStatsArray = req.body;

  userStatsArray.forEach((stat, index) => {
    const existingUserStats = dbFinder.findStatsByUserId(stat.userId_fk);

    // if obj is not empty then userStatsArray[index] exists in the database and then we can freely update, if not we have to add it
    let obj = existingUserStats.find(o => o.quizId_fk == stat.quizId_fk);

    if (!obj) {
      //just add
      // we couldn't find the current userStatsArray[index] object so we have to add that
      dbAdder.addUserStat(
        userStatsArray[index].userId_fk,
        userStatsArray[index].quizId_fk,
        userStatsArray[index].quizProgress,
        userStatsArray[index].quizSuccessRate
      );
    } else {
      //just update
      dbUpdater
        .updateUserStat(obj.id, changes)
        .then(res => {
          console.log(
            `userStat: ${obj.id} successfully updated, result: ${res}`
          );
        })
        .catch(err => {
          console.log(`userStat: ${iobj.id} not updated, ${err}`);
        });
    }
  });
};
