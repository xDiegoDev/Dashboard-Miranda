import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import updatedUsersData from "../data/userDataId";

export type User = {
  ID: string;
  Email: string;
  Password: string;
  UserIMG: string;
  Name: string;
  "Start Date": Date;
  Description: string;
  Contact: string;
  Status: string;
};

export type UserState = {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

interface ValidateUser {
  email: string;
  password: string;
}

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsersAsync",
  async () => {
    const userList = updatedUsersData as User[];
    return new Promise<User[]>((resolve) =>
      setTimeout(() => {
        resolve(userList);
      }, 200)
    );
  }
);

export const validateUserAsync = createAsyncThunk(
  "users/validateUserAsync",
  async ({ email, password }: ValidateUser, { getState }) => {
    const usersData = updatedUsersData;
    const user = usersData.find(
      (u: User) => u.Email === email && u.Password.toString() === password
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
  async (user: User) => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 200);
    });
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (user: User) => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 200);
    });
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (userId: string) => {
    return new Promise<string>((resolve) => {
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
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsersAsync.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(
        fetchUsersAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error?.message || null;
        }
      )
      // // Add user
      .addCase(addUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(
        addUserAsync.rejected,
        (state, action: { error: SerializedError }) => {
          state.status = "failed";
          state.error = action.error?.message || null;
        }
      )
      // // Update user
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
        state.error = action.error?.message || null;
      })

      // // Delete user
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
        state.error = action.error?.message || null;
      });
  },
});

export default userSlice.reducer;
