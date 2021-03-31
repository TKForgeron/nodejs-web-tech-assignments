const express = require('express');
const server = express();

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  return res.render('register', { title: 'Register' });
});

server.post('/auth', require('../controllers/dbAdders/addUserController'));

module.exports = server;
