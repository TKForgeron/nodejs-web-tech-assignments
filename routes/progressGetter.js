// This router gets the session progress for the client
// This happens via an AJAX request when loading the assessment page
const express = require('express');
const router = express();

router.get('/', require('../controllers/sessionProgressGetter'))

module.exports = router;