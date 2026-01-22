import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchUserProfile } from "./slice/ProfileSlice";

import { loadTransactions } from "./slice/TransactionSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useBudget = () => {
  const { budgets, loading, error } = useAppSelector((state) => state.budget);
  return { budgets, loading, error };
};

export const useLoadTransactions = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { authorized } = useAppSelector((state) => state.auth);
  const { user, loading, error } = useAppSelector((state) => state.profile);

  // You can add helper functions here if needed, or simply return state
  return { authorized, user, loading, error };
};

export const useLoadUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
};

import { UseTransactionsResult, TransactionItem } from "../../types";

export const useTransactions = (): UseTransactionsResult => {
  const { transactions } = useAppSelector((state) => state.transaction);

  const totalIncome = transactions
    .filter((t: TransactionItem) => t.type === "income")
    .reduce(
      (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
      0
    );

  const totalExpense = transactions
    .filter((t: TransactionItem) => t.type === "expense")
    .reduce(
      (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
      0
    );

  const totalBalance = totalIncome + totalExpense;

  return {
    transactions,
    totalIncome,
    totalExpense,
    totalBalance,
  };
};
