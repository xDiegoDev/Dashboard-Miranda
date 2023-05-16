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
const Table_1 = __importDefault(require("../../components/Table/Table"));
const userSlice_1 = require("../../features/userSlice");
const react_redux_1 = require("react-redux");
const nanoid_1 = require("nanoid");
const react_loader_spinner_1 = require("react-loader-spinner");
const Modal_1 = __importDefault(require("../../components/Modal"));
const StyledUser_1 = require("./StyledUser");
const useAuth_ts_1 = require("../../contexts/useAuth.ts");
const Users = ({ handleLogout }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const usersData = (0, react_redux_1.useSelector)((state) => state.users.users);
    const usersStatus = (0, react_redux_1.useSelector)((state) => state.users.status);
    const loading = (0, react_redux_1.useSelector)((state) => state.users.status === "loading");
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const { isLoggedIn, userEmail } = (0, useAuth_ts_1.useAuth)();
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [sortOrder, setSortOrder] = (0, react_1.useState)("newest");
    const [sortByName, setSortByName] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (usersStatus === "idle") {
            dispatch((0, userSlice_1.fetchUsersAsync)());
        }
    }, [dispatch]);
    const handleDelete = (user) => {
        dispatch((0, userSlice_1.deleteUserAsync)(user.ID));
        if (isLoggedIn && user.Email === userEmail) {
            handleLogout();
        }
    };
    const filterUsersByName = (users) => {
        if (!searchTerm)
            return users;
        return users.filter((user) => user.Name.toLowerCase().includes(searchTerm.toLowerCase()));
    };
    const handleAddUser = () => {
        setIsModalOpen(true);
    };
    const handleCreateUser = (newUser) => {
        dispatch((0, userSlice_1.addUserAsync)(newUser));
        setIsModalOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            IMG: e.target.img.value,
            Name: e.target.name.value,
            ID: (0, nanoid_1.nanoid)(),
            Email: e.target.email.value,
            "Start Date": e.target.startDate.value,
            Description: e.target.description.value,
            Contact: e.target.contact.value,
            Status: e.target.status.value,
            Password: e.target.password.value,
        };
        handleCreateUser(newUser);
    };
    const sortUsers = (users) => {
        let sortedUsers = [...users];
        switch (sortOrder) {
            case "newest":
                sortedUsers.sort((a, b) => new Date(b["Start Date"]) - new Date(a["Start Date"]));
                break;
            case "oldest":
                sortedUsers.sort((a, b) => new Date(a["Start Date"]) - new Date(b["Start Date"]));
                break;
            case "name":
                sortedUsers.sort((a, b) => a.Name.localeCompare(b.Name));
                break;
            default:
                break;
        }
        return sortedUsers;
    };
    return (react_1.default.createElement("div", null, loading ? (react_1.default.createElement("div", { style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        } },
        react_1.default.createElement(react_loader_spinner_1.ColorRing, { type: "ThreeDots", colors: ["white", "black", "#8f8f8f", "#212121", "#414141"], height: 100, width: 100, timeout: 3000 }))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "3%",
                marginRight: "3%",
                marginBottom: "-100px",
                color: "white",
                marginTop: "150px",
            } },
            react_1.default.createElement("div", { style: {
                    marginLeft: "12%",
                    marginBottom: "-150px",
                    color: "white",
                } },
                react_1.default.createElement("label", { htmlFor: "search-user", style: { fontSize: "20px", letterSpacing: "1.5px" } }, "Search User:"),
                react_1.default.createElement("input", { type: "text", id: "search-user", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), style: {
                        marginLeft: "18px",
                        padding: "10px 20px",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        background: "#212121",
                    } })),
            " ",
            react_1.default.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "15%",
                    marginRight: "15%",
                    marginBottom: "-100px",
                    color: "white",
                } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("label", { htmlFor: "sort-order", style: { fontSize: "20px", letterSpacing: "1.5px" } }, "Sort by:"),
                    react_1.default.createElement("select", { id: "sort-order", value: sortOrder, onChange: (e) => setSortOrder(e.target.value), style: {
                            marginLeft: "18px",
                            padding: "10px 20px",
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "10px",
                            background: "#212121",
                        } },
                        react_1.default.createElement("option", { value: "newest" }, "Newest"),
                        react_1.default.createElement("option", { value: "oldest" }, "Oldest"),
                        react_1.default.createElement("option", { value: "name" }, "By Name"))))),
        react_1.default.createElement(Table_1.default, { initialData: sortUsers(filterUsersByName(usersData)), onDelete: handleDelete, route: "users" }),
        react_1.default.createElement(Modal_1.default, { isOpen: isModalOpen, onRequestClose: () => setIsModalOpen(false) },
            react_1.default.createElement("h2", { style: { color: "white" } }, "Create New User"),
            react_1.default.createElement(StyledUser_1.Form, { onSubmit: handleSubmit },
                react_1.default.createElement("label", { htmlFor: "img" },
                    "Image URL:",
                    react_1.default.createElement("input", { "data-cy": "img", type: "text", id: "img", name: "img" })),
                react_1.default.createElement("label", { htmlFor: "name" },
                    "Name:",
                    react_1.default.createElement("input", { "data-cy": "name", required: true, type: "text", id: "name", name: "name" })),
                react_1.default.createElement("label", { htmlFor: "email" },
                    "Email:",
                    react_1.default.createElement("input", { "data-cy": "email", required: true, type: "email", id: "email", name: "email" })),
                react_1.default.createElement("label", { htmlFor: "startDate" },
                    "Start Date:",
                    react_1.default.createElement("input", { "data-cy": "startDate", required: true, type: "date", id: "startDate", name: "startDate" })),
                react_1.default.createElement("label", { htmlFor: "description" },
                    "Description:",
                    react_1.default.createElement("input", { "data-cy": "job", required: true, type: "text", id: "description", name: "description" })),
                react_1.default.createElement("label", { htmlFor: "contact" },
                    "Contact:",
                    react_1.default.createElement("input", { required: true, type: "text", id: "contact", name: "contact" })),
                react_1.default.createElement("label", { htmlFor: "status" },
                    "Status:",
                    react_1.default.createElement("select", { "data-cy": "status", required: true, id: "status", name: "status" },
                        react_1.default.createElement("option", { value: "Active" }, "Active"),
                        react_1.default.createElement("option", { value: "Inactive" }, "Inactive"))),
                react_1.default.createElement("label", { htmlFor: "password" },
                    "Password:",
                    react_1.default.createElement("input", { "data-cy": "password", required: true, type: "password", id: "password", name: "password" })),
                " ",
                react_1.default.createElement("button", { type: "submit", "data-cy": "submit", style: {
                        display: "block",
                        margin: "auto",
                        marginTop: "50px",
                        padding: "10px 20px",
                        color: "white",
                        fontSize: "15px",
                        backgroundColor: "#222",
                        border: "3px solid #414141",
                        borderRadius: "20px",
                    } }, "Save"))),
        react_1.default.createElement("button", { "data-cy": "addUser", style: {
                display: "block",
                padding: "10px 20px",
                color: "white",
                fontSize: "15px",
                backgroundColor: "#222",
                border: "3px solid #424242",
                borderRadius: "20px",
                margin: "auto",
                marginTop: "50px",
                marginBottom: "50px",
            }, onClick: handleAddUser }, "Add User")))));
};
exports.default = Users;
