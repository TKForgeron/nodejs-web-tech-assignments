const dbUpdater = require('../../models/dbUpdate');

module.exports = (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  dbUpdater
    .updateQuestion(id, changes)
    .then(quiz => {
      if (quiz) {
        res.status(200).json(quiz);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to perform 'update' operation" });
    });
};
