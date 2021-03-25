#!/usr/bin nodejs
const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World.');
});

server.on('connection', (socket) => {
    console.log(`New Connection on port ${port}...`);
});

const port = process.env.PORT || 3000;
server.listen(port, 'localhost');