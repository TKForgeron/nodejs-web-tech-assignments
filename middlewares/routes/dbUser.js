const express = require('express');
const server = express();
const dbOperations = require('../../models/dbHelpers');
const bcrypt = require('bcrypt');

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  return res.render('register', { title: 'Register' });
});

server.post('/auth', async function (req, res) {
  const user = {};
  user.username = req.params.username;
  user.password = req.params.password;

  dbOperations
    .registerUser(JSON.stringify(user))
    .then(test => {
      console.log('im in the then');
      // res.status(200).json(test);
      // req.session.loggedin = true;
      // req.session.username = username;
      // res.redirect('../profile');
    })
    .catch(error => {
      console.log('im in the catch');
      res
        .status(500)
        .json({ message: "Unable to perform 'registerUser' operation" });
    });
});

module.exports = server;
