import User from "../models/userModel"
import { Request , Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const SignUpController = async  (req : Request,res : Response)=>{

    try {
        const { name , email , password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({ error : "Please Provide All credentials"})
        }

        // Check if the User already exists

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({ error : "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = await User.create({ name , email , password : hashedPassword })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!)

        const userWithoutPassword = newUser.toObject() as { password?: string };

        delete userWithoutPassword.password;



        return res.status(201).json({ user : userWithoutPassword , token , message : "User Signup Successful"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error : "Internal Server Error"})
    }
}

export const SigninController = async(req: Request , res : Response)=>{
    try {
        const {  email , password } = req.body

        if( !email || !password){
            return res.status(400).json({ error : "Please Provide All credentials"})
        }

        const validUser = await User.findOne({ email })

        if (!validUser) {
            return res.status(400).json({ message: "No User with this Credentials !" })
        }

        const validPassword = await bcrypt.compare(password, validUser.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Credentials !" })
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!)

        const userWithoutPassword = validUser.toObject() as { password?: string };

        delete userWithoutPassword.password;

        return res.status(200).json({user : userWithoutPassword , token , message : "Login Successful"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error : "Internal Server Error"})
    }
}