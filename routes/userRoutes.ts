import { getAllUsersController, searchUserController } from "../controllers/userControllers"
import express from "express"
import { verifyToken } from "../middleware/verifyUser"


const router = express.Router()

router.get('/all-users',verifyToken , getAllUsersController)
router.get('/search-user',verifyToken , searchUserController)



export default router