const express = require('express');
const app = express();

const { createServer } = require('http');
const server = createServer(app);

const { Server } = require("socket.io");

const port = 3001;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("join_room", ({ user, room }) => {
        socket.join(room);
    });

    socket.on("send_msg", ({ room, user, message }) => {
        const data = { user: user, message: message };
        socket.to(room).emit("receive_msg", data);
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
