var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
    if(req.session.loggedin){
        var username = req.session.username;
        var progress = req.session.progress;
        return res.render('profile', { title: 'Profile', message: username, messageTwo: progress});
    }
    else{
        console.log("You should login first you ape")
        res.redirect('/login')
    }

});

router.get('/logout', function(req,res)
{
    req.session.destroy();
    res.redirect('/index.html');
});

module.exports = router;