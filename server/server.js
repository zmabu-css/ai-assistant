const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { recognizeSpeech, performAction } = require('./ai-engine');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', async (msg) => {
    const response = await recognizeSpeech(msg);
    socket.emit('response', response);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
