module.exports = (req, res) => {
  dbAdder
    .addTopic(req.body)
    .then(topic => {
      res.status(200).json(topic);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add topic' });
    });
};
