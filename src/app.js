#!/usr/bin nodejs
const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World.');
});

server.on('connection', (socket) => {
    console.log("New Connection...");
});

server.listen(8015, 'localhost');