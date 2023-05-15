var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import { fetchRoomsAsync, addRoomAsync, deleteRoomAsync, } from "../../features/roomSlice";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ColorRing as Loader } from "react-loader-spinner";
import Modal from "../../components/Modal";
import { Form } from "../Users/StyledUser";
import Select from "react-select";
var Rooms = function () {
    var dispatch = useDispatch();
    var roomsData = useSelector(function (state) { return state.rooms.rooms; });
    var loading = useSelector(function (state) { return state.rooms.status === "loading"; });
    var _a = useState(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var _b = useState("roomNumber"), filter = _b[0], setFilter = _b[1];
    var _c = useState([]), selectedFacilities = _c[0], setSelectedFacilities = _c[1];
    var roomsStatus = useSelector(function (state) { return state.rooms.status; });
    var handleFacilitiesChange = function (selectedOptions) {
        setSelectedFacilities(selectedOptions);
    };
    var handleFilterChange = function (e) {
        setFilter(e.target.value);
    };
    useEffect(function () {
        if (roomsStatus === "idle") {
            dispatch(fetchRoomsAsync());
        }
    }, [dispatch]);
    var handleDelete = function (room) {
        dispatch(deleteRoomAsync(room.ID));
    };
    var handleAddRoom = function () {
        setIsModalOpen(true);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var roomType = e.target.elements.bedType.value;
        var roomName = "";
        switch (roomType) {
            case "Single Bed":
                roomName = "Deluxe A-";
                break;
            case "Double Bed":
                roomName = "Deluxe B-";
                break;
            case "Double Superior":
                roomName = "Deluxe C-";
                break;
            case "Suite":
                roomName = "Deluxe D-";
                break;
            default:
                roomName = "";
        }
        var imgUrls = e.target.elements.img.value
            .split(",")
            .map(function (url) { return url.trim(); });
        if (imgUrls.length < 3 || imgUrls.length > 5) {
            alert("Please provide between 3 and 5 image URLs");
            return;
        }
        var newRoom = {
            IMG: imgUrls,
            "Room Name": roomName,
            ID: nanoid(),
            Number: roomsData.length + 1,
            "Bed Type": roomType,
            Facilities: selectedFacilities.map(function (option) { return option.value; }).join(", "),
            Rate: roomPrices[roomType],
            Offer: e.target.elements.offer.value,
            Status: e.target.elements.status.value,
            Cancellation: e.target.elements.cancellation.value,
        };
        dispatch(addRoomAsync(newRoom));
        setIsModalOpen(false);
    };
    var extractPrice = function (priceString) {
        return parseFloat(priceString.replace(/[^0-9.]/g, ""));
    };
    var getFilteredData = function (data, filter) {
        var filteredData = __spreadArray([], data, true);
        if (filter === "number") {
            filteredData.sort(function (a, b) { return a["Number"] - b["Number"]; });
        }
        else if (filter === "state") {
            filteredData.sort(function (a, b) { return a.Status.localeCompare(b.Status); });
        }
        else if (filter === "price") {
            filteredData.sort(function (a, b) { return extractPrice(b.Rate) - extractPrice(a.Rate); });
        }
        return filteredData;
    };
    var roomPrices = {
        "Single Bed": "$100 / Night",
        "Double Bed": "$200 / Night",
        "Double Superior": "$300 / Night",
        Suite: "$400 / Night",
    };
    var facilityOptions = [
        { value: "TV", label: "TV" },
        { value: "Bathtub", label: "Bathtub" },
        { value: "WiFi", label: "WiFi" },
        { value: "Air Conditioning", label: "Air Conditioning" },
        { value: "24 hour Assistance", label: "24 hour Assistance" },
        { value: "Towels", label: "Towels" },
        { value: "Coffee", label: "Coffee" },
    ];
    return (React.createElement("div", null, loading ? (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        } },
        React.createElement(Loader, { type: "ThreeDots", colors: ["white", "black", "#8f8f8f", "#212121", "#414141"], height: 100, width: 100, timeout: 3000 }))) : (React.createElement(React.Fragment, null,
        React.createElement("div", { style: {
                marginTop: "150px",
                display: "flex",
                marginLeft: "12%",
                marginBottom: "-150px",
                color: "white",
            } },
            React.createElement("label", { htmlFor: "filter", style: { fontSize: "20px", letterSpacing: "1.5px" } },
                "Filter by:",
                " "),
            React.createElement("select", { id: "filter", value: filter, onChange: function (e) { return setFilter(e.target.value); }, style: {
                    marginLeft: "18px",
                    padding: "10px 20px",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    background: "#212121",
                } },
                React.createElement("option", { value: "roomNumber" }, "Room Number"),
                React.createElement("option", { value: "state" }, "State"),
                React.createElement("option", { value: "price" }, "Price"))),
        React.createElement(Table, { initialData: getFilteredData(roomsData, filter), onDelete: handleDelete, route: "rooms" }),
        React.createElement(Modal, { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); } },
            React.createElement("h2", { style: { color: "white" } }, "Create New User"),
            React.createElement(Form, { onSubmit: handleSubmit },
                React.createElement("label", { htmlFor: "img" },
                    "Image URLs (comma separated)",
                    React.createElement("input", { type: "text", id: "img", name: "img" })),
                React.createElement("label", { htmlFor: "bedType" },
                    "Bed Type:",
                    React.createElement("select", { required: true, id: "bedType", name: "bedType" },
                        React.createElement("option", { value: "Single Bed" }, "Single Bed"),
                        React.createElement("option", { value: "Double Bed" }, "Double Bed"),
                        React.createElement("option", { value: "Double Superior" }, "Double Superior"),
                        React.createElement("option", { value: "Suite" }, "Suite"))),
                React.createElement("label", { htmlFor: "facilities" },
                    "Facilities:",
                    React.createElement(Select, { isMulti: true, name: "facilities", options: facilityOptions, className: "basic-multi-select", classNamePrefix: "select", onChange: handleFacilitiesChange })),
                React.createElement("label", { htmlFor: "offer" },
                    "Offer Price:",
                    React.createElement("input", { required: true, type: "number", id: "offer", name: "offer" })),
                React.createElement("label", { htmlFor: "status" },
                    "Status:",
                    React.createElement("select", { required: true, id: "status", name: "status" },
                        React.createElement("option", { value: "Available" }, "Available"),
                        React.createElement("option", { value: "Booked" }, "Booked"))),
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
            }, onClick: handleAddRoom }, "Add Room")))));
};
export default Rooms;
