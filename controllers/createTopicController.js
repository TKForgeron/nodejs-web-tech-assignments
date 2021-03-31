const dbAdder = require('../models/dbAdd');

module.exports = (req, res) => {
  dbAdder
    .addTopic(JSON.stringify(req.body))
    .then(topic => {
      res.status(200).json({ topicId: topic });
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add topic' });
    });
};
