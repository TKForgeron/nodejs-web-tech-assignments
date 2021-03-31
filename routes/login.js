var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
//var db = require('../database');

router.get('/', function (req, res) {
  // this does nothing cause we're using static html files
  if (req.session.loggedin) {
    console.log("You're already logged in");
    res.redirect('/profile');
  } else {
    //Database stuff goes here
    foundInDatabase = true;
    if (foundInDatabase) {
      return res.render('login', { title: 'Login' });
    } else {
      console.log('wrong credentials');
    }
  }
});

router.post('/auth', require('../controllers/loginAuthController'));

module.exports = router;
