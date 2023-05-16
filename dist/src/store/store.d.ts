declare const _default: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    users: {
        users: {
            ID: string;
            Email: string;
            Password: string;
            IMG: string;
            Name: string;
            "Start Date": Date;
            Description: string;
            Contact: string;
            Status: string;
        }[];
        status: "idle" | "loading" | "succeeded" | "failed";
        error: string | null;
    };
    rooms: {
        rooms: never[];
        status: string;
        error: null;
    };
    bookings: {
        rooms: never[];
        status: string;
        error: null;
    };
    contacts: {
        rooms: never[];
        status: string;
        error: null;
    };
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
    users: {
        users: {
            ID: string;
            Email: string;
            Password: string;
            IMG: string;
            Name: string;
            "Start Date": Date;
            Description: string;
            Contact: string;
            Status: string;
        }[];
        status: "idle" | "loading" | "succeeded" | "failed";
        error: string | null;
    };
    rooms: {
        rooms: never[];
        status: string;
        error: null;
    };
    bookings: {
        rooms: never[];
        status: string;
        error: null;
    };
    contacts: {
        rooms: never[];
        status: string;
        error: null;
    };
}, import("redux").AnyAction>]>;
export default _default;
