import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  BudgeFormData,
  CategoryApiResponse,
  GraphDataPoint,
  BreakdownData,
  TransactionItem,
} from "../../../../types";
import {
  useAuth,
  useAppDispatch,
  useAppSelector,
  useTransactions,
} from "src/redux/useReduxHook";
import { addBudget, fetchBudgets } from "src/redux/slice/BudgetSlice";
import { toast } from "react-toastify";

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

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const useBudgeHook = () => {
  const { user } = useAuth();
  const {
    totalIncome,
    totalExpense,
    selectedMonth,
    handleMonthSelect,
    transactions,
  } = useTransactions();
  const dispatch = useAppDispatch();
  const { budgets, loading, error } = useAppSelector((state) => state.budget);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryApiResponse[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BudgeFormData>({
    month: "",
    year: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<CategoryApiResponse[]>("/categories");
        setCategories(response.data);
      } catch (err) {
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleFetchBudgets = useCallback(() => {
    if (user?.id) {
      dispatch(fetchBudgets(user.id));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    handleFetchBudgets();
  }, [handleFetchBudgets]);

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

  const currentYear = new Date().getFullYear().toString();

  const graphData: GraphDataPoint[] = shortMonthNames.map(
    (shortName, index) => {
      const fullName = monthNames[index];

      const monthlyBudget = budgets
        .filter((b) => b.month === fullName && b.year === currentYear)
        .reduce((acc, curr) => acc + curr.amount, 0);

      const monthlySpent = transactions
        .filter((t: TransactionItem) => {
          const tDate = new Date(t.date);
          const tMonth = tDate.getMonth();
          const tYear = tDate.getFullYear().toString();

          return (
            t.type === "expense" && tMonth === index && tYear === currentYear
          );
        })
        .reduce(
          (acc: number, curr: TransactionItem) => acc + parseFloat(curr.amount),
          0,
        );

      return {
        month: shortName,
        year: currentYear,
        budget: monthlyBudget,
        spent: monthlySpent,
      };
    },
  );

  const filteredBudgets = budgets.filter((b) => {
    if (selectedMonth === "All") return true;
    return b.month === selectedMonth;
  });

  const totalBudget = filteredBudgets.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  const getMonthName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "long" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
      await dispatch(addBudget({ ...formData, userId: user.id })).unwrap();

      closeModal();
      setFormData({
        month: "",
        year: "",
        amount: "",
        category: "",
      });
      setFormError(null);
    } catch (err) {
      toast.error("Error adding budget");
      setFormError("Failed to add budget");
    }
  };

  const breakdownData: BreakdownData[] = filteredBudgets.map((budget) => {
    const budgetMonth = budget.month;

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
      percentage: parseFloat(percentage.toFixed(0)),
    };
  });

  return {
    isModalOpen,
    formData,
    categories,
    budgets,
    loading,
    error: error || formError,
    handleInputChange,
    openModal,
    closeModal,
    handleSubmit,
    fetchBudgets: handleFetchBudgets,
    selectedMonth,
    handleMonthSelect,
    totalBudget,
    totalIncome,
    totalExpense,
    breakdownData,
    graphData,
  };
};
