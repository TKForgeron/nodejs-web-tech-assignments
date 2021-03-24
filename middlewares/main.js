var express = require('express');
var app = express();

//Making all the static webpages available
app.use('/assignment3', express.static(__dirname + '/public'));

//Just outputting some text to see if it is working
app.get('/helloThere', function(request, response) {
    response.send('Hello there, from me!')
});

app.listen(8015, function(){
    console.log('Listening at Port 8015');
})
