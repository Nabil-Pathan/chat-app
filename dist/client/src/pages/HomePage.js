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
const Signin_1 = __importDefault(require("../components/Signin"));
const Signup_1 = __importDefault(require("../components/Signup"));
const react_router_dom_1 = require("react-router-dom");
const HomePage = () => {
    const [activeTab, setActiveTab] = (0, react_1.useState)('login');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (<div className="container md:h-screen   mx-auto max-w-xl">
    <div className="flex justify-center p-3 bg-white w-full mt-4 rounded-lg border-2 text-center">
      <h1 className="text-4xl font-semibold text-black">Conversa</h1>
    </div>

    <div className="bg-white w-full p-4 rounded-lg border-2 shadow-lg">
      <div className="flex">
        <react_router_dom_1.Link onClick={() => handleTabClick('login')} to="#" className={`font-bold w-1/2 p-2 text-center ${activeTab === "login" ? "bg-blue-500 text-white" : "bg-white "} rounded-l-lg border-r border-t border-b`}>
          Login
        </react_router_dom_1.Link>
        <react_router_dom_1.Link onClick={() => handleTabClick('signup')} to="#" className={`font-bold w-1/2 p-2 text-center  rounded-r-lg border-l border-t border-b  ${activeTab === "signup" ? "bg-blue-500 text-white" : "bg-white "} `}>
          Signup
        </react_router_dom_1.Link>
      </div>

      <div className="mt-1 ">
        
      {activeTab === 'login' && <Signin_1.default />}
          {activeTab === 'signup' && <Signup_1.default />}
      </div>
    </div>
  </div>);
};
exports.default = HomePage;
//# sourceMappingURL=HomePage.js.map