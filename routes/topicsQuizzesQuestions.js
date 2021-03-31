const express = require('express');
const router = express();

router.use(require('./topics/topics'));
router.use(require('./topics/quizzes/quizzes'));
router.use(require('./topics/quizzes/questions/questions'));

module.exports = router;
