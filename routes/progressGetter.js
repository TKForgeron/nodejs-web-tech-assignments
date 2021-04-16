const express = require('express');
const router = express();

router.get('/', require('../controllers/sessionProgressGetter'))

module.exports = router;