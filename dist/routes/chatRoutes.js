"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatControllers_1 = require("../controllers/chatControllers");
const verifyUser_1 = require("../middleware/verifyUser");
const router = express_1.default.Router();
router.post('/access-chat', verifyUser_1.verifyToken, chatControllers_1.accessChatController);
router.get('/fetch-chat', verifyUser_1.verifyToken, chatControllers_1.fetchChat);
exports.default = router;
//# sourceMappingURL=chatRoutes.js.map