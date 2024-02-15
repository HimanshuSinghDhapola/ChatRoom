import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "https://chatroom-01.netlify.app",
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", `${name} joined the chat`);
  });

  socket.on("send-message", (data) => {
    socket.broadcast.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    if (users[socket.id] !== undefined) {
      socket.broadcast.emit("user-left", `${users[socket.id]} left the chat`);
      delete users[socket.id];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
