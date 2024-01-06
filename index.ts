import express from "express"
import { connection } from "./db/connection"
import dotenv from "dotenv"
import http from "http";
import cors from "cors"
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes"
import chatRoutes from "./routes/chatRoutes"
import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoutes"
import { UserDocument  } from "./models/userModel";
import { ChatDocument } from "./models/chatModal"
import path from "path";


dotenv.config()

const app = express()
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions))


const server = http.createServer(app)

var io = new  Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
}) 


app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/user', userRoutes)
app.use('/api/message', messageRoutes)

const Port = process.env.PORT 

const __dirname1 = path.resolve()

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname1, "/client/build")))

  app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  })
}

else{
  app.get('/',(req,res)=>{
      res.send('API Running Successfully !')
  })
}

  io.on('connection',(socket)=>{
    console.log(`User Connected ${socket.id}`);
    
    socket.on("setup", (userData)=>{
       socket.join(userData._id)
       console.log(userData._id);
       socket.emit("connected")
    })

    socket.on('join-chat', (room)=>{
        socket.join(room)
        console.log('User Joined the room' + room);
      })

      socket.on('new-message', (newMessageRecieved: { chat: ChatDocument ; sender: UserDocument; content: string }) => {
        console.log(newMessageRecieved);
        
        var chat = newMessageRecieved.chat;
        console.log("Chat",chat);
        
      
        if (!chat.users) return console.log('chat.users not defined');

        console.log(chat
          .users);
        
        chat.users.forEach(user => {
          if (user._id === newMessageRecieved.sender._id) {
            return;
          }
          
          io.to(user._id).emit("message received", newMessageRecieved);
        });
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
})


connection.once('open',()=>{
    console.log('Connected to Mongodb Database');
})



server.listen(Port , ()=>{
    console.log(`Listening on Port ${Port}`);
})