import { Request , Response } from "express"
import User, { UserDocument } from "../models/userModel";

export const getAllUsersController = async (req: Request | any, res : Response) =>{
    try {
        const users = await User.find({_id :{ $ne : req.user._id} })
        return res.json({users}).status(200)
    } catch (error: any) {
        console.log(error.message);
    }
}


export const searchUserController = async (req: Request, res: Response) => {
    try {
      const { searchQuery } = req.query;
  
      const users: UserDocument[] = await User.find({
        name: { $regex: searchQuery || '', $options: 'i' },
      });
  
      return res.status(200).json(users);
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ errors: ["Internal server error"] });
    }
  };
  
