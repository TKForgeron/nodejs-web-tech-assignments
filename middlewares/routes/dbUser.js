const express = require('express');
const server = express();
const dbOperations = require('../../models/dbHelpers');
const bcrypt = require('bcrypt');

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  return res.render('register', { title: 'Register' });
});

server.post('/auth', async function (req, res) {
  let encryptedPassword = await bcrypt.hash(req.body.password, 10);
  let actualUsername = req.body.username;
  
  dbOperations
    .registerUser(actualUsername,encryptedPassword)
    .then(result => {
      console.log('then of registerUser (in POST, dbUser.js)');
      console.log('post then result: ' + result);
      //res.status(200).json(result);
      req.session.loggedin = true;
      req.session.username = actualUsername;
      req.session.progress = 0;
      res.redirect('/profile');
    })
    .catch(error => {
      console.log('catch of registerUser (in POST, dbUser.js)');
      res
        .status(500)
        .json({ message: "Unable to perform 'registerUser' operation" });
    });
});

module.exports = server;
