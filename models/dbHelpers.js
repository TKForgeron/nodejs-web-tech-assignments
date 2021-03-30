// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);

module.exports = {
  addTopic,
  addQuiz,
  addQuestion,
  addUser,
  addUserStat,
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
  // removeTopic,
  removeQuestion,
  removeQuiz,
  // removeUserStat,
  removeUser,
  // updateTopic,
  updateQuiz,
  // updateQuestion,
  // updateUser,
  // updateUserStat,
};

// expects: (JSON string)
async function addTopic(topic) {
  console.log(`inside addTopic: ${topic}`);
  topic = JSON.parse(topic);

  const [id] = await db('topic').insert(topic);

  return id;
}

// expects: (JSON string, number)
async function addQuestion(question, quizId_fk) {
  console.log(`inside addQuestion: ${question}`);
  let quiz = undefined;

  // trying to fetch quiz
  await findQuizById(quizId_fk)
    .then(foundQuiz => (quiz = foundQuiz))
    .catch(err => {
      console.log(`findQuizById not working: ${err}`);
    });

  if (quiz === undefined) {
    // checking whether quiz exists, knex returns undefined when not exists
    console.log(`trying to add question to quiz, but quizId does not exist`);
  } else {
    question = JSON.parse(question);

    const [id] = await db('question')
      .where({ quizId_fk }) // quizId_fk : quizId_fk
      .insert(question);

    return findQuestionById(id);
  }
}

// expects: (JSON string, number)
async function addQuiz(quiz, topicId_fk) {
  console.log(`inside addQuiz: ${quiz}`);
  let topic = undefined;

  // trying to fetch topic
  await findTopicById(topicId_fk)
    .then(foundTopic => (topic = foundTopic))
    .catch(err => {
      console.log(`findTopicById not working: ${err}`);
    });

  if (topic === undefined) {
    // checking whether topic exists, knex returns undefined when not exists
    console.log(`trying to add quiz to topic, but topicId does not exist`);
  } else {
    quiz = JSON.parse(quiz);

    const [quizId] = await db('quiz').insert(quiz);

    return quizId;
  }
}

// expects: (JSON string)
async function addUser(user) {
  console.log(`inside register user: ${user}`);
  user = JSON.parse(user);

  const userId = await db('user')
    .insert(user)
    .then(result => {
      console.log('registerUser inserted userId: ' + result);
    })
    .catch(err => {
      console.log(`registration not working: ${err}`);
    });

  return userId;
}

// expects: (number,number,number,number)
async function addUserStat(
  userId_fk,
  quizId_fk,
  quizProgress,
  quizSuccessRate
) {
  let user = undefined;
  let quiz = undefined;

  // trying to fetch user
  await findUserById(userId)
    .then(res => (user = res))
    .catch(err => {
      console.log(`findUserById not working: ${err}`);
    });
  // trying to fetch quiz
  await findQuizById(quizId)
    .then(res => (quiz = res))
    .catch(err => {
      console.log(`findQuizById not working: ${err}`);
    });

  if (user === undefined) {
    // checking whether user exists, knex returns undefined when not exists
    console.log(`trying to add user stat, but userId does not exist`);
  } else if (quiz === undefined) {
    // checking whether quiz exists, knex returns undefined when not exists
    console.log(`trying to add user stat, but quizId does not exist`);
  } else {
    const userStat = {
      userId_fk: userId_fk,
      quizId_fk: quizId_fk,
      quizProgress: quizProgress,
      quizSuccessRate: quizSuccessRate,
    };

    console.log(`trying to add user stat: ${userStat}`);

    const statId = await db('userQuizStats')
      .insert(userStat)
      .then(result => {
        console.log(`addUserStat inserted userStat: ${result} (id)`);
      })
      .catch(err => {
        console.log(`addUserStat not working: ${err}`);
      });

    return statId;
  }
}

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

// expects: (number, JSON string)
function updateQuiz(id, changes) {
  return db('quiz')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    }); // return complete record that was updated
}
