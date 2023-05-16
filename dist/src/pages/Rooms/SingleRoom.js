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
const roomSlice_1 = require("../../features/roomSlice");
const Modal_1 = __importDefault(require("../../components/Modal"));
const StyledUser_1 = require("../Users/StyledUser");
const react_slick_1 = __importDefault(require("react-slick"));
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
const StyledSingleBook_1 = require("../Bookings/StyledSingleBook");
const LocalPhone_1 = __importDefault(require("@mui/icons-material/LocalPhone"));
const Message_1 = __importDefault(require("@mui/icons-material/Message"));
const SingleRoom = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const rooms = (0, react_redux_1.useSelector)((state) => state.rooms.rooms);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const room = rooms.find((room) => String(room.ID) === String(id));
    const [editedName, setEditedName] = (0, react_1.useState)(room["Room Name"]);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [editedOffer, setEditedOffer] = (0, react_1.useState)(room.Offer);
    const [editedStatus, setEditedStatus] = (0, react_1.useState)(room.Status);
    if (!room) {
        return react_1.default.createElement("div", null, "Room not found");
    }
    const roomMap = {
        "Deluxe A-": { bedType: "Single", price: 100 },
        "Deluxe B-": { bedType: "Double", price: 200 },
        "Deluxe C-": { bedType: "Double Deluxe", price: 300 },
        "Deluxe D-": { bedType: "Suite", price: 400 },
    };
    const handleEditSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const updatedRoom = Object.assign(Object.assign({}, room), { "Room Name": editedName, "Bed Type": roomMap[editedName].bedType, Rate: `$${roomMap[editedName].price} / night`, Status: editedStatus, Offer: editedOffer });
        try {
            yield dispatch((0, roomSlice_1.updateRoomAsync)(updatedRoom));
            navigate("/rooms");
        }
        catch (error) {
            console.error("Failed to update room:", error);
        }
        setIsModalOpen(false);
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
            case "Available":
                return "#4CAF50"; // Green
            case "Booked":
                return "#F44336"; // Red
            default:
                return "white";
        }
    };
    return (react_1.default.createElement(StyledSingleBook_1.BookingComp, { style: { marginTop: "13%" } },
        react_1.default.createElement("div", { className: "details", style: { width: "45%", position: "relative" } },
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
                }, onClick: handleEditClick }, "Edit Room"),
            react_1.default.createElement("div", { className: "guest" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h2", null,
                        room["Room Name"],
                        room.Number),
                    react_1.default.createElement("p", null, room.ID),
                    room.Status !== "Booked" && (react_1.default.createElement("div", { className: "inner__div" },
                        react_1.default.createElement(LocalPhone_1.default, { style: { color: "white" } }),
                        react_1.default.createElement("button", null,
                            react_1.default.createElement(Message_1.default, null),
                            react_1.default.createElement("p", null, "Book now!")))))),
            react_1.default.createElement("div", { className: "line" },
                react_1.default.createElement("div", null)),
            react_1.default.createElement("div", { className: "room_details" },
                react_1.default.createElement("div", { className: "info__price" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("p", null, "Room info"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null, room["Bed Type"]))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("p", null, "Price"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null, room.Rate)))),
                react_1.default.createElement("p", { className: "text" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt dui vitae ante facilisis, nec blandit eros lacinia. Sed quam lacus, auctor id sem in, molestie maximus ex. Etiam facilisis congue sapien, eget convallis nibh elementum at. Nullam vehicula placerat ipsum ut accumsan. Fusce commodo quam tincidunt, aliquam augue vel, fermentum ipsum. Cras semper iaculis risus, vel aliquam nisi tincidunt vitae. Sed elit sapien, rhoncus at tellus lacinia, luctus placerat nisl. Donec dapibus neque in ipsum porttitor, ac rutrum neque vulputate."),
                react_1.default.createElement("div", { className: "facilities__div" },
                    react_1.default.createElement("p", null, "Facilities"),
                    react_1.default.createElement("div", { className: "facilities" }, room.Facilities.split(", ").map((item, index) => {
                        return react_1.default.createElement("div", { key: index }, item);
                    }))))),
        react_1.default.createElement(StyledSingleBook_1.BookingSlider, null,
            react_1.default.createElement(react_slick_1.default, Object.assign({}, settings, { style: { width: "95%", height: "850px" } }), room.IMG.map((image, index) => (react_1.default.createElement("div", { key: index, style: { width: "100%", height: "850px", position: "relative" } },
                react_1.default.createElement("div", { style: {
                        borderRadius: "30px",
                        overflow: "hidden",
                        position: "relative",
                        width: "100%",
                        height: "850px",
                    } },
                    react_1.default.createElement(StyledSingleBook_1.Ribbon, { color: getStatusColor(room.Status) }, room.Status),
                    react_1.default.createElement("img", { src: image, alt: `Booking image ${index}`, style: {
                            width: "100%",
                            height: "850px",
                            objectFit: "cover",
                        } }))))))),
        react_1.default.createElement(Modal_1.default, { isOpen: isModalOpen, onRequestClose: () => setIsModalOpen(false) },
            react_1.default.createElement(StyledUser_1.Form, { onSubmit: handleEditSubmit },
                react_1.default.createElement("label", { htmlFor: "roomName" },
                    "Room Name:",
                    react_1.default.createElement("select", { id: "roomName", name: "roomName", value: editedName, onChange: (e) => setEditedName(e.target.value) }, Object.keys(roomMap).map((roomName, index) => (react_1.default.createElement("option", { value: roomName, key: index }, roomName))))),
                react_1.default.createElement("label", { htmlFor: "status" },
                    "Status:",
                    react_1.default.createElement("select", { required: true, id: "status", name: "status", value: editedStatus, onChange: (e) => setEditedStatus(e.target.value) },
                        react_1.default.createElement("option", { value: "Available" }, "Available"),
                        react_1.default.createElement("option", { value: "Booked" }, "Booked"))),
                react_1.default.createElement("label", { htmlFor: "offer" },
                    react_1.default.createElement("input", { id: "offer", name: "offer", value: editedOffer, type: "number", onChange: (e) => setEditedOffer(e.target.value) })),
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
                    }, onClick: () => setIsModalOpen(false) }, "Cancel")))));
};
exports.default = SingleRoom;
