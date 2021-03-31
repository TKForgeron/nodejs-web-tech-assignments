const dbRemover = require('../../models/dbRemove');

module.exports = (req, res) => {
  dbRemover.removeTopics();
};
