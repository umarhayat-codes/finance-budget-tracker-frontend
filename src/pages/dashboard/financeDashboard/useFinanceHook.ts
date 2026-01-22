import { useState, useEffect } from "react";
import axios from "axios";
import {
  MonthlyFinancialData,
  MonthlyFinancialApiResponse,
  UseFinanceHookResult,
  SummaryCardData,
  BudgetGoalData,
  ExpenseDistributionItem,
  TransactionNew,
} from "../../../../types";

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

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await api.get<MonthlyFinancialApiResponse>(
          "/transactions/summary",
        );
        const summary = response.data;

        console.log("API Response:", summary); // Debug log

        if (
          summary.trend &&
          summary.trend.labels &&
          summary.trend.labels.length > 0
        ) {
          const trendData = summary.trend;
          const formattedData: MonthlyFinancialData[] = trendData.labels.map(
            (label: string, index: number) => ({
              month: label,
              income: trendData.incomeData[index] || 0,
              expense: trendData.expenseData[index] || 0,
              savings: trendData.savingsData[index] || 0,
            }),
          );
          setData(formattedData);
          console.log("Formatted Data:", formattedData); // Debug log
        } else {
          setData([]);
        }

        if (summary.startDate) setStartMonth(summary.startDate);
        if (summary.endDate) setEndMonth(summary.endDate);
      } catch (error) {
        console.error("Error fetching finance data:", error);
        // Set fallback values on error
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
      amount: "15M",
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
      amount: "9M",
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
      amount: "1.1M",
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
      title: "Total Saving", // Changed from "Total Savings" to match image exactly if needed, but image says "Total Saving" with no 's' on the card, wait image says "Total Savings" in one place and "Total Saving" in title? Card says "Total Saving".
      amount: "5M",
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

  const transactions: TransactionNew[] = [
    {
      id: "1",
      category: "Seafood Dinner",
      subCategory: "Grocery Market",
      amount: "-IDR 150K",
      date: "Dec 20th",
      paymentMethod: "QR Code",
      status: "Success",
      type: "expense",
      iconType: "food",
    },
    {
      id: "2",
      category: "Monthly Salary",
      subCategory: "TrSave Co.",
      amount: "+IDR 20M",
      date: "Dec 19th",
      paymentMethod: "Transfer",
      status: "Received",
      type: "income",
      iconType: "wallet",
    },
    {
      id: "3",
      category: "Utilities",
      subCategory: "Internet Subs",
      amount: "-IDR 310K",
      date: "Dec 18th",
      paymentMethod: "Debit Card",
      status: "Pending",
      type: "expense",
      iconType: "globe",
    },
    {
      id: "4",
      category: "Utilities",
      subCategory: "Electricity",
      amount: "-IDR 100K",
      date: "Dec 17th",
      paymentMethod: "V.Account",
      status: "Success",
      type: "expense",
      iconType: "power",
    },
    {
      id: "5",
      category: "Side Project",
      subCategory: "TS Company",
      amount: "+IDR 1.2M",
      date: "Dec 16th",
      paymentMethod: "E-Wallet",
      status: "Received",
      type: "income",
      iconType: "home",
    },
  ];

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

  const expenses = [
    {
      id: "1",
      category: "Eating Out",
      percentage: 28,
      amount: "1.400.000",
      color: "#F1FFE5",
      textColor: "#000000",
    },
    {
      id: "2",
      category: "Groceries",
      percentage: 30,
      amount: "1.500.000",
      color: "#050505",
      textColor: "#FFFFFF",
    },
    {
      id: "3",
      category: "Utilities",
      percentage: 16,
      amount: "800.000",
      color: "#5CCC00",
      textColor: "#000000",
    },
    {
      id: "4",
      category: "Others",
      percentage: 26,
      amount: "1.300.000",
      color: "#2E6600",
      textColor: "#FFFFFF",
    },
  ];

  const [expenseDistribution] = useState<ExpenseDistributionItem[]>(expenses);

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

  return {
    data,
    summaryCards,
    transactions,
    budgetGoals,
    expenseDistribution,
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
  };
};
