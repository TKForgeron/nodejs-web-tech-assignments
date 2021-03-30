module.exports = (req, res) => {
  dbFinder
    .findQuizById(req.params.id)
    .then(quiz => {
      if (quiz) {
        res.status(200).json(quiz);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unable to perform 'findQuizById' operation" })
    );
};
