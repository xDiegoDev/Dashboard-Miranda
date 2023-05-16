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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.AuthContext = void 0;
const react_1 = __importStar(require("react"));
const initialState = {
    isLoggedIn: false,
    userEmail: null,
    userName: null,
};
exports.AuthContext = (0, react_1.createContext)({
    authState: initialState,
    authDispatch: () => { },
});
const authReducer = (state, action) => {
    var _a, _b, _c, _d;
    switch (action.type) {
        case "LOGIN":
            return Object.assign(Object.assign({}, state), { isLoggedIn: true, userEmail: ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.email) || null, userName: ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.name) || null });
        case "LOGOUT":
            return Object.assign(Object.assign({}, state), { isLoggedIn: false, userEmail: null, userName: null });
        case "UPDATE_USER":
            return Object.assign(Object.assign({}, state), { userEmail: ((_c = action.payload) === null || _c === void 0 ? void 0 : _c.email) || null, userName: ((_d = action.payload) === null || _d === void 0 ? void 0 : _d.name) || null });
        default:
            return state;
    }
};
const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = (0, react_1.useReducer)(authReducer, initialState);
    const value = {
        authState,
        authDispatch,
        isLoggedIn: authState.isLoggedIn,
        userEmail: authState.userEmail,
        userName: authState.userName,
    };
    return react_1.default.createElement(exports.AuthContext.Provider, { value: value }, children);
};
exports.AuthProvider = AuthProvider;
