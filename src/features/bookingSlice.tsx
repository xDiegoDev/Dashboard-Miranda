import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import formattedData from "../data/BookingDataLogic";

const initialState: BookingState = {
  bookings: [],
  status: "idle",
  error: null,
};

type Booking = {
  ID: string;
  Guest: string;
  IMG: string[];
  UserIMG: string;
  "Order Data": string;
  "Check In": string;
  "Check Out": string;
  "View Notes"?: string;
  Status: string;
  price: string;
  "Room Type": string;
  "Special Request": string;
  facilities: string[];
};

export type BookingState = {
  bookings: Booking[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const fetchBookingsAsync = createAsyncThunk(
  "bookings/fetchBookingsAsync",
  async () => {
    return new Promise<Booking[]>((resolve) =>
      setTimeout(() => {
        resolve(formattedData);
      }, 200)
    );
  }
);

export const addBookingAsync = createAsyncThunk(
  "bookings/addBookingAsync",
  async (booking: Booking) => {
    const bookingList = formattedData as Booking[];
    return new Promise<Booking>((resolve) => {
      setTimeout(() => {
        resolve(booking);
      }, 200);
    });
  }
);

export const updateBookingAsync = createAsyncThunk(
  "bookings/updateBookingAsync",
  async (booking: Booking) => {
    return new Promise<Booking>((resolve) => {
      setTimeout(() => {
        resolve(booking);
      }, 200);
    });
  }
);

export const deleteBookingAsync = createAsyncThunk(
  "bookings/deleteBookingAsync",
  async (bookingId: string) => {
    return new Promise<string>((resolve) => {
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
      })
      .addCase(
        fetchBookingsAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error?.message || null;
        }
      )
      // Add user
      .addCase(addBookingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addBookingAsync.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.status = "succeeded";
          state.bookings.push(action.payload);
        }
      )
      .addCase(
        addBookingAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
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
      .addCase(
        updateBookingAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      )
      // Delete user
      .addCase(deleteBookingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteBookingAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          const bookingId = action.payload;
          state.bookings = state.bookings.filter(
            (booking) => booking.ID !== bookingId
          );
        }
      )
      .addCase(
        deleteBookingAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error.message || null;
        }
      );
  },
});

export default bookingSlice.reducer;
