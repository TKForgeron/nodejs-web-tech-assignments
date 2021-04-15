const express = require('express');
const server = express();

server.use(require('../controllers/apiAuthorizationController'));
server.use(require('./topics/topics'));
server.use(require('./topics/quizzes/quizzes'));
server.use(require('./topics/quizzes/questions/questions'));

server.delete('/', require('../controllers/deniers/denyDeleteReq'));
server.patch('/', require('../controllers/deniers/denyPatchReq'));
server.post('/', require('../controllers/deniers/denyPostReq'));
server.put('/', require('../controllers/deniers/denyPutReq'));

module.exports = server;
