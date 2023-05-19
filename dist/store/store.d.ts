import { ThunkAction, Action } from "@reduxjs/toolkit";
import { UserState } from "../features/userSlice";
import { ContactState } from "../features/contactSlice";
import { RoomState } from "../features/roomSlice";
import { BookingState } from "../features/bookingSlice";
export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    users: UserState;
    rooms: RoomState;
    bookings: BookingState;
    contacts: ContactState;
}, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<{
    users: UserState;
    rooms: RoomState;
    bookings: BookingState;
    contacts: ContactState;
}, import("redux").AnyAction>]>;
export type RootState = {
    users: UserState;
    rooms: RoomState;
    bookings: BookingState;
    contacts: ContactState;
};
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
