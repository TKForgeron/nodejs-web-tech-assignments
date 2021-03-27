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
  const [id] = await db('quiz').insert(quiz);

  return id;
}

function findAllQuizzes() {
  return db('quiz');
}

function findQuizById(id) {
  return db('quiz').where({ id }).first();
}

function removeQuiz(id) {
  return db('quiz').where({ id }).del();
}

function updateQuiz(id, changes) {
  return db('quiz')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    }); // return complete record that was updated
}

function findQuestionById(id) {
  return db('question').where({ id }).first();
}

async function addQuestion(question, quizId_fk) {
  const [id] = await db('question')
    .where({ quizId_fk }) // quizId_fk : quizId_fk
    .insert(question);

  return findQuestionById(id);
}

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

function removeQuestion(id) {
  return db('question').where({ id }).del();
}

async function registerUser(username, password) {
  console.log('inside register user');
  const user = {};
  user.username = username;
  user.password = password;
  let JSONUser = JSON.stringify(user);
  console.log(JSONUser);

  const userId = await db('user')
    .insert(user)
    .then(result => {
      console.log('registerUser insert then result: ' + result);
    })
    .catch(err => {
      console.log(`registration not working: ${err}`);
    });

  return userId;
}
