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
// UserList.tsx
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const UserContext_1 = require("../context/UserContext");
const UserList = ({ setSelectedUserId }) => {
    const { user } = (0, UserContext_1.useUserContext)();
    const [users, setUsers] = (0, react_1.useState)([]);
    const fetchUsers = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios_1.default.get('/api/user/all-users', config);
            setUsers(data.users);
        }
        catch (error) {
            console.log(error.message);
        }
    };
    const onUserSelect = (userId) => {
        setSelectedUserId(userId);
    };
    (0, react_1.useEffect)(() => {
        fetchUsers();
    }, []);
    return (react_1.default.createElement("div", { className: "flex w-full justify-center" },
        react_1.default.createElement("div", { className: "w-full " },
            react_1.default.createElement("h2", { className: "text-2xl font-bold text-center mt-1" }, "Users"),
            react_1.default.createElement("ul", { className: "p-4" }, users.map((user) => (react_1.default.createElement(react_router_dom_1.Link, { to: `/single-chat/${user._id}`, key: user._id, onClick: () => onUserSelect(user._id), className: "block mb-2 cursor-pointer p-4 rounded-md transition duration-300 hover:bg-blue-100 transform hover:scale-105" },
                react_1.default.createElement("p", { className: "text-blue-600 font-semibold" }, user.name))))))));
};
exports.default = UserList;
//# sourceMappingURL=UserList.js.map