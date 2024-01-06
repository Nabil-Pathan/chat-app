"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("../middleware/verifyUser");
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
router.post('/send-message', verifyUser_1.verifyToken, messageController_1.sendMessageController);
router.get('/all-messages/:chatId', verifyUser_1.verifyToken, messageController_1.allMessagesController);
exports.default = router;
//# sourceMappingURL=messageRoutes.js.map