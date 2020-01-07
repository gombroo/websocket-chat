const express = require('express');
const path = require('path');
const app = express();

// sigle client connection with server
const socket = require('socket.io');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});


const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

// find new connection (socket) and listen to event (message)
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', () => { console.log('Oh, I\'ve got something from ' + socket.id) });
  console.log('I\'ve added a listener on message event \n');
});

// app.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });

