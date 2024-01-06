import mongoose from "mongoose";
import  { Document, Schema, model, ObjectId }  from 'mongoose';
import { UserDocument } from "./userModel";

export interface ChatDocument extends Document {
    chatName: string;
    isGroupChat: boolean;
    users: UserDocument[];
    latestMessage: ObjectId;
    groupAdmin: ObjectId;
  }

const chatSchema = new Schema({
    chatName:{
        type: String,
        trim: true
    },
    isGroupChat:{
        type: Boolean,
        default: false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    latestMessage:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true})


const Chat = mongoose.model<ChatDocument>("Chat", chatSchema)


export default Chat