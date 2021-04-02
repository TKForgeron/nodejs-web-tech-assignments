const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  const userId_fk = req.body.userId;

  dbFinder
    .findStatsByUserId(userId_fk)
    .then(stats => {
      res.status(200).json(stats);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Unable to perform 'findStatsByUserId' operation",
      });
    });
};
