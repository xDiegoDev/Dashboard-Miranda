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
const react_redux_1 = require("react-redux");
const userSlice_1 = require("../../features/userSlice");
const Modal_1 = __importDefault(require("../../components/Modal"));
const StyledUser_1 = require("./StyledUser");
const StyledSingleBook_1 = require("../Bookings/StyledSingleBook");
const LocalPhone_1 = __importDefault(require("@mui/icons-material/LocalPhone"));
const Message_1 = __importDefault(require("@mui/icons-material/Message"));
const SingleUser = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const users = (0, react_redux_1.useSelector)((state) => state.users.users);
    const user = users.find((user) => String(user.ID) === String(id));
    const [editedName, setEditedName] = (0, react_1.useState)(user.Name);
    const [editedEmail, setEditedEmail] = (0, react_1.useState)(user.Email);
    const [editedDescription, setEditedDescription] = (0, react_1.useState)(user.Description);
    const [editedStatus, setEditedStatus] = (0, react_1.useState)(user.Status);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    if (!user) {
        return react_1.default.createElement("div", null, "User not found");
    }
    const handleEditSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const updatedUser = Object.assign(Object.assign({}, user), { Name: editedName, Email: editedEmail, Description: editedDescription, Status: editedStatus });
        try {
            yield dispatch((0, userSlice_1.updateUserAsync)(updatedUser));
        }
        catch (error) {
            console.error("Failed to update user:", error);
        }
        setIsModalOpen(false);
        navigate("/users");
    });
    const handleEditClick = () => {
        setIsModalOpen(true);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(StyledSingleBook_1.BookingComp, null,
            react_1.default.createElement("div", { className: "details", style: {
                    display: "block",
                    margin: "auto",
                    letterSpacing: "2px",
                    position: "relative",
                } },
                react_1.default.createElement("button", { style: {
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
                react_1.default.createElement("div", { className: "guest", style: { alignItems: "center", marginTop: "30px" } },
                    react_1.default.createElement("img", { src: user.IMG, style: { width: "400px" } }),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", null, user.Name),
                        react_1.default.createElement("h2", { style: { fontSize: "20px" } }, user.Email),
                        react_1.default.createElement("p", null, user.ID),
                        react_1.default.createElement("p", null, user.Status),
                        react_1.default.createElement("div", { className: "inner__div" },
                            react_1.default.createElement(LocalPhone_1.default, { style: { color: "white" } }),
                            react_1.default.createElement("button", null,
                                react_1.default.createElement(Message_1.default, null),
                                react_1.default.createElement("p", null, "Send message"))))),
                react_1.default.createElement("div", { className: "line" },
                    react_1.default.createElement("div", null)),
                react_1.default.createElement("div", { style: {
                        display: "flex",
                        textAlign: "center",
                        width: "100%",
                        color: "white",
                        justifyContent: "center",
                        marginBottom: "30px",
                    } },
                    react_1.default.createElement("h3", { className: "text" }, user.Description))),
            react_1.default.createElement(Modal_1.default, { isOpen: isModalOpen, onRequestClose: () => setIsModalOpen(false) },
                react_1.default.createElement(StyledUser_1.Form, { onSubmit: handleEditSubmit },
                    react_1.default.createElement("label", { htmlFor: "name" },
                        "Name:",
                        react_1.default.createElement("input", { required: true, type: "text", id: "name", name: "name", value: editedName, onChange: (e) => setEditedName(e.target.value) })),
                    react_1.default.createElement("label", { htmlFor: "email" },
                        "Email:",
                        react_1.default.createElement("input", { required: true, type: "email", id: "email", name: "email", value: editedEmail, onChange: (e) => setEditedEmail(e.target.value) })),
                    react_1.default.createElement("label", { htmlFor: "description" },
                        "Description:",
                        react_1.default.createElement("input", { required: true, type: "text", id: "description", name: "description", value: editedDescription, onChange: (e) => setEditedDescription(e.target.value) })),
                    react_1.default.createElement("label", { htmlFor: "status" },
                        "Status:",
                        react_1.default.createElement("select", { required: true, id: "status", name: "status", value: editedStatus, onChange: (e) => setEditedStatus(e.target.value) },
                            react_1.default.createElement("option", { value: "Active" }, "Active"),
                            react_1.default.createElement("option", { value: "Inactive" }, "Inactive"))),
                    react_1.default.createElement("button", { type: "submit", style: {
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
                    react_1.default.createElement("button", { style: {
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
                        }, onClick: () => setIsModalOpen(false) }, "Cancel"))))));
};
exports.default = SingleUser;
