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
exports.ContactSlider = void 0;
const react_1 = __importStar(require("react"));
const Table_1 = __importDefault(require("../../components/Table/Table"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const contactSlice_1 = require("../../features/contactSlice");
const styled_components_1 = __importDefault(require("styled-components"));
const react_slick_1 = __importDefault(require("react-slick"));
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
const fa_1 = require("react-icons/fa");
const Arrow = ({ direction, onClick }) => {
    const styles = {
        position: "absolute",
        zIndex: 2,
        top: direction === "left" ? "32%" : "35%",
        cursor: "pointer",
        fontSize: "3rem",
        color: "white",
        marginLeft: direction === "left" ? "-7%" : "102%",
    };
    const transform = direction === "left" ? "rotate(180deg)" : "rotate(0deg)";
    return (react_1.default.createElement("div", { style: Object.assign(Object.assign({}, styles), { transform }), onClick: onClick },
        react_1.default.createElement(fa_1.FaChevronRight, null)));
};
const Card = styled_components_1.default.div `
  background-color: #212121;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 200px;
  color: white;
`;
const SliderContainer = styled_components_1.default.div `
  width: 1100px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 20px;
`;
const Comment = styled_components_1.default.div `
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
`;
const CustomerInfo = styled_components_1.default.div `
  display: flex;
  align-items: center;
`;
const SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: react_1.default.createElement(Arrow, { direction: "right" }),
    prevArrow: react_1.default.createElement(Arrow, { direction: "left" }),
};
const Img = styled_components_1.default.img `
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;
const CardWrapper = styled_components_1.default.div `
  margin-left: 10px;
`;
const ContactSlider = () => {
    const contactsData = (0, react_redux_1.useSelector)((state) => state.contacts.contacts);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleCardClick = (id) => {
        navigate(`/contacts/${id}`);
    };
    return (react_1.default.createElement("div", { style: {
            margin: "auto",
            marginTop: "150px",
            borderRadius: "10px",
            width: "80%",
        } },
        react_1.default.createElement("h2", { style: { marginLeft: "8%", marginBottom: "30px", color: "white" } }, "Latest Reviews by Customers"),
        Array.isArray(contactsData) && (react_1.default.createElement(SliderContainer, null,
            react_1.default.createElement(react_slick_1.default, Object.assign({}, SliderSettings, { style: {} }), contactsData.map((contact) => (react_1.default.createElement(CardWrapper, null,
                react_1.default.createElement(Card, { key: contact["Order ID"], onClick: () => handleCardClick(contact["Order ID"]), style: { marginRight: "20px", padding: "20px" } },
                    react_1.default.createElement(Comment, { style: { marginRight: "10px", marginBottom: "40px" } }, contact.Comment),
                    react_1.default.createElement(CustomerInfo, null,
                        react_1.default.createElement(Img, { src: contact.IMG, alt: "customer-avatar", style: { marginRight: "50px" } }),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("div", null, contact.Customer),
                            react_1.default.createElement("div", { style: { marginRight: "20px" } }, contact.Date))))))))))));
};
exports.ContactSlider = ContactSlider;
const Contact = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const contactsData = (0, react_redux_1.useSelector)((state) => state.contacts.contacts);
    const [filter, setFilter] = (0, react_1.useState)("all");
    const filterData = (data) => {
        return data.filter((row) => {
            if (filter === "all")
                return true;
            if (filter === "published")
                return row.Action === "Archive";
            if (filter === "archived")
                return row.Action == "Publish";
            return false;
        });
    };
    (0, react_1.useEffect)(() => {
        dispatch((0, contactSlice_1.fetchContactsAsync)());
    }, [dispatch]);
    return (react_1.default.createElement("div", { style: { marginBottom: "100px" } },
        react_1.default.createElement(exports.ContactSlider, null),
        react_1.default.createElement("div", { style: {
                marginLeft: "69%",
                marginTop: "50px",
                marginBottom: "-150px",
                color: "white",
            } },
            react_1.default.createElement("label", { htmlFor: "action-filter", style: { fontSize: "20px" } }, "Filter by action:"),
            react_1.default.createElement("select", { id: "action-filter", value: filter, onChange: (e) => setFilter(e.target.value), style: {
                    marginLeft: "18px",
                    padding: "10px 20px",
                    color: "white",
                    borderRadius: "10px",
                    background: "#212121",
                    fontSize: "15px",
                } },
                react_1.default.createElement("option", { value: "all" }, "All"),
                react_1.default.createElement("option", { value: "published" }, "Published"),
                react_1.default.createElement("option", { value: "archived" }, "Archived"))),
        Array.isArray(contactsData) ? (react_1.default.createElement(Table_1.default, { initialData: filterData(contactsData), route: "contacts" })) : (react_1.default.createElement("p", null, "Loading..."))));
};
exports.default = Contact;
