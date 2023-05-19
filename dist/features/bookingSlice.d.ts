export type Booking = {
    ID: string;
    Guest: string;
    IMG: string[];
    UserIMG: string;
    "Order Data": string;
    "Check In": string;
    "Check Out": string;
    "View Notes"?: string;
    Status: string;
    price: string;
    "Room Type": string;
    "Special Request": string;
    facilities: string[];
};
export type BookingState = {
    bookings: Booking[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};
export declare const fetchBookingsAsync: import("@reduxjs/toolkit").AsyncThunk<Booking[], void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addBookingAsync: import("@reduxjs/toolkit").AsyncThunk<Booking, Booking, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateBookingAsync: import("@reduxjs/toolkit").AsyncThunk<Booking, Booking, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteBookingAsync: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<BookingState>;
export default _default;
