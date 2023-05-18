import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import updatedRoomsData from "../data/roomDataWithId";
import { Room } from "@mui/icons-material";

const initialState: RoomState = {
  rooms: [],
  status: "idle",
  error: null,
};

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

export const fetchRoomsAsync = createAsyncThunk(
  "rooms/fetchRoomsAsync",
  async () => {
    return new Promise<Room[]>((resolve) =>
      setTimeout(() => {
        resolve(updatedRoomsData);
      }, 200)
    );
  }
);

export const addRoomAsync = createAsyncThunk(
  "rooms/addRoomAsync",
  async (room: Room) => {
    return new Promise<Room>((resolve) => {
      setTimeout(() => {
        resolve(room);
      }, 200);
    });
  }
);

export const updateRoomAsync = createAsyncThunk(
  "rooms/updateRoomAsync",
  async (room: Room) => {
    return new Promise<Room>((resolve) => {
      setTimeout(() => {
        resolve(room);
      }, 200);
    });
  }
);

export const deleteRoomAsync = createAsyncThunk(
  "rooms/deleteRoomAsync",
  async (roomId: string) => {
    return new Promise<string>((resolve) => {
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
      .addCase(
        fetchRoomsAsync.fulfilled,
        (state, action: PayloadAction<Room[]>) => {
          state.status = "succeeded";
          state.rooms = action.payload;
        }
      )
      .addCase(
        fetchRoomsAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      // Add user
      .addCase(addRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRoomAsync.fulfilled, (state, action: PayloadAction<Room>) => {
        state.status = "succeeded";
        state.rooms.push(action.payload);
      })
      .addCase(
        addRoomAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      // Update user
      .addCase(updateRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateRoomAsync.fulfilled,
        (state, action: PayloadAction<Room>) => {
          state.status = "succeeded";
          const index = state.rooms.findIndex(
            (room) => room.ID === action.payload.ID
          );
          if (index !== -1) {
            state.rooms[index] = action.payload;
          }
        }
      )
      .addCase(
        updateRoomAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      // Delete user
      .addCase(deleteRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteRoomAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          const roomId = action.payload;
          state.rooms = state.rooms.filter((room) => room.ID !== roomId);
        }
      )
      .addCase(
        deleteRoomAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      );
  },
});

export default roomSlice.reducer;
