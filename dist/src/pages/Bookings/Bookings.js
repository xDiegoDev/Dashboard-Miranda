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
const bookingSlice_1 = require("../../features/bookingSlice");
const react_redux_1 = require("react-redux");
const nanoid_1 = require("nanoid");
const react_loader_spinner_1 = require("react-loader-spinner");
const Modal_1 = __importDefault(require("../../components/Modal"));
const StyledUser_1 = require("../Users/StyledUser");
const react_select_1 = __importDefault(require("react-select"));
const Bookings = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const bookingsData = (0, react_redux_1.useSelector)((state) => state.bookings.bookings);
    const bookingsStatus = (0, react_redux_1.useSelector)((state) => state.bookings.status);
    const loading = (0, react_redux_1.useSelector)((state) => state.rooms.status === "loading");
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [statusFilter, setStatusFilter] = (0, react_1.useState)("all");
    const [facilities, setFacilities] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        if (bookingsStatus === "idle") {
            dispatch((0, bookingSlice_1.fetchBookingsAsync)());
        }
    }, [dispatch]);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
    };
    const handleDelete = (booking) => {
        dispatch((0, bookingSlice_1.deleteBookingAsync)(booking.ID));
    };
    const handleAddRoom = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const imgUrls = e.target.elements.img.value
            .split(",")
            .map((url) => url.trim());
        if (imgUrls.length < 3 || imgUrls.length > 5) {
            alert("Please provide between 3 and 5 image URLs");
            return;
        }
        const newBooking = {
            IMG: imgUrls,
            Guest: e.target.elements.guest.value,
            ID: (0, nanoid_1.nanoid)(),
            "Order Date": e.target.elements.orderDate.value,
            "Check In": e.target.elements.checkIn.value,
            "Check Out": e.target.elements.checkOut.value,
            "Special Request": "View Notes",
            "Room Type": e.target.elements.roomType.value,
            Status: e.target.elements.status.value,
            facilities: facilities.map((facility) => facility.value),
        };
        dispatch((0, bookingSlice_1.addBookingAsync)(newBooking));
        setIsModalOpen(false);
    };
    let filteredBookings = [];
    if (bookingsData) {
        filteredBookings = bookingsData
            .filter((booking) => {
            if (searchTerm === "") {
                return true;
            }
            return booking.Guest.toLowerCase().includes(searchTerm.toLowerCase());
        })
            .filter((booking) => {
            if (statusFilter === "all") {
                return true;
            }
            return booking.Status === statusFilter;
        });
    }
    const facilityOptions = [
        { value: "TV", label: "TV" },
        { value: "AC", label: "AC" },
        { value: "Double Bed", label: "Double Bed" },
        { value: "Parking Spot", label: "Parking Spot" },
        { value: "WiFi", label: "WiFi" },
        { value: "Fridge", label: "Fridge" },
    ];
    return (react_1.default.createElement("div", null, loading ? (react_1.default.createElement("div", { style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        } },
        react_1.default.createElement(react_loader_spinner_1.ColorRing, { type: "ThreeDots", colors: ["white", "black", "#8f8f8f", "#212121", "#414141"], height: 100, width: 100, timeout: 3000 }))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                marginTop: "150px",
                marginLeft: "12%",
                marginBottom: "-130px",
                color: "white",
                width: "85%",
            } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "search-user", style: {
                        fontSize: "20px",
                        letterSpacing: "1.5px",
                        marginTop: "5px",
                    } }, "Search Guest"),
                react_1.default.createElement("input", { type: "text", placeholder: "Search Guest", onChange: handleSearchChange, style: {
                        marginLeft: "18px",
                        padding: "10px 20px",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        background: "#212121",
                    } })),
            react_1.default.createElement("div", { style: {
                    marginLeft: "23%",
                    fontSize: "18px",
                    letterSpacing: "1.5px",
                } },
                react_1.default.createElement("button", { onClick: () => handleStatusFilterChange("Check In"), style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    react_1.default.createElement("p", null, "Check In")),
                react_1.default.createElement("button", { onClick: () => handleStatusFilterChange("Check Out"), style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    react_1.default.createElement("p", null, "Check Out")),
                react_1.default.createElement("button", { onClick: () => handleStatusFilterChange("Progress"), style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    react_1.default.createElement("p", null, "In Progress")),
                react_1.default.createElement("button", { onClick: () => handleStatusFilterChange("all"), style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    react_1.default.createElement("p", null, "All")))),
        react_1.default.createElement(Table_1.default, { initialData: filteredBookings, onDelete: handleDelete, route: "bookings" }),
        react_1.default.createElement(Modal_1.default, { isOpen: isModalOpen, onRequestClose: () => setIsModalOpen(false) },
            react_1.default.createElement("h2", { style: { color: "white" } }, "Create New Booking"),
            react_1.default.createElement(StyledUser_1.Form, { onSubmit: handleSubmit },
                react_1.default.createElement("label", { htmlFor: "img" },
                    "Image URLs (comma separated)",
                    react_1.default.createElement("input", { type: "text", id: "img", name: "img" })),
                react_1.default.createElement("label", { htmlFor: "guest" },
                    "Guest:",
                    react_1.default.createElement("input", { type: "text", id: "guest", name: "guest", required: true })),
                react_1.default.createElement("label", { htmlFor: "orderDate" },
                    "Order Date:",
                    react_1.default.createElement("input", { type: "date", id: "orderDate", name: "orderDate", required: true })),
                react_1.default.createElement("label", { htmlFor: "checkIn" },
                    "Check In:",
                    react_1.default.createElement("input", { type: "date", id: "checkIn", name: "checkIn", required: true })),
                react_1.default.createElement("label", { htmlFor: "checkOut" },
                    "Check Out:",
                    react_1.default.createElement("input", { type: "date", id: "checkOut", name: "checkOut", required: true })),
                react_1.default.createElement("label", { htmlFor: "roomType" },
                    "Room Type:",
                    react_1.default.createElement("select", { required: true, id: "roomType", name: "roomType" },
                        react_1.default.createElement("option", { value: "Single Bed" }, "Single Bed"),
                        react_1.default.createElement("option", { value: "Double Bed" }, "Double Bed"),
                        react_1.default.createElement("option", { value: "Double Deluxe" }, "Double Deluxe"),
                        react_1.default.createElement("option", { value: "Suite" }, "Suite"))),
                react_1.default.createElement("label", { htmlFor: "status" },
                    "Status:",
                    react_1.default.createElement("select", { required: true, id: "status", name: "status" },
                        react_1.default.createElement("option", { value: "Check In" }, "Check In"),
                        react_1.default.createElement("option", { value: "Check Out" }, "Check Out"),
                        react_1.default.createElement("option", { value: "Progress" }, "Progress"))),
                react_1.default.createElement("label", { htmlFor: "facilities" },
                    "Facilities:",
                    react_1.default.createElement(react_select_1.default, { isMulti: true, id: "facilities", name: "facilities", options: facilityOptions, className: "basic-multi-select", classNamePrefix: "select", onChange: setFacilities })),
                react_1.default.createElement("label", { htmlFor: "cancellation" },
                    "Cancellation:",
                    react_1.default.createElement("input", { required: true, type: "text", id: "cancellation", name: "cancellation" })),
                react_1.default.createElement("button", { type: "submit", style: {
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
        react_1.default.createElement("button", { style: {
                display: "block",
                padding: "10px 20px",
                color: "white",
                fontSize: "15px",
                backgroundColor: "#222",
                border: "3px solid #414141",
                borderRadius: "20px",
                margin: "auto",
                marginTop: "50px",
                marginBottom: "50px",
            }, onClick: handleAddRoom }, "Add Booking")))));
};
exports.default = Bookings;
