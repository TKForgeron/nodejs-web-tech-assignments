// This is the admin page router, the admin can edit and things in the database from the website
// This page is only accessible if you are logged in as the admin
var express = require('express');
var router = express.Router();

router.get('/', require('../controllers/admin/adminController'));

// admin functionality: adding and getting user info to and fro the database
router.get('/users', require('../controllers/dbGetters/getUsersController'));
router.post(
  '/users/data',
  require('../controllers/dbGetters/getUserDataController')
);

module.exports = router;
