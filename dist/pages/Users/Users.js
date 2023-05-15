var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { fetchUsersAsync, deleteUserAsync, addUserAsync, } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ColorRing as Loader } from "react-loader-spinner";
import Modal from "../../components/Modal";
import { Form } from "./StyledUser";
import { useAuth } from "../../contexts/useAuth.tsx";
var Users = function (_a) {
    var handleLogout = _a.handleLogout;
    var dispatch = useDispatch();
    var usersData = useSelector(function (state) { return state.users.users; });
    var usersStatus = useSelector(function (state) { return state.users.status; });
    var loading = useSelector(function (state) { return state.users.status === "loading"; });
    var _b = useState(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = useAuth(), isLoggedIn = _c.isLoggedIn, userEmail = _c.userEmail;
    var _d = useState(""), searchTerm = _d[0], setSearchTerm = _d[1];
    var _e = useState("newest"), sortOrder = _e[0], setSortOrder = _e[1];
    var _f = useState(false), sortByName = _f[0], setSortByName = _f[1];
    useEffect(function () {
        if (usersStatus === "idle") {
            dispatch(fetchUsersAsync());
        }
    }, [dispatch]);
    var handleDelete = function (user) {
        dispatch(deleteUserAsync(user.ID));
        if (isLoggedIn && user.Email === userEmail) {
            handleLogout();
        }
    };
    var filterUsersByName = function (users) {
        if (!searchTerm)
            return users;
        return users.filter(function (user) {
            return user.Name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };
    var handleAddUser = function () {
        setIsModalOpen(true);
    };
    var handleCreateUser = function (newUser) {
        dispatch(addUserAsync(newUser));
        setIsModalOpen(false);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var newUser = {
            IMG: e.target.img.value,
            Name: e.target.name.value,
            ID: nanoid(),
            Email: e.target.email.value,
            "Start Date": e.target.startDate.value,
            Description: e.target.description.value,
            Contact: e.target.contact.value,
            Status: e.target.status.value,
            Password: e.target.password.value,
        };
        handleCreateUser(newUser);
    };
    var sortUsers = function (users) {
        var sortedUsers = __spreadArray([], users, true);
        switch (sortOrder) {
            case "newest":
                sortedUsers.sort(function (a, b) { return new Date(b["Start Date"]) - new Date(a["Start Date"]); });
                break;
            case "oldest":
                sortedUsers.sort(function (a, b) { return new Date(a["Start Date"]) - new Date(b["Start Date"]); });
                break;
            case "name":
                sortedUsers.sort(function (a, b) { return a.Name.localeCompare(b.Name); });
                break;
            default:
                break;
        }
        return sortedUsers;
    };
    return (React.createElement("div", null, loading ? (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        } },
        React.createElement(Loader, { type: "ThreeDots", colors: ["white", "black", "#8f8f8f", "#212121", "#414141"], height: 100, width: 100, timeout: 3000 }))) : (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "3%",
                marginRight: "3%",
                marginBottom: "-100px",
                color: "white",
                marginTop: "150px",
            } },
            React.createElement("div", { style: {
                    marginLeft: "12%",
                    marginBottom: "-150px",
                    color: "white",
                } },
                React.createElement("label", { htmlFor: "search-user", style: { fontSize: "20px", letterSpacing: "1.5px" } }, "Search User:"),
                React.createElement("input", { type: "text", id: "search-user", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, style: {
                        marginLeft: "18px",
                        padding: "10px 20px",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        background: "#212121",
                    } })),
            " ",
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "15%",
                    marginRight: "15%",
                    marginBottom: "-100px",
                    color: "white",
                } },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "sort-order", style: { fontSize: "20px", letterSpacing: "1.5px" } }, "Sort by:"),
                    React.createElement("select", { id: "sort-order", value: sortOrder, onChange: function (e) { return setSortOrder(e.target.value); }, style: {
                            marginLeft: "18px",
                            padding: "10px 20px",
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "10px",
                            background: "#212121",
                        } },
                        React.createElement("option", { value: "newest" }, "Newest"),
                        React.createElement("option", { value: "oldest" }, "Oldest"),
                        React.createElement("option", { value: "name" }, "By Name"))))),
        React.createElement(Table, { initialData: sortUsers(filterUsersByName(usersData)), onDelete: handleDelete, route: "users" }),
        React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); } },
            React.createElement("h2", { style: { color: "white" } }, "Create New User"),
            React.createElement(Form, { onSubmit: handleSubmit },
                React.createElement("label", { htmlFor: "img" },
                    "Image URL:",
                    React.createElement("input", { "data-cy": "img", type: "text", id: "img", name: "img" })),
                React.createElement("label", { htmlFor: "name" },
                    "Name:",
                    React.createElement("input", { "data-cy": "name", required: true, type: "text", id: "name", name: "name" })),
                React.createElement("label", { htmlFor: "email" },
                    "Email:",
                    React.createElement("input", { "data-cy": "email", required: true, type: "email", id: "email", name: "email" })),
                React.createElement("label", { htmlFor: "startDate" },
                    "Start Date:",
                    React.createElement("input", { "data-cy": "startDate", required: true, type: "date", id: "startDate", name: "startDate" })),
                React.createElement("label", { htmlFor: "description" },
                    "Description:",
                    React.createElement("input", { "data-cy": "job", required: true, type: "text", id: "description", name: "description" })),
                React.createElement("label", { htmlFor: "contact" },
                    "Contact:",
                    React.createElement("input", { required: true, type: "text", id: "contact", name: "contact" })),
                React.createElement("label", { htmlFor: "status" },
                    "Status:",
                    React.createElement("select", { "data-cy": "status", required: true, id: "status", name: "status" },
                        React.createElement("option", { value: "Active" }, "Active"),
                        React.createElement("option", { value: "Inactive" }, "Inactive"))),
                React.createElement("label", { htmlFor: "password" },
                    "Password:",
                    React.createElement("input", { "data-cy": "password", required: true, type: "password", id: "password", name: "password" })),
                " ",
                React.createElement("button", { type: "submit", "data-cy": "submit", style: {
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
        React.createElement("button", { "data-cy": "addUser", style: {
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
export default Users;
