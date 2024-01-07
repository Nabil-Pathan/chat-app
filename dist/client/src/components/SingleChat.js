"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const UserContext_1 = require("../context/UserContext");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const Loader_1 = __importDefault(require("./Loader"));
const ENDPOINT = "http://localhost:5000";
const socket = (0, socket_io_client_1.default)(ENDPOINT);
const SingleChat = () => {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const params = (0, react_router_dom_1.useParams)();
    const selectedUserId = params.userId;
    const { user } = (0, UserContext_1.useUserContext)();
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [newMessage, setNewMessage] = (0, react_1.useState)('');
    const [chatId, setChatId] = (0, react_1.useState)('');
    const [chatUser, setChatUser] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const fetchChat = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios_1.default.post(`/api/chat/access-chat`, { userId: selectedUserId }, config);
            setChatId(data._id);
            const matchedUser = data.users.find((user) => user._id === selectedUserId);
            if (matchedUser) {
                setChatUser(matchedUser);
            }
            setLoading(false);
        }
        catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios_1.default.post('/api/message/send-message', {
                chatId: chatId,
                content: newMessage,
            }, config);
            socket.emit("new-message", data);
            setMessages((prevMessages) => [...prevMessages, data]);
            setNewMessage('');
        }
        catch (error) {
            console.log(error.message);
        }
    };
    const fetchMessages = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios_1.default.get(`/api/message/all-messages/${chatId}`, config);
            setMessages(data.messages);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    };
    (0, react_1.useEffect)(() => {
        if (selectedUserId !== '' && selectedUserId !== null) {
            fetchChat();
        }
        if (chatId !== '' && chatId !== null) {
            fetchMessages();
        }
        if (socket && chatId) {
            socket.emit('setup', { _id: user.user._id });
            socket.emit('join-chat', chatId);
        }
    }, [socket, selectedUserId, chatId]);
    (0, react_1.useEffect)(() => {
        socket.on('message received', (newMessageReceived) => {
            setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        });
        return () => {
            socket.off('message received');
        };
    }, [socket, messages]);
    (0, react_1.useEffect)(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);
    const sentMessageClasses = 'max-w-3/4 mb-4 p-4 rounded bg-gray-800 text-white';
    const receivedMessageClasses = 'max-w-3/4 mb-4 p-4 rounded bg-gray-300';
    const handleNavigate = () => {
        navigate('/chats');
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "w-full h-screen flex flex-col" },
            react_1.default.createElement("div", { className: "flex items-center gap-4 p-4 bg-gray-800 text-white sticky top-0" },
                react_1.default.createElement("button", { className: 'border border-gray-300 shadow-md px-4 py-3 rounded-md', onClick: handleNavigate },
                    react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2.5, stroke: "currentColor", className: "w-6 h-6" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" }))),
                chatUser &&
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("img", { src: chatUser.pic, className: 'w-9 h-9 object-cover rounded-full', alt: "profile" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-bold" }, chatUser.name))),
            loading ? (react_1.default.createElement(Loader_1.default, null)) : (react_1.default.createElement("div", { id: "chat-container", className: "flex-1 w-full bg-gray-100 overflow-y-auto p-4", style: { scrollBehavior: 'auto' } }, messages.map((message, index) => (react_1.default.createElement("div", { key: index, className: `flex items-end ${message.sender._id === user.user._id ? 'justify-end' : 'justify-start'}` },
                react_1.default.createElement("div", { className: message.sender._id === user.user._id ? sentMessageClasses : receivedMessageClasses }, message.content)))))),
            react_1.default.createElement("div", { className: "p-4 sticky bottom-0" },
                react_1.default.createElement("form", { onSubmit: sendMessage, className: "flex items-center" },
                    react_1.default.createElement("input", { type: "text", placeholder: "Type your message...", value: newMessage, onChange: (e) => setNewMessage(e.target.value), className: "flex-1 rounded-md outline-none  mr-2" }),
                    react_1.default.createElement("button", { type: "submit", className: "bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded" },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-7 h-7" },
                            react_1.default.createElement("path", { d: "M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" }))))))));
};
exports.default = SingleChat;
//# sourceMappingURL=SingleChat.js.map