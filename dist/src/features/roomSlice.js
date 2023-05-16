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
exports.deleteRoomAsync = exports.updateRoomAsync = exports.addRoomAsync = exports.fetchRoomsAsync = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const roomDataWithId_1 = __importDefault(require("../data/roomDataWithId"));
const initialState = {
    rooms: [],
    status: "idle",
    error: null,
};
exports.fetchRoomsAsync = (0, toolkit_1.createAsyncThunk)("rooms/fetchRoomsAsync", () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => setTimeout(() => {
        console.log("Fetched rooms data:", roomDataWithId_1.default);
        resolve(roomDataWithId_1.default);
    }, 200));
}));
exports.addRoomAsync = (0, toolkit_1.createAsyncThunk)("rooms/addRoomAsync", (room) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(room);
        }, 200);
    });
}));
exports.updateRoomAsync = (0, toolkit_1.createAsyncThunk)("rooms/updateRoomAsync", (room) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(room);
        }, 200);
    });
}));
exports.deleteRoomAsync = (0, toolkit_1.createAsyncThunk)("rooms/deleteRoomAsync", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(roomId);
        }, 200);
    });
}));
const roomSlice = (0, toolkit_1.createSlice)({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch rooms
            .addCase(exports.fetchRoomsAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.fetchRoomsAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.rooms = action.payload;
            console.log("Rooms data set in state:", state.rooms);
        })
            .addCase(exports.fetchRoomsAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Add user
            .addCase(exports.addRoomAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.addRoomAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.rooms.push(action.payload);
        })
            .addCase(exports.addRoomAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Update user
            .addCase(exports.updateRoomAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.updateRoomAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.rooms.findIndex((room) => room.ID === action.payload.ID);
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        })
            .addCase(exports.updateRoomAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Delete user
            .addCase(exports.deleteRoomAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.deleteRoomAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            const roomId = action.payload;
            state.rooms = state.rooms.filter((room) => room.ID !== roomId);
        })
            .addCase(exports.deleteRoomAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});
exports.default = roomSlice.reducer;
