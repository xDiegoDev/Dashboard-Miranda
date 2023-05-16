"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useAuth_ts_1 = require("../contexts/useAuth.ts");
const react_router_dom_1 = require("react-router-dom");
function ProtectedRoute() {
    const auth = (0, useAuth_ts_1.useAuth)();
    if (!auth.isLoggedIn) {
        return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/login" });
    }
    return react_1.default.createElement(react_router_dom_1.Outlet, null);
}
exports.default = ProtectedRoute;
