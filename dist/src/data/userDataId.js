"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const userData_json_1 = __importDefault(require("./userData.json"));
const assignUniqueIds = (data) => {
    return data.map((item) => (Object.assign(Object.assign({}, item), { ID: (0, nanoid_1.nanoid)() })));
};
const updatedUsersData = assignUniqueIds(userData_json_1.default);
exports.default = updatedUsersData;
