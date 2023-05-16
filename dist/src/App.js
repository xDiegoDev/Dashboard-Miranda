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
const react_router_dom_1 = require("react-router-dom");
const Header_1 = __importDefault(require("./components/Header/Header"));
const Login_1 = __importDefault(require("./pages/Login/Login"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard/Dashboard"));
const Rooms_1 = __importDefault(require("./pages/Rooms/Rooms"));
const Users_1 = __importDefault(require("./pages/Users/Users"));
const Bookings_1 = __importDefault(require("./pages/Bookings/Bookings"));
const Contact_1 = __importDefault(require("./pages/Contact/Contact"));
const NotFound_1 = __importDefault(require("./pages/NotFound/NotFound"));
const ProtectedRoute_1 = __importDefault(require("./components/ProtectedRoute"));
const SingleUser_1 = __importDefault(require("./pages/Users/SingleUser"));
const AuthContext_tsx_1 = require("./contexts/AuthContext.tsx");
const AppStyled_1 = require("./AppStyled");
const SingleRoom_1 = __importDefault(require("./pages/Rooms/SingleRoom"));
const SingleBooking_1 = __importDefault(require("./pages/Bookings/SingleBooking"));
const SingleContact_1 = __importDefault(require("./pages/Contact/SingleContact"));
function App() {
    const { authState } = (0, react_1.useContext)(AuthContext_tsx_1.AuthContext);
    const [sidebarVisible, setSidebarVisible] = (0, react_1.useState)(false);
    const location = (0, react_router_dom_1.useLocation)();
    const authDispatch = (0, react_1.useContext)(AuthContext_tsx_1.AuthContext).authDispatch;
    (0, react_1.useEffect)(() => {
        if (authState.isLoggedIn && location.pathname === "/login") {
            window.location.reload();
        }
    }, [authState.isLoggedIn, location]);
    const getTitle = (pathname) => {
        switch (true) {
            case pathname === "/":
                return "Dashboard";
            case pathname === "/rooms":
                return "Rooms";
            case pathname === "/bookings":
                return "Bookings";
            case pathname === "/users":
                return "Users";
            case pathname === "/contacts":
                return "Reviews";
            case /^\/contacts\/[\w-]+$/i.test(pathname):
                return "Contact Details";
            case /^\/users\/[\w-]+$/i.test(pathname):
                return "User Details";
            case /^\/rooms\/[\w-]+$/i.test(pathname):
                return "Room Details";
            case /^\/bookings\/[\w-]+$/i.test(pathname):
                return "Review Details";
            default:
                return "Dashboard";
        }
    };
    const handleLogout = () => {
        authDispatch({ type: "LOGOUT" });
    };
    return (react_1.default.createElement(AppStyled_1.StyledMain, { isLoggedIn: authState.isLoggedIn, sidebarVisible: sidebarVisible },
        authState.isLoggedIn && (react_1.default.createElement(Header_1.default, { handleLogout: handleLogout, title: getTitle(location.pathname), setSidebarVisible: setSidebarVisible, sidebarVisible: sidebarVisible, isLoggedIn: authState.isLoggedIn })),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(Login_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(ProtectedRoute_1.default, null) },
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Dashboard_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/rooms/", element: react_1.default.createElement(Rooms_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/rooms/:id", element: react_1.default.createElement(SingleRoom_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/users/", element: react_1.default.createElement(Users_1.default, { handleLogout: handleLogout }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/users/:id", element: react_1.default.createElement(SingleUser_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/bookings/", element: react_1.default.createElement(Bookings_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/bookings/:id", element: react_1.default.createElement(SingleBooking_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/contacts/", element: react_1.default.createElement(Contact_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/contacts/:id", element: react_1.default.createElement(SingleContact_1.default, null) })),
            react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(NotFound_1.default, null) }))));
}
const WrappedApp = () => {
    return (react_1.default.createElement(AuthContext_tsx_1.AuthProvider, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(App, null))));
};
exports.default = WrappedApp;
