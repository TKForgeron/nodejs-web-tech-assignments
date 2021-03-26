#!/usr/bin nodejs
var http = require('http');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');


var app = express();
const port = process.env.PORT || 3000;

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Session
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ path: '/', httpOnly: true, secure: false, maxAge: null, secret: "session", resave: false, saveUninitialized: false }));


var registerRouter = require('./routes/register');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');

app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);

var server = app.listen(port, function() { console.log(`Server Listening on port ${port}`); });

server.on('connection', (socket) => {
    console.log("New Connection...");
});
