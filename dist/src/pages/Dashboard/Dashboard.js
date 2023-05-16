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
const KingBed_1 = __importDefault(require("@mui/icons-material/KingBed"));
const EventAvailable_1 = __importDefault(require("@mui/icons-material/EventAvailable"));
const Login_1 = __importDefault(require("@mui/icons-material/Login"));
const Logout_1 = __importDefault(require("@mui/icons-material/Logout"));
const StyledDashboard_1 = require("./StyledDashboard");
const Contact_1 = require("../Contact/Contact");
const react_redux_1 = require("react-redux");
const contactSlice_1 = require("../../features/contactSlice");
const react_calendar_1 = __importDefault(require("react-calendar"));
require("react-calendar/dist/Calendar.css");
require("./calendarStyles.css");
const Dashboard = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [value, onChange] = (0, react_1.useState)(new Date());
    (0, react_1.useEffect)(() => {
        dispatch(contactSlice_1.fetchContactsAsync);
    }, [dispatch]);
    return (react_1.default.createElement("div", { style: { width: "100%" } },
        react_1.default.createElement(StyledDashboard_1.DashDivs, null,
            react_1.default.createElement("div", { className: "info__container" },
                react_1.default.createElement("div", { className: "icon" },
                    react_1.default.createElement(KingBed_1.default, null)),
                react_1.default.createElement("div", { className: "contained__info" },
                    react_1.default.createElement("h5", null, "8461"),
                    react_1.default.createElement("p", null, "New Booking"))),
            react_1.default.createElement("div", { className: "info__container" },
                react_1.default.createElement("div", { className: "icon" },
                    react_1.default.createElement(EventAvailable_1.default, null)),
                react_1.default.createElement("div", { className: "contained__info" },
                    react_1.default.createElement("h5", null, "963"),
                    react_1.default.createElement("p", null, "Scheduled Room"))),
            react_1.default.createElement("div", { className: "info__container" },
                react_1.default.createElement("div", { className: "icon" },
                    react_1.default.createElement(Login_1.default, null)),
                react_1.default.createElement("div", { className: "contained__info" },
                    react_1.default.createElement("h5", null, "753"),
                    react_1.default.createElement("p", null, "Check In"))),
            react_1.default.createElement("div", { className: "info__container" },
                react_1.default.createElement("div", { className: "icon" },
                    react_1.default.createElement(Logout_1.default, null)),
                react_1.default.createElement("div", { className: "contained__info" },
                    react_1.default.createElement("h5", null, "516"),
                    react_1.default.createElement("p", null, "Check Out")))),
        react_1.default.createElement("div", { style: { display: "flex" } },
            react_1.default.createElement(react_calendar_1.default, { onChange: onChange, value: value })),
        react_1.default.createElement("div", { style: { marginTop: "-70px", marginBottom: "50px" } },
            react_1.default.createElement(Contact_1.ContactSlider, null))));
};
exports.default = Dashboard;
