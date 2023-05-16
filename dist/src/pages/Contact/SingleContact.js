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
const react_redux_1 = require("react-redux");
const contactSlice_1 = require("../../features/contactSlice");
const styled_components_1 = __importDefault(require("styled-components"));
const Done_1 = __importDefault(require("@mui/icons-material/Done"));
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
const ContactContainer = styled_components_1.default.div `
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 150px;
`;
const Detail = styled_components_1.default.div `
  margin-bottom: 10px;
`;
const SingleContact = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const contactsData = (0, react_redux_1.useSelector)((state) => state.contacts.contacts);
    (0, react_1.useEffect)(() => {
        dispatch((0, contactSlice_1.fetchContactsAsync)());
    }, [dispatch]);
    const contact = contactsData.find((contact) => contact["Order ID"] === id);
    return (react_1.default.createElement(ContactContainer, null, contact ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Order ID:"),
            " ",
            contact["Order ID"]),
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Date:"),
            " ",
            contact.Date),
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Customer:"),
            " ",
            contact.Customer),
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Mail:"),
            " ",
            contact.Mail),
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Telephone:"),
            " ",
            contact.Telephone),
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Asunto:"),
            " ",
            contact.Asunto),
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Comment:"),
            " ",
            contact.Comment),
        react_1.default.createElement(Detail, null,
            react_1.default.createElement("strong", null, "Action:"),
            " ",
            contact.Action))) : (react_1.default.createElement("p", null, "Contact not found."))));
};
exports.default = SingleContact;
