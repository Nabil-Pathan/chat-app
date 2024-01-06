import { getAllUsersController } from "../controllers/userControllers"
import express from "express"
import { verifyToken } from "../middleware/verifyUser"



const router = express.Router()

router.get('/all-users',verifyToken , getAllUsersController)


export default router