import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BudgetState,
  BudgetApiResponse,
  BudgeFormData,
  Month,
} from "../../../types";

// Base API URL
const API_URL = "http://localhost:3000/api/budgets";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const initialState: BudgetState = {
  budgets: [],
  loading: false,
  error: null,
  selectedMonth: "All",
};

// Async Thunks
export const fetchBudgets = createAsyncThunk(
  "budget/fetchBudgets",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get<BudgetApiResponse[]>(`/budgets/${userId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to fetch budgets",
      );
    }
  },
);

export const addBudget = createAsyncThunk(
  "budget/addBudget",
  // Modified to include userId directly in data or passed separately?
  // Based on useBudgeHook, we pass { ...formData, userId }.
  async (data: BudgeFormData & { userId: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/budgets", data);
      // The backend response structure might vary. Assuming it returns the created budget
      // or we might need to re-fetch.
      // If backend returns the object: return response.data.budget;
      // But typically we might just return the response data.
      // Let's assume response.data is the new budget object or contains it.
      // Backend returns { message: "Budget created successfully", budget: newBudget }
      // We need to extract just the budget object
      return response.data.budget;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to add budget",
      );
    }
  },
);

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setSelectedMonth: (state, action: PayloadAction<Month>) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Budgets
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBudgets.fulfilled,
        (state, action: PayloadAction<BudgetApiResponse[]>) => {
          state.loading = false;
          state.budgets = action.payload;
        },
      )
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add Budget
    builder
      .addCase(addBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addBudget.fulfilled,
        (state, action: PayloadAction<BudgetApiResponse>) => {
          state.loading = false;
          // The payload is now the budget object directly from response.data.budget
          state.budgets.push(action.payload);
        },
      )
      .addCase(addBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedMonth } = budgetSlice.actions;
export default budgetSlice.reducer;
