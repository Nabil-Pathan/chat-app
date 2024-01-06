"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = require("react-hot-toast");
const Signup = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [formData, setFormData] = (0, react_2.useState)({
        name: "",
        email: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios_1.default.post('/api/auth/signup', formData);
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            react_hot_toast_1.toast.success("Signup Success");
            navigate('/chats');
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return (react_1.default.createElement("div", { className: "mt-4" },
        react_1.default.createElement("form", { onSubmit: handleSubmit, className: "max-w-sm mx-auto p-4 bg-white rounded-lg " },
            react_1.default.createElement("div", { className: "mb-4" },
                react_1.default.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "name" }, "Name"),
                react_1.default.createElement("input", { className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500", type: "text", id: "name", placeholder: "Your Name", onChange: (e) => setFormData({ ...formData, name: e.target.value }) })),
            react_1.default.createElement("div", { className: "mb-4" },
                react_1.default.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "email" }, "Email"),
                react_1.default.createElement("input", { className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500", type: "email", id: "email", placeholder: "Your Email", onChange: (e) => setFormData({ ...formData, email: e.target.value }) })),
            react_1.default.createElement("div", { className: "mb-4" },
                react_1.default.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "password" }, "Password"),
                react_1.default.createElement("input", { className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500", type: "password", id: "password", placeholder: "Your Password", onChange: (e) => setFormData({ ...formData, password: e.target.value }) })),
            react_1.default.createElement("button", { className: "w-full px-4 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400", type: "submit" }, "Sign Up"))));
};
exports.default = Signup;
//# sourceMappingURL=Signup.js.map