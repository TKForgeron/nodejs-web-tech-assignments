module.exports = (req, res) => {
  req.session.editProfileError = true;
  res.redirect('/profile');
};
