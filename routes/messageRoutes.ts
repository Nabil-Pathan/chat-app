import express from "express"
import { verifyToken } from "../middleware/verifyUser"
import { allMessagesController, sendMessageController } from "../controllers/messageController"
const router = express.Router()

router.post('/send-message', verifyToken , sendMessageController)
router.get('/all-messages/:chatId', verifyToken , allMessagesController)


export default router