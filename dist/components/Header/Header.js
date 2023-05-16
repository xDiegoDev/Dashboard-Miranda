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
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../contexts/useAuth.ts";
import { updateUserAsync } from "../../features/userSlice";
import { StyledHeader, StyledSidebar, IconsDashboard, StyledLink, StyledLinkActive, UserInfo, SidebarFooter, Button, } from "./StyledHeader";
import Company from "../../images/D logo.png";
import Modal from "../Modal";
var HamburgerIcon = function (props) {
    var sidebarVisible = props.sidebarVisible, setSidebarVisible = props.setSidebarVisible, className = props.className;
    var toggleSidebar = function () {
        setSidebarVisible(!sidebarVisible);
    };
    return (React.createElement("div", { className: className },
        React.createElement(LunchDiningIcon, { onClick: toggleSidebar })));
};
var Header = function (_a) {
    var title = _a.title, sidebarVisible = _a.sidebarVisible, setSidebarVisible = _a.setSidebarVisible, handleLogout = _a.handleLogout;
    var handleItemClick = function () {
        setSidebarVisible(false);
    };
    var location = useLocation();
    var _b = useAuth(), isLoggedIn = _b.isLoggedIn, userEmail = _b.userEmail;
    var usersData = useSelector(function (state) { return state.users.users; });
    var loggedInUser = isLoggedIn
        ? usersData.find(function (u) { return u.Email === userEmail; })
        : null;
    var _c = useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var _d = useState(""), editedName = _d[0], setEditedName = _d[1];
    var _e = useState(""), editedEmail = _e[0], setEditedEmail = _e[1];
    var dispatch = useDispatch();
    var authDispatch = useContext(AuthContext).authDispatch;
    var handleEditSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    updatedUser = __assign(__assign({}, loggedInUser), { Email: editedEmail, Name: editedName });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dispatch(updateUserAsync(updatedUser))];
                case 2:
                    _a.sent();
                    if (loggedInUser.Email !== updatedUser.Email) {
                        authDispatch({
                            type: "UPDATE_USER",
                            payload: { email: updatedUser.Email, name: updatedUser.Name },
                        });
                    }
                    setIsModalOpen(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to update user:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEditClick = function () {
        setEditedName(loggedInUser.Name);
        setEditedEmail(loggedInUser.Email);
        setIsModalOpen(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(StyledSidebar, { sidebarVisible: sidebarVisible },
            React.createElement("div", { className: "logo" },
                React.createElement("img", { src: Company, alt: "Personal Logo", style: {
                        width: "70px",
                        display: "block",
                        margin: "auto",
                        marginBottom: "40px",
                        marginTop: "20px",
                        border: "3px solid #414141",
                        borderRadius: "10px",
                    } })),
            React.createElement("div", { className: "sidebar__fullheight" },
                React.createElement("div", { className: "sidebar__spacebetween" },
                    React.createElement(IconsDashboard, null, location.pathname === "/" ? (React.createElement(StyledLinkActive, { to: "/", onClick: handleItemClick },
                        React.createElement("div", { className: "active" },
                            React.createElement(DashboardRoundedIcon, null)),
                        React.createElement("h6", null, "Dashboard"))) : (React.createElement(StyledLink, { to: "/", onClick: handleItemClick },
                        React.createElement("div", { className: "white" },
                            React.createElement(DashboardRoundedIcon, null)),
                        React.createElement("h6", null, "Dashboard")))),
                    React.createElement(IconsDashboard, null, location.pathname === "/rooms" ? (React.createElement(StyledLinkActive, { to: "/rooms", onClick: handleItemClick },
                        React.createElement("div", { className: "active" },
                            React.createElement(KeyRoundedIcon, null)),
                        React.createElement("h6", null, "Rooms"))) : (React.createElement(StyledLink, { to: "/rooms", onClick: handleItemClick },
                        React.createElement("div", { className: "white" },
                            React.createElement(KeyRoundedIcon, null)),
                        React.createElement("h6", null, "Rooms")))),
                    React.createElement(IconsDashboard, null, location.pathname === "/bookings" ? (React.createElement(StyledLinkActive, { to: "/bookings", onClick: handleItemClick },
                        React.createElement("div", { className: "active" },
                            React.createElement(CalendarMonthRoundedIcon, null)),
                        React.createElement("h6", null, "Bookings"))) : (React.createElement(StyledLink, { to: "/bookings", onClick: handleItemClick },
                        React.createElement("div", { className: "white" },
                            React.createElement(CalendarMonthRoundedIcon, null)),
                        React.createElement("h6", null, "Bookings")))),
                    React.createElement(IconsDashboard, null, location.pathname === "/users" ? (React.createElement(StyledLinkActive, { to: "/users", onClick: handleItemClick, "data-cy": "Users" },
                        React.createElement("div", { className: "active" },
                            React.createElement(PersonRoundedIcon, null)),
                        React.createElement("h6", null, "Users"))) : (React.createElement(StyledLink, { to: "/users", onClick: handleItemClick, "data-cy": "Users" },
                        React.createElement("div", { className: "white" },
                            React.createElement(PersonRoundedIcon, null)),
                        React.createElement("h6", null, "Users")))),
                    React.createElement(IconsDashboard, null, location.pathname === "/contacts" ? (React.createElement(StyledLinkActive, { to: "/contacts", onClick: handleItemClick },
                        React.createElement("div", { className: "active" },
                            React.createElement(ExtensionRoundedIcon, null)),
                        React.createElement("h6", null, "Contact"))) : (React.createElement(StyledLink, { to: "/contacts", onClick: handleItemClick },
                        React.createElement("div", { className: "white" },
                            React.createElement(ExtensionRoundedIcon, null)),
                        React.createElement("h6", null, "Contact")))),
                    React.createElement(UserInfo, null, loggedInUser && (React.createElement(React.Fragment, null,
                        React.createElement("img", { src: loggedInUser.IMG, alt: "User Profile" }),
                        React.createElement("h6", null, loggedInUser.Name),
                        React.createElement("p", null, loggedInUser.Email),
                        React.createElement(Button, { onClick: handleEditClick, style: {
                                color: "#010101",
                                backgroundColor: "white",
                                border: "3px solid #414141 ",
                            } }, "EDIT")))))),
            React.createElement(React.Fragment, null,
                React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); } },
                    React.createElement("h2", { style: {
                            marginBottom: "30px",
                            fontSize: "27px",
                        } }, "EDIT USER"),
                    React.createElement("form", { onSubmit: handleEditSubmit },
                        React.createElement("label", { style: {
                                marginBottom: "32px",
                                fontSize: "17px",
                            } },
                            "Name:",
                            React.createElement("input", { style: {
                                    marginLeft: "30px",
                                    marginBottom: "20px",
                                    height: "30px",
                                    borderRadius: "10px",
                                    border: "2px solid #414141",
                                    paddingLeft: "10px",
                                    fontSize: "15px",
                                }, type: "text", value: editedName, onChange: function (e) { return setEditedName(e.target.value); } })),
                        React.createElement("br", null),
                        React.createElement("label", { style: {
                                fontSize: "17px",
                            } },
                            "Email:",
                            React.createElement("input", { style: {
                                    marginLeft: "30px",
                                    marginBottom: "20px",
                                    height: "30px",
                                    borderRadius: "10px",
                                    border: "2px solid #414141",
                                    paddingLeft: "10px",
                                    fontSize: "15px",
                                }, type: "email", value: editedEmail, onChange: function (e) { return setEditedEmail(e.target.value); } })),
                        React.createElement("br", null),
                        React.createElement("button", { style: {
                                marginTop: "32px",
                                height: "30px",
                                borderRadius: "10px",
                                border: "2px solid #414141",
                                padding: "0 10px",
                                fontSize: "15px",
                            }, onSubmit: handleEditSubmit }, "Save"),
                        React.createElement("button", { style: {
                                marginTop: "32px",
                                marginLeft: "30px",
                                height: "30px",
                                borderRadius: "10px",
                                border: "2px solid #414141",
                                padding: "0 10px",
                                fontSize: "15px",
                            }, onClick: function () { return setIsModalOpen(false); } }, "Cancel")))),
            React.createElement(SidebarFooter, null,
                React.createElement("h6", null, "Travi Hotel Admin Dashboard"),
                React.createElement("p", null, "\u00AE 2020 All Rights Reserved"),
                React.createElement("p", null, "Made with LOVE by Diego"))),
        React.createElement(StyledHeader, { sidebarVisible: sidebarVisible },
            React.createElement("div", null,
                React.createElement("div", { className: "hamburger__div", "data-cy": "burger" },
                    React.createElement(HamburgerIcon, { sidebarVisible: sidebarVisible, setSidebarVisible: setSidebarVisible, className: "hamburger__icon" })),
                React.createElement("h1", { style: { width: "300px" }, className: "title" }, title)),
            React.createElement("div", { className: "icons" },
                React.createElement(MessageIcon, null),
                React.createElement(NotificationsIcon, null),
                React.createElement(LogoutIcon, { onClick: handleLogout, "data-cy": "logout" })))));
};
export default Header;
