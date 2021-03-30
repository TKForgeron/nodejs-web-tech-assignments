// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);

module.exports = {
  // updateTopic,
  updateQuiz,
  // updateQuestion,
  // updateUser,
  // updateUserStat,
};

// expects: (number, JSON string)
function updateQuiz(id, changes) {
  return db('quiz')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    }); // return complete record that was updated
}
