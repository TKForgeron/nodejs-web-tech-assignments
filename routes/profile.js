var express = require('express');
var router = express.Router();

router.get('/', require('../controllers/profileController'));

module.exports = router;
