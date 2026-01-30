import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MonthlyFinancialData,
  MonthlyFinancialApiResponse,
  UseFinanceHookResult,
  SummaryCardData,
  BudgetGoalData,
  LatestBudgetApiResponse,
  ExpenseBreakdownApiResponse,
  RecentTransactionItem,
  FinancialSummary,
  RecentTransactionApiResponse,
  MonthOption,
  ExpenseDistributionItem,
  CustomLabelProps,
} from "../../../../types";
import { toast } from "react-toastify";
import { useAppSelector } from "src/redux/useReduxHook";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const useFinanceHook = (): UseFinanceHookResult => {
  const { transactions: reduxTransactions } = useAppSelector(
    (state) => state.transaction,
  );

  const [data, setData] = useState<MonthlyFinancialData[]>([]);
  const [startMonth, setStartMonth] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("");
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpense: 0,
    totalSaving: 0,
    totalBudget: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [budgetGoals, setBudgetGoals] = useState<BudgetGoalData[]>([]);

  const globalRawIncome = reduxTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const globalRawExpense = reduxTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const globalNetIncome = globalRawIncome - globalRawExpense;

  const formatAmount = (amount: number): string => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + "M";
    }
    if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + "K";
    }
    return amount.toString();
  };

  useEffect(() => {
    const fetchFinanceData = async () => {
      setLoading(true);
      try {
        const [
          trendResponse,
          summaryResponse,
          distributionResponse,
          budgetResponse,
        ] = await Promise.all([
          api.get<MonthlyFinancialApiResponse>("/finance/summary"),
          api.get<FinancialSummary>("/transactions/financial-summary"),
          api.get<ExpenseBreakdownApiResponse>("/finance/distribution"),
          api.get<LatestBudgetApiResponse[]>("/budgets/latest"),
        ]);

        const summaryData = trendResponse.data;
        const financialSummaryData = summaryResponse.data;
        const distributionData = distributionResponse.data;
        const latestBudgets = budgetResponse.data;

        setFinancialSummary(financialSummaryData);
        setBreakdownData(distributionData);

        const formattedBudgets: BudgetGoalData[] = latestBudgets.map(
          (b: LatestBudgetApiResponse) => {
            const percentage =
              b.amount > 0 ? Math.round((b.spent / b.amount) * 100) : 0;
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
            let monthName = b.month;
            const monthIndex = parseInt(b.month) - 1;
            if (!isNaN(monthIndex) && monthNames[monthIndex]) {
              monthName = monthNames[monthIndex];
            }
            const dueDate = `${monthName} ${b.year}`;
            return {
              id: b.id,
              name: b.category,
              dueDate: dueDate,
              completedPercentage: percentage,
              currentAmount: formatAmount(b.spent),
              targetAmount: formatAmount(b.amount),
              remainingAmount: formatAmount(Math.max(0, b.amount - b.spent)),
              status: "On Track",
            };
          },
        );
        setBudgetGoals(formattedBudgets);

        if (
          summaryData.trend &&
          summaryData.trend.labels &&
          summaryData.trend.labels.length > 0
        ) {
          const trendData = summaryData.trend;
          const formattedData: MonthlyFinancialData[] = trendData.labels.map(
            (label: string, index: number) => ({
              month: label,
              income: trendData.incomeData[index] || 0,
              expense: trendData.expenseData[index] || 0,
              savings: trendData.savingsData[index] || 0,
            }),
          );
          setData(formattedData);
        } else {
          setData([]);
        }

        if (summaryData.startDate) setStartMonth(summaryData.startDate);
        if (summaryData.endDate) setEndMonth(summaryData.endDate);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(
            "Error fetching finance data: " +
              (error.response?.data?.message || error.message),
          );
        } else {
          toast.error(
            "An unexpected error occurred while fetching finance data",
          );
        }
        setData([]);
        const now = new Date();
        const currentMonth = now.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });
        setStartMonth(currentMonth);
        setEndMonth(currentMonth);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  const summaryCards: SummaryCardData[] = [
    {
      id: "1",
      title: "Total Income",
      amount: formatAmount(globalNetIncome), // Use Global Net Income
      type: "income",
      description: "Pulls From All Income Categories",
      bgColor: "bg-summaryTotalIncomeBg",
      textColor: "text-summaryTotalIncomeText",
      amountColor: "text-summaryValueDark",
      descColor: "text-summaryLabelDark",
      borderColor: "border-summaryCardBorder",
    },
    {
      id: "2",
      title: "Total Spending",
      amount: formatAmount(globalRawExpense), // Use Global Expense
      type: "spending",
      description: "Categorized by Bills, Food, Invoice, etc.",
      bgColor: "bg-summaryTotalSpendingBg",
      textColor: "text-summaryTotalSpendingText",
      amountColor: "text-summaryValueDark",
      descColor: "text-summaryLabelDark",
      borderColor: "border-summaryCardBorder",
    },
    {
      id: "3",
      title: "Spent Budget",
      amount: formatAmount(financialSummary.totalBudget),
      type: "budget",
      description: "Emergency Payment For Renovation, etc.",
      bgColor: "bg-summarySpentBudgetBg",
      textColor: "text-summarySpentBudgetText",
      amountColor: "text-summaryValueLight",
      descColor: "text-summaryLabelLight",
      borderColor: "border-summaryCardBorder",
    },
    {
      id: "4",
      title: "Total Saving",
      amount: formatAmount(financialSummary.totalSaving),
      type: "saving",
      description: "Monthly Savings from Total Income",
      bgColor: "bg-summaryTotalSavingBg",
      textColor: "text-summaryTotalSavingText",
      amountColor: "text-summaryValueLight",
      descColor: "text-summaryLabelLight",
      borderColor: "border-summaryCardBorder",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [transactions, setTransactions] = useState<RecentTransactionItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const generateAvailableMonths = (): MonthOption[] => {
    const months: MonthOption[] = [{ label: "All Months", value: "all" }];

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

    monthNames.forEach((name, index) => {
      const monthNumber = String(index + 1).padStart(2, "0");
      months.push({ label: name, value: monthNumber });
    });

    return months;
  };

  const [availableMonths] = useState<MonthOption[]>(generateAvailableMonths());

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const params: { page: number; limit: number; month?: string } = {
        page: currentPage,
        limit: 5,
      };

      if (selectedMonth !== "all") {
        params.month = selectedMonth;
      }

      const response = await api.get<RecentTransactionApiResponse>(
        "/transactions/recent",
        { params },
      );

      setTransactions(response.data.transactions);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Error fetching transactions: " +
            (error.response?.data?.message || error.message),
        );
      } else {
        toast.error("An unexpected error occurred while fetching transactions");
      }
      setTransactions([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, selectedMonth]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  const [breakdownData, setBreakdownData] =
    useState<ExpenseBreakdownApiResponse | null>(null);

  const onDownload = () => {
    toast.success("Download clicked");
  };

  const onShare = () => {
    toast.success("Share clicked");
  };

  const onAddNewGoal = () => {
    toast.success("Add New Goal clicked");
  };

  const onManageBudgets = () => {
    toast.success("Manage Budgets clicked");
  };

  const onEditGoal = (id: string) => {
    toast.success("Edit Goal clicked");
  };

  const onDeleteGoal = (id: string) => {
    toast.success("Delete Goal clicked");
  };

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = (props: CustomLabelProps) => {
    const {
      cx = 0,
      cy = 0,
      midAngle = 0,
      innerRadius = 0,
      outerRadius = 0,
      payload,
    } = props;

    const data = payload as ExpenseDistributionItem | undefined;
    if (!data || !data.textColor || data.percentage === 0) return null;

    const radius =
      (innerRadius as number) +
      ((outerRadius as number) - (innerRadius as number)) * 0.65;
    const x =
      (cx as number) + radius * Math.cos(-(midAngle as number) * RADIAN);
    const y =
      (cy as number) + radius * Math.sin(-(midAngle as number) * RADIAN);

    return React.createElement(
      "g",
      null,
      React.createElement(
        "text",
        {
          x: x,
          y: y - 8,
          fill: data.textColor,
          textAnchor: "middle",
          dominantBaseline: "central",
          style: {
            fontSize: "30px",
            fontFamily: "Poppins",
            fontWeight: 300,
          },
        },
        `${data.percentage}%`,
      ),
      React.createElement(
        "text",
        {
          x: x,
          y: y + 18,
          fill: data.textColor,
          textAnchor: "middle",
          dominantBaseline: "central",
          style: {
            fontSize: "12px",
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: 600,
          },
        },
        data.amount,
      ),
    );
  };

  return {
    data,
    summaryCards,
    transactions,
    budgetGoals,
    breakdownData,
    startMonth,
    endMonth,
    onDownload,
    onShare,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    onAddNewGoal,
    onManageBudgets,
    onEditGoal,
    onDeleteGoal,
    selectedMonth,
    handleMonthChange,
    totalPages,
    isLoading,
    loading,
    availableMonths,
    expenseDistribution: breakdownData?.mainCategories || [],
    renderCustomizedLabel,
  };
};
