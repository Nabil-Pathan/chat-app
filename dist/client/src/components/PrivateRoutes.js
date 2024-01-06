"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const UserContext_1 = require("../context/UserContext");
function PrivateRoute({ element }) {
    const { user } = (0, UserContext_1.useUserContext)();
    return user.token !== "" ? element : react_1.default.createElement(react_router_dom_1.Navigate, { to: "/" });
}
exports.default = PrivateRoute;
//# sourceMappingURL=PrivateRoutes.js.map