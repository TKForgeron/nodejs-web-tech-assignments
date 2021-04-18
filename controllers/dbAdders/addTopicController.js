// Adds a topic to the database
const dbAdder = require('../../models/dbAdd');
const helpers = require('../controllerHelpers');

module.exports = (req, res) => {
  let topic = req.body;

  if (!helpers.isJson(topic)) {
    topic = JSON.stringify(topic);
  }

  dbAdder
    .addTopic(topic)
    .then(id => {
      res.status(200).json({ topicId: id });
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add topic' });
    });
};
