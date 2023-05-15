var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, validateUserAsync } from "../../features/userSlice";
import { StyledLogin, GlobalStyle } from "./StyledLogin";
import { ColorRing as Loader } from "react-loader-spinner";
var Login = function () {
    var _a = useContext(AuthContext), authState = _a.authState, authDispatch = _a.authDispatch;
    var navigate = useNavigate();
    var dispatch = useDispatch();
    var usersData = useSelector(function (state) { return state.users.users; });
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(""), email = _c[0], setEmail = _c[1];
    var _d = useState(""), password = _d[0], setPassword = _d[1];
    var handleLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, dispatch(fetchUsersAsync()).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, dispatch(validateUserAsync({ email: email, password: password })).unwrap()];
                                    case 1:
                                        user = _a.sent();
                                        authDispatch({ type: "LOGIN", payload: { email: user.Email } });
                                        navigate("/");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    alert("Invalid email or password");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (authState.isLoggedIn) {
            navigate("/");
        }
    }, [authState.isLoggedIn, navigate]);
    return (React.createElement(React.Fragment, null,
        React.createElement(GlobalStyle, null),
        React.createElement(StyledLogin, null, loading ? (React.createElement(Loader, { type: "ThreeDots", colors: ["white", "black", "#414141", "#8f8f8f", "#212121"], height: 100, width: 100, timeout: 3000 })) : (React.createElement("div", { className: "login-form" },
            React.createElement("h1", null, "Login"),
            React.createElement("div", { className: "input-container" },
                React.createElement("label", { htmlFor: "email" }, "Email:"),
                React.createElement("input", { type: "email", id: "email", "data-cy": "email", value: email, onChange: function (e) { return setEmail(e.target.value); } })),
            React.createElement("div", { className: "input-container" },
                React.createElement("label", { htmlFor: "password" }, "Password:"),
                React.createElement("input", { type: "password", id: "password", "data-cy": "password", value: password, onChange: function (e) { return setPassword(e.target.value); } })),
            React.createElement("button", { "data-cy": "submit", onClick: handleLogin }, "Log In"))))));
};
export default Login;
