"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userControllers_1 = require("../controllers/userControllers");
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("../middleware/verifyUser");
const router = express_1.default.Router();
router.get('/all-users', verifyUser_1.verifyToken, userControllers_1.getAllUsersController);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map