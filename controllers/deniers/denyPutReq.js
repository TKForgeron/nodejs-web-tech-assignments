module.exports = (req, res) => {
  res.status(403).json({ message: 'PUT requests to here are forbidden' });
};
