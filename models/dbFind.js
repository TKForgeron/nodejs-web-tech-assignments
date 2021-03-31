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
  findQuestionById,
  findUserByUsername,
  findUserById,

  findQuizzesByTopicId,
  findQuestionsByQuizId,
  findStatsByUserId,
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
function findQuestionById(id) {
  return dbOperationHelpers.finder('question', id);
}

// expects: (number)
function findUserById(id) {
  return dbOperationHelpers.finder('user', id);
}

function findUserByUsername(username) {
  return db('user').where({ username }).first();
}

// expects: (number)
function findQuizzesByTopicId(id) {
  return db('topic')
    .join('quiz as qz', 'topicId_fk', 'qz.topicId_fk')
    .select('topic.id', 'topic.name as topicName', 'qz.id')
    .where({ id });
}

// expects: (number)
function findQuestionsByQuizId(id) {
  return db('quiz as qz')
    .join('question as qtn', 'quizId_fk', 'qtn.quizId_fk')
    .select(
      'qz.id',
      'qz.title as quizTitle',
      'qtn.id',
      'qtn.title as questionTitle',
      'qtn.image',
      'qtn.question',
      'qtn.explanation',
      'qtn.answer',
      'qtn.reference',
      'qtn.otherOptions'
    )
    .where({ id });
}

// expects: (number)
function findStatsByUserId(id) {
  return db('user')
    .join('userQuizStats as stats', 'userId_fk', 'user.userId_fk')
    .select(
      'user.id',
      'user.name',
      'user.username',
      'stats.id',
      'stats.quizId_fk',
      'stats.quizProgress',
      'stats.quizSuccessRate'
    )
    .where({ id });
}
