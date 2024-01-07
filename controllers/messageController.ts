import Message from "../models/messageModel"
import Chat from "../models/chatModal"
import User from "../models/userModel"

import { Request , Response } from "express"


export const sendMessageController = async (req : Request | any,res : Response)=>{
    try {
        const { chatId , content } = req.body

        if(!content || !chatId){
            console.log("Invalid data passed into request");
            return res.status(400).json({ error : "Provide All Details"})
        }

        var newMessage = {
            sender: req.user._id,
            content: content,
            chat : chatId
        }

        var message = await Message.create(newMessage)

        message = await message.populate("sender", "name")
        message = await message.populate("chat")
    

        const createdMessage = await User.populate(message ,{
            path:'chat.users',
            select: 'name email pic'
        })

        await Chat.findByIdAndUpdate(req.body.chatId , {
            latestMessage : createdMessage
        })

        res.json(createdMessage)
    } catch (error : any) {
        console.log(error.message);   
        return res.status(500).json({ error : "Internal Server Error"})
    }
}

export const allMessagesController = async (req : Request | any , res : Response)=>{
    
    try {       
        const messages = await Message.find({chat : req.params.chatId}).populate("sender","name email pic").populate("chat")
        return res.json({messages}).status(200)
    } catch (error : any) {
        console.log("From All Messages",error.message);
        return res.status(500).json({ error : "Internal Server Error"})
    }
}