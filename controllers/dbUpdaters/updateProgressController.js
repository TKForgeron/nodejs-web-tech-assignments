const dbUpdater = require('../../models/dbUpdate');
const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  
};