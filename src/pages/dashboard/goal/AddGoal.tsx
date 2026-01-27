import { useGoalHook } from "./useGoalHook";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { GoalStatus } from "../../../../types";

const AddGoal = () => {
  const navigate = useNavigate();
  const { goals, stats, updateGoalStatus, filterStatus, handleFilterChange } =
    useGoalHook();
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
        return "bg-green-100 border-green-200 text-green-700";
      default:
        return "bg-gray-100 border-gray-200 text-gray-500";
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full bg-bgColor p-6 font-inter min-h-screen">
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
            <span className="text-[18px] font-extrabold text-black">
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
        <h2 className="text-[16px] font-bold text-black">Current Goals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-goalCardBg border border-goalCardBorder rounded-[5px] p-6 flex flex-col items-center text-center gap-4 shadow-sm relative"
            >
              <div className="absolute top-4 right-4 cursor-pointer">
                <HiDotsVertical
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === goal.id ? null : goal.id,
                    )
                  }
                  className="text-gray-400 hover:text-gray-600"
                />
                {activeDropdown === goal.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <ul className="py-1">
                      {statuses.map((status) => (
                        <li
                          key={status}
                          onClick={() => {
                            updateGoalStatus(goal.id, status);
                            setActiveDropdown(null);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 text-left text-[12px] font-medium text-gray-700"
                        >
                          {status}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="text-4xl mb-2 text-primary">
                {goal.icon && <goal.icon />}
              </div>

              <h3 className="text-[14px] font-bold text-goalText">
                {goal.goalName}
              </h3>

              <span className="text-[12px] font-bold text-goalSubtitle">
                Target: IDR {goal.targetAmount.toLocaleString()}
              </span>

              <div
                className={`text-[12px] font-bold border-[0.9px] px-3 py-1 rounded w-full ${getStatusStyles(
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
      </div>
    </div>
  );
};

export default AddGoal;
