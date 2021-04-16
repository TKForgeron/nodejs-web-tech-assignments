const express = require('express');
const router = express();

router.get('/', function (req,res){
    res.status(200).send(req.session.progressArray);
})

module.exports = router;