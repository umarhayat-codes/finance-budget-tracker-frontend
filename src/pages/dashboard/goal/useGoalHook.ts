import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import {
  GoalItem,
  GoalStats,
  GoalHistoryItem,
  CreateGoalFormData,
  UseGoalHookResult,
  GoalStatus,
  ApiErrorResponse,
} from "../../../../types";
import { GoGoal } from "react-icons/go";
import { FaCar, FaHome, FaCoins } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api/goals";

export const useGoalHook = (): UseGoalHookResult => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<GoalStats>({
    totalGoals: 0,
    completed: 0,
    pendingGoals: 0,
    spentSavings: "IDR 0",
  });

  const [history, setHistory] = useState<GoalHistoryItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<GoalStatus | "All">("All");

  const [goalForm, setGoalForm] = useState<CreateGoalFormData>({
    goalName: "",
    targetAmount: "",
    targetDate: "",
    goalType: "Savings",
    fundingSource: "Current Savings",
  });

  const getIconForGoal = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("car")) return FaCar;
    if (lowerName.includes("home") || lowerName.includes("house"))
      return FaHome;
    if (lowerName.includes("sav")) return FaCoins;
    if (lowerName.includes("vacation")) return IoCarSportOutline;
    return GoGoal;
  };

  const calculateStats = useCallback((goalList: GoalItem[]) => {
    const total = goalList.length;
    const completed = goalList.filter(
      (g) => g.goalStatus === "Completed",
    ).length;
    const pending = goalList.filter((g) => g.goalStatus === "Pending").length;

    // For spent savings, we could sum up something if available,
    // but the requirement says "currect goal section" and stats.
    // I'll keep it as a mock or sum targetAmounts if that's what's meant,
    // but let's stick to the base numbers for now.
    const totalSavings = goalList.reduce(
      (acc, curr) => acc + curr.targetAmount,
      0,
    );

    setStats({
      totalGoals: total,
      completed,
      pendingGoals: pending,
      spentSavings: `IDR ${totalSavings.toLocaleString()}`,
    });
  }, []);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, { withCredentials: true });
      const fetchedGoals = response.data.map((goal: GoalItem) => ({
        ...goal,
        icon: getIconForGoal(goal.goalName),
      }));
      setGoals(fetchedGoals);
      calculateStats(fetchedGoals);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      toast.error("Failed to fetch goals");
      setError(axiosError.response?.data?.message || "Failed to fetch goals");
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleGoalChange = (field: keyof CreateGoalFormData, value: string) => {
    setGoalForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateGoal = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(BASE_URL, goalForm, { withCredentials: true });
      toast.success("Goal created successfully");
      navigate("/dashboard/goal");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      toast.error("Failed to create goal");
      setError(axiosError.response?.data?.message || "Failed to create goal");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelGoal = () => {
    navigate("/dashboard/goal");
  };

  const handleFilterChange = (status: GoalStatus | "All") => {
    setFilterStatus(status);
  };

  const updateGoalStatus = async (id: string, newStatus: GoalStatus) => {
    try {
      await axios.patch(
        `${BASE_URL}/${id}/status`,
        { goalStatus: newStatus },
        { withCredentials: true },
      );
      // Update local state to reflect change immediately
      setGoals((prev) => {
        const updated = prev.map((g) =>
          g.id === id ? { ...g, goalStatus: newStatus } : g,
        );
        calculateStats(updated);
        return updated;
      });
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      setError(axiosError.response?.data?.message || "Failed to update status");
    }
  };

  const filteredGoals =
    filterStatus === "All"
      ? goals
      : goals.filter((goal) => goal.goalStatus === filterStatus);

  return {
    goals: filteredGoals,
    stats,
    history,
    goalForm,
    loading,
    error,
    filterStatus,
    handleGoalChange,
    handleCreateGoal,
    handleCancelGoal,
    handleFilterChange,
    updateGoalStatus,
  };
};
