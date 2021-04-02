#!/usr/bin nodejs
const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Session
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null,
    secret: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/admin', require('./routes/admin'));
app.use('/register', require('./routes/register'));
app.use('/profile', require('./routes/profile'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

app.use('/topics', require('./routes/topicsQuizzesQuestions'));
app.use(
  '/topics/:topicId/quizzes/',
  require('./routes/topics/quizzes/answerChecker')
);
// app.use('/api', require('./routes/apiForPublic'));

const server = app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

server.on('connection', socket => {
  console.log('New Connection...');
});
