const express = require('express');
const router = express();

router.post('/', require('../../controllers/adders/addTopicController'));

router.get('/', require('../../controllers/getters/getTopicsController'));

router.patch(
  '/:topicId',
  require('../../controllers/updaters/updateTopicController')
);

router.delete(
  '/:topicId',
  require('../../controllers/removers/removeTopicController')
);

router.delete(
  '/',
  require('../../controllers/removers/removeTopicsController')
);

module.exports = router;
