module.exports = (req, res) => {
  dbAdder
    .addQuiz(req.body)
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add quiz' });
    });
};
