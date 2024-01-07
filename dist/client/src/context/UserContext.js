"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserContext = void 0;
const react_1 = require("react");
const defaultUserContextValue = {
    user: {
        user: {
            _id: "",
            name: "",
            email: "",
            pic: ""
        },
        token: ""
    },
    setUser: () => { },
};
const UserContext = (0, react_1.createContext)(defaultUserContextValue);
const useUserContext = () => (0, react_1.useContext)(UserContext);
exports.useUserContext = useUserContext;
exports.default = UserContext;
//# sourceMappingURL=UserContext.js.map