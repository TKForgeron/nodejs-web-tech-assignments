// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);

module.exports = {
  findAllTopics,
  findAllQuizzes,
  // findAllUsers,
  findTopicById,
  findQuizById,
  findQuestionById,
  findUserById,
  // findQuizByTopicId,
  findQuestionsByQuizId,
  // findStatsByUserId,
};

function findAllQuizzes() {
  return db('quiz');
}

function findAllTopics() {
  return db('topic');
}

// expects: (number)
function findQuestionById(id) {
  return db('question').where({ id }).first();
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
      'qtn.explanation',
      'qtn.answer',
      'qtn.otherOptions'
    )
    .where({ id });
}

// expects: (number)
function findQuizById(id) {
  const quiz = db('quiz').where({ id }).first();
  // console.log(`inside findQuizById: ${quiz}`);
  return quiz;
}

// expects: (number)
function findTopicById(id) {
  const topic = db('topic').where({ id }).first();
  return topic;
}

// expects: (number)
function findUserById(id) {
  const user = db('user').where({ id }).first();
  // console.log(`inside findUserById: ${user}`);
  return user;
}
