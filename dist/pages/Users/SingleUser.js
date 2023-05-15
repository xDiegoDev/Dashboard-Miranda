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
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAsync } from "../../features/userSlice";
import Modal from "../../components/Modal";
import { User, UserComp, Form } from "./StyledUser";
import { BookingComp } from "../Bookings/StyledSingleBook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MessageIcon from "@mui/icons-material/Message";
var SingleUser = function () {
    var id = useParams().id;
    var dispatch = useDispatch();
    var navigate = useNavigate();
    var users = useSelector(function (state) { return state.users.users; });
    var user = users.find(function (user) { return String(user.ID) === String(id); });
    var _a = useState(user.Name), editedName = _a[0], setEditedName = _a[1];
    var _b = useState(user.Email), editedEmail = _b[0], setEditedEmail = _b[1];
    var _c = useState(user.Description), editedDescription = _c[0], setEditedDescription = _c[1];
    var _d = useState(user.Status), editedStatus = _d[0], setEditedStatus = _d[1];
    var _e = useState(false), isModalOpen = _e[0], setIsModalOpen = _e[1];
    if (!user) {
        return React.createElement("div", null, "User not found");
    }
    var handleEditSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    updatedUser = __assign(__assign({}, user), { Name: editedName, Email: editedEmail, Description: editedDescription, Status: editedStatus });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dispatch(updateUserAsync(updatedUser))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to update user:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsModalOpen(false);
                    navigate("/users");
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEditClick = function () {
        setIsModalOpen(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(BookingComp, null,
            React.createElement("div", { className: "details", style: {
                    display: "block",
                    margin: "auto",
                    letterSpacing: "2px",
                    position: "relative",
                } },
                React.createElement("button", { style: {
                        position: "absolute",
                        right: "30px",
                        top: "30px",
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "10px 20px ",
                        fontSize: "15px",
                        background: "#424242",
                        color: "white",
                    }, onClick: handleEditClick }, "Edit User"),
                React.createElement("div", { className: "guest", style: { alignItems: "center", marginTop: "30px" } },
                    React.createElement("img", { src: user.IMG, style: { width: "400px" } }),
                    React.createElement("div", null,
                        React.createElement("h2", null, user.Name),
                        React.createElement("h2", { style: { fontSize: "20px" } }, user.Email),
                        React.createElement("p", null, user.ID),
                        React.createElement("p", null, user.Status),
                        React.createElement("div", { className: "inner__div" },
                            React.createElement(LocalPhoneIcon, { style: { color: "white" } }),
                            React.createElement("button", null,
                                React.createElement(MessageIcon, null),
                                React.createElement("p", null, "Send message"))))),
                React.createElement("div", { className: "line" },
                    React.createElement("div", null)),
                React.createElement("div", { style: {
                        display: "flex",
                        textAlign: "center",
                        width: "100%",
                        color: "white",
                        justifyContent: "center",
                        marginBottom: "30px",
                    } },
                    React.createElement("h3", { className: "text" }, user.Description))),
            React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); } },
                React.createElement(Form, { onSubmit: handleEditSubmit },
                    React.createElement("label", { htmlFor: "name" },
                        "Name:",
                        React.createElement("input", { required: true, type: "text", id: "name", name: "name", value: editedName, onChange: function (e) { return setEditedName(e.target.value); } })),
                    React.createElement("label", { htmlFor: "email" },
                        "Email:",
                        React.createElement("input", { required: true, type: "email", id: "email", name: "email", value: editedEmail, onChange: function (e) { return setEditedEmail(e.target.value); } })),
                    React.createElement("label", { htmlFor: "description" },
                        "Description:",
                        React.createElement("input", { required: true, type: "text", id: "description", name: "description", value: editedDescription, onChange: function (e) { return setEditedDescription(e.target.value); } })),
                    React.createElement("label", { htmlFor: "status" },
                        "Status:",
                        React.createElement("select", { required: true, id: "status", name: "status", value: editedStatus, onChange: function (e) { return setEditedStatus(e.target.value); } },
                            React.createElement("option", { value: "Active" }, "Active"),
                            React.createElement("option", { value: "Inactive" }, "Inactive"))),
                    React.createElement("button", { type: "submit", style: {
                            width: "30%",
                            display: "block",
                            margin: "auto",
                            marginTop: "30px",
                            border: "1px solid white",
                            borderRadius: "5px",
                            padding: "10px 20px ",
                            fontSize: "15px",
                            background: "#424242",
                            color: "white",
                        } }, "Save"),
                    React.createElement("button", { style: {
                            width: "30%",
                            display: "block",
                            margin: "auto",
                            marginTop: "30px",
                            border: "1px solid white",
                            borderRadius: "5px",
                            padding: "10px 20px ",
                            fontSize: "15px",
                            background: "#424242",
                            color: "white",
                        }, onClick: function () { return setIsModalOpen(false); } }, "Cancel"))))));
};
export default SingleUser;
