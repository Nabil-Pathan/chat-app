"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const UserContext_1 = require("../context/UserContext");
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = require("react-hot-toast");
const Profile = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user, setUser } = (0, UserContext_1.useUserContext)();
    const handleLogout = async () => {
        localStorage.removeItem('userInfo');
        setUser({
            user: {
                _id: '',
                name: '',
                email: '',
                pic: ''
            },
            token: '',
        });
        react_hot_toast_1.toast.success('Logout Success');
        navigate('/');
    };
    return (react_1.default.createElement("div", { className: 'md:min-h-screen' },
        react_1.default.createElement("h1", { className: 'text-4xl font-bold' }, user.user.name),
        react_1.default.createElement("button", { className: 'bg-green-600 text-white px-4 py-3 rounded-md font-bold ', onClick: handleLogout }, "Logout")));
};
exports.default = Profile;
//# sourceMappingURL=Profile.js.map