const express = require('express');
const router = express();

router.post('/', require('../../controllers/dbAdders/addTopicController'));

router.get('/', require('../../controllers/dbGetters/getTopicsController'));

router.patch(
  '/:topicId',
  require('../../controllers/dbUpdaters/updateTopicController')
);

router.delete(
  '/:topicId',
  require('../../controllers/dbRemovers/removeTopicController')
);

router.delete(
  '/',
  require('../../controllers/dbRemovers/removeTopicsController')
);

module.exports = router;
