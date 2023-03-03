const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

io.on('connection',(socket)=>{
   
   
   
    // let user
    socket.on("join room",detail=>{
        socket.join(detail.room)
        console.log(`user with socket id ${socket.id} has joined ${detail.room}`)
        socket.to(detail.room).emit("new user joined",socket.id)
    })
    // socket.on("new user joined",socket_id=>{
    //     console.log("it is")
    //     socket.emit('check',socket_id)
    // })
   
    // socket.on("offer send",data=>{ 
        
    //     console.log("offer sent  from ",socket.id,data)
    //     socket.to(room).emit("receive offer",data)
    // })

    // socket.on("answer send",answer=>{
    //     console.log("answer sent from",socket.id)

    //     socket.to(room).emit("receive answer",answer)
    // })

    // socket.on("disconnect",()=>{
    //     console.log("disconnected")
 
    //     socket.to(room).emit('left',socket.id)
    // })
    
    socket.on('leave room',(detail)=>{
        if(detail.room)console.log(`left from the room id : ${detail.room}`)
        socket.leave(detail.room)
        socket.to(detail.room).emit('left',socket.id)

    })
    // socket.on("ice candidate send",(ice_candidate)=>{
    //     console.log("ice candidate",socket.id)

    //     socket.to(room).emit('ice candidate received',ice_candidate)

    // })

})
 

server.listen(8000,()=>{
    console.log("web socket server started")
})

