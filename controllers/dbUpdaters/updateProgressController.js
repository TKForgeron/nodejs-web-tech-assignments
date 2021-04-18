// Updating of progress information logic happens here
const dbUpdater = require('../../models/dbUpdate');
const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');

module.exports = userStatsArray => {
  userStatsArray.forEach(async stat => {
    const existingUserStats = [];
    await dbFinder
      .findStatsByUserId(stat.userId_fk)
      .then(existingUserStat => {
        existingUserStats.push(existingUserStat);
      })
      .catch(err => {
        console.log(`in catch... ${err}`);
      });
    console.log(existingUserStats);
    // if obj is not empty then userStatsArray[index] exists in the database and then we can freely update, if not we have to add it
    let foundDatabaseItem = existingUserStats.find(
      o => o.quizId_fk == stat.quizId_fk
    );

    if (!foundDatabaseItem) {
      //just add
      // we couldn't find the current userStatsArray[index] object so we have to add that
      dbAdder.addUserStat(
        stat.userId_fk,
        stat.quizId_fk,
        stat.quizProgress,
        stat.quizSuccessRate
      );
    } else {
      //just update
      const changes = JSON.stringify({
        quizProgress: stat.quizProgress,
        quizSuccessRate: stat.quizSuccessRate,
      });
      dbUpdater
        .updateUserStat(foundDatabaseItem.id, changes)
        .then(res => {
          console.log(
            `userStat: ${foundDatabaseItem.id} successfully updated, result: ${res}`
          );
        })
        .catch(err => {
          console.log(`userStat: ${iobj.id} not updated, ${err}`);
        });
    }
  });
};
