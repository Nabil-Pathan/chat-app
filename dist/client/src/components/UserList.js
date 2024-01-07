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
const Loader_1 = __importDefault(require("./Loader"));
const UserList = ({ setSelectedUserId }) => {
    const { user } = (0, UserContext_1.useUserContext)();
    const [users, setUsers] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [searchuery, setSearchQuery] = (0, react_1.useState)('');
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios_1.default.get('/api/user/all-users', config);
            setUsers(data.users);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    };
    const onUserSelect = (userId) => {
        setSelectedUserId(userId);
    };
    (0, react_1.useEffect)(() => {
        fetchUsers();
    }, []);
    const handleSearchChange = async (e) => {
        try {
            const query = e.target.value;
            setSearchQuery(query);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios_1.default.get(`/api/user/search-user?searchQuery=${query}`, config);
            setUsers(data);
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, loading ? (react_1.default.createElement(Loader_1.default, null)) : (react_1.default.createElement("div", { className: "md:w-1/2 w-full md:min-h-screen" },
        react_1.default.createElement("div", { className: "flex items-center w-full mb-4" },
            react_1.default.createElement("div", { className: "relative flex items-center w-full" },
                react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 absolute left-3 text-gray-500" },
                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z", clipRule: "evenodd" })),
                react_1.default.createElement("input", { onChange: handleSearchChange, type: "text", placeholder: "Search Users...", className: "p-2 pl-10 border-gray-300 border outline-none w-full rounded-md" }))),
        react_1.default.createElement("div", { className: "w-full" },
            react_1.default.createElement("ul", { className: "p-4" }, users.map((user) => (react_1.default.createElement(react_router_dom_1.Link, { to: `/single-chat/${user._id}`, key: user._id, onClick: () => onUserSelect(user._id), className: "border-gray-200 border flex items-center gap-2 mb-2 cursor-pointer p-4 rounded-md transition duration-300 hover:bg-blue-100 transform hover:scale-105" },
                react_1.default.createElement("img", { src: user.pic, className: 'w-8 h-8 rounded-full object-cover' }),
                react_1.default.createElement("p", { className: " font-semibold" }, user.name))))))))));
};
exports.default = UserList;
//# sourceMappingURL=UserList.js.map