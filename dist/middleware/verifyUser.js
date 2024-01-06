"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ err: "You must be logged in! Token not given" });
        }
        const token = authorization.replace("Bearer ", "");
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await userModel_1.default.findById(decodedToken.id);
        if (!user) {
            return res.status(401).send({ err: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ err: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyUser.js.map