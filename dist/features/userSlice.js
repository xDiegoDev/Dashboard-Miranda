var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updatedUsersData from "../data/userDataId";
var initialState = {
    users: [],
    status: "idle",
    error: null,
};
export var fetchUsersAsync = createAsyncThunk("users/fetchUsersAsync", function () { return __awaiter(void 0, void 0, void 0, function () {
    var userList;
    return __generator(this, function (_a) {
        userList = updatedUsersData;
        return [2 /*return*/, new Promise(function (resolve) {
                return setTimeout(function () {
                    console.log("Fetched data:", userList);
                    resolve(userList);
                }, 200);
            })];
    });
}); });
export var validateUserAsync = createAsyncThunk("users/validateUserAsync", function (_a, _b) {
    var email = _a.email, password = _a.password;
    var getState = _b.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var usersData, user;
        return __generator(this, function (_c) {
            usersData = updatedUsersData;
            user = usersData.find(function (u) { return u.Email === email && u.Password.toString() === password; });
            if (user) {
                return [2 /*return*/, user];
            }
            else {
                throw new Error("Invalid email or password");
            }
            return [2 /*return*/];
        });
    });
});
export var addUserAsync = createAsyncThunk("users/addUserAsync", function (user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(user);
                }, 200);
            })];
    });
}); });
export var updateUserAsync = createAsyncThunk("users/updateUserAsync", function (user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(user);
                }, 200);
            })];
    });
}); });
export var deleteUserAsync = createAsyncThunk("users/deleteUserAsync", function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(userId);
                }, 200);
            })];
    });
}); });
var userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(fetchUsersAsync.pending, function (state) {
            state.status = "loading";
        })
            .addCase(fetchUsersAsync.fulfilled, function (state, action) {
            state.status = "succeeded";
            state.users = action.payload;
        })
            // .addCase(
            //   fetchUsersAsync.rejected,
            //   (state, action: PayloadAction<null, string, unknown, Error>) => {
            //     state.status = "failed";
            //     state.error = action.error.message;
            //   }
            // )
            // // Add user
            .addCase(addUserAsync.pending, function (state) {
            state.status = "loading";
        })
            .addCase(addUserAsync.fulfilled, function (state, action) {
            state.status = "succeeded";
            state.users.push(action.payload);
        })
            // .addCase(
            //   addUserAsync.rejected,
            //   (state, action: PayloadAction<null, string, unknown, Error>) => {
            //     state.status = "failed";
            //     state.error = action.error.message;
            //   }
            // )
            // // Update user
            .addCase(updateUserAsync.pending, function (state) {
            state.status = "loading";
        })
            .addCase(updateUserAsync.fulfilled, function (state, action) {
            state.status = "succeeded";
            var index = state.users.findIndex(function (user) { return user.ID === action.payload.ID; });
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        })
            // .addCase(
            //   updateUserAsync.rejected,
            //   (state, action: PayloadAction<null, string, unknown, Error>) => {
            //     state.status = "failed";
            //     state.error = action.error.message;
            //   }
            // )
            // // Delete user
            .addCase(deleteUserAsync.pending, function (state) {
            state.status = "loading";
        });
        // .addCase(
        //   deleteUserAsync.fulfilled,
        //   (state, action: PayloadAction<string>) => {
        //     state.status = "succeeded";
        //     const userId = action.payload;
        //     state.users = state.users.filter((user) => user.ID !== userId);
        //   }
        // )
        // .addCase(
        //   deleteUserAsync.rejected,
        //   (state, action: PayloadAction<string>) => {
        //     state.status = "failed";
        //     state.error = action.payload;
        //   }
        // );
    },
});
export default userSlice.reducer;
