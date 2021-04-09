// Open: id, title, image, question, explanation, answer, reference
// Multiple choice: id, title, image, question, explanation, answer, otherOptions, reference

// Topic1: Basic facts about JavaScript

// Multiple choice
var question1 = {
  id: 0,
  title: 'Founding',
  image: '/images/t1_history/q1.jpg',
  question: 'When and by whom was JavaScript created?',
  explanation: '/history.html', // First line
  answer: 'By Brendan Eich in 1995',
  otherOptions: [
    'By Rasmus Lerdorf in 1994',
    'By Brendan Eich in 1997',
    'By James Gosling in 1991',
  ]
};

// Open
var question2 = {
  id: 1,
  title: 'ECMA',
  image: '/images/t1_history/q2.jpg',
  question: 'When did JavaScript become an ECMA standard?',
  explanation: '/versionsFrameworks.html', // First line
  answer: '1997'
};

// Open
var question3 = {
  id: 2,
  title: 'Naming',
  image: '/images/t1_history/q3.png',
  question: 'What was the former name of JavaScript?',
  explanation: '/history.html', // 12th line
  answer: 'Mocha'
};
