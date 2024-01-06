import express from "express"
import { accessChatController, fetchChat } from "../controllers/chatControllers"
import { verifyToken } from "../middleware/verifyUser"

const router = express.Router()

router.post('/access-chat', verifyToken,  accessChatController)
router.get('/fetch-chat', verifyToken,  fetchChat)

export default router