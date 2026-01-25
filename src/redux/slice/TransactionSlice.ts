import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  TransactionItem,
  TransactionState,
  TransactionFormData,
  Month,
} from "../../../types";
import {
  addTransactionApi,
  fetchTransactionsApi,
} from "../../pages/dashboard/transaction/useTransactionHook";

const initialState: TransactionState = {
  transactions: [],
  selectedMonth: "All",
};

export const saveTransaction = createAsyncThunk(
  "transaction/saveTransaction",
  async (data: TransactionFormData, { rejectWithValue }) => {
    try {
      return await addTransactionApi(data);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        axiosError.response?.data?.message || "Failed to save transaction";
      return rejectWithValue(errorMessage);
    }
  },
);

export const loadTransactions = createAsyncThunk(
  "transaction/loadTransactions",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTransactionsApi();
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        axiosError.response?.data?.message || "Failed to load transactions";
      return rejectWithValue(errorMessage);
    }
  },
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload,
      );
    },
    setSelectedMonth: (state, action: PayloadAction<Month>) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTransaction.fulfilled, (state, { payload }) => {
        state.transactions.unshift(payload);
      })
      .addCase(loadTransactions.fulfilled, (state, { payload }) => {
        state.transactions = payload;
      });
  },
});

export const { deleteTransaction, setSelectedMonth } = transactionSlice.actions;
export default transactionSlice.reducer;
