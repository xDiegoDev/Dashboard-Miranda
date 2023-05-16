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
exports.deleteBookingAsync = exports.updateBookingAsync = exports.addBookingAsync = exports.fetchBookingsAsync = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const BookingDataLogic_1 = __importDefault(require("../data/BookingDataLogic"));
const initialState = {
    rooms: [],
    status: "idle",
    error: null,
};
exports.fetchBookingsAsync = (0, toolkit_1.createAsyncThunk)("bookings/fetchBookingsAsync", () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => setTimeout(() => {
        console.log("Fetched rooms data:", BookingDataLogic_1.default);
        resolve(BookingDataLogic_1.default);
    }, 200));
}));
exports.addBookingAsync = (0, toolkit_1.createAsyncThunk)("bookings/addBookingAsync", (booking) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(booking);
        }, 200);
    });
}));
exports.updateBookingAsync = (0, toolkit_1.createAsyncThunk)("bookings/updateBookingAsync", (booking) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(booking);
        }, 200);
    });
}));
exports.deleteBookingAsync = (0, toolkit_1.createAsyncThunk)("bookings/deleteBookingAsync", (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(bookingId);
        }, 200);
    });
}));
const bookingSlice = (0, toolkit_1.createSlice)({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch rooms
            .addCase(exports.fetchBookingsAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.fetchBookingsAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.bookings = action.payload;
            console.log("Bookings data set in state:", state.bookings);
        })
            .addCase(exports.fetchBookingsAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Add user
            .addCase(exports.addBookingAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.addBookingAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.bookings.push(action.payload);
        })
            .addCase(exports.addBookingAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Update user
            .addCase(exports.updateBookingAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.updateBookingAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.bookings.findIndex((booking) => booking.ID === action.payload.ID);
            if (index !== -1) {
                state.bookings[index] = action.payload;
            }
        })
            .addCase(exports.updateBookingAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Delete user
            .addCase(exports.deleteBookingAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.deleteBookingAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            const bookingId = action.payload;
            state.bookings = state.bookings.filter((booking) => booking.ID !== bookingId);
        })
            .addCase(exports.deleteBookingAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});
exports.default = bookingSlice.reducer;
