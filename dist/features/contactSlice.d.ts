type Contact = {
    "Order ID": string;
    Date: string;
    Customer: string;
    Mail: string;
    Telephone: string;
    Comment: string;
    Asunto: string;
    Action: string;
    IMG: string;
    ID: string;
};
export type ContactState = {
    contacts: Contact[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};
export declare const fetchContactsAsync: import("@reduxjs/toolkit").AsyncThunk<Contact[], void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addContactAsync: import("@reduxjs/toolkit").AsyncThunk<Contact, Contact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateContactAsync: import("@reduxjs/toolkit").AsyncThunk<Contact, Contact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const deleteContactAsync: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const _default: import("redux").Reducer<ContactState>;
export default _default;
