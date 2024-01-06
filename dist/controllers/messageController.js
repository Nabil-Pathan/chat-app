"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMessagesController = exports.sendMessageController = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const chatModal_1 = __importDefault(require("../models/chatModal"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sendMessageController = async (req, res) => {
    try {
        const { chatId, content } = req.body;
        if (!content || !chatId) {
            console.log("Invalid data passed into request");
            return res.status(400).json({ error: "Provide All Details" });
        }
        var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId
        };
        var message = await messageModel_1.default.create(newMessage);
        message = await message.populate("sender", "name");
        message = await message.populate("chat");
        const createdMessage = await userModel_1.default.populate(message, {
            path: 'chat.users',
            select: 'name email'
        });
        await chatModal_1.default.findByIdAndUpdate(req.body.chatId, {
            latestMessage: createdMessage
        });
        res.json(createdMessage);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.sendMessageController = sendMessageController;
const allMessagesController = async (req, res) => {
    try {
        const messages = await messageModel_1.default.find({ chat: req.params.chatId }).populate("sender", "name email").populate("chat");
        return res.json({ messages }).status(200);
    }
    catch (error) {
        console.log("From All Messages", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.allMessagesController = allMessagesController;
//# sourceMappingURL=messageController.js.map