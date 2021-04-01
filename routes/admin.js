var express = require('express');
var router = express.Router();

router.get('/', require('../controllers/adminController'));

module.exports = router;
