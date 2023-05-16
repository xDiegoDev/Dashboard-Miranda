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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AuthContext_tsx_1 = require("../../contexts/AuthContext.tsx");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const userSlice_1 = require("../../features/userSlice");
const StyledLogin_1 = require("./StyledLogin");
const react_loader_spinner_1 = require("react-loader-spinner");
const Login = () => {
    const { authState, authDispatch } = (0, react_1.useContext)(AuthContext_tsx_1.AuthContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const usersData = (0, react_redux_1.useSelector)((state) => state.users.users);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            yield dispatch((0, userSlice_1.fetchUsersAsync)()).then(() => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield dispatch((0, userSlice_1.validateUserAsync)({ email, password })).unwrap();
                authDispatch({ type: "LOGIN", payload: { email: user.Email } });
                navigate("/");
            }));
        }
        catch (error) {
            alert("Invalid email or password");
        }
        finally {
            setLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        if (authState.isLoggedIn) {
            navigate("/");
        }
    }, [authState.isLoggedIn, navigate]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(StyledLogin_1.GlobalStyle, null),
        react_1.default.createElement(StyledLogin_1.StyledLogin, null, loading ? (react_1.default.createElement(react_loader_spinner_1.ColorRing, { type: "ThreeDots", colors: ["white", "black", "#414141", "#8f8f8f", "#212121"], height: 100, width: 100, timeout: 3000 })) : (react_1.default.createElement("div", { className: "login-form" },
            react_1.default.createElement("h1", null, "Login"),
            react_1.default.createElement("div", { className: "input-container" },
                react_1.default.createElement("label", { htmlFor: "email" }, "Email:"),
                react_1.default.createElement("input", { type: "email", id: "email", "data-cy": "email", value: email, onChange: (e) => setEmail(e.target.value) })),
            react_1.default.createElement("div", { className: "input-container" },
                react_1.default.createElement("label", { htmlFor: "password" }, "Password:"),
                react_1.default.createElement("input", { type: "password", id: "password", "data-cy": "password", value: password, onChange: (e) => setPassword(e.target.value) })),
            react_1.default.createElement("button", { "data-cy": "submit", onClick: handleLogin }, "Log In"))))));
};
exports.default = Login;
