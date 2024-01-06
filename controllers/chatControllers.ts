import Chat, { ChatDocument } from "../models/chatModal";
import { Request, Response } from "express";
import User, { UserDocument } from "../models/userModel";

export const accessChatController = async (req: Request | any, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.sendStatus(400);
    }

    var isChat: ChatDocument[] = await Chat.find({
      isGroupChat: false,
      users: {
        $all: [req.user._id, userId],
      },
    })
      .populate("users", "-password")
      .populate("latestMessage");

     const populatedChat  = await User.populate(isChat, {
      path: 'latestMessage.sender',
      select: "name pic email",
    });


    if(isChat.length > 0){
        res.status(200).send(isChat[0]);
    }

    else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id , userId]
        }

        try {
             const createdChat = await Chat.create(chatData)

             const fullChat = await Chat.findOne({_id : createdChat._id}).populate("users", "-password")

             res.status(200).send(fullChat)
        } catch (error) {
            console.log(error);
            
        }
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};



export const fetchChat = async (req : Request | any,res : Response)=>{
  try {
    const results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });



      const populatedResults = await User.populate(results, {
        path: 'latestMessage.sender',
        select: 'name pic email',
      });
  
      res.status(200).send(populatedResults);
    
  } catch (error: any) {
    res.status(400)
   console.log(error.message)
  }
}
