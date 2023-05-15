var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updatedContactData from "../data/contactDataWithId";
var initialState = {
    rooms: [],
    status: "idle",
    error: null,
};
export var fetchContactsAsync = createAsyncThunk("contacts/fetchContactsAsync", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                return setTimeout(function () {
                    console.log("Fetched contacts data:", updatedContactData);
                    resolve(updatedContactData);
                }, 200);
            })];
    });
}); });
export var addContactAsync = createAsyncThunk("contacts/addContactAsync", function (contact) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(contact);
                }, 200);
            })];
    });
}); });
export var updateContactAsync = createAsyncThunk("contacts/updateContactAsync", function (contact) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(contact);
                }, 200);
            })];
    });
}); });
export var deleteContactAsync = createAsyncThunk("contacts/deleteContactAsync", function (contactId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(contactId);
                }, 200);
            })];
    });
}); });
var contactSlice = createSlice({
    name: "contacts",
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            // Fetch rooms
            .addCase(fetchContactsAsync.pending, function (state) {
            state.status = "loading";
        })
            .addCase(fetchContactsAsync.fulfilled, function (state, action) {
            state.status = "succeeded";
            state.contacts = action.payload;
            console.log("Contacts data set in state:", state.contacts);
        })
            .addCase(fetchContactsAsync.rejected, function (state, action) {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Add user
            .addCase(addContactAsync.pending, function (state) {
            state.status = "loading";
        })
            .addCase(addContactAsync.fulfilled, function (state, action) {
            state.status = "succeeded";
            state.contacts.push(action.payload);
        })
            .addCase(addContactAsync.rejected, function (state, action) {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Update user
            .addCase(updateContactAsync.pending, function (state) {
            state.status = "loading";
        })
            .addCase(updateContactAsync.fulfilled, function (state, action) {
            state.status = "succeeded";
            var index = state.contacts.findIndex(function (contact) { return contact.ID === action.payload.ID; });
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        })
            .addCase(updateContactAsync.rejected, function (state, action) {
            state.status = "failed";
            state.error = action.error.message;
        })
            // Delete user
            .addCase(deleteContactAsync.pending, function (state) {
            state.status = "loading";
        })
            .addCase(deleteContactAsync.fulfilled, function (state, action) {
            state.status = "succeeded";
            var contactId = action.payload;
            state.contacts = state.contacts.filter(function (contact) { return contact.ID !== contactId; });
        })
            .addCase(deleteContactAsync.rejected, function (state, action) {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});
export default contactSlice.reducer;
