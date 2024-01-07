"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const UserContext_1 = require("../context/UserContext");
const react_router_dom_1 = require("react-router-dom");
const UserList_1 = __importDefault(require("../components/UserList"));
const ChatPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { setUser } = (0, UserContext_1.useUserContext)();
    const [selectedUserId, setSelectedUserId] = (0, react_1.useState)(null);
    return (react_1.default.createElement("div", { className: "flex w-[100%] flex-col md:min-h-screen " },
        react_1.default.createElement("div", { className: "flex   w-[100%] overflow-hidden bg-gray-200" },
            react_1.default.createElement("div", { className: "flex items-center justify-center w-full border-r  p-4 bg-white" },
                react_1.default.createElement(UserList_1.default, { setSelectedUserId: setSelectedUserId })))));
};
exports.default = ChatPage;
//# sourceMappingURL=ChatPage.js.map