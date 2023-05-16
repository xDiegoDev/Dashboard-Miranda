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
const roomSlice_1 = require("../../features/roomSlice");
const react_redux_1 = require("react-redux");
const nanoid_1 = require("nanoid");
const react_loader_spinner_1 = require("react-loader-spinner");
const Modal_1 = __importDefault(require("../../components/Modal"));
const StyledUser_1 = require("../Users/StyledUser");
const react_select_1 = __importDefault(require("react-select"));
const Rooms = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const roomsData = (0, react_redux_1.useSelector)((state) => state.rooms.rooms);
    const loading = (0, react_redux_1.useSelector)((state) => state.rooms.status === "loading");
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [filter, setFilter] = (0, react_1.useState)("roomNumber");
    const [selectedFacilities, setSelectedFacilities] = (0, react_1.useState)([]);
    const roomsStatus = (0, react_redux_1.useSelector)((state) => state.rooms.status);
    const handleFacilitiesChange = (selectedOptions) => {
        setSelectedFacilities(selectedOptions);
    };
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    (0, react_1.useEffect)(() => {
        if (roomsStatus === "idle") {
            dispatch((0, roomSlice_1.fetchRoomsAsync)());
        }
    }, [dispatch]);
    const handleDelete = (room) => {
        dispatch((0, roomSlice_1.deleteRoomAsync)(room.ID));
    };
    const handleAddRoom = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const roomType = e.target.elements.bedType.value;
        let roomName = "";
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
        const imgUrls = e.target.elements.img.value
            .split(",")
            .map((url) => url.trim());
        if (imgUrls.length < 3 || imgUrls.length > 5) {
            alert("Please provide between 3 and 5 image URLs");
            return;
        }
        const newRoom = {
            IMG: imgUrls,
            "Room Name": roomName,
            ID: (0, nanoid_1.nanoid)(),
            Number: roomsData.length + 1,
            "Bed Type": roomType,
            Facilities: selectedFacilities.map((option) => option.value).join(", "),
            Rate: roomPrices[roomType],
            Offer: e.target.elements.offer.value,
            Status: e.target.elements.status.value,
            Cancellation: e.target.elements.cancellation.value,
        };
        dispatch((0, roomSlice_1.addRoomAsync)(newRoom));
        setIsModalOpen(false);
    };
    const extractPrice = (priceString) => {
        return parseFloat(priceString.replace(/[^0-9.]/g, ""));
    };
    const getFilteredData = (data, filter) => {
        let filteredData = [...data];
        if (filter === "number") {
            filteredData.sort((a, b) => a["Number"] - b["Number"]);
        }
        else if (filter === "state") {
            filteredData.sort((a, b) => a.Status.localeCompare(b.Status));
        }
        else if (filter === "price") {
            filteredData.sort((a, b) => extractPrice(b.Rate) - extractPrice(a.Rate));
        }
        return filteredData;
    };
    const roomPrices = {
        "Single Bed": "$100 / Night",
        "Double Bed": "$200 / Night",
        "Double Superior": "$300 / Night",
        Suite: "$400 / Night",
    };
    const facilityOptions = [
        { value: "TV", label: "TV" },
        { value: "Bathtub", label: "Bathtub" },
        { value: "WiFi", label: "WiFi" },
        { value: "Air Conditioning", label: "Air Conditioning" },
        { value: "24 hour Assistance", label: "24 hour Assistance" },
        { value: "Towels", label: "Towels" },
        { value: "Coffee", label: "Coffee" },
    ];
    return (react_1.default.createElement("div", null, loading ? (react_1.default.createElement("div", { style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        } },
        react_1.default.createElement(react_loader_spinner_1.ColorRing, { type: "ThreeDots", colors: ["white", "black", "#8f8f8f", "#212121", "#414141"], height: 100, width: 100, timeout: 3000 }))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: {
                marginTop: "150px",
                display: "flex",
                marginLeft: "12%",
                marginBottom: "-150px",
                color: "white",
            } },
            react_1.default.createElement("label", { htmlFor: "filter", style: { fontSize: "20px", letterSpacing: "1.5px" } },
                "Filter by:",
                " "),
            react_1.default.createElement("select", { id: "filter", value: filter, onChange: (e) => setFilter(e.target.value), style: {
                    marginLeft: "18px",
                    padding: "10px 20px",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                    background: "#212121",
                } },
                react_1.default.createElement("option", { value: "roomNumber" }, "Room Number"),
                react_1.default.createElement("option", { value: "state" }, "State"),
                react_1.default.createElement("option", { value: "price" }, "Price"))),
        react_1.default.createElement(Table_1.default, { initialData: getFilteredData(roomsData, filter), onDelete: handleDelete, route: "rooms" }),
        react_1.default.createElement(Modal_1.default, { isOpen: isModalOpen, onRequestClose: () => setIsModalOpen(false) },
            react_1.default.createElement("h2", { style: { color: "white" } }, "Create New User"),
            react_1.default.createElement(StyledUser_1.Form, { onSubmit: handleSubmit },
                react_1.default.createElement("label", { htmlFor: "img" },
                    "Image URLs (comma separated)",
                    react_1.default.createElement("input", { type: "text", id: "img", name: "img" })),
                react_1.default.createElement("label", { htmlFor: "bedType" },
                    "Bed Type:",
                    react_1.default.createElement("select", { required: true, id: "bedType", name: "bedType" },
                        react_1.default.createElement("option", { value: "Single Bed" }, "Single Bed"),
                        react_1.default.createElement("option", { value: "Double Bed" }, "Double Bed"),
                        react_1.default.createElement("option", { value: "Double Superior" }, "Double Superior"),
                        react_1.default.createElement("option", { value: "Suite" }, "Suite"))),
                react_1.default.createElement("label", { htmlFor: "facilities" },
                    "Facilities:",
                    react_1.default.createElement(react_select_1.default, { isMulti: true, name: "facilities", options: facilityOptions, className: "basic-multi-select", classNamePrefix: "select", onChange: handleFacilitiesChange })),
                react_1.default.createElement("label", { htmlFor: "offer" },
                    "Offer Price:",
                    react_1.default.createElement("input", { required: true, type: "number", id: "offer", name: "offer" })),
                react_1.default.createElement("label", { htmlFor: "status" },
                    "Status:",
                    react_1.default.createElement("select", { required: true, id: "status", name: "status" },
                        react_1.default.createElement("option", { value: "Available" }, "Available"),
                        react_1.default.createElement("option", { value: "Booked" }, "Booked"))),
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
            }, onClick: handleAddRoom }, "Add Room")))));
};
exports.default = Rooms;
