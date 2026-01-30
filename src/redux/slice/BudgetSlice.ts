import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BudgetState,
  BudgetApiResponse,
  BudgeFormData,
  Month,
} from "../../../types";

const API_URL = "http://localhost:5000/api/budgets";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const initialState: BudgetState = {
  budgets: [],
  loading: false,
  error: null,
  selectedMonth: "All",
};

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
  async (data: BudgeFormData & { userId: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/budgets", data);
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

    builder
      .addCase(addBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addBudget.fulfilled,
        (state, action: PayloadAction<BudgetApiResponse>) => {
          state.loading = false;
          const index = state.budgets.findIndex(
            (b) => b.id === action.payload.id,
          );
          if (index !== -1) {
            state.budgets[index] = action.payload;
          } else {
            state.budgets.push(action.payload);
          }
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
