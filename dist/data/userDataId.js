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
import UserData from "./userData.json";
var assignUniqueIds = function (data) {
    return data.map(function (item) { return (__assign(__assign({}, item), { ID: nanoid() })); });
};
var updatedUsersData = assignUniqueIds(UserData);
export default updatedUsersData;
