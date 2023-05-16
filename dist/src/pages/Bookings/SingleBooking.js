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
const bookingSlice_1 = require("../../features/bookingSlice");
const Modal_1 = __importDefault(require("../../components/Modal"));
const StyledUser_1 = require("../Users/StyledUser");
const react_slick_1 = __importDefault(require("react-slick"));
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
const LocalPhone_1 = __importDefault(require("@mui/icons-material/LocalPhone"));
const Message_1 = __importDefault(require("@mui/icons-material/Message"));
const StyledSingleBook_1 = require("./StyledSingleBook");
const react_router_dom_2 = require("react-router-dom");
const SingleBooking = () => {
    var _a;
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const bookings = (0, react_redux_1.useSelector)((state) => state.bookings.bookings);
    const navigate = (0, react_router_dom_2.useNavigate)();
    const booking = bookings.find((booking) => String(booking.ID) === String(id));
    const [editedGuest, setEditedGuest] = (0, react_1.useState)(booking["Guest"]);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [editedCheckIn, setEditedCheckIn] = (0, react_1.useState)(booking["Check In"]);
    const [editedCheckOut, setEditedCheckOut] = (0, react_1.useState)(booking["Check Out"]);
    const [editedRoomType, setEditedRoomType] = (0, react_1.useState)(booking["Room Type"]);
    const [editedPrice, setEditedPrice] = (0, react_1.useState)(booking.price);
    if (!booking) {
        return react_1.default.createElement("div", null, "Booking not found");
    }
    const handleEditSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const updatedBooking = Object.assign(Object.assign({}, booking), { Guest: editedGuest, "Check In": editedCheckIn, "Check Out": editedCheckOut, "Room Type": editedRoomType, price: editedPrice });
        try {
            yield dispatch((0, bookingSlice_1.updateBookingAsync)(updatedBooking));
        }
        catch (error) {
            console.error("Failed to update booking:", error);
        }
        setIsModalOpen(false);
        navigate("/bookings");
    });
    const handleEditClick = () => {
        setIsModalOpen(true);
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "Check In":
                return "#4CAF50"; // Green
            case "Progress":
                return "#FFC107"; // Yellow
            case "Check Out":
                return "#F44336"; // Red
            case "default":
                return "white";
        }
    };
    return (react_1.default.createElement(StyledSingleBook_1.BookingComp, null,
        react_1.default.createElement("div", { className: "details", style: { width: "45%", position: "relative" } },
            react_1.default.createElement("div", { className: "guest" },
                react_1.default.createElement("button", { style: {
                        position: "absolute",
                        right: "30px",
                        bottom: "25px",
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "10px 20px ",
                        fontSize: "15px",
                        background: "#424242",
                        color: "white",
                        zIndex: "10000",
                    }, onClick: handleEditClick }, "Edit Booking"),
                react_1.default.createElement("img", { src: booking.UserIMG, alt: "UserIMG" }),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h2", null, booking.Guest),
                    react_1.default.createElement("p", null,
                        "ID: ",
                        booking.ID),
                    react_1.default.createElement("div", { className: "inner__div" },
                        react_1.default.createElement(LocalPhone_1.default, { style: { color: "white" } }),
                        react_1.default.createElement("button", null,
                            react_1.default.createElement(Message_1.default, null),
                            react_1.default.createElement("p", null, "Send message"))))),
            react_1.default.createElement("div", { className: "checks" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("p", null, "Check in"),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("strong", null, booking["Check In"]))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("p", null, "Check out"),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("strong", null, booking["Check Out"])))),
            react_1.default.createElement("div", { className: "line" },
                react_1.default.createElement("div", null)),
            react_1.default.createElement("div", { className: "room_details" },
                react_1.default.createElement("div", { className: "info__price" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("p", null, "Room info"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null, booking["Room Type"]))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("p", null, "Price"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null, booking.price)))),
                react_1.default.createElement("p", { className: "text" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt dui vitae ante facilisis, nec blandit eros lacinia. Sed quam lacus, auctor id sem in, molestie maximus ex. Etiam facilisis congue sapien, eget convallis nibh elementum at. Nullam vehicula placerat ipsum ut accumsan. Fusce commodo quam tincidunt, aliquam augue vel, fermentum ipsum. Cras semper iaculis risus, vel aliquam nisi tincidunt vitae. Sed elit sapien, rhoncus at tellus lacinia, luctus placerat nisl. Donec dapibus neque in ipsum porttitor, ac rutrum neque vulputate."),
                react_1.default.createElement("div", { className: "facilities__div" },
                    react_1.default.createElement("p", null, "Facilities"),
                    react_1.default.createElement("div", { className: "facilities" }, (_a = booking.facilities) === null || _a === void 0 ? void 0 : _a.map((item, index) => {
                        return react_1.default.createElement("div", { key: index }, item);
                    }))))),
        react_1.default.createElement(StyledSingleBook_1.BookingSlider, null,
            react_1.default.createElement(react_slick_1.default, Object.assign({}, settings, { style: { width: "95%", height: "970px" } }), booking.IMG.map((image, index) => (react_1.default.createElement("div", { key: index, style: { width: "100%", height: "1000px", position: "relative" } },
                react_1.default.createElement("div", { style: {
                        borderRadius: "30px",
                        overflow: "hidden",
                        position: "relative",
                        width: "100%",
                        height: "970px",
                    } },
                    react_1.default.createElement(StyledSingleBook_1.Ribbon, { color: getStatusColor(booking.Status) }, booking.Status),
                    react_1.default.createElement("img", { src: image, alt: `Booking image ${index}`, style: {
                            width: "100%",
                            height: "970px",
                            objectFit: "cover",
                        } }))))))),
        react_1.default.createElement(Modal_1.default, { isOpen: isModalOpen, onRequestClose: () => setIsModalOpen(false) },
            react_1.default.createElement(StyledUser_1.Form, { onSubmit: handleEditSubmit },
                react_1.default.createElement("label", { htmlFor: "guest" },
                    "Guest:",
                    react_1.default.createElement("input", { required: true, type: "text", id: "guest", name: "guest", value: editedGuest, onChange: (e) => setEditedGuest(e.target.value) })),
                react_1.default.createElement("label", { htmlFor: "checkin" },
                    "Check In:",
                    react_1.default.createElement("input", { required: true, type: "date", id: "checkin", name: "checkin", value: editedCheckIn, onChange: (e) => setEditedCheckIn(e.target.value) })),
                react_1.default.createElement("label", { htmlFor: "checkout" },
                    "Check Out:",
                    react_1.default.createElement("input", { required: true, type: "date", id: "checkout", name: "checkout", value: editedCheckOut, onChange: (e) => setEditedCheckOut(e.target.value) })),
                react_1.default.createElement("label", { htmlFor: "roomtype" },
                    "Room Type:",
                    react_1.default.createElement("input", { required: true, type: "text", id: "roomtype", name: "roomtype", value: editedRoomType, onChange: (e) => setEditedRoomType(e.target.value) })),
                react_1.default.createElement("label", { htmlFor: "price" },
                    "Price:",
                    react_1.default.createElement("input", { required: true, type: "text", id: "price", name: "price", value: editedPrice, onChange: (e) => setEditedPrice(e.target.value) })),
                react_1.default.createElement("button", { type: "submit" }, "Save"),
                react_1.default.createElement("button", { onClick: () => setIsModalOpen(false) }, "Cancel")))));
};
exports.default = SingleBooking;
