"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAsync = exports.updateUserAsync = exports.addUserAsync = exports.validateUserAsync = exports.fetchUsersAsync = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const userDataId_1 = __importDefault(require("../data/userDataId"));
const initialState = {
    users: [],
    status: "idle",
    error: null,
};
exports.fetchUsersAsync = (0, toolkit_1.createAsyncThunk)("users/fetchUsersAsync", () => __awaiter(void 0, void 0, void 0, function* () {
    const userList = userDataId_1.default;
    return new Promise((resolve) => setTimeout(() => {
        console.log("Fetched data:", userList);
        resolve(userList);
    }, 200));
}));
exports.validateUserAsync = (0, toolkit_1.createAsyncThunk)("users/validateUserAsync", ({ email, password }, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const usersData = userDataId_1.default;
    const user = usersData.find((u) => u.Email === email && u.Password.toString() === password);
    if (user) {
        return user;
    }
    else {
        throw new Error("Invalid email or password");
    }
}));
exports.addUserAsync = (0, toolkit_1.createAsyncThunk)("users/addUserAsync", (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user);
        }, 200);
    });
}));
exports.updateUserAsync = (0, toolkit_1.createAsyncThunk)("users/updateUserAsync", (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user);
        }, 200);
    });
}));
exports.deleteUserAsync = (0, toolkit_1.createAsyncThunk)("users/deleteUserAsync", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userId);
        }, 200);
    });
}));
const userSlice = (0, toolkit_1.createSlice)({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchUsersAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.fetchUsersAsync.fulfilled, (state, action) => {
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
            .addCase(exports.addUserAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.addUserAsync.fulfilled, (state, action) => {
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
            .addCase(exports.updateUserAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.updateUserAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.users.findIndex((user) => user.ID === action.payload.ID);
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
            .addCase(exports.deleteUserAsync.pending, (state) => {
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
exports.default = userSlice.reducer;
