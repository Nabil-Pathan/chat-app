"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./db/connection");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
const server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/chat', chatRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/message', messageRoutes_1.default);
const Port = process.env.PORT;
const __dirname1 = path_1.default.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname1, "/client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname1, "client", "build", "index.html"));
    });
}
else {
    app.get('/', (req, res) => {
        res.send('API Running Successfully !');
    });
}
io.on('connection', (socket) => {
    console.log(`User Connected ${socket.id}`);
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });
    socket.on('join-chat', (room) => {
        socket.join(room);
        console.log('User Joined the room' + room);
    });
    socket.on('new-message', (newMessageRecieved) => {
        console.log(newMessageRecieved);
        var chat = newMessageRecieved.chat;
        console.log("Chat", chat);
        if (!chat.users)
            return console.log('chat.users not defined');
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
});
connection_1.connection.once('open', () => {
    console.log('Connected to Mongodb Database');
});
server.listen(Port, () => {
    console.log(`Listening on Port ${Port}`);
});
//# sourceMappingURL=index.js.map