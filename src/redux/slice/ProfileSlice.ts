import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProfileState, User } from "../../types";
import { setAuthorized, setInitialized, logoutUser } from "./AuthSlice";

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Assuming cookie is automatically sent with request
      const response = await axios.get<{ user: User }>(
        "http://localhost:3000/api/auth/me",
        {
          withCredentials: true,
        }
      );
      dispatch(setAuthorized(true));
      return response.data.user;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(setAuthorized(false));
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    } finally {
      dispatch(setInitialized(true));
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
