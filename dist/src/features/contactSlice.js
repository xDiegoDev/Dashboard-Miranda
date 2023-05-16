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
exports.deleteContactAsync = exports.updateContactAsync = exports.addContactAsync = exports.fetchContactsAsync = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const contactDataWithId_1 = __importDefault(require("../data/contactDataWithId"));
const initialState = {
    rooms: [],
    status: "idle",
    error: null,
};
exports.fetchContactsAsync = (0, toolkit_1.createAsyncThunk)("contacts/fetchContactsAsync", () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => setTimeout(() => {
        console.log("Fetched contacts data:", contactDataWithId_1.default);
        resolve(contactDataWithId_1.default);
    }, 200));
}));
exports.addContactAsync = (0, toolkit_1.createAsyncThunk)("contacts/addContactAsync", (contact) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contact);
        }, 200);
    });
}));
exports.updateContactAsync = (0, toolkit_1.createAsyncThunk)("contacts/updateContactAsync", (contact) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contact);
        }, 200);
    });
}));
exports.deleteContactAsync = (0, toolkit_1.createAsyncThunk)("contacts/deleteContactAsync", (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contactId);
        }, 200);
    });
}));
const contactSlice = (0, toolkit_1.createSlice)({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch rooms
            .addCase(exports.fetchContactsAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.fetchContactsAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.contacts = action.payload;
            console.log("Contacts data set in state:", state.contacts);
        })
            .addCase(exports.fetchContactsAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Add user
            .addCase(exports.addContactAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.addContactAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.contacts.push(action.payload);
        })
            .addCase(exports.addContactAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Update user
            .addCase(exports.updateContactAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.updateContactAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.contacts.findIndex((contact) => contact.ID === action.payload.ID);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        })
            .addCase(exports.updateContactAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Delete user
            .addCase(exports.deleteContactAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.deleteContactAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            const contactId = action.payload;
            state.contacts = state.contacts.filter((contact) => contact.ID !== contactId);
        })
            .addCase(exports.deleteContactAsync.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});
exports.default = contactSlice.reducer;
