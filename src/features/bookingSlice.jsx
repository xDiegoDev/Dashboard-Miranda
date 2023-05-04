import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formattedData from "../data/BookingDataLogic";

const initialState = {
  rooms: [],
  status: "idle",
  error: null,
};

export const fetchBookingsAsync = createAsyncThunk(
  "bookings/fetchBookingsAsync",
  async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("Fetched rooms data:", formattedData);
        resolve(formattedData);
      }, 200)
    );
  }
);

export const addBookingAsync = createAsyncThunk(
  "bookings/addBookingAsync",
  async (booking) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(booking);
      }, 200);
    });
  }
);

export const updateBookingAsync = createAsyncThunk(
  "bookings/updateBookingAsync",
  async (booking) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(booking);
      }, 200);
    });
  }
);

export const deleteBookingAsync = createAsyncThunk(
  "bookings/deleteBookingAsync",
  async (bookingId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(bookingId);
      }, 200);
    });
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch rooms
      .addCase(fetchBookingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
        console.log("Bookings data set in state:", state.bookings);
      })
      .addCase(fetchBookingsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add user
      .addCase(addBookingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBookingAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
      })
      .addCase(addBookingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update user
      .addCase(updateBookingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBookingAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.bookings.findIndex(
          (booking) => booking.ID === action.payload.ID
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(updateBookingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete user
      .addCase(deleteBookingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBookingAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const bookingId = action.payload;
        state.bookings = state.bookings.filter(
          (booking) => booking.ID !== bookingId
        );
      })
      .addCase(deleteBookingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;
