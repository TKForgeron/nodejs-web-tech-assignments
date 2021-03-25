var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var db = require('../database');

router.get('/', function(req, res)
{
  // this does nothing cause we're using static html files
});

router.post('/auth', async function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var encryptedPassword = await bcrypt.hash(password,10)

    db.run("INSERT INTO Accounts VALUES (?,?)", [username,encryptedPassword], (err) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
      }
      else{
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/index.html')
      }
    })
    console.log(username + ' , ' + password + ' , ' + encryptedPassword);    
})

module.exports = router;