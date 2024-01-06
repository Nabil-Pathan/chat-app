import express from "express"
import { SignUpController, SigninController } from "../controllers/authController"


const router = express.Router()

router.post('/signup', SignUpController)
router.post('/signin', SigninController)


export default router