const express = require('express');
const dbOperations = require('../../models/dbHelpers');
const bcrypt = require('bcrypt');
const server = express();

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  return res.render('register', { title: 'Register' });
});

server.post('/auth', (req, res) => {
  req.body.password = bcrypt.hash(password, 10);

  dbOperations
    .registerUser(req.body)
    .then(user => {
      res.status(200).json(user);
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/index.html');
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to perform 'registerUser' operation" });
    });
  console.log(username + ' , ' + password + ' , ' + encryptedPassword);
});

module.exports = server;
