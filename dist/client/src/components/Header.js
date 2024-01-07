"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const UserContext_1 = require("../context/UserContext");
const react_router_dom_2 = require("react-router-dom");
const Header = () => {
    const { user, setUser } = (0, UserContext_1.useUserContext)();
    const navigate = (0, react_router_dom_2.useNavigate)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("header", { className: "bg-gray-800 text-white py-4 px-4 flex items-center justify-between" },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/chats' },
                    react_1.default.createElement("h1", { className: "text-3xl ml-3 font-bold" }, "Your Logo")),
                user.token !== "" && (react_1.default.createElement("div", { className: 'flex gap-2 items-center justify-center' },
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/profile', className: "mr-2" },
                        react_1.default.createElement("img", { className: 'rounded-full h-9 w-9 object-cover', src: user.user.pic, alt: "Profile" }))))))));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map