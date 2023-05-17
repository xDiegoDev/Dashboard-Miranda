import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import updatedContactData from "../data/contactDataWithId";

const initialState: ContactState = {
  contacts: [],
  status: "idle",
  error: null,
};

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

type ContactState = {
  contacts: Contact[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const fetchContactsAsync = createAsyncThunk(
  "contacts/fetchContactsAsync",
  async () => {
    return new Promise<Contact[]>((resolve) =>
      setTimeout(() => {
        resolve(updatedContactData);
      }, 200)
    );
  }
);

export const addContactAsync = createAsyncThunk(
  "contacts/addContactAsync",
  async (contact: Contact) => {
    return new Promise<Contact>((resolve) => {
      setTimeout(() => {
        resolve(contact);
      }, 200);
    });
  }
);

export const updateContactAsync = createAsyncThunk(
  "contacts/updateContactAsync",
  async (contact: Contact) => {
    return new Promise<Contact>((resolve) => {
      setTimeout(() => {
        resolve(contact);
      }, 200);
    });
  }
);

export const deleteContactAsync = createAsyncThunk(
  "contacts/deleteContactAsync",
  async (contactId: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(contactId);
      }, 200);
    });
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch rooms
      .addCase(fetchContactsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchContactsAsync.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.status = "succeeded";
          state.contacts = action.payload;
        }
      )
      .addCase(
        fetchContactsAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      // Add user
      .addCase(addContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addContactAsync.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.status = "succeeded";
          state.contacts.push(action.payload);
        }
      )
      .addCase(
        addContactAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      // Update user
      .addCase(updateContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateContactAsync.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.status = "succeeded";
          const index = state.contacts.findIndex(
            (contact) => contact.ID === action.payload.ID
          );
          if (index !== -1) {
            state.contacts[index] = action.payload;
          }
        }
      )
      .addCase(
        updateContactAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      // Delete user
      .addCase(deleteContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteContactAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          const contactId = action.payload;
          state.contacts = state.contacts.filter(
            (contact) => contact.ID !== contactId
          );
        }
      )
      .addCase(
        deleteContactAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      );
  },
});

export default contactSlice.reducer;
