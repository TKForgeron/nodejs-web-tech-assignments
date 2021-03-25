#!/usr/bin nodejs
var http = require('http');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');


var app = express();
const port = process.env.PORT || 3000;

// Session
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ path: '/', httpOnly: true, secure: false, maxAge: null, secret: "session", resave: false, saveUninitialized: false }));


var registerRouter = require('./routes/register');

app.use('/register', registerRouter);

var server = app.listen(port, function() { console.log(`Server Listening on port ${port}`); });

server.on('connection', (socket) => {
    console.log("New Connection...");
});
