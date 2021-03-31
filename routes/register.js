const express = require('express');
const server = express();

server.get('/', (req, res) => {
  // this does nothing cause we're using static html files
  if(req.session.loggedin){
    console.log('Logout first before registering again');
    res.redirect('/profile')
  }
  else{
    return res.render('register', { title: 'Register' });
  }
});

server.post('/auth', require('../controllers/dbAdders/addUser'));

module.exports = server;
