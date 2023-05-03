import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updatedContactData from "../data/contactDataWithId";

const initialState = {
  rooms: [],
  status: "idle",
  error: null,
};

export const fetchContactsAsync = createAsyncThunk(
  "contacts/fetchContactsAsync",
  async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("Fetched contacts data:", updatedContactData);
        resolve(updatedContactData);
      }, 200)
    );
  }
);

export const addContactAsync = createAsyncThunk(
  "contacts/addContactAsync",
  async (contact) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(contact);
      }, 200);
    });
  }
);

export const updateContactAsync = createAsyncThunk(
  "contacts/updateContactAsync",
  async (contact) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(contact);
      }, 200);
    });
  }
);

export const deleteContactAsync = createAsyncThunk(
  "contacts/deleteContactAsync",
  async (contactId) => {
    return new Promise((resolve) => {
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
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
        console.log("Contacts data set in state:", state.contacts);
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add user
      .addCase(addContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts.push(action.payload);
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update user
      .addCase(updateContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContactAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.contacts.findIndex(
          (contact) => contact.ID === action.payload.ID
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete user
      .addCase(deleteContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const contactId = action.payload;
        state.contacts = state.contacts.filter(
          (contact) => contact.ID !== contactId
        );
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
