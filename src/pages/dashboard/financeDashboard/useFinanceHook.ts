import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MonthlyFinancialData,
  MonthlyFinancialApiResponse,
  UseFinanceHookResult,
  SummaryCardData,
  BudgetGoalData,
  ExpenseBreakdownApiResponse,
  RecentTransactionItem,
  FinancialSummary,
  RecentTransactionApiResponse,
  MonthOption,
  ExpenseDistributionItem,
  CustomLabelProps,
} from "../../../../types";
import { toast } from "react-toastify";

// Base API URL
const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const useFinanceHook = (): UseFinanceHookResult => {
  const [data, setData] = useState<MonthlyFinancialData[]>([]);
  const [startMonth, setStartMonth] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("");
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpense: 0,
    totalSaving: 0,
    totalBudget: 0,
  });

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
      try {
        const [trendResponse, summaryResponse, distributionResponse] =
          await Promise.all([
            api.get<MonthlyFinancialApiResponse>("/transactions/summary"),
            api.get<FinancialSummary>("/transactions/financial-summary"),
            api.get<ExpenseBreakdownApiResponse>("/finance/distribution"),
          ]);

        const summaryData = trendResponse.data;
        const financialSummaryData = summaryResponse.data;
        const distributionData = distributionResponse.data;

        setFinancialSummary(financialSummaryData);
        setBreakdownData(distributionData);

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
        console.error("Error fetching finance data:", error);
        setData([]);
        const now = new Date();
        const currentMonth = now.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });
        setStartMonth(currentMonth);
        setEndMonth(currentMonth);
      }
    };

    fetchFinanceData();
  }, []);

  const summaryCards: SummaryCardData[] = [
    {
      id: "1",
      title: "Total Income",
      amount: formatAmount(financialSummary.totalIncome),
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
      amount: formatAmount(financialSummary.totalExpense),
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

  // Generate available months for dropdown
  const generateAvailableMonths = (): MonthOption[] => {
    const months: MonthOption[] = [{ label: "All Months", value: "all" }];

    // Generate 12 months (January to December)
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
      const monthNumber = String(index + 1).padStart(2, "0"); // "01", "02", etc.
      months.push({ label: name, value: monthNumber });
    });

    return months;
  };

  const [availableMonths] = useState<MonthOption[]>(generateAvailableMonths());

  // Fetch transactions from API
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
      console.error("Error fetching transactions:", error);
      setTransactions([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch transactions when filters change
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, selectedMonth]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const [budgetGoals] = useState<BudgetGoalData[]>([
    {
      id: "1",
      name: "Emergency",
      dueDate: "December 2025",
      completedPercentage: 70,
      currentAmount: "7M",
      targetAmount: "10M",
      status: "On Track",
    },
    {
      id: "2",
      name: "Travel Fund",
      dueDate: "August 2025",
      completedPercentage: 40,
      currentAmount: "2M",
      targetAmount: "5M",
      status: "Moderate",
    },
  ]);

  const [breakdownData, setBreakdownData] =
    useState<ExpenseBreakdownApiResponse | null>(null);

  const onDownload = () => {
    console.log("Download clicked");
  };

  const onShare = () => {
    console.log("Share clicked");
  };

  const onAddNewGoal = () => {
    console.log("Add New Goal clicked");
  };

  const onManageBudgets = () => {
    console.log("Manage Budgets clicked");
  };

  const onEditGoal = (id: string) => {
    console.log("Edit Goal clicked", id);
  };

  const onDeleteGoal = (id: string) => {
    console.log("Delete Goal clicked", id);
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
    if (!data || !data.textColor) return null;

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
    availableMonths,
    expenseDistribution: breakdownData?.mainCategories || [],
    renderCustomizedLabel,
  };
};
