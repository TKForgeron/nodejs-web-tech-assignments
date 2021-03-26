// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);

module.exports = {
  addQuiz,
  findAllQuizzes,
  findQuizById,
  findQuestionsByQuizId,
  removeQuiz,
  updateQuiz,
  findQuestionById,
  addQuestion,
  removeQuestion,
  registerUser,
};

// add, find, findById, remove, update
async function addQuiz(quiz) {
  const [quizId] = await db('quizzes').insert(quiz);

  return quizId;
}

function findAllQuizzes() {
  return db('quizzes');
}

function findQuizById(id) {
  return db('quizzes').where({ quizId: id }).first();
}

function removeQuiz(id) {
  return db('quizzes').where({ quizId: id }).del();
}

function updateQuiz(id, changes) {
  return db('quizzes')
    .where({ quizId: id })
    .update(changes)
    .then(() => {
      return findById(id);
    }); // return complete record that was updated
}

function findQuestionById(id) {
  return db('questions').where({ questionId: id }).first();
}

async function addQuestion(question, quizId_fk) {
  const [questionId] = await db('questions')
    .where({ quizId_fk }) // quizId_fk : quizId_fk
    .insert(question);

  return findQuestionById(questionId);
}

function findQuestionsByQuizId(quizId) {
  return db('quizzes as qzz')
    .join('questions as qtn', 'quizId_fk', 'qtn.quizId_fk')
    .select(
      'qzz.quizId',
      'qzz.title as quizTitle',
      'qtn.questionId',
      'qtn.title as questionTitle',
      'qtn.image',
      'qtn.explanation',
      'qtn.answer',
      'qtn.otherOptions'
    )
    .where({ quizId });
}

function removeQuestion(questionId) {
  return db('questions').where({ questionId }).del();
}

async function registerUser(user) {
  console.log(user.username + ' ' + user.password);
  await db('users').insert({
    username: 'naam',
    password: 'ww',
  });

  // return userId;
}
