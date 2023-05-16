"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function NotFound() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "404 - Not Found"),
        react_1.default.createElement("p", null, "The route you are looking for does not exist.")));
}
exports.default = NotFound;
