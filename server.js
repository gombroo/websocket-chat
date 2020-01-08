const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io'); // import socket.io package
const messages = [];
const users = [];

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});


// run server
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server); // socket.io integration with server, make server ready for communication with clients


// find new connection (socket) and listen to event (message), disconect after user leaves
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  // socket.on('message', () => { console.log('Oh, I\'ve got something from ' + socket.id) }); 
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });
  console.log('I\'ve added a listener on message and disconnect events \n');

  socket.on('join', (user) => {
    console.log('New user' + socket.id + 'added!');
    users.push(user);
  });
});
