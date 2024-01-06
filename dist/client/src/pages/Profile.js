"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const UserContext_1 = require("../context/UserContext");
const Profile = () => {
    const { user } = (0, UserContext_1.useUserContext)();
    return (<div className='md:min-h-screen'>

        <h1 className='text-4xl font-bold'>{user.user.name}</h1>

    </div>);
};
exports.default = Profile;
//# sourceMappingURL=Profile.js.map