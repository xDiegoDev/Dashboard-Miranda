import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updatedUsersData from "../data/userDataId";
const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsersAsync",
  async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("Fetched data:", updatedUsersData);
        resolve(updatedUsersData);
      }, 200)
    );
  }
);

export const validateUserAsync = createAsyncThunk(
  "users/validateUserAsync",
  async ({ email, password }, { getState }) => {
    const usersData = getState().users.users;
    const user = usersData.find(
      (u) => u.Email === email && u.Password.toString() === password
    );

    if (user) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 200);
    });
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 200);
    });
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userId);
      }, 200);
    });
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        console.log("Data set in state:", state.initialData);
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add user
      .addCase(addUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update user
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.users.findIndex(
          (user) => user.ID === action.payload.ID
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete user
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const userId = action.payload;
        state.users = state.users.filter((user) => user.ID !== userId);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
