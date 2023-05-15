import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import roomReducer from "../features/roomSlice";
import bookingReducer from "../features/bookingSlice";
import contactReducer from "../features/contactSlice";
export default configureStore({
    reducer: {
        users: userReducer,
        rooms: roomReducer,
        bookings: bookingReducer,
        contacts: contactReducer,
    },
});
