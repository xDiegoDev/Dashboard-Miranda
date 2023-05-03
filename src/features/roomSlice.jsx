import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updatedRoomsData from "../data/roomDataWithId";

const initialState = {
  rooms: [],
  status: "idle",
  error: null,
};

export const fetchRoomsAsync = createAsyncThunk(
  "rooms/fetchRoomsAsync",
  async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("Fetched rooms data:", updatedRoomsData);
        resolve(updatedRoomsData);
      }, 200)
    );
  }
);

export const addRoomAsync = createAsyncThunk(
  "rooms/addRoomAsync",
  async (room) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(room);
      }, 200);
    });
  }
);

export const updateRoomAsync = createAsyncThunk(
  "rooms/updateRoomAsync",
  async (room) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(room);
      }, 200);
    });
  }
);

export const deleteRoomAsync = createAsyncThunk(
  "rooms/deleteRoomAsync",
  async (roomId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(roomId);
      }, 200);
    });
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch rooms
      .addCase(fetchRoomsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
        console.log("Rooms data set in state:", state.rooms);
      })
      .addCase(fetchRoomsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add user
      .addCase(addRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRoomAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms.push(action.payload);
      })
      .addCase(addRoomAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update user
      .addCase(updateRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRoomAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.rooms.findIndex(
          (room) => room.ID === action.payload.ID
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(updateRoomAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete user
      .addCase(deleteRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const roomId = action.payload;
        state.rooms = state.rooms.filter((room) => room.ID !== roomId);
      })
      .addCase(deleteRoomAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default roomSlice.reducer;
