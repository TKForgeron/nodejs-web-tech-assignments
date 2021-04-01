const express = require('express');
const router = express.Router();
const updateProgressToDB = require('../controllers/dbUpdaters/updateProgressController');

router.post('/', require('../controllers/logout/logoutController'));

module.exports = router;
