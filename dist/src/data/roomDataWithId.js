"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const roomData_json_1 = __importDefault(require("./roomData.json"));
const roomMap = {
    "Deluxe A-": { "Bed Type": "Single Bed", Price: 100 },
    "Deluxe B-": { "Bed Type": "Double Bed", Price: 200 },
    "Deluxe C-": { "Bed Type": "Double Deluxe", Price: 300 },
    "Deluxe D-": { "Bed Type": "Suite", Price: 400 },
};
const assignUniqueIds = (data) => {
    return data.map((item) => {
        const ID = "ORD" + (0, nanoid_1.nanoid)();
        const roomInfo = roomMap[item["Room Name"]] || {};
        return Object.assign(Object.assign({}, item), { ID: ID, "Bed Type": roomInfo["Bed Type"] });
    });
};
const updatedRoomsData = assignUniqueIds(roomData_json_1.default);
exports.default = updatedRoomsData;
