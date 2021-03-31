module.exports = (req, res) => {
  res.status(403).json({ message: 'POST requests to here are forbidden' });
};
