import { useState, useEffect } from "react";
import axios from "axios";
import {
  UseReportHookResult,
  ReportData,
  SummaryApiResponse,
  TransactionApiResponse,
} from "../../../../types";
import { toast } from "react-toastify";

const REPORT_API_URL = "http://localhost:3000/api/transactions/summary";
const TRANSACTIONS_API_URL = "http://localhost:3000/api/transactions";

export const useReportHook = (): UseReportHookResult => {
  const [reportData, setReportData] = useState<ReportData>({
    monthlyBreakdown: {
      totalIncome: "$0",
      totalExpense: "$0",
      data: [],
    },
    trend: {
      labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      incomeData: [0, 0, 0, 0, 0, 0],
      expenseData: [0, 0, 0, 0, 0, 0],
      savingsData: [0, 0, 0, 0, 0, 0],
    },
    recentTransactions: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const [summaryRes, transactionsRes] = await Promise.all([
          axios.get<SummaryApiResponse>(REPORT_API_URL, {
            withCredentials: true,
          }),
          axios.get<TransactionApiResponse>(TRANSACTIONS_API_URL, {
            withCredentials: true,
          }),
        ]);

        const {
          totalIncome,
          totalExpense,
          startDate,
          endDate,
          categoryBreakdown,
        } = summaryRes.data;

        const mappedTransactions = transactionsRes.data.transactions
          .slice(0, 5)
          .map((t) => ({
            id: t.id,
            date: new Date(t.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            description: t.method,
            category: t.category,
            amountStatus: "Completed",
            status: (t.type === "income" ? "Received" : "Completed") as
              | "Received"
              | "Completed",
          }));

        setReportData((prev) => ({
          ...prev,
          monthlyBreakdown: {
            totalIncome: totalIncome,
            // totalIncome >= 1000000
            //   ? `$${(totalIncome / 1000000).toFixed(1)}M`
            //   : `$${(totalIncome / 1000).toFixed(0)}K`,
            totalExpense: totalExpense,
            // totalExpense >= 1000000
            //   ? `$${(totalExpense / 1000000).toFixed(1)}M`
            //   : `$${(totalExpense / 1000).toFixed(0)}K`,
            data: categoryBreakdown.map((item) => ({
              category: item.category,
              value: item.value,
              color: item.color,
            })),
          },
          trend: summaryRes.data.trend,
          recentTransactions: mappedTransactions,
          startDate,
          endDate,
        }));
        setError(null);
      } catch (err) {
        toast.error("Failed to fetch report data");
        console.error("Error fetching report data:", err);
        setError("Failed to fetch report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return {
    reportData,
    loading,
    error,
  };
};
