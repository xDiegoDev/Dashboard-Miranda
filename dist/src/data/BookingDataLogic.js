"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const BookingsData_json_1 = __importDefault(require("./BookingsData.json"));
const formatDate = (date) => {
    const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
const formattedData = BookingsData_json_1.default.map((booking) => {
    const now = new Date();
    const orderDate = formatDate(now);
    const checkInDate = formatDate(now);
    const checkOutDate = formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    return Object.assign(Object.assign({}, booking), { "Order Data": orderDate, "Check In": checkInDate, "Check Out": checkOutDate, ID: (0, nanoid_1.nanoid)() });
});
exports.default = formattedData;
