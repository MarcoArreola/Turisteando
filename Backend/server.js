const express = require('express');
var app = express();
var server = require('http').Server(app)
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('join', (room) => {
      socket.join(room);
      console.log(`${socket.id} se unió a la sala ${room}`);
    });
  
    socket.on('event', (res) => {
      const data = res;
      console.log(res);
    });

    socket.on('test-event', (res) => {
      console.log(res);
    });
});

server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

server.listen(5000, () => {
    console.log('Socket listening port number 5000');
})

