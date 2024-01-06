"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel_1.default.find({ _id: { $ne: req.user._id } });
        return res.json({ users }).status(200);
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.getAllUsersController = getAllUsersController;
//# sourceMappingURL=userControllers.js.map