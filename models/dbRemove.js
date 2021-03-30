// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);

module.exports = {
  // removeTopic,
  removeQuestion,
  removeQuiz,
  // removeUserStat,
  removeUser,
};

// expects: (number)
function removeQuestion(id) {
  return db('question').where({ id }).del();
}

// expects: (number)
function removeQuiz(id) {
  db('question').where({ quizId_fk: id }).del();
  return db('quiz').where({ id }).del();
}

// expects: (number)
function removeUser(id) {
  db('userQuizStats').where({ userId_fk: id }).del();
  return db('user').where({ id }).del();
}
