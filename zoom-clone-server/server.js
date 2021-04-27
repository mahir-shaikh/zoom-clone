const PORT = process.env.PORT || 3000;

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server,{
    cors: true,
    origins: ["*"]
})

io.on("connection", (socket)=>{
    console.log("Socket connection started");

    socket.on("join-room", (data)=>{
        let roomId = data.roomId
        let userId = data.userId
        console.log(`${userId} has connected ${roomId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            console.log(`${userId} has dis-connected from ${roomId}`)
            socket.broadcast.to(roomId).emit('user-disconnected', userId)
        })
    })
})

server.listen(PORT, ()=>{
    console.log("Server is running on port:", PORT)
})