// This router handles the logout functions
const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/logout/logoutController'));
router.post('/', require('../controllers/logout/logoutController'));

module.exports = router;
