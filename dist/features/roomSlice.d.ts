import { Room } from "@mui/icons-material";
type Room = {
    "Room Name": string;
    ID: string;
    Facilities: string;
    "Bed Type": string;
    Rate: string;
    Status: string;
    IMG: string[];
    Offer: number;
    Number: number;
};
export type RoomState = {
    rooms: Room[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};
export declare const fetchRoomsAsync: import("@reduxjs/toolkit").AsyncThunk<Room[], void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addRoomAsync: import("@reduxjs/toolkit").AsyncThunk<Room, Room, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateRoomAsync: import("@reduxjs/toolkit").AsyncThunk<Room, Room, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteRoomAsync: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<RoomState>;
export default _default;
