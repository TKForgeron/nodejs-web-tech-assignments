var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
  return res.render('register', { title: 'Register', message: 'Piewpiewpiew'});
});

router.post('/auth', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + ' , ' + password);
})

module.exports = router;