import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  TransactionItem,
  TransactionState,
  TransactionFormData,
  Month,
} from "../../types";
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
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save transaction"
      );
    }
  }
);

export const loadTransactions = createAsyncThunk(
  "transaction/loadTransactions",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTransactionsApi();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load transactions"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    setSelectedMonth: (state, action: PayloadAction<Month>) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        saveTransaction.fulfilled,
        (state, action: PayloadAction<TransactionItem>) => {
          state.transactions.unshift(action.payload);
        }
      )
      .addCase(
        loadTransactions.fulfilled,
        (state, action: PayloadAction<TransactionItem[]>) => {
          state.transactions = action.payload;
        }
      );
  },
});

export const { deleteTransaction, setSelectedMonth } = transactionSlice.actions;
export default transactionSlice.reducer;
