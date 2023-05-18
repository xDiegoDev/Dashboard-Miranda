import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import userReducer from "../features/userSlice";
import roomReducer from "../features/roomSlice";
import bookingReducer from "../features/bookingSlice";
import contactReducer from "../features/contactSlice";
import { UserState } from "../features/userSlice";
import { ContactState } from "../features/contactSlice";
import { RoomState } from "../features/roomSlice";
import { BookingState } from "../features/bookingSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
    contacts: contactReducer,
  },
});

export type RootState = {
  users: UserState;
  rooms: RoomState;
  bookings: BookingState;
  contacts: ContactState;
};

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
