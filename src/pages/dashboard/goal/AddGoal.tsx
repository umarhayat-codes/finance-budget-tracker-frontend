import { useGoalHook } from "./useGoalHook";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { GoalStatus } from "../../../../types";

const AddGoal = () => {
  const navigate = useNavigate();
  const {
    goals,
    stats,
    updateGoalStatus,
    filterStatus,
    handleFilterChange,
    loading,
  } = useGoalHook();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const statuses: GoalStatus[] = [
    "On Track",
    "Pending",
    "Delayed",
    "Completed",
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-goalOnTrackBg border-goalOnTrackBorder text-goalOnTrackText";
      case "Pending":
        return "bg-goalPendingBg border-goalPendingBorder text-goalPendingText";
      case "Delayed":
        return "bg-goalDelayedBg border-goalDelayedBorder text-goalDelayedText";
      case "Completed":
        return "bg-statusCompletedBg border-statusCompletedBorder text-statusCompletedText";
      default:
        return "bg-goalDelayedBg border-goalDelayedBorder text-goalDelayedText";
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full  p-6 font-inter ">
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-bold text-goalTitle">
          Financial Goals
        </h1>

        <div className="flex flex-wrap items-center gap-8">
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => handleFilterChange("All")}
          >
            <span
              className={`text-[14px] font-bold ${
                filterStatus === "All" ? "text-primary" : "text-goalText"
              }`}
            >
              Total Goals: {stats.totalGoals}
            </span>
            {filterStatus === "All" && (
              <div className="h-1 w-full bg-primary mt-1 rounded-full"></div>
            )}
          </div>

          <div
            className="flex flex-col cursor-pointer"
            onClick={() => handleFilterChange("Completed")}
          >
            <span
              className={`text-[14px] font-bold ${
                filterStatus === "Completed" ? "text-primary" : "text-goalText"
              }`}
            >
              Completed: {stats.completed}
            </span>
            {filterStatus === "Completed" && (
              <div className="h-1 w-full bg-primary mt-1 rounded-full"></div>
            )}
          </div>

          <div
            className="flex flex-col cursor-pointer"
            onClick={() => handleFilterChange("Pending")}
          >
            <span
              className={`text-[14px] font-bold ${
                filterStatus === "Pending" ? "text-primary" : "text-goalText"
              }`}
            >
              Pending Goals {stats.pendingGoals}
            </span>
            {filterStatus === "Pending" && (
              <div className="h-1 w-full bg-primary mt-1 rounded-full"></div>
            )}
          </div>

          <div className="flex flex-col ml-4">
            <span className="text-[14px] font-bold text-goalText">
              Spent Savings:
            </span>
            <span className="text-[18px] font-extrabold text-clarioBlack">
              {stats.spentSavings}
            </span>
          </div>

          <button
            onClick={() => navigate("/dashboard/goals/create")}
            className="ml-auto bg-buttonBg text-textWhite text-[14px] font-bold rounded-[10px] px-6 py-3 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            Create New Goal
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-[16px] font-bold text-clarioBlack">
          {filterStatus === "Completed"
            ? "Complete Goal"
            : filterStatus === "Pending"
              ? "Pending Goal"
              : "Current Goals"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : goals.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <h3 className="text-[18px] font-bold text-goalSubtitle">
              No Found Goal
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5  place-items-center">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-goalCardBg border h-[244px] w-[200px] border-goalCardBorder rounded-[5px] p-6 flex flex-col items-start text-left gap-4 shadow-sm relative"
              >
                <div className="absolute top-4 right-4 cursor-pointer">
                  <HiDotsVertical
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === goal.id ? null : goal.id,
                      )
                    }
                    className="text-reminderTextGray hover:text-reminderTextRow2"
                  />
                  {activeDropdown === goal.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-clarioWhite border border-goalHistoryHeaderBg rounded shadow-lg z-10">
                      <ul className="py-1">
                        {statuses.map((status) => (
                          <li
                            key={status}
                            onClick={() => {
                              updateGoalStatus(goal.id, status);
                              setActiveDropdown(null);
                            }}
                            className="px-4 py-2 hover:bg-bgColor text-left text-[12px] font-medium text-reminderPrefTitle"
                          >
                            {status}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="w-full flex justify-center text-4xl mb-2 text-goalText">
                  {goal.icon && <goal.icon />}
                </div>

                <h3 className="text-[14px] font-bold text-goalText">
                  {goal.goalName}
                </h3>

                <span className="text-[12px] font-bold text-goalSubtitle">
                  Target: IDR {goal.targetAmount.toLocaleString()}
                </span>

                <div
                  className={`text-[12px] font-bold border-[0.9px] px-4 py-1 rounded  ${getStatusStyles(
                    goal.goalStatus,
                  )}`}
                >
                  {goal.goalStatus}
                </div>

                <span className="text-[14px] font-bold text-goalDate">
                  {goal.targetDate}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGoal;
