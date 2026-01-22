import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  BudgeFormData,
  CategoryApiResponse,
  GraphDataPoint,
  BreakdownData,
  Month,
} from "../../../../types";
import {
  useAuth,
  useAppDispatch,
  useAppSelector,
} from "src/redux/useReduxHook";
import {
  addBudget,
  fetchBudgets,
  setSelectedMonth,
} from "src/redux/slice/BudgetSlice";

const monthNames = [
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

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Base API URL
const API_URL = "http://localhost:3000/api";

// Axios with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const useBudgeHook = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  // Consume budget state from Redux
  const { budgets, loading, error, selectedMonth } = useAppSelector(
    (state) => state.budget
  );
  const { transactions } = useAppSelector((state) => state.transaction);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryApiResponse[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BudgeFormData>({
    month: "",
    year: "",
    amount: "",
    category: "",
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<CategoryApiResponse[]>("/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch budgets via Redux
  const handleFetchBudgets = useCallback(() => {
    if (user?.id) {
      dispatch(fetchBudgets(user.id));
    }
  }, [user?.id, dispatch]);

  // Initial fetch
  useEffect(() => {
    handleFetchBudgets();
  }, [handleFetchBudgets]);

  // Set default month and year from system when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const now = new Date();
      const year = String(now.getFullYear());
      const monthNames = [
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
      const month = monthNames[now.getMonth()];

      setFormData((prev) => ({
        ...prev,
        month,
        year,
      }));
    }
  }, [isModalOpen]);

  // Graph Data Calculation
  const currentYear = new Date().getFullYear().toString();

  const graphData: GraphDataPoint[] = shortMonthNames.map(
    (shortName, index) => {
      const fullName = monthNames[index];

      // Sum budgets for this month and year
      const monthlyBudget = budgets
        .filter((b) => b.month === fullName && b.year === currentYear)
        .reduce((acc, curr) => acc + curr.amount, 0);

      // Sum expenses for this month
      const monthlySpent = transactions
        .filter((t) => {
          const tDate = new Date(t.date);
          const tMonth = tDate.getMonth();
          const tYear = tDate.getFullYear().toString();

          return (
            t.type === "expense" && tMonth === index && tYear === currentYear
          );
        })
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

      return {
        month: shortName,
        year: currentYear,
        budget: monthlyBudget,
        spent: monthlySpent,
      };
    }
  );

  // Filtering Logic
  const filteredBudgets = budgets.filter((b) => {
    if (selectedMonth === "All") return true;
    return b.month === selectedMonth;
  });

  const totalBudget = filteredBudgets.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const getMonthName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "long" });
  };

  const filteredTransactions = transactions.filter((t) => {
    if (selectedMonth === "All") return true;
    return getMonthName(t.date) === selectedMonth;
  });

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const handleMonthSelect = (month: Month) => {
    dispatch(setSelectedMonth(month));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setFormError("User not authenticated");
      return;
    }

    try {
      // Dispatch Redux action
      await dispatch(addBudget({ ...formData, userId: user.id })).unwrap();

      closeModal();
      // Reset form
      setFormData({
        month: "",
        year: "",
        amount: "",
        category: "",
      });
      setFormError(null);
    } catch (err) {
      console.error("Error adding budget:", err);
      setFormError("Failed to add budget");
    }
  };

  const breakdownData: BreakdownData[] = filteredBudgets.map((budget) => {
    // Determine the month for this budget. It stores month name "January", etc.
    const budgetMonth = budget.month;

    // Filter transactions for this category and month
    const categorySpent = transactions
      .filter((t) => {
        const tMonth = getMonthName(t.date);
        return (
          t.type === "expense" &&
          t.category === budget.category &&
          (selectedMonth === "All" || tMonth === budgetMonth)
        );
      })
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const percentage =
      budget.amount > 0 ? (categorySpent / budget.amount) * 100 : 0;

    return {
      id: budget.id,
      category: budget.category,
      budgeted: budget.amount,
      spent: categorySpent,
      percentage: parseFloat(percentage.toFixed(0)), // Keep as number, rounded
    };
  });

  return {
    isModalOpen,
    formData,
    categories,
    budgets, // From Redux
    loading, // From Redux
    error: error || formError,
    handleInputChange,
    openModal,
    closeModal,
    handleSubmit,
    fetchBudgets: handleFetchBudgets,
    // New exports
    selectedMonth,
    handleMonthSelect,
    totalBudget,
    totalIncome,
    totalExpense,
    breakdownData,
    graphData,
  };
};
