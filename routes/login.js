var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
//var db = require('../database');

router.get('/', function (req, res) {
  if (req.session.loggedin) {
    console.log("You're already logged in");
    res.redirect('/profile');
  } else {
    return res.render('login', { title: 'Login' });
  }
});

router.post('/auth', require('../controllers/loginAuthController'));

module.exports = router;
