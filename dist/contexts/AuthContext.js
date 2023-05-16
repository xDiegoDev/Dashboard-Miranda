var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { createContext, useReducer } from "react";
var initialState = {
    isLoggedIn: false,
    userEmail: null,
    userName: null,
};
export var AuthContext = createContext({
    authState: initialState,
    authDispatch: function () { },
});
var authReducer = function (state, action) {
    var _a, _b, _c, _d;
    switch (action.type) {
        case "LOGIN":
            return __assign(__assign({}, state), { isLoggedIn: true, userEmail: ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.email) || null, userName: ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.name) || null });
        case "LOGOUT":
            return __assign(__assign({}, state), { isLoggedIn: false, userEmail: null, userName: null });
        case "UPDATE_USER":
            return __assign(__assign({}, state), { userEmail: ((_c = action.payload) === null || _c === void 0 ? void 0 : _c.email) || null, userName: ((_d = action.payload) === null || _d === void 0 ? void 0 : _d.name) || null });
        default:
            return state;
    }
};
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(authReducer, initialState), authState = _b[0], authDispatch = _b[1];
    var value = {
        authState: authState,
        authDispatch: authDispatch,
        isLoggedIn: authState.isLoggedIn,
        userEmail: authState.userEmail,
        userName: authState.userName,
    };
    return React.createElement(AuthContext.Provider, { value: value }, children);
};
export { AuthProvider };
