const express = require('express');
var app = express();
var server = require('http').Server(app)
const io = require('socket.io')(server);
const { addUser, removeUser, getUser,
  getUsersInRoom } = require("./user");

    io.on("connection", (socket) => { 
      socket.on('join', ({ name, room }, callback) => {
   
          const { error, user } = addUser(
              { id: socket.id, name, room });
   
          if (error) 
            return callback(error);
   
          socket.emit('message', { user: 'admin', text:
              `${user.name},
              welcome to room ${user.room}.` });
   
          socket.broadcast.to(user.room)
              .emit('message', { user: "admin",
              text: `${user.name}, has joined` });
          
          io.to(user.room).emit('roomData', { 
            room: user.room,
            users: getUsersInRoom(user.room)
          });
   
          
          
          socket.join(user.room);
          
          

          callback();
      })

      socket.on('event', (res) => {
        const user = getUser(socket.id);
        const data = res;
        console.log(res);
  
        socket.to(user.room).emit('event', data);
        });
   
      socket.on('sendMessage', (message, callback) => {
   
          const user = getUser(socket.id);
          io.to(user.room).emit('message',
              { user: user.name, text: message });
   
          io.to(user.room).emit('roomData', {
              room: user.room,
              users: getUsersInRoom(user.room)
          });
          callback();
      })
   
      socket.on('disconnect', () => {
          const user = removeUser(socket.id);
          if (user) {
              io.to(user.room).emit('message',
              { user: 'admin', text:
              `${user.name} had left` });
          }
      })

   
  })


server.listen(5000, () => {
    server.prependListener("request", (req, res) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
    });


    console.log('Socket listening port number 5000');
});