// This router handles registration and re-routing of the register page if a person is already logged in
const express = require('express');
const server = express();

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  if (req.session.loggedin) {
    console.log('Logout first before registering again');
    res.redirect('/profile');
  } else {
    return res.render('register', {
      title: 'Register',
      loginOrLogout: 'login',
    });
  }
});

server.post(
  '/auth',
  require('../controllers/dbAdders/addUserController')
  // .then(res => {
  //   console.log(res);
  // })
  // .catch(err => {
  //   console.log(err);
  // })
);

module.exports = server;
