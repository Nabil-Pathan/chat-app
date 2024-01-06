import jwt , { JwtPayload} from "jsonwebtoken"
import User from "../models/userModel"
import { Request , Response , NextFunction } from "express"
import dotenv from "dotenv"

dotenv.config()

export const verifyToken = async (req : Request | any ,res : Response ,next : NextFunction)=>{

    try {
         const { authorization } = req.headers

         if(!authorization){
            return res.status(401).json({ err: "You must be logged in! Token not given" });
         }

         const token = authorization.replace("Bearer ","")

         const decodedToken = jwt.verify(token , process.env.JWT_SECRET!) as JwtPayload

         const user = await User.findById(decodedToken.id)

         if (!user) {
            return res.status(401).send({ err: "User not found" });
        }

         req.user = user 

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).send({ err: "Invalid token" });
    }
}