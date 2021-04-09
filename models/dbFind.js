// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);
const dbOperationHelpers = require('./dbOperationHelpers');

module.exports = {
  findAllTopics,
  findAllQuizzes,
  findAllUsers,

  findTopicById,
  findQuizById,
  findQuestionAnswerById,
  findQuestionById,
  findUserByUsername,
  findUserById,
  findUserIdByUsername,

  findQuizzesByTopicId,
  findQuestionsByQuizId,
  findStatsByUserId,
  findStatsByUsername,
};

function findAllQuizzes() {
  return db('quiz');
}

function findAllTopics() {
  return db('topic');
}

function findAllUsers() {
  return db('user');
}

// expects: (number)
function findTopicById(id) {
  return dbOperationHelpers.finder('topic', id);
}

// expects: (number)
function findQuizById(id) {
  return dbOperationHelpers.finder('quiz', id);
}

// expects: (number)
async function findQuestionAnswerById(id) {
  let question = {};
  await findQuestionById(id)
    .then(qstn => {
      question = qstn;
    })
    .catch(err => {
      console.log(err);
    });
  return question.answer;
}

// expects: (number)
function findQuestionById(id) {
  return dbOperationHelpers.finder('question', id);
}

// expects: (number)
function findUserById(id) {
  return dbOperationHelpers.finder('user', id);
}

// expects: (string)
function findUserByUsername(username) {
  return db('user').where({ username }).first();
}

// expects: (string)
function findUserIdByUsername(username) {
  return db('user').where({ username }).select('id').first();
}

// expects: (number)
function findQuizzesByTopicId(topicId_fk) {
  return db('quiz').where({ topicId_fk });
}

// expects: (number)
function findQuestionsByQuizId(quizId_fk) {
  return db('question').where({ quizId_fk }); // array of JS-objects
}

// expects: (number)
function findStatsByUserId(userId_fk) {
  console.log(`userId_fk in findStatsByUserId: ${userId_fk}`);
  return db('userQuizStats').where({ userId_fk }); // array of JS-objects
}

// expects: (string)
function findStatsByUsername(username) {
  console.log(`username in findStatsByUserId: ${username}`);
  return db('userQuizStats').where({ username }); // array of JS-objects
}
