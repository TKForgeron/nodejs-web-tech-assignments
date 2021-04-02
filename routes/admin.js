var express = require('express');
var router = express.Router();

router.get('/', require('../controllers/adminController'));

// admin functionality: adding and getting user info to and fro the database
router.get('/users', require('../controllers/dbGetters/getUsersController'));
router.post(
  '/users/data',
  require('../controllers/dbGetters/getUserDataController')
);

module.exports = router;
