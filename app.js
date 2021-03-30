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
app.use(express.urlencoded({ extended: false }));
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

const registerRouter = require('./routes/dbUser');
const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login');
const topicQuizQuestionApi = require('./routes/dbTopicQuizQuestion');

app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/api', topicQuizQuestionApi);

const server = app.listen(port, function () {
  console.log(`Server Listening on port ${port}`);
});

server.on('connection', socket => {
  console.log('New Connection...');
});
