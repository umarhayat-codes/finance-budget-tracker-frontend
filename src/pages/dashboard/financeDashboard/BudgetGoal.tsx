import React from "react";
import {
  FiPlus,
  FiMoreVertical,
  FiCalendar,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";
import { HiFolder } from "react-icons/hi";
import { useFinanceHook } from "./useFinanceHook";

const BudgetGoal: React.FC = () => {
  const {
    budgetGoals,
    onAddNewGoal,
    onManageBudgets,
    onEditGoal,
    onDeleteGoal,
  } = useFinanceHook();

  return (
    <div className="bg-white border-[0.95px] border-budgetGoalBorder rounded-[13px] p-6 font-poppins shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[17px] font-bold text-budgetGoalTextMain leading-tight">
            Budget Goals
          </h2>
          <p className="text-[11px] font-medium text-budgetGoalTextSub mt-1">
            Track Current Savings Efforts
          </p>
        </div>
        <FiMoreVertical className="text-budgetGoalTextSub cursor-pointer text-xl" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <button
          onClick={onAddNewGoal}
          className="flex items-center gap-2 px-6 py-3 border-[0.95px] border-budgetGoalBtnBorder text-budgetGoalBtnBorder rounded-full hover:bg-budgetGoalBtnBorder/5 transition-all"
        >
          <FiPlus className="text-lg" />
          <span className="text-[17px] font-bold">Add New</span>
        </button>

        <button
          onClick={onManageBudgets}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-budgetGoalManageStart to-budgetGoalManageEnd text-white rounded-[450px] hover:opacity-90 transition-opacity"
        >
          <HiFolder className="text-xl" />
          <span className="text-[17px] font-bold">Manage Budgets</span>
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-12">
        {budgetGoals.map((goal, index) => (
          <div key={goal.id} className="relative">
            {/* Goal Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-y-2 mb-4">
              <h3 className="text-[25px] font-semibold text-budgetGoalTextMain">
                {goal.name}
              </h3>
              <div className="flex items-center gap-2 mt-3 md:mt-0">
                <button
                  onClick={() => onEditGoal(goal.id)}
                  className="flex items-center gap-1.5 px-5 py-2 border-[0.95px] border-budgetGoalBtnBorder text-budgetGoalBtnBorder rounded-[450px] text-[11px] font-semibold hover:bg-budgetGoalBtnBorder/5 transition-all"
                >
                  <FiEdit3 className="text-base" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-budgetGoalIconBg1Start to-budgetGoalIconBg1End text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  <FiTrash2 className="text-xl" />
                </button>
              </div>
            </div>

            {/* Goal Details */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 px-4 py-2 bg-budgetGoalIconBg2/40 rounded-full">
                <div className="w-2.5 h-2.5 bg-[#7B9069] rounded-full" />
                <span className="text-[13px] font-semibold text-budgetGoalTextMain">
                  {goal.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-budgetGoalIconBg2 rounded-full">
                  <FiCalendar className="text-recentGreen" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-light text-budgetGoalTextSub">
                    Due Date
                  </span>
                  <span className="text-[11px] font-bold text-budgetGoalTextMain leading-none">
                    {goal.dueDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-2 flex justify-between items-end">
              <span className="text-[9px] font-medium italic text-budgetGoalTextMain">
                {goal.completedPercentage}% Completed
              </span>
              <div className="text-[11px] font-normal text-budgetGoalTextMain">
                <span className="font-bold">IDR {goal.currentAmount}</span>{" "}
                <span className="text-budgetGoalTextSub">/</span>{" "}
                <span className="font-bold text-budgetGoalTextSub">
                  IDR {goal.targetAmount}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-budgetGoalBorder rounded-full overflow-hidden">
              <div
                className="h-full bg-budgetGoalTextMain rounded-full"
                style={{ width: `${goal.completedPercentage}%` }}
              />
            </div>

            {/* Separator - Only show between items */}
            {index < budgetGoals.length - 1 && (
              <div className="mt-12 border-b-[0.95px] border-budgetGoalBorder opacity-50" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetGoal;
