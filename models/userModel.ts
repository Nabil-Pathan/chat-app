import   mongoose  from "mongoose";
import { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
    _id: string
    name: string;
    email: string;
    password: string;
    pic : string
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

    pic: {
        type : String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
    
},{timestamps : true})


const User = mongoose.model<UserDocument>("User", userSchema)

export default User