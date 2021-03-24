var express = require('express');
var app = express();

app.use('/assignment3', express.static(__dirname + '/public'));

app.get('/helloThere', function(request, response) {
    response.send('Hello there, from me!')
});

app.listen(8015, function(){
    console.log('Listening at Port 8015');
})