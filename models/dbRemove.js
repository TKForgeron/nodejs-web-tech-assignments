// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);
const dbOperationHelpers = require('./dbOperationHelpers');

module.exports = {
  removeTopic,
  removeQuiz,
  removeQuestion,
  removeUser,
  removeUserStat,
};

// all records with relations are removed recursively

// expects: (number)
function removeTopic(id) {
  const quizzesToRemove = db('quiz').where({ topicId_fk: id }).select('id');

  quizzesToRemove.forEach(quizId => {
    removeQuiz(quizId);
  });

  return dbOperationHelpers.remover('topic', id);
}

// expects: (number)
function removeQuiz(id) {
  const questionsToRemove = db('question')
    .where({ quizId_fk: id })
    .select('id');

  questionsToRemove.forEach(questionId => {
    removeQuestion(questionId);
  });

  return dbOperationHelpers.remover('quiz', id);
}

// expects: (number)
function removeQuestion(id) {
  return dbOperationHelpers.remover('question', id);
}

// expects: (number)
function removeUser(id) {
  const userStatsToRemove = db('userQuizStats')
    .where({ userId_fk: id })
    .select('id');

  userStatsToRemove.forEach(userStatId => {
    removeUserStat(userStatId);
  });

  return dbOperationHelpers.remover('user', id);
}

function removeUserStat(id) {
  return dbOperationHelpers.remover('userQuizStats', id);
}
