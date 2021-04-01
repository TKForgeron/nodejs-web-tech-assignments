var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
//var db = require('../database');

router.get('/', require('../controllers/loginController'));

router.post('/auth', require('../controllers/loginAuthController'));

module.exports = router;
