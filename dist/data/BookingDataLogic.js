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
import BookingsData from "./BookingsData.json";
var formatDate = function (date) {
    var options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
var formattedData = BookingsData.map(function (booking) {
    var now = new Date();
    var orderDate = formatDate(now);
    var checkInDate = formatDate(now);
    var checkOutDate = formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    return __assign(__assign({}, booking), { "Order Data": orderDate, "Check In": checkInDate, "Check Out": checkOutDate, ID: nanoid() });
});
export default formattedData;
