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
import { nanoid } from "nanoid";
import RoomsData from "./roomData.json";
var roomMap = {
    "Deluxe A-": { "Bed Type": "Single Bed", Price: 100 },
    "Deluxe B-": { "Bed Type": "Double Bed", Price: 200 },
    "Deluxe C-": { "Bed Type": "Double Deluxe", Price: 300 },
    "Deluxe D-": { "Bed Type": "Suite", Price: 400 },
};
var assignUniqueIds = function (data) {
    return data.map(function (item) {
        var ID = "ORD" + nanoid();
        var roomInfo = roomMap[item["Room Name"]] || {};
        return __assign(__assign({}, item), { ID: ID, "Bed Type": roomInfo["Bed Type"] });
    });
};
var updatedRoomsData = assignUniqueIds(RoomsData);
export default updatedRoomsData;
