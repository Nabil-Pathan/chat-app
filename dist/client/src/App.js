"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const react_hot_toast_1 = require("react-hot-toast");
const ChatPage_1 = __importDefault(require("./pages/ChatPage"));
const Header_1 = __importDefault(require("./components/Header"));
const PublicRoutes_1 = __importDefault(require("./components/PublicRoutes"));
const PrivateRoutes_1 = __importDefault(require("./components/PrivateRoutes"));
const Profile_1 = __importDefault(require("./pages/Profile"));
const SingleChat_1 = __importDefault(require("./components/SingleChat"));
const App = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_hot_toast_1.Toaster, { position: "top-center", toastOptions: {
                success: {
                    iconTheme: {
                        primary: '#4aed88',
                        secondary: '',
                    },
                },
            } }),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(PublicRoutes_1.default, { element: react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Header_1.default, null),
                        react_1.default.createElement(HomePage_1.default, null)) }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/chats", element: react_1.default.createElement(PrivateRoutes_1.default, { element: react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Header_1.default, null),
                        react_1.default.createElement(ChatPage_1.default, null)) }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/profile", element: react_1.default.createElement(PrivateRoutes_1.default, { element: react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Header_1.default, null),
                        react_1.default.createElement(Profile_1.default, null)) }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/single-chat/:userId", element: react_1.default.createElement(PrivateRoutes_1.default, { element: react_1.default.createElement(SingleChat_1.default, null) }) }))));
};
exports.default = App;
//# sourceMappingURL=App.js.map