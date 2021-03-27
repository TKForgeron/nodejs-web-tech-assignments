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
  const [id] = await db('quizzes').insert(quiz);

  return id;
}

function findAllQuizzes() {
  return db('quizzes');
}

function findQuizById(id) {
  return db('quizzes').where({ id }).first();
}

function removeQuiz(id) {
  return db('quizzes').where({ id }).del();
}

function updateQuiz(id, changes) {
  return db('quizzes')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    }); // return complete record that was updated
}

function findQuestionById(id) {
  return db('questios').where({ id }).first();
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

async function registerUser(user) {
  console.log(`inside registerUser: ${user.username}, ${user.password}`);
  const [userId] = await db('user')
    .insert(user)
    .then(ids => {
      console.log(ids);
      ({ id: ids[0] });
    })
    .catch(err => {
      console.log(`registration not working: ${err}`);
    });
  return userId;
  // return userId;
}
