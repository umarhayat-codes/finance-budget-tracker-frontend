import { useState, useEffect } from "react";
import axios from "axios";
import {
  TransactionItem,
  TransactionFormData,
  CategoryApiResponse,
  Month,
  IncomeCategory,
  UseTransactionsResult,
  BudgetApiResponse,
  ExpenseValidationResult,
  BudgetCheckParams,
} from "../../../../types";
import {
  useAppSelector,
  useAppDispatch,
  useAuth,
} from "src/redux/useReduxHook";
import { setSelectedMonth } from "src/redux/slice/TransactionSlice";
import { fetchBudgets } from "src/redux/slice/BudgetSlice";

const TRANSACTIONS_API_URL = "http://localhost:3000/api/transactions";
const CATEGORIES_API_URL = "http://localhost:3000/api/categories";

export const addTransactionApi = async (
  data: TransactionFormData
): Promise<TransactionItem> => {
  const response = await axios.post(`${TRANSACTIONS_API_URL}/`, data, {
    withCredentials: true,
  });
  return response.data.transaction;
};

export const fetchTransactionsApi = async (): Promise<TransactionItem[]> => {
  const response = await axios.get(`${TRANSACTIONS_API_URL}/`, {
    withCredentials: true,
  });
  return response.data.transactions;
};

export const useTransactionHook = (): UseTransactionsResult => {
  const incomeCategories: IncomeCategory[] = ["Salary", "Freelancing"];
  const [categories, setCategories] = useState<CategoryApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { transactions, selectedMonth } = useAppSelector(
    (state) => state.transaction
  );
  const { budgets } = useAppSelector((state) => state.budget);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get<CategoryApiResponse[]>(
          CATEGORIES_API_URL,
          {
            withCredentials: true,
          }
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch budgets if not loaded, needed for validation
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchBudgets(user.id));
    }
  }, [user?.id, dispatch]);

  const handleMonthSelect = (month: Month) => {
    dispatch(setSelectedMonth(month));
  };

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
      0
    );

  const rawExpense: number = filteredTransactions
    .filter((t: TransactionItem) => t.type === "expense")
    .reduce(
      (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
      0
    );

  // Calculate values according to user requirements:
  // 1. "expense create successfully then i want to subtract income with expense value"
  // Net Income (Balance) = Raw Income - Raw Expense
  const netIncome: number = rawIncome - rawExpense;

  // 2 & 3. "when user create expense/income successfully then value add in Total Transaction"
  // Total Volume = Raw Income + Raw Expense
  const totalVolume: number = rawIncome + rawExpense;

  // Validation Functions
  const checkBudgetExists = (
    category: string,
    month: string
  ): { exists: boolean; budget: BudgetApiResponse | null } => {
    const budget = budgets.find(
      (b) => b.category === category && b.month === month
    );
    return { exists: !!budget, budget: budget || null };
  };

  const validateExpenseAmount = (
    category: string,
    month: string,
    newExpenseAmount: number,
    budget: BudgetApiResponse
  ): ExpenseValidationResult => {
    // Calculate already spent amount for this category and month
    const spentAmount = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category === category &&
          getMonthName(t.date) === month
      )
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const totalAfterNewExpense = spentAmount + newExpenseAmount;

    if (totalAfterNewExpense > budget.amount) {
      return {
        isValid: false,
        errorMessage: `Expense amount exceeds budget. Budget: $${budget.amount.toFixed(
          2
        )}, Already spent: $${spentAmount.toFixed(2)}, Available: $${(
          budget.amount - spentAmount
        ).toFixed(2)}`,
      };
    }

    return { isValid: true, errorMessage: null };
  };

  const checkAvailableIncome = (
    month: string,
    newExpenseAmount: number
  ): ExpenseValidationResult => {
    // Calculate total income for the selected month
    const monthIncome = transactions
      .filter((t) => t.type === "income" && getMonthName(t.date) === month)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    // Calculate total expenses for the selected month
    const monthExpense = transactions
      .filter((t) => t.type === "expense" && getMonthName(t.date) === month)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const totalAfterNewExpense = monthExpense + newExpenseAmount;

    if (totalAfterNewExpense > monthIncome) {
      return {
        isValid: false,
        errorMessage: `Insufficient income for this month. Income: $${monthIncome.toFixed(
          2
        )}, Current expenses: $${monthExpense.toFixed(2)}, Available: $${(
          monthIncome - monthExpense
        ).toFixed(2)}`,
      };
    }

    return { isValid: true, errorMessage: null };
  };

  const validateExpense = (
    params: BudgetCheckParams
  ): ExpenseValidationResult => {
    const { category, month, amount } = params;

    // 1. Check if budget exists
    const { exists, budget } = checkBudgetExists(category, month);
    if (!exists) {
      return {
        isValid: false,
        errorMessage: `Please create a budget first for this category and month.`,
      };
    }

    // 2. Validate expense amount against budget
    const amountValidation = validateExpenseAmount(
      category,
      month,
      amount,
      budget!
    );
    if (!amountValidation.isValid) {
      return amountValidation;
    }

    // 3. Check available income
    const incomeValidation = checkAvailableIncome(month, amount);
    if (!incomeValidation.isValid) {
      return incomeValidation;
    }

    return { isValid: true, errorMessage: null };
  };

  return {
    categories,
    loading,
    error,
    selectedMonth,
    handleMonthSelect,
    totalTransaction: totalVolume,
    totalIncome: netIncome,
    totalExpense: rawExpense,
    incomeCategories,
    validateExpense,
  };
};
