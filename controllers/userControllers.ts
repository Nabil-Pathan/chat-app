import { Request , Response } from "express"
import User from "../models/userModel";

export const getAllUsersController = async (req: Request | any, res : Response) =>{
    try {
        const users = await User.find({_id :{ $ne : req.user._id} })
        return res.json({users}).status(200)
    } catch (error: any) {
        console.log(error.message);
    }
}