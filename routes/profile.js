var express = require('express');
var router = express.Router();

router.get('/', require('../controllers/profile/profileController'));
router.post('/edit', require('../controllers/profile/editProfileController'));

module.exports = router;
