// Denies requests that are forbidden
module.exports = (req, res) => {
  res.status(403).json({ message: 'PATCH requests to here are forbidden' });
};
