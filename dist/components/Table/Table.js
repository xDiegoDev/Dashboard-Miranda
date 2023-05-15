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
import React, { useState, useEffect } from "react";
import { StyledTable, Modal } from "./StyledTable";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
var Table = function (_a) {
    var initialData = _a.initialData, onRowClick = _a.onRowClick, onDelete = _a.onDelete, route = _a.route;
    var _b = useState(initialData), data = _b[0], setData = _b[1];
    var _c = useState(false), showModal = _c[0], setShowModal = _c[1];
    var _d = useState(null), selectedRow = _d[0], setSelectedRow = _d[1];
    var _e = useState(1), currentPage = _e[0], setCurrentPage = _e[1];
    var itemsPerPage = 10;
    useEffect(function () {
        setData(initialData);
    }, [initialData]);
    var toggleModal = function () {
        setShowModal(!showModal);
    };
    var handleDeleteClick = function (row) {
        setSelectedRow(row);
        toggleModal();
    };
    var handleDeleteConfirm = function () {
        onDelete(selectedRow);
        setShowModal(false);
    };
    // Add a conditional check for data before accessing its properties
    if (!data || data.length === 0) {
        return React.createElement("div", null, "No data available");
    }
    var columns = Object.keys(data[0]).filter(function (col) {
        return col !== "Password" &&
            col !== "IMG" &&
            col !== "ID" &&
            col !== "UserIMG" &&
            col !== "price" &&
            col !== "facilities" &&
            col !== "Number" &&
            col !== "Stars" && // Add this line
            !(route === "contacts" && (col === "Telephone" || col === "Mail"));
    });
    var renderNameIdImageColumn = function (row) { return (React.createElement("div", { style: { display: "flex", alignItems: "center" } },
        row.IMG && (React.createElement("img", { src: row.IMG, alt: "Profile", style: {
                marginRight: "30px",
                width: "50px",
                borderRadius: "10px",
                border: "1px solid white",
            } })),
        React.createElement("div", null,
            React.createElement(Link, { to: "/users/".concat(row.ID), style: { textDecoration: "none", color: "white" } },
                row.Name,
                React.createElement("br", null),
                React.createElement("p", { style: { color: "gray", fontSize: "10px" } }, row.ID))))); };
    var renderRoomIdImageColumn = function (row) { return (React.createElement("div", { style: { display: "flex", alignItems: "center" } },
        row.IMG && (React.createElement("img", { src: row.IMG, alt: "Profile", style: {
                marginRight: "30px",
                width: "50px",
                borderRadius: "10px",
                border: "1px solid white",
            } })),
        React.createElement("div", null,
            React.createElement(Link, { to: "/rooms/".concat(row.ID), style: { textDecoration: "none", color: "white" } },
                React.createElement("p", { style: { color: "white" } },
                    row["Room Name"],
                    row.Number),
                React.createElement("br", null),
                React.createElement("p", { style: { color: "gray", fontSize: "10px" } }, row.ID))))); };
    var renderGuestColumn = function (row) { return (React.createElement("div", { style: { display: "flex", alignItems: "center" } },
        row.IMG && (React.createElement("img", { src: row.IMG, alt: "Profile", style: {
                marginRight: "30px",
                width: "50px",
                borderRadius: "10px",
                border: "1px solid white",
            } })),
        React.createElement("div", null,
            React.createElement(Link, { to: "/bookings/".concat(row.ID), style: { textDecoration: "none", color: "white" } },
                row.Guest,
                React.createElement("br", null),
                React.createElement("p", { style: { color: "gray", fontSize: "10px" } }, row.ID))))); };
    var renderRateColumn = function (row) {
        var roomMap = {
            "Deluxe A-": { bedType: "Single", price: 100 },
            "Deluxe B-": { bedType: "Double", price: 200 },
            "Deluxe C-": { bedType: "Double Deluxe", price: 300 },
            "Deluxe D-": { bedType: "Suite", price: 400 },
        };
        var roomInfo = roomMap[row["Room Name"]];
        var originalRate = roomInfo.price;
        var offerPercentage = row.Offer;
        var discountedRate = originalRate * (1 - offerPercentage / 100);
        return (React.createElement("div", null, offerPercentage > 0 ? (React.createElement(React.Fragment, null,
            React.createElement("span", { style: {
                    textDecoration: "line-through",
                    marginRight: "10px",
                    color: "gray",
                } },
                "$",
                originalRate.toFixed(2),
                " / night"),
            React.createElement("span", null,
                "$",
                discountedRate.toFixed(2),
                " / night"))) : (React.createElement("span", null,
            "$",
            originalRate.toFixed(2),
            " / night"))));
    };
    var renderOfferColumn = function (row) {
        return row.Offer > 0 ? React.createElement("div", null,
            row.Offer,
            "%") : React.createElement("div", null);
    };
    var getStatusStyle = function (status) {
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
    var getDescriptionWrapperStyle = function () {
        return {
            maxHeight: "3.6em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
        };
    };
    var handlePageChange = function (newPage) {
        setCurrentPage(newPage);
    };
    var renderPagination = function () {
        var totalPages = Math.ceil(data.length / itemsPerPage);
        var pages = Array.from({ length: totalPages }, function (_, i) { return i + 1; });
        return (React.createElement("div", { className: "pagination", style: { margin: "50px 30px", marginLeft: "42%" } }, pages.map(function (page) { return (React.createElement("button", { style: {
                margin: "30px 30px",
                padding: "10px 15px",
                background: "#202020",
                border: "2px solid #424242",
                borderRadius: "10px",
                color: "white",
            }, key: page, className: "page-button ".concat(currentPage === page ? "active" : ""), onClick: function () { return handlePageChange(page); } }, page)); })));
    };
    var paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    var getActionStyle = function (action) {
        if (action === "Archive") {
            return { color: "red", letterSpacing: "1.5px" };
        }
        else {
            return { color: "lightgreen", letterSpacing: "1.5px" };
        }
    };
    var handleToggleAction = function (event, row) {
        event.stopPropagation();
        var updatedRow = __assign(__assign({}, row), { Action: row.Action === "Publish" ? "Archive" : "Publish" });
        setData(data.map(function (item) { return (item.ID === updatedRow.ID ? updatedRow : item); }));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(StyledTable, null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    columns.map(function (col, index) { return (React.createElement("th", { key: index, style: { textAlign: "center" } }, col)); }),
                    route !== "contacts" && React.createElement("th", null, "Delete"))),
            React.createElement("tbody", null, paginatedData.map(function (row, rowIndex) { return (React.createElement("tr", { key: rowIndex },
                columns.map(function (col, colIndex) {
                    if (route === "users" && col === "Name") {
                        return (React.createElement("td", { key: colIndex, onClick: onRowClick ? function () { return onRowClick(row); } : undefined },
                            React.createElement(Link, { to: "/users/".concat(row.ID), style: { textDecoration: "none", color: "white" } }, renderNameIdImageColumn(row))));
                    }
                    else if (route === "bookings" && col === "Guest") {
                        return (React.createElement("td", { key: colIndex, onClick: onRowClick ? function () { return onRowClick(row); } : undefined }, renderGuestColumn(row)));
                    }
                    else if (route === "contacts" && col === "Guest") {
                        return (React.createElement("td", { key: colIndex, onClick: onRowClick ? function () { return onRowClick(row); } : undefined }, renderGuestColumn(row)));
                    }
                    else if (col === "ID" || col === "Image") {
                        return null;
                    }
                    else if (col === "Room Name" && route === "rooms") {
                        return (React.createElement("td", { key: colIndex, onClick: onRowClick ? function () { return onRowClick(row); } : undefined },
                            React.createElement(Link, { to: "/rooms/".concat(row.ID), style: { textDecoration: "none", color: "white" } }, renderRoomIdImageColumn(row))));
                    }
                    else if (col === "Rate" && route === "rooms") {
                        return React.createElement("td", { key: colIndex }, renderRateColumn(row));
                    }
                    else if (col === "Offer" && route === "rooms") {
                        return React.createElement("td", { key: colIndex }, renderOfferColumn(row));
                    }
                    else {
                        var cellContent = row[col];
                        return (React.createElement("td", { key: colIndex, onClick: onRowClick && route !== "contacts"
                                ? function () { return onRowClick(row); }
                                : undefined, style: col === "Status" ? getStatusStyle(cellContent) : {} }, col === "Description" ? (React.createElement("div", { style: getDescriptionWrapperStyle() }, cellContent)) : col === "Contact" ? (React.createElement("div", { style: {
                                display: "flex",
                                alignItems: "center",
                            } },
                            React.createElement(LocalPhoneIcon, { fontSize: "small", style: { marginRight: "4px" } }),
                            cellContent)) : col === "Action" ? (React.createElement("button", { style: __assign(__assign({}, getActionStyle(cellContent)), { background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }), onClick: function (event) { return handleToggleAction(event, row); } }, cellContent)) : (cellContent)));
                    }
                }),
                route !== "contacts" && (React.createElement("td", null,
                    React.createElement("button", { className: "delete__button", onClick: function () { return handleDeleteClick(row); } }, "Delete"))))); }))),
        data.length > itemsPerPage && renderPagination(),
        showModal && (React.createElement(Modal, null,
            React.createElement("p", { style: { letterSpacing: "1.5px" } }, "Are you sure you want to delete this user?"),
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                } },
                React.createElement("button", { className: "cancel__button", onClick: toggleModal },
                    React.createElement("p", { style: { letterSpacing: "1.5px" } }, "Cancel")),
                React.createElement("button", { className: "confirm__delete", onClick: handleDeleteConfirm },
                    React.createElement("p", { style: { letterSpacing: "1.5px" } }, "Delete")))))));
};
export default Table;
