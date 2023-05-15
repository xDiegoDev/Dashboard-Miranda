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
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingAsync } from "../../features/bookingSlice";
import Modal from "../../components/Modal";
import { Form } from "../Users/StyledUser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MessageIcon from "@mui/icons-material/Message";
import { BookingComp, BookingSlider, Ribbon } from "./StyledSingleBook";
import { useNavigate } from "react-router-dom";
var SingleBooking = function () {
    var _a;
    var id = useParams().id;
    var dispatch = useDispatch();
    var bookings = useSelector(function (state) { return state.bookings.bookings; });
    var navigate = useNavigate();
    var booking = bookings.find(function (booking) { return String(booking.ID) === String(id); });
    var _b = useState(booking["Guest"]), editedGuest = _b[0], setEditedGuest = _b[1];
    var _c = useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var _d = useState(booking["Check In"]), editedCheckIn = _d[0], setEditedCheckIn = _d[1];
    var _e = useState(booking["Check Out"]), editedCheckOut = _e[0], setEditedCheckOut = _e[1];
    var _f = useState(booking["Room Type"]), editedRoomType = _f[0], setEditedRoomType = _f[1];
    var _g = useState(booking.price), editedPrice = _g[0], setEditedPrice = _g[1];
    if (!booking) {
        return React.createElement("div", null, "Booking not found");
    }
    var handleEditSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedBooking, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    updatedBooking = __assign(__assign({}, booking), { Guest: editedGuest, "Check In": editedCheckIn, "Check Out": editedCheckOut, "Room Type": editedRoomType, price: editedPrice });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dispatch(updateBookingAsync(updatedBooking))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to update booking:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsModalOpen(false);
                    navigate("/bookings");
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEditClick = function () {
        setIsModalOpen(true);
    };
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    var getStatusColor = function (status) {
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
    return (React.createElement(BookingComp, null,
        React.createElement("div", { className: "details", style: { width: "45%", position: "relative" } },
            React.createElement("div", { className: "guest" },
                React.createElement("button", { style: {
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
                React.createElement("img", { src: booking.UserIMG, alt: "UserIMG" }),
                React.createElement("div", null,
                    React.createElement("h2", null, booking.Guest),
                    React.createElement("p", null,
                        "ID: ",
                        booking.ID),
                    React.createElement("div", { className: "inner__div" },
                        React.createElement(LocalPhoneIcon, { style: { color: "white" } }),
                        React.createElement("button", null,
                            React.createElement(MessageIcon, null),
                            React.createElement("p", null, "Send message"))))),
            React.createElement("div", { className: "checks" },
                React.createElement("div", null,
                    React.createElement("p", null, "Check in"),
                    React.createElement("p", null,
                        React.createElement("strong", null, booking["Check In"]))),
                React.createElement("div", null,
                    React.createElement("p", null, "Check out"),
                    React.createElement("p", null,
                        React.createElement("strong", null, booking["Check Out"])))),
            React.createElement("div", { className: "line" },
                React.createElement("div", null)),
            React.createElement("div", { className: "room_details" },
                React.createElement("div", { className: "info__price" },
                    React.createElement("div", null,
                        React.createElement("p", null, "Room info"),
                        React.createElement("p", null,
                            React.createElement("strong", null, booking["Room Type"]))),
                    React.createElement("div", null,
                        React.createElement("p", null, "Price"),
                        React.createElement("p", null,
                            React.createElement("strong", null, booking.price)))),
                React.createElement("p", { className: "text" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt dui vitae ante facilisis, nec blandit eros lacinia. Sed quam lacus, auctor id sem in, molestie maximus ex. Etiam facilisis congue sapien, eget convallis nibh elementum at. Nullam vehicula placerat ipsum ut accumsan. Fusce commodo quam tincidunt, aliquam augue vel, fermentum ipsum. Cras semper iaculis risus, vel aliquam nisi tincidunt vitae. Sed elit sapien, rhoncus at tellus lacinia, luctus placerat nisl. Donec dapibus neque in ipsum porttitor, ac rutrum neque vulputate."),
                React.createElement("div", { className: "facilities__div" },
                    React.createElement("p", null, "Facilities"),
                    React.createElement("div", { className: "facilities" }, (_a = booking.facilities) === null || _a === void 0 ? void 0 : _a.map(function (item, index) {
                        return React.createElement("div", { key: index }, item);
                    }))))),
        React.createElement(BookingSlider, null,
            React.createElement(Slider, __assign({}, settings, { style: { width: "95%", height: "970px" } }), booking.IMG.map(function (image, index) { return (React.createElement("div", { key: index, style: { width: "100%", height: "1000px", position: "relative" } },
                React.createElement("div", { style: {
                        borderRadius: "30px",
                        overflow: "hidden",
                        position: "relative",
                        width: "100%",
                        height: "970px",
                    } },
                    React.createElement(Ribbon, { color: getStatusColor(booking.Status) }, booking.Status),
                    React.createElement("img", { src: image, alt: "Booking image ".concat(index), style: {
                            width: "100%",
                            height: "970px",
                            objectFit: "cover",
                        } })))); }))),
        React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); } },
            React.createElement(Form, { onSubmit: handleEditSubmit },
                React.createElement("label", { htmlFor: "guest" },
                    "Guest:",
                    React.createElement("input", { required: true, type: "text", id: "guest", name: "guest", value: editedGuest, onChange: function (e) { return setEditedGuest(e.target.value); } })),
                React.createElement("label", { htmlFor: "checkin" },
                    "Check In:",
                    React.createElement("input", { required: true, type: "date", id: "checkin", name: "checkin", value: editedCheckIn, onChange: function (e) { return setEditedCheckIn(e.target.value); } })),
                React.createElement("label", { htmlFor: "checkout" },
                    "Check Out:",
                    React.createElement("input", { required: true, type: "date", id: "checkout", name: "checkout", value: editedCheckOut, onChange: function (e) { return setEditedCheckOut(e.target.value); } })),
                React.createElement("label", { htmlFor: "roomtype" },
                    "Room Type:",
                    React.createElement("input", { required: true, type: "text", id: "roomtype", name: "roomtype", value: editedRoomType, onChange: function (e) { return setEditedRoomType(e.target.value); } })),
                React.createElement("label", { htmlFor: "price" },
                    "Price:",
                    React.createElement("input", { required: true, type: "text", id: "price", name: "price", value: editedPrice, onChange: function (e) { return setEditedPrice(e.target.value); } })),
                React.createElement("button", { type: "submit" }, "Save"),
                React.createElement("button", { onClick: function () { return setIsModalOpen(false); } }, "Cancel")))));
};
export default SingleBooking;
