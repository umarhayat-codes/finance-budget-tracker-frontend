import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useFinanceHook } from "./useFinanceHook";

const ExpenseDistribute: React.FC = () => {
  const { expenseDistribution } = useFinanceHook();

  // Simple SVG Pie Chart logic
  // We have 4 segments: 30% (Black), 28% (Light Green), 26% (Dark Green), 16% (Green)
  // Total = 100%
  // Starting from top (12 o'clock)

  return (
    <div className="bg-white border-[0.95px] border-budgetGoalBorder rounded-[13px] p-6 font-poppins shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[17px] font-bold text-budgetGoalTextMain leading-tight">
            Expense Distribution
          </h2>
          <p className="text-[11px] font-medium text-budgetGoalTextSub mt-1">
            Representation by Category
          </p>
        </div>
        <FiMoreVertical className="text-budgetGoalTextSub cursor-pointer text-xl" />
      </div>

      {/* Pie Chart Area */}
      <div className="relative flex justify-center items-center py-6">
        <div className="relative w-full max-w-[280px] aspect-square">
          {/* Custom Pie Chart using SVG segments */}
          <svg
            viewBox="0 0 360 360"
            className="w-full h-full transform -rotate-90"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* 30% segment - Groceries (Black #050505) */}
            <circle
              cx="180"
              cy="180"
              r="170"
              fill="transparent"
              stroke="#050505"
              strokeWidth="10"
              strokeDasharray={`${30 * 10.68} 1068`}
              strokeDashoffset="0"
            />
            {/* 26% segment - Others (Dark Green #2E6600) */}
            <circle
              cx="180"
              cy="180"
              r="170"
              fill="transparent"
              stroke="#2E6600"
              strokeWidth="10"
              strokeDasharray={`${26 * 10.68} 1068`}
              strokeDashoffset={`-${30 * 10.68}`}
            />
            {/* 16% segment - Utilities (Green #5CCC00) */}
            <circle
              cx="180"
              cy="180"
              r="170"
              fill="transparent"
              stroke="#5CCC00"
              strokeWidth="10"
              strokeDasharray={`${16 * 10.68} 1068`}
              strokeDashoffset={`-${56 * 10.68}`}
            />
            {/* 28% segment - Eating Out (Light Green #F1FFE5) */}
            <circle
              cx="180"
              cy="180"
              r="170"
              fill="transparent"
              stroke="#F1FFE5"
              strokeWidth="10"
              strokeDasharray={`${28 * 10.68} 1068`}
              strokeDashoffset={`-${72 * 10.68}`}
            />

            {/* Filling the center to make it a pie instead of a donut */}
            <circle cx="180" cy="180" r="165" fill="none" />

            {/* Since simple stroke-dasharray doesn't fill the center easily for a pie, let's use clipPath or paths for a truer representation if needed, but for now let's use path for segments */}
            {/* Path for Eating Out (28%) */}
            <path
              d="M 180 180 L 180 10 A 170 170 0 0 1 336.1 112.5 Z"
              fill="#F1FFE5"
            />
            {/* Path for Groceries (30%) */}
            <path
              d="M 180 180 L 336.1 112.5 A 170 170 0 0 1 232.5 341.6 Z"
              fill="#050505"
            />
            {/* Path for Others (26%) */}
            <path
              d="M 180 180 L 232.5 341.6 A 170 170 0 0 1 50.1 290.4 Z"
              fill="#2E6600"
            />
            {/* Path for Utilities (16%) */}
            <path
              d="M 180 180 L 50.1 290.4 A 170 170 0 0 1 180 10 Z"
              fill="#5CCC00"
            />
          </svg>

          {/* Labels Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* 28% label */}
            <div className="absolute top-[25%] left-[25%] flex flex-col items-center">
              <span
                className="text-[12%] font-normal leading-none"
                style={{ color: "#000000" }}
              >
                28%
              </span>
              <span
                className="text-[3%] font-medium opacity-60"
                style={{ color: "#000000" }}
              >
                IDR 1.400.000
              </span>
            </div>
            {/* 30% label */}
            <div className="absolute top-[25%] right-[20%] flex flex-col items-center text-white">
              <span className="text-[12%] font-normal leading-none">30%</span>
              <span className="text-[3%] font-medium opacity-60">
                IDR 1.500.000
              </span>
            </div>
            {/* 16% label */}
            <div className="absolute bottom-[30%] left-[22%] flex flex-col items-center">
              <span
                className="text-[12%] font-normal leading-none"
                style={{ color: "#000000" }}
              >
                16%
              </span>
              <span
                className="text-[3%] font-medium opacity-60"
                style={{ color: "#000000" }}
              >
                IDR 800.000
              </span>
            </div>
            {/* 26% label */}
            <div className="absolute bottom-[28%] right-[22%] flex flex-col items-center text-white">
              <span className="text-[12%] font-normal leading-none">26%</span>
              <span className="text-[3%] font-medium opacity-60">
                IDR 1.300.000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8 mt-4 border-b-[0.95px] border-budgetGoalBorder pb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#3B3B3B]" />
          <span className="text-[13px] font-semibold text-budgetGoalTextMain">
            Groceries
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#7B8C71]" />
          <span className="text-[13px] font-semibold text-budgetGoalTextMain">
            Utilities
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#C7D1C2]" />
          <span className="text-[13px] font-semibold text-budgetGoalTextMain">
            Eating Out
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#E5E9E2]" />
          <span className="text-[13px] font-semibold text-budgetGoalTextMain">
            Others
          </span>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-[9px] font-normal text-budgetGoalTextSub leading-relaxed">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque.
      </p>
    </div>
  );
};

export default ExpenseDistribute;
