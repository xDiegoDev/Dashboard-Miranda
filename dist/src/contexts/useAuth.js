"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const react_1 = require("react");
const AuthContext_tsx_1 = require("./AuthContext.tsx");
const useAuth = () => {
    const { authState } = (0, react_1.useContext)(AuthContext_tsx_1.AuthContext);
    const isLoggedIn = authState.isLoggedIn;
    const userEmail = authState.userEmail;
    console.log("useAuth values:", { isLoggedIn, userEmail });
    return { isLoggedIn, userEmail };
};
exports.useAuth = useAuth;
