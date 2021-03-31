const dbRemover = require('../../models/dbRemove');

module.exports = (req, res) => {
  const { id } = req.params;
  dbRemover
    .removeQuestion(id)
    .then(deletedRecordsAmt => {
      if (deletedRecordsAmt > 0) {
        res.status(200).json({ message: `Record ${id} successfully deleted` });
      } else {
        res.status(404).json({ message: `Record ${id} not found` });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unable to perform 'removeQuestion' operation" })
    );
};
