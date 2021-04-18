#!/usr/bin nodejs
const http = require('http');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8015;

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Logger
app.use(morgan('tiny'));

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

// Routers
app.use('/admin', require('./routes/admin'));
app.use('/register', require('./routes/register'));
app.use('/profile', require('./routes/profile'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/getProgress', require('./routes/progressGetter'));
app.use('/topics', require('./routes/topicsQuizzesQuestions'));
app.use(
  '/topics/:topicId/quizzes/',
  require('./routes/topics/quizzes/answerChecker')
);
app.use('/api', require('./routes/api'));

// Minimal error Handler
app.use((err, req, res, next) => {
  res.status(500).send('Server error');
});
const server = app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

server.on('connection', socket => {
  console.log('New Connection...');
});
