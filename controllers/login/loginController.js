module.exports = (req, res) => {
  if (req.session.loggedin) {
    console.log("You're already logged in");
    res.redirect('/profile');
  } else {
    return res.render('login', { title: 'Login' });
  }
};
