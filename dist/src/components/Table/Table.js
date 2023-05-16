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
const StyledTable_1 = require("./StyledTable");
const react_router_dom_1 = require("react-router-dom");
const LocalPhone_1 = __importDefault(require("@mui/icons-material/LocalPhone"));
const Table = ({ initialData, onRowClick, onDelete, route }) => {
    const [data, setData] = (0, react_1.useState)(initialData);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [selectedRow, setSelectedRow] = (0, react_1.useState)(null);
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const itemsPerPage = 10;
    (0, react_1.useEffect)(() => {
        setData(initialData);
    }, [initialData]);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        toggleModal();
    };
    const handleDeleteConfirm = () => {
        onDelete(selectedRow);
        setShowModal(false);
    };
    // Add a conditional check for data before accessing its properties
    if (!data || data.length === 0) {
        return react_1.default.createElement("div", null, "No data available");
    }
    const columns = Object.keys(data[0]).filter((col) => col !== "Password" &&
        col !== "IMG" &&
        col !== "ID" &&
        col !== "UserIMG" &&
        col !== "price" &&
        col !== "facilities" &&
        col !== "Number" &&
        col !== "Stars" && // Add this line
        !(route === "contacts" && (col === "Telephone" || col === "Mail")));
    const renderNameIdImageColumn = (row) => (react_1.default.createElement("div", { style: { display: "flex", alignItems: "center" } },
        row.IMG && (react_1.default.createElement("img", { src: row.IMG, alt: "Profile", style: {
                marginRight: "30px",
                width: "50px",
                borderRadius: "10px",
                border: "1px solid white",
            } })),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_router_dom_1.Link, { to: `/users/${row.ID}`, style: { textDecoration: "none", color: "white" } },
                row.Name,
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", { style: { color: "gray", fontSize: "10px" } }, row.ID)))));
    const renderRoomIdImageColumn = (row) => (react_1.default.createElement("div", { style: { display: "flex", alignItems: "center" } },
        row.IMG && (react_1.default.createElement("img", { src: row.IMG, alt: "Profile", style: {
                marginRight: "30px",
                width: "50px",
                borderRadius: "10px",
                border: "1px solid white",
            } })),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_router_dom_1.Link, { to: `/rooms/${row.ID}`, style: { textDecoration: "none", color: "white" } },
                react_1.default.createElement("p", { style: { color: "white" } },
                    row["Room Name"],
                    row.Number),
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", { style: { color: "gray", fontSize: "10px" } }, row.ID)))));
    const renderGuestColumn = (row) => (react_1.default.createElement("div", { style: { display: "flex", alignItems: "center" } },
        row.IMG && (react_1.default.createElement("img", { src: row.IMG, alt: "Profile", style: {
                marginRight: "30px",
                width: "50px",
                borderRadius: "10px",
                border: "1px solid white",
            } })),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_router_dom_1.Link, { to: `/bookings/${row.ID}`, style: { textDecoration: "none", color: "white" } },
                row.Guest,
                react_1.default.createElement("br", null),
                react_1.default.createElement("p", { style: { color: "gray", fontSize: "10px" } }, row.ID)))));
    const renderRateColumn = (row) => {
        const roomMap = {
            "Deluxe A-": { bedType: "Single", price: 100 },
            "Deluxe B-": { bedType: "Double", price: 200 },
            "Deluxe C-": { bedType: "Double Deluxe", price: 300 },
            "Deluxe D-": { bedType: "Suite", price: 400 },
        };
        const roomInfo = roomMap[row["Room Name"]];
        const originalRate = roomInfo.price;
        const offerPercentage = row.Offer;
        const discountedRate = originalRate * (1 - offerPercentage / 100);
        return (react_1.default.createElement("div", null, offerPercentage > 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { style: {
                    textDecoration: "line-through",
                    marginRight: "10px",
                    color: "gray",
                } },
                "$",
                originalRate.toFixed(2),
                " / night"),
            react_1.default.createElement("span", null,
                "$",
                discountedRate.toFixed(2),
                " / night"))) : (react_1.default.createElement("span", null,
            "$",
            originalRate.toFixed(2),
            " / night"))));
    };
    const renderOfferColumn = (row) => {
        return row.Offer > 0 ? react_1.default.createElement("div", null,
            row.Offer,
            "%") : react_1.default.createElement("div", null);
    };
    const getStatusStyle = (status) => {
        if (status === "Active") {
            return { color: "lightgreen", letterSpacing: "1.5px" };
        }
        else if (status === "Inactive") {
            return { color: "red", letterSpacing: "1.5px" };
        }
        else if (status === "Available") {
            return { color: "lightgreen", letterSpacing: "1.5px" };
        }
        else if (status === "Booked") {
            return { color: "red", letterSpacing: "1.5px" };
        }
        else if (status === "Check In") {
            return { color: "lightgreen", letterSpacing: "1.5px" };
        }
        else if (status === "Check Out") {
            return { color: "red", letterSpacing: "1.5px" };
        }
        else if (status === "Progress") {
            return { color: "yellow", letterSpacing: "1.5px" };
        }
        return {};
    };
    const getDescriptionWrapperStyle = () => {
        return {
            maxHeight: "3.6em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
        };
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const renderPagination = () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (react_1.default.createElement("div", { className: "pagination", style: { margin: "50px 30px", marginLeft: "42%" } }, pages.map((page) => (react_1.default.createElement("button", { style: {
                margin: "30px 30px",
                padding: "10px 15px",
                background: "#202020",
                border: "2px solid #424242",
                borderRadius: "10px",
                color: "white",
            }, key: page, className: `page-button ${currentPage === page ? "active" : ""}`, onClick: () => handlePageChange(page) }, page)))));
    };
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const getActionStyle = (action) => {
        if (action === "Archive") {
            return { color: "red", letterSpacing: "1.5px" };
        }
        else {
            return { color: "lightgreen", letterSpacing: "1.5px" };
        }
    };
    const handleToggleAction = (event, row) => {
        event.stopPropagation();
        const updatedRow = Object.assign(Object.assign({}, row), { Action: row.Action === "Publish" ? "Archive" : "Publish" });
        setData(data.map((item) => (item.ID === updatedRow.ID ? updatedRow : item)));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(StyledTable_1.StyledTable, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    columns.map((col, index) => (react_1.default.createElement("th", { key: index, style: { textAlign: "center" } }, col))),
                    route !== "contacts" && react_1.default.createElement("th", null, "Delete"))),
            react_1.default.createElement("tbody", null, paginatedData.map((row, rowIndex) => (react_1.default.createElement("tr", { key: rowIndex },
                columns.map((col, colIndex) => {
                    if (route === "users" && col === "Name") {
                        return (react_1.default.createElement("td", { key: colIndex, onClick: onRowClick ? () => onRowClick(row) : undefined },
                            react_1.default.createElement(react_router_dom_1.Link, { to: `/users/${row.ID}`, style: { textDecoration: "none", color: "white" } }, renderNameIdImageColumn(row))));
                    }
                    else if (route === "bookings" && col === "Guest") {
                        return (react_1.default.createElement("td", { key: colIndex, onClick: onRowClick ? () => onRowClick(row) : undefined }, renderGuestColumn(row)));
                    }
                    else if (route === "contacts" && col === "Guest") {
                        return (react_1.default.createElement("td", { key: colIndex, onClick: onRowClick ? () => onRowClick(row) : undefined }, renderGuestColumn(row)));
                    }
                    else if (col === "ID" || col === "Image") {
                        return null;
                    }
                    else if (col === "Room Name" && route === "rooms") {
                        return (react_1.default.createElement("td", { key: colIndex, onClick: onRowClick ? () => onRowClick(row) : undefined },
                            react_1.default.createElement(react_router_dom_1.Link, { to: `/rooms/${row.ID}`, style: { textDecoration: "none", color: "white" } }, renderRoomIdImageColumn(row))));
                    }
                    else if (col === "Rate" && route === "rooms") {
                        return react_1.default.createElement("td", { key: colIndex }, renderRateColumn(row));
                    }
                    else if (col === "Offer" && route === "rooms") {
                        return react_1.default.createElement("td", { key: colIndex }, renderOfferColumn(row));
                    }
                    else {
                        const cellContent = row[col];
                        return (react_1.default.createElement("td", { key: colIndex, onClick: onRowClick && route !== "contacts"
                                ? () => onRowClick(row)
                                : undefined, style: col === "Status" ? getStatusStyle(cellContent) : {} }, col === "Description" ? (react_1.default.createElement("div", { style: getDescriptionWrapperStyle() }, cellContent)) : col === "Contact" ? (react_1.default.createElement("div", { style: {
                                display: "flex",
                                alignItems: "center",
                            } },
                            react_1.default.createElement(LocalPhone_1.default, { fontSize: "small", style: { marginRight: "4px" } }),
                            cellContent)) : col === "Action" ? (react_1.default.createElement("button", { style: Object.assign(Object.assign({}, getActionStyle(cellContent)), { background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }), onClick: (event) => handleToggleAction(event, row) }, cellContent)) : (cellContent)));
                    }
                }),
                route !== "contacts" && (react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { className: "delete__button", onClick: () => handleDeleteClick(row) }, "Delete")))))))),
        data.length > itemsPerPage && renderPagination(),
        showModal && (react_1.default.createElement(StyledTable_1.Modal, null,
            react_1.default.createElement("p", { style: { letterSpacing: "1.5px" } }, "Are you sure you want to delete this user?"),
            react_1.default.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                } },
                react_1.default.createElement("button", { className: "cancel__button", onClick: toggleModal },
                    react_1.default.createElement("p", { style: { letterSpacing: "1.5px" } }, "Cancel")),
                react_1.default.createElement("button", { className: "confirm__delete", onClick: handleDeleteConfirm },
                    react_1.default.createElement("p", { style: { letterSpacing: "1.5px" } }, "Delete")))))));
};
exports.default = Table;
