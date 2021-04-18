// Getting of quizzes data happens here
const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  const topicId = req.params.topicId;
  

  dbFinder
    .findQuizzesByTopicId(topicId)
    .then(quizzes => {
      res.status(200).json(quizzes);
    })
    .catch(error => {
      res.status(500).json({ message: 'could not retrieve quizzes' });
    });
};
