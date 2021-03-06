// This router handles the profile page, including the editing of your password
var express = require('express');
var router = express.Router();

router.get('/', require('../controllers/profile/profileController'));

router.get(
  '/edit/unsuccessful',
  require('../controllers/profile/editProfileErrorController')
);
router.post('/edit', require('../controllers/profile/editProfileController'));

module.exports = router;
