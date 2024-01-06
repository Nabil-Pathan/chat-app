"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChat = exports.accessChatController = void 0;
const chatModal_1 = __importDefault(require("../models/chatModal"));
const userModel_1 = __importDefault(require("../models/userModel"));
const accessChatController = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.sendStatus(400);
        }
        var isChat = await chatModal_1.default.find({
            isGroupChat: false,
            users: {
                $all: [req.user._id, userId],
            },
        })
            .populate("users", "-password")
            .populate("latestMessage");
        const populatedChat = await userModel_1.default.populate(isChat, {
            path: 'latestMessage.sender',
            select: "name pic email",
        });
        if (isChat.length > 0) {
            res.status(200).send(isChat[0]);
        }
        else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            };
            try {
                const createdChat = await chatModal_1.default.create(chatData);
                const fullChat = await chatModal_1.default.findOne({ _id: createdChat._id }).populate("users", "-password");
                res.status(200).send(fullChat);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};
exports.accessChatController = accessChatController;
const fetchChat = async (req, res) => {
    try {
        const results = await chatModal_1.default.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });
        const populatedResults = await userModel_1.default.populate(results, {
            path: 'latestMessage.sender',
            select: 'name pic email',
        });
        res.status(200).send(populatedResults);
    }
    catch (error) {
        res.status(400);
        console.log(error.message);
    }
};
exports.fetchChat = fetchChat;
//# sourceMappingURL=chatControllers.js.map