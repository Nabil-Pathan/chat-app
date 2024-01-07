"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_loader_spinner_1 = require("react-loader-spinner");
const Loader = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'flex items-center justify-center h-screen' },
            react_1.default.createElement(react_loader_spinner_1.Oval, { visible: true, height: "90", width: "90", color: "#424242", ariaLabel: "oval-loading", wrapperStyle: {}, wrapperClass: "" }))));
};
exports.default = Loader;
//# sourceMappingURL=Loader.js.map