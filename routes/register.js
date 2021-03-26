var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
//var db = require('../database');

router.get('/', function(req, res)
{
  // this does nothing cause we're using static html files
  return res.render('register', { title: 'Register'});
});

router.post('/auth', async function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var encryptedPassword = await bcrypt.hash(password,10)
    if(req.session.loggedin){
      console.log("You're already logged in you ape")
      res.redirect('/profile');
    }
    else{
      db.run("INSERT INTO Accounts VALUES (?,?)", [username,encryptedPassword], (err) => {
        if (err){
          console.log(err);
          res.sendStatus(500);
        }
        else{
          req.session.loggedin = true;
          req.session.username = username;
          req.session.progress = 0;
          res.redirect('/profile')
        }
      });
    }
    console.log(username + ' , ' + password + ' , ' + encryptedPassword);    
})

module.exports = router;