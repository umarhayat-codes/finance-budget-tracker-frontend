import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import profileReducer from "./slice/ProfileSlice";
import transactionReducer from "./slice/TransactionSlice";
import budgetReducer from "./slice/BudgetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    transaction: transactionReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
