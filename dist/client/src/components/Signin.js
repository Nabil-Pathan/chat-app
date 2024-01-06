"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = require("react-hot-toast");
const UserContext_1 = require("../context/UserContext");
const Signin = () => {
    const { user, setUser } = (0, UserContext_1.useUserContext)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [formData, setFormData] = (0, react_1.useState)({
        name: "",
        email: "",
        password: ""
    });
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios_1.default.post('/api/auth/signin', formData);
            console.log(data);
            setUser({
                user: data.user,
                token: data.token
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            react_hot_toast_1.toast.success("Login Success");
            navigate('/chats');
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return (<div className="mt-4 p-4">
      <form onSubmit={handleOnSubmit} className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-xl ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" type="email" id="email" placeholder="Your Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" type="password" id="password" placeholder="Your Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
        </div>
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400" type="submit">
          Sign In
        </button>
      </form>
    </div>);
};
exports.default = Signin;
//# sourceMappingURL=Signin.js.map