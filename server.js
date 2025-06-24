require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db');
const socketHandler = require('./socket');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, 'public')));

connectDB().then(() => {
  socketHandler(io);
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
