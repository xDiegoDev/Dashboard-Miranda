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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("react");
const Message_1 = __importDefault(require("@mui/icons-material/Message"));
const Notifications_1 = __importDefault(require("@mui/icons-material/Notifications"));
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const LunchDining_1 = __importDefault(require("@mui/icons-material/LunchDining"));
const DashboardRounded_1 = __importDefault(require("@mui/icons-material/DashboardRounded"));
const KeyRounded_1 = __importDefault(require("@mui/icons-material/KeyRounded"));
const CalendarMonthRounded_1 = __importDefault(require("@mui/icons-material/CalendarMonthRounded"));
const PersonRounded_1 = __importDefault(require("@mui/icons-material/PersonRounded"));
const ExtensionRounded_1 = __importDefault(require("@mui/icons-material/ExtensionRounded"));
const AuthContext_tsx_1 = require("../../contexts/AuthContext.tsx");
const react_redux_1 = require("react-redux");
const useAuth_ts_1 = require("../../contexts/useAuth.ts");
const userSlice_1 = require("../../features/userSlice");
const StyledHeader_1 = require("./StyledHeader");
const D_logo_png_1 = __importDefault(require("../../images/D logo.png"));
const Modal_1 = __importDefault(require("../Modal"));
const HamburgerIcon = (props) => {
    const { sidebarVisible, setSidebarVisible, className } = props;
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement(LunchDining_1.default, { onClick: toggleSidebar })));
};
const Header = ({ title, sidebarVisible, setSidebarVisible, handleLogout }) => {
    const handleItemClick = () => {
        setSidebarVisible(false);
    };
    const location = (0, react_router_dom_1.useLocation)();
    const { isLoggedIn, userEmail } = (0, useAuth_ts_1.useAuth)();
    const usersData = (0, react_redux_1.useSelector)((state) => state.users.users);
    const loggedInUser = isLoggedIn
        ? usersData.find((u) => u.Email === userEmail)
        : null;
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [editedName, setEditedName] = (0, react_1.useState)("");
    const [editedEmail, setEditedEmail] = (0, react_1.useState)("");
    const dispatch = (0, react_redux_1.useDispatch)();
    const authDispatch = (0, react_2.useContext)(AuthContext_tsx_1.AuthContext).authDispatch;
    const handleEditSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const updatedUser = Object.assign(Object.assign({}, loggedInUser), { Email: editedEmail, Name: editedName });
        try {
            yield dispatch((0, userSlice_1.updateUserAsync)(updatedUser));
            if (loggedInUser.Email !== updatedUser.Email) {
                authDispatch({
                    type: "UPDATE_USER",
                    payload: { email: updatedUser.Email, name: updatedUser.Name },
                });
            }
            setIsModalOpen(false);
        }
        catch (error) {
            console.error("Failed to update user:", error);
        }
    });
    const handleEditClick = () => {
        setEditedName(loggedInUser.Name);
        setEditedEmail(loggedInUser.Email);
        setIsModalOpen(true);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(StyledHeader_1.StyledSidebar, { sidebarVisible: sidebarVisible },
            react_1.default.createElement("div", { className: "logo" },
                react_1.default.createElement("img", { src: D_logo_png_1.default, alt: "Personal Logo", style: {
                        width: "70px",
                        display: "block",
                        margin: "auto",
                        marginBottom: "40px",
                        marginTop: "20px",
                        border: "3px solid #414141",
                        borderRadius: "10px",
                    } })),
            react_1.default.createElement("div", { className: "sidebar__fullheight" },
                react_1.default.createElement("div", { className: "sidebar__spacebetween" },
                    react_1.default.createElement(StyledHeader_1.IconsDashboard, null, location.pathname === "/" ? (react_1.default.createElement(StyledHeader_1.StyledLinkActive, { to: "/", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "active" },
                            react_1.default.createElement(DashboardRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Dashboard"))) : (react_1.default.createElement(StyledHeader_1.StyledLink, { to: "/", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "white" },
                            react_1.default.createElement(DashboardRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Dashboard")))),
                    react_1.default.createElement(StyledHeader_1.IconsDashboard, null, location.pathname === "/rooms" ? (react_1.default.createElement(StyledHeader_1.StyledLinkActive, { to: "/rooms", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "active" },
                            react_1.default.createElement(KeyRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Rooms"))) : (react_1.default.createElement(StyledHeader_1.StyledLink, { to: "/rooms", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "white" },
                            react_1.default.createElement(KeyRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Rooms")))),
                    react_1.default.createElement(StyledHeader_1.IconsDashboard, null, location.pathname === "/bookings" ? (react_1.default.createElement(StyledHeader_1.StyledLinkActive, { to: "/bookings", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "active" },
                            react_1.default.createElement(CalendarMonthRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Bookings"))) : (react_1.default.createElement(StyledHeader_1.StyledLink, { to: "/bookings", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "white" },
                            react_1.default.createElement(CalendarMonthRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Bookings")))),
                    react_1.default.createElement(StyledHeader_1.IconsDashboard, null, location.pathname === "/users" ? (react_1.default.createElement(StyledHeader_1.StyledLinkActive, { to: "/users", onClick: handleItemClick, "data-cy": "Users" },
                        react_1.default.createElement("div", { className: "active" },
                            react_1.default.createElement(PersonRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Users"))) : (react_1.default.createElement(StyledHeader_1.StyledLink, { to: "/users", onClick: handleItemClick, "data-cy": "Users" },
                        react_1.default.createElement("div", { className: "white" },
                            react_1.default.createElement(PersonRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Users")))),
                    react_1.default.createElement(StyledHeader_1.IconsDashboard, null, location.pathname === "/contacts" ? (react_1.default.createElement(StyledHeader_1.StyledLinkActive, { to: "/contacts", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "active" },
                            react_1.default.createElement(ExtensionRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Contact"))) : (react_1.default.createElement(StyledHeader_1.StyledLink, { to: "/contacts", onClick: handleItemClick },
                        react_1.default.createElement("div", { className: "white" },
                            react_1.default.createElement(ExtensionRounded_1.default, null)),
                        react_1.default.createElement("h6", null, "Contact")))),
                    react_1.default.createElement(StyledHeader_1.UserInfo, null, loggedInUser && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("img", { src: loggedInUser.IMG, alt: "User Profile" }),
                        react_1.default.createElement("h6", null, loggedInUser.Name),
                        react_1.default.createElement("p", null, loggedInUser.Email),
                        react_1.default.createElement(StyledHeader_1.Button, { onClick: handleEditClick, style: {
                                color: "#010101",
                                backgroundColor: "white",
                                border: "3px solid #414141 ",
                            } }, "EDIT")))))),
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Modal_1.default, { isOpen: isModalOpen, onRequestClose: () => setIsModalOpen(false) },
                    react_1.default.createElement("h2", { style: {
                            marginBottom: "30px",
                            fontSize: "27px",
                        } }, "EDIT USER"),
                    react_1.default.createElement("form", { onSubmit: handleEditSubmit },
                        react_1.default.createElement("label", { style: {
                                marginBottom: "32px",
                                fontSize: "17px",
                            } },
                            "Name:",
                            react_1.default.createElement("input", { style: {
                                    marginLeft: "30px",
                                    marginBottom: "20px",
                                    height: "30px",
                                    borderRadius: "10px",
                                    border: "2px solid #414141",
                                    paddingLeft: "10px",
                                    fontSize: "15px",
                                }, type: "text", value: editedName, onChange: (e) => setEditedName(e.target.value) })),
                        react_1.default.createElement("br", null),
                        react_1.default.createElement("label", { style: {
                                fontSize: "17px",
                            } },
                            "Email:",
                            react_1.default.createElement("input", { style: {
                                    marginLeft: "30px",
                                    marginBottom: "20px",
                                    height: "30px",
                                    borderRadius: "10px",
                                    border: "2px solid #414141",
                                    paddingLeft: "10px",
                                    fontSize: "15px",
                                }, type: "email", value: editedEmail, onChange: (e) => setEditedEmail(e.target.value) })),
                        react_1.default.createElement("br", null),
                        react_1.default.createElement("button", { style: {
                                marginTop: "32px",
                                height: "30px",
                                borderRadius: "10px",
                                border: "2px solid #414141",
                                padding: "0 10px",
                                fontSize: "15px",
                            }, onSubmit: handleEditSubmit }, "Save"),
                        react_1.default.createElement("button", { style: {
                                marginTop: "32px",
                                marginLeft: "30px",
                                height: "30px",
                                borderRadius: "10px",
                                border: "2px solid #414141",
                                padding: "0 10px",
                                fontSize: "15px",
                            }, onClick: () => setIsModalOpen(false) }, "Cancel")))),
            react_1.default.createElement(StyledHeader_1.SidebarFooter, null,
                react_1.default.createElement("h6", null, "Travi Hotel Admin Dashboard"),
                react_1.default.createElement("p", null, "\u00AE 2020 All Rights Reserved"),
                react_1.default.createElement("p", null, "Made with LOVE by Diego"))),
        react_1.default.createElement(StyledHeader_1.StyledHeader, { sidebarVisible: sidebarVisible },
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "hamburger__div", "data-cy": "burger" },
                    react_1.default.createElement(HamburgerIcon, { sidebarVisible: sidebarVisible, setSidebarVisible: setSidebarVisible, className: "hamburger__icon" })),
                react_1.default.createElement("h1", { style: { width: "300px" }, className: "title" }, title)),
            react_1.default.createElement("div", { className: "icons" },
                react_1.default.createElement(Message_1.default, null),
                react_1.default.createElement(Notifications_1.default, null),
                react_1.default.createElement(Logout_1.default, { onClick: handleLogout, "data-cy": "logout" })))));
};
exports.default = Header;
