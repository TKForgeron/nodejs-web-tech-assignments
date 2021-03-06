// Getting of topic data happens here
const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  dbFinder
    .findAllTopics()
    .then(topics => {
      res.status(200).json(topics);
    })
    .catch(error => {
      res.status(500).json({ message: 'could not retrieve topics' });
    });
};
