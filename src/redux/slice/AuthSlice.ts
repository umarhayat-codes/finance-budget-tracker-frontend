import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "../../../types";
import axios from "axios";

const initialState: AuthState = {
  authorized: false,
  isInitialized: false,
};

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      return true;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      return rejectWithValue(
        axiosError.response?.data?.message || "Logout failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.authorized = true;
    },
    logout: (state) => {
      state.authorized = false;
      state.isInitialized = true;
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.authorized = false;
    });
  },
});

export const { loginSuccess, logout, setAuthorized, setInitialized } =
  authSlice.actions;
export default authSlice.reducer;
