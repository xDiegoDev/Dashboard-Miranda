"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const userSlice_1 = __importDefault(require("../features/userSlice"));
const roomSlice_1 = __importDefault(require("../features/roomSlice"));
const bookingSlice_1 = __importDefault(require("../features/bookingSlice"));
const contactSlice_1 = __importDefault(require("../features/contactSlice"));
exports.default = (0, toolkit_1.configureStore)({
    reducer: {
        users: userSlice_1.default,
        rooms: roomSlice_1.default,
        bookings: bookingSlice_1.default,
        contacts: contactSlice_1.default,
    },
});
