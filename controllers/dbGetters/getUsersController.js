// Getting of user data happens here
const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  dbFinder
    .findAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Unable to perform 'findAllUsers' operation",
      });
    });
};
