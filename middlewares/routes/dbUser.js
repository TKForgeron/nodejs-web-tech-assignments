const express = require('express');
const dbOperations = require('../../models/dbHelpers');
const bcrypt = require('bcrypt');
const server = express();

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  return res.render('register', { title: 'Register' });
});

server.post('/auth', async (req, res) => {
  let password = await bcrypt.hash(req.body.password, 10);
  const body = {
    // username: req.body.username,
    // password: password,
    username: 'name',
    password: 'ww',
  };

  let json = JSON.stringify(body);

  // console.log(json);

  dbOperations
    .registerUser(json)
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
});

module.exports = server;
