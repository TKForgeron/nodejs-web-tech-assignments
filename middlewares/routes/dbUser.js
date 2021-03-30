const express = require('express');
const server = express();
const dbOperations = require('../../models/dbHelpers');
const bcrypt = require('bcrypt');

server.use(express.json());

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  return res.render('register', { title: 'Register' });
});

server.post('/auth', async function (req, res) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  let user = JSON.stringify(req.body);
  let actualUsername = user.username;

  dbOperations
    .addUser(user)
    .then(result => {
      console.log(`then of registerUser (in POST, dbUser.js): ${result}`);
      res.status(200);
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
