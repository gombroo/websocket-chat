const express = require('express');
const path = require('path');
const socket = require('socket.io'); // import socket.io package

const app = express();
const messages = [];
let users = [];

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});


// run server
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});

const io = socket(server); // socket.io integration with server


// find new connection (socket) and listen to event (message), disconect after user leaves
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (user) => {
    console.log('New user ' + socket.id + ' added!');
    users.push(user); 
    socket.broadcast.emit('user', user);
    socket.broadcast.emit('join', user);
    console.log('Oh, ' +  user.author + ' has joined the conversation!');
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => { 
    const user = users.find((user) => user.id == socket.id);
    users = users.filter(user => user.id !== socket.id);
    socket.broadcast.emit('leave', user);
    console.log('Oh, socket ' + socket.id + ' has left');
    });
  
    //console.log('I\'ve added a listener on message and disconnect events \n');  
  });

