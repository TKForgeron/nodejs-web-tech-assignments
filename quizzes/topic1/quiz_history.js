// Open: id, title, image, question, explanation, answer, reference
// Multiple choice: id, title, image, question, explanation, answer, otherOptions, reference

// Topic1: Basic facts about JavaScript

// Multiple choice
var question1 = {
  id: 0,
  title: 'Founding',
  image: '',
  question: 'When and by whom was JavaScript created?',
  explanation: '',
  answer: 'By Brendan Eich in 1995',
  otherOptions: [
    'By Rasmus Lerdorf in 1994',
    'By Brendan Eich in 1997',
    'By James Gosling in 1991',
  ],
  reference: '/history.html', // First line
};

// Open
var question2 = {
  id: 1,
  title: 'ECMA',
  image: '',
  question: 'When did JavaScript become an ECMA standard?',
  explanation: '',
  answer: '1997',
  reference: '/versionsFrameworks.html', // First line
};

// Open
var question3 = {
  id: 2,
  title: 'Naming',
  image: '',
  question: 'What was the former name of JavaScript?',
  explanation: '',
  answer: 'Mocha',
  reference: '/history.html', // 12th line
};
