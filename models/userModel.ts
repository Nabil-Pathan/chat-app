import   mongoose  from "mongoose";
import { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
    _id: string
    name: string;
    email: string;
    password: string;
    // ... other fields
  }


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    
},{timestamps : true})


const User = mongoose.model<UserDocument>("User", userSchema)

export default User