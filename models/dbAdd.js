// knex queries to crud our database
const knex = require('knex');
const config = require('../database/knexfile');
const db = knex(config.development);
const dbFinder = require('./dbFind');

module.exports = {
  addTopic,
  addQuiz,
  addQuestion,
  addUser,
  addUserStat,
};

// expects: (JSON string)
async function addTopic(topic) {
  console.log(`inside addTopic, adding: ${topic}`);
  topic = JSON.parse(topic);

  const [id] = await db('topic').insert(topic);

  return id;
}

// expects: (JSON string, number)
async function addQuestion(question, quizId_fk) {
  // console.log(`inside addQuestion: ${question}`);
  let quiz = undefined;

  // trying to fetch quiz
  await dbFinder
    .findQuizById(quizId_fk)
    .then(res => {
      quiz = res;
    })
    .catch(err => {
      console.log(`findQuizById not working: ${err}`);
    });

  if (quiz === undefined || !quiz) {
    // checking whether quiz exists, knex returns undefined when not exists
    console.log(`trying to add question to quiz, but quizId does not exist`);
  } else {
    question = JSON.parse(question);
    question.quizId_fk = quiz.id; // add topicId_fk to which the quiz belongs

    const [questionId] = await db('question').insert(question);

    return questionId;
  }
}

// expects: (JSON string, number)
async function addQuiz(quiz, topicId_fk) {
  // console.log(`inside addQuiz: ${quiz}`);
  let topic = undefined;

  // trying to fetch topic
  await dbFinder
    .findTopicById(topicId_fk)
    .then(res => {
      topic = res;
    })
    .catch(err => {
      console.log(`findTopicById not working: ${err}`);
    });

  if (topic === undefined || !topic) {
    // checking whether topic exists, knex returns undefined when not exists
    console.log(`trying to add quiz to topic, but topicId does not exist`);
  } else {
    quiz = JSON.parse(quiz);
    quiz.topicId_fk = topic.id; // add topicId_fk to which the quiz belongs

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
      console.log(`'addUser' operation inserted userId: ${result}`);
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
  await dbFinder
    .findUserById(userId_fk)
    .then(res => (user = res))
    .catch(err => {
      console.log(`findUserById not working: ${err}`);
    });
  // trying to fetch quiz
  await dbFinder
    .findQuizById(quizId_fk)
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
