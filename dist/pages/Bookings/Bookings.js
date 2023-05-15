import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import { fetchBookingsAsync, addBookingAsync, deleteBookingAsync, } from "../../features/bookingSlice";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ColorRing as Loader } from "react-loader-spinner";
import Modal from "../../components/Modal";
import { Form } from "../Users/StyledUser";
import Select from "react-select";
var Bookings = function () {
    var dispatch = useDispatch();
    var bookingsData = useSelector(function (state) { return state.bookings.bookings; });
    var bookingsStatus = useSelector(function (state) { return state.bookings.status; });
    var loading = useSelector(function (state) { return state.rooms.status === "loading"; });
    var _a = useState(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var _b = useState(""), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = useState("all"), statusFilter = _c[0], setStatusFilter = _c[1];
    var _d = useState([]), facilities = _d[0], setFacilities = _d[1];
    useEffect(function () {
        if (bookingsStatus === "idle") {
            dispatch(fetchBookingsAsync());
        }
    }, [dispatch]);
    var handleSearchChange = function (event) {
        setSearchTerm(event.target.value);
    };
    var handleStatusFilterChange = function (status) {
        setStatusFilter(status);
    };
    var handleDelete = function (booking) {
        dispatch(deleteBookingAsync(booking.ID));
    };
    var handleAddRoom = function () {
        setIsModalOpen(true);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var imgUrls = e.target.elements.img.value
            .split(",")
            .map(function (url) { return url.trim(); });
        if (imgUrls.length < 3 || imgUrls.length > 5) {
            alert("Please provide between 3 and 5 image URLs");
            return;
        }
        var newBooking = {
            IMG: imgUrls,
            Guest: e.target.elements.guest.value,
            ID: nanoid(),
            "Order Date": e.target.elements.orderDate.value,
            "Check In": e.target.elements.checkIn.value,
            "Check Out": e.target.elements.checkOut.value,
            "Special Request": "View Notes",
            "Room Type": e.target.elements.roomType.value,
            Status: e.target.elements.status.value,
            facilities: facilities.map(function (facility) { return facility.value; }),
        };
        dispatch(addBookingAsync(newBooking));
        setIsModalOpen(false);
    };
    var filteredBookings = [];
    if (bookingsData) {
        filteredBookings = bookingsData
            .filter(function (booking) {
            if (searchTerm === "") {
                return true;
            }
            return booking.Guest.toLowerCase().includes(searchTerm.toLowerCase());
        })
            .filter(function (booking) {
            if (statusFilter === "all") {
                return true;
            }
            return booking.Status === statusFilter;
        });
    }
    var facilityOptions = [
        { value: "TV", label: "TV" },
        { value: "AC", label: "AC" },
        { value: "Double Bed", label: "Double Bed" },
        { value: "Parking Spot", label: "Parking Spot" },
        { value: "WiFi", label: "WiFi" },
        { value: "Fridge", label: "Fridge" },
    ];
    return (React.createElement("div", null, loading ? (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        } },
        React.createElement(Loader, { type: "ThreeDots", colors: ["white", "black", "#8f8f8f", "#212121", "#414141"], height: 100, width: 100, timeout: 3000 }))) : (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                marginTop: "150px",
                marginLeft: "12%",
                marginBottom: "-130px",
                color: "white",
                width: "85%",
            } },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "search-user", style: {
                        fontSize: "20px",
                        letterSpacing: "1.5px",
                        marginTop: "5px",
                    } }, "Search Guest"),
                React.createElement("input", { type: "text", placeholder: "Search Guest", onChange: handleSearchChange, style: {
                        marginLeft: "18px",
                        padding: "10px 20px",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        background: "#212121",
                    } })),
            React.createElement("div", { style: {
                    marginLeft: "23%",
                    fontSize: "18px",
                    letterSpacing: "1.5px",
                } },
                React.createElement("button", { onClick: function () { return handleStatusFilterChange("Check In"); }, style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    React.createElement("p", null, "Check In")),
                React.createElement("button", { onClick: function () { return handleStatusFilterChange("Check Out"); }, style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    React.createElement("p", null, "Check Out")),
                React.createElement("button", { onClick: function () { return handleStatusFilterChange("Progress"); }, style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    React.createElement("p", null, "In Progress")),
                React.createElement("button", { onClick: function () { return handleStatusFilterChange("all"); }, style: {
                        fontSize: "18px",
                        letterSpacing: "1.5px",
                        background: "#282828",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "0 10px",
                        marginRight: "20px",
                    } },
                    React.createElement("p", null, "All")))),
        React.createElement(Table, { initialData: filteredBookings, onDelete: handleDelete, route: "bookings" }),
        React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); } },
            React.createElement("h2", { style: { color: "white" } }, "Create New Booking"),
            React.createElement(Form, { onSubmit: handleSubmit },
                React.createElement("label", { htmlFor: "img" },
                    "Image URLs (comma separated)",
                    React.createElement("input", { type: "text", id: "img", name: "img" })),
                React.createElement("label", { htmlFor: "guest" },
                    "Guest:",
                    React.createElement("input", { type: "text", id: "guest", name: "guest", required: true })),
                React.createElement("label", { htmlFor: "orderDate" },
                    "Order Date:",
                    React.createElement("input", { type: "date", id: "orderDate", name: "orderDate", required: true })),
                React.createElement("label", { htmlFor: "checkIn" },
                    "Check In:",
                    React.createElement("input", { type: "date", id: "checkIn", name: "checkIn", required: true })),
                React.createElement("label", { htmlFor: "checkOut" },
                    "Check Out:",
                    React.createElement("input", { type: "date", id: "checkOut", name: "checkOut", required: true })),
                React.createElement("label", { htmlFor: "roomType" },
                    "Room Type:",
                    React.createElement("select", { required: true, id: "roomType", name: "roomType" },
                        React.createElement("option", { value: "Single Bed" }, "Single Bed"),
                        React.createElement("option", { value: "Double Bed" }, "Double Bed"),
                        React.createElement("option", { value: "Double Deluxe" }, "Double Deluxe"),
                        React.createElement("option", { value: "Suite" }, "Suite"))),
                React.createElement("label", { htmlFor: "status" },
                    "Status:",
                    React.createElement("select", { required: true, id: "status", name: "status" },
                        React.createElement("option", { value: "Check In" }, "Check In"),
                        React.createElement("option", { value: "Check Out" }, "Check Out"),
                        React.createElement("option", { value: "Progress" }, "Progress"))),
                React.createElement("label", { htmlFor: "facilities" },
                    "Facilities:",
                    React.createElement(Select, { isMulti: true, id: "facilities", name: "facilities", options: facilityOptions, className: "basic-multi-select", classNamePrefix: "select", onChange: setFacilities })),
                React.createElement("label", { htmlFor: "cancellation" },
                    "Cancellation:",
                    React.createElement("input", { required: true, type: "text", id: "cancellation", name: "cancellation" })),
                React.createElement("button", { type: "submit", style: {
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
        React.createElement("button", { style: {
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
export default Bookings;
