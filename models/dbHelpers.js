// knex queries to crud our database

const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);

module.exports = {
  add,
  find,
  findById,
  remove,
};

// add, find, findById, remove, update
async function add(quiz) {
  const [quizId] = await db('quizzes').insert(quiz);

  return quizId;
}

function find() {
  return db('quizzes');
}

function findById(id) {
  return db('quizzes').where({ quizId: id }).first();
}

function remove(id) {
  return db('quizzes').where({ quizId: id }).del();
}
