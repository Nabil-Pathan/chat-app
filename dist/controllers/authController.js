"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninController = exports.SignUpController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignUpController = async (req, res) => {
    try {
        const { name, email, pic, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please Provide All credentials" });
        }
        // Check if the User already exists
        const user = await userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = await userModel_1.default.create({ name, email, pic, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        return res.status(201).json({ user: userWithoutPassword, token, message: "User Signup Successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.SignUpController = SignUpController;
const SigninController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Provide All credentials" });
        }
        const validUser = await userModel_1.default.findOne({ email });
        if (!validUser) {
            return res.status(400).json({ message: "No User with this Credentials !" });
        }
        const validPassword = await bcrypt_1.default.compare(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Credentials !" });
        }
        const token = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const userWithoutPassword = validUser.toObject();
        delete userWithoutPassword.password;
        return res.status(200).json({ user: userWithoutPassword, token, message: "Login Successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.SigninController = SigninController;
//# sourceMappingURL=authController.js.map