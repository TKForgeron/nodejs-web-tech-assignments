// This router handles the login functions
var express = require('express');
var router = express.Router();

router.get('/', require('../controllers/login/loginController'));

router.post('/auth', require('../controllers/login/loginAuthController'));

module.exports = router;
