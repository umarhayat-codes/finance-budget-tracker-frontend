import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchUserProfile } from "./slice/ProfileSlice";
import {
  UseTransactionsResult,
  TransactionItem,
  Month,
  BudgetApiResponse,
  BudgetCheckParams,
  ExpenseValidationResult,
} from "../../types";
import { loadTransactions, setSelectedMonth } from "./slice/TransactionSlice";

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
  const { authorized } = useAppSelector((state) => state.auth);
  const { user, loading, error } = useAppSelector((state) => state.profile);

  return { authorized, user, loading, error };
};

export const useLoadUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
};

export const useTransactions = (): Omit<
  UseTransactionsResult,
  "categories" | "loading" | "error"
> => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { transactions, selectedMonth } = useAppSelector(
    (state) => state.transaction,
  );
  const { budgets } = useAppSelector((state) => state.budget);

  useEffect(() => {
    if (user?.id) {
      import("./slice/BudgetSlice").then(({ fetchBudgets }) => {
        dispatch(fetchBudgets(user.id));
      });
    }
  }, [user?.id, dispatch]);

  const getMonthName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "long" });
  };

  const filteredTransactions = transactions.filter((t) => {
    if (selectedMonth === "All") return true;
    return getMonthName(t.date) === selectedMonth;
  });

  const rawIncome: number = filteredTransactions
    .filter((t: TransactionItem) => t.type === "income")
    .reduce(
      (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
      0,
    );

  const rawExpense: number = filteredTransactions
    .filter((t: TransactionItem) => t.type === "expense")
    .reduce(
      (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
      0,
    );

  const netIncome: number = rawIncome - rawExpense;
  const totalVolume: number = rawIncome + rawExpense;

  const months: Month[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getPreviousMonth = (currentMonthName: Month): Month | null => {
    if (currentMonthName === "All") return null;
    const currentIndex = months.indexOf(currentMonthName);
    if (currentIndex === -1) return null;
    const prevIndex = (currentIndex - 1 + 12) % 12;
    return months[prevIndex];
  };

  const prevMonthName = getPreviousMonth(selectedMonth);

  const prevMonthTransactions = prevMonthName
    ? transactions.filter((t) => getMonthName(t.date) === prevMonthName)
    : [];

  const prevMonthIncome = prevMonthTransactions
    .filter((t: TransactionItem) => t.type === "income")
    .reduce(
      (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
      0,
    );

  const prevMonthExpense = prevMonthTransactions
    .filter((t: TransactionItem) => t.type === "expense")
    .reduce(
      (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
      0,
    );

  const prevMonthVolume = prevMonthIncome + prevMonthExpense;

  const calculateComparison = (current: number, previous: number) => {
    let percentage = "0%";
    const diffValue = current - previous;
    const isPositive = diffValue >= 0;
    const difference = `${isPositive ? "+" : "-"}$${Math.abs(diffValue).toFixed(2)}`;

    if (previous !== 0) {
      percentage = `${Math.abs((diffValue / previous) * 100).toFixed(1)}%`;
    } else if (current !== 0) {
      percentage = "100%";
    }

    return { percentage, difference, isPositive };
  };

  const totalComparison = calculateComparison(totalVolume, prevMonthVolume);
  const expenseComparison = calculateComparison(rawExpense, prevMonthExpense);
  const incomeComparison = calculateComparison(rawIncome, prevMonthIncome);

  const validateExpense = (
    params: BudgetCheckParams,
  ): ExpenseValidationResult => {
    const { category, month, amount } = params;
    const budget = budgets.find(
      (b) => b.category === category && b.month === month,
    );

    if (!budget) {
      return {
        isValid: false,
        errorMessage:
          "Please create a budget first for this category and month.",
      };
    }

    const spentAmount = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category === category &&
          getMonthName(t.date) === month,
      )
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    if (spentAmount + amount > budget.amount) {
      return {
        isValid: false,
        errorMessage: `Expense exceeds budget. Budget: $${budget.amount.toFixed(
          2,
        )}, Available: $${(budget.amount - spentAmount).toFixed(2)}`,
      };
    }

    const monthIncome = transactions
      .filter((t) => t.type === "income" && getMonthName(t.date) === month)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const monthExpense = transactions
      .filter((t) => t.type === "expense" && getMonthName(t.date) === month)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    if (monthExpense + amount > monthIncome) {
      return {
        isValid: false,
        errorMessage: `Insufficient income. Month Income: $${monthIncome.toFixed(
          2,
        )}, Available: $${(monthIncome - monthExpense).toFixed(2)}`,
      };
    }

    return { isValid: true, errorMessage: null };
  };

  const handleMonthSelect = (month: Month) => {
    dispatch(setSelectedMonth(month));
  };

  return {
    transactions,
    selectedMonth,
    handleMonthSelect,
    totalTransaction: totalVolume,
    totalIncome: netIncome,
    totalExpense: rawExpense,
    totalBalance: netIncome,
    validateExpense,
    totalComparison,
    expenseComparison,
    incomeComparison,
  };
};
