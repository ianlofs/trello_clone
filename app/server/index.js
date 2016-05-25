'use strict';

let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let models = require('./models.js');

let User = models.User;
let Board = models.Board;
let List = models.List;
let Card = models.Card;

server.listen(3000);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
