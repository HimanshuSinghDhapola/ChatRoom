import express from 'express';
import {createServer} from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const port=3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
})

const users = {};

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
})

io.on('connection', (socket) => {
  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
    console.log('New user Connected');
    console.log(`${users[socket.id]} with id: ${socket.id} joined the room`)
  });

  socket.on('send-message', (data) => {
    socket.broadcast.emit('receive-message', data);
  })
})

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
})

// const express = require('express')
// const {createServer} = require('node:http');
// const {join} = require('node:path');
// const {Server} = require('socket.io');
// port=3000;

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   connectionStateRecovery: {}
// });

// app.get('/', function (req, res) {
//   res.sendFile(join(__dirname, 'index.html'));
// })

// io.on('connection', (socket) => {
//   console.log('a user is connected');

//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   })

//   socket.on('disconnect' , () => {
//     console.log('user disconnected');
//   })
// })

// server.listen(port, () => {
//   console.log(`A server is running at port ${port}`)
// });