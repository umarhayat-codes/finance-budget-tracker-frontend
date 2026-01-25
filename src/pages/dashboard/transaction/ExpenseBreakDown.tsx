import React from "react";
import { FiMoreVertical, FiArrowUpRight } from "react-icons/fi";
import { ExpenseItem } from "../../../../types";

import { useFinanceHook } from "../financeDashboard/useFinanceHook";

const ExpenseBreakDown: React.FC = () => {
  const { breakdownData } = useFinanceHook();

  const mainCategories: ExpenseItem[] = breakdownData?.mainCategories || [];
  const otherCategories: ExpenseItem[] = breakdownData?.otherCategories || [];

  // Helper to safely get category data by index or ID
  const getCategory = (id: string, defaultLabel: string) => {
    return (
      mainCategories.find((c) => c.id === id) || {
        percentage: 0,
        category: defaultLabel,
      }
    );
  };

  const savings = getCategory("1", "Savings");
  const groceries = getCategory("2", "Groceries");
  const transport = getCategory("3", "Transport");
  const others = getCategory("4", "Others");

  return (
    <div className="bg-transactionBg border border-transactionBorder rounded-[13px] p-6 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-satoshi font-bold text-[15px] text-transactionTextBrand">
          Expense Breakdown
        </h2>
        <button className="p-2 border border-transactionBorder rounded-lg bg-white/50 text-transactionTextBrand hover:bg-white transition-colors">
          <FiMoreVertical />
        </button>
      </div>

      {/* Recharts Visualization */}
      {/* Custom Packed Bubble Chart */}
      <div className="h-[240px] w-full relative flex items-center justify-center">
        <svg viewBox="0 0 400 240" className="w-full h-full">
          {/* Savings Bubble (62%) - Left Big Black */}
          <g>
            <circle
              cx="120"
              cy="120"
              r="95"
              className="fill-expenseBubbleSavings"
              stroke="white"
              strokeWidth="4"
            />
            <text
              x="120"
              y="115"
              textAnchor="middle"
              className="fill-white font-bold"
              style={{ fontFamily: "Satoshi", fontSize: "22px" }}
            >
              {savings.percentage}%
            </text>
            <text
              x="120"
              y="135"
              textAnchor="middle"
              className="fill-white font-light"
              style={{ fontFamily: "Satoshi", fontSize: "14px" }}
            >
              Savings
            </text>
          </g>

          {/* Groceries Bubble (18%) - Top Right Dark Green */}
          <g>
            <circle
              cx="245"
              cy="90"
              r="65"
              className="fill-expenseBubbleGroceries"
              stroke="white"
              strokeWidth="4"
            />
            <text
              x="245"
              y="85"
              textAnchor="middle"
              className="fill-white font-bold"
              style={{ fontFamily: "Satoshi", fontSize: "18px" }}
            >
              {groceries.percentage}%
            </text>
            <text
              x="245"
              y="105"
              textAnchor="middle"
              className="fill-white font-light"
              style={{ fontFamily: "Poppins", fontSize: "12px" }}
            >
              Groceries
            </text>
          </g>

          {/* Transport Bubble (12%) - Bottom Middle Lighter Green */}
          <g>
            <circle
              cx="210"
              cy="195"
              r="50"
              className="fill-expenseBubbleTransport"
              stroke="white"
              strokeWidth="4"
            />
            <text
              x="210"
              y="190"
              textAnchor="middle"
              className="fill-white font-bold"
              style={{ fontFamily: "Satoshi", fontSize: "16px" }}
            >
              {transport.percentage}%
            </text>
            <text
              x="210"
              y="207"
              textAnchor="middle"
              className="fill-white font-light"
              style={{ fontFamily: "Poppins", fontSize: "10px" }}
            >
              Transport
            </text>
          </g>

          {/* Others Bubble (8%) - Far Right Bright Green */}
          <g>
            <circle
              cx="300"
              cy="150"
              r="35"
              className="fill-expenseBubbleOthers"
              stroke="white"
              strokeWidth="4"
            />
            <text
              x="300"
              y="148"
              textAnchor="middle"
              className="fill-black font-bold"
              style={{ fontFamily: "Satoshi", fontSize: "11px" }}
            >
              {others.percentage}%
            </text>
            <text
              x="300"
              y="160"
              textAnchor="middle"
              className="fill-black font-light"
              style={{ fontFamily: "Poppins", fontSize: "8px" }}
            >
              Others
            </text>
          </g>
        </svg>
      </div>

      {/* Other Categories */}
      <div className="flex flex-col gap-4">
        <h3 className="font-satoshi font-bold text-[15px] text-transactionTextBrand">
          Other Categories
        </h3>
        <div className="flex flex-col gap-3">
          {otherCategories.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0F0F0]" />
                <span className="font-satoshi font-normal text-[12px] text-transactionTextBrand">
                  {item.category}
                </span>
              </div>
              <span className="font-satoshi font-bold text-[11px] text-transactionTextBrand">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* See All Button */}
      <button className="mt-2 w-full flex items-center justify-center gap-2 py-3 bg-[#F8F8F8] border border-transactionBorder rounded-[12px] font-satoshi font-medium text-[14px] text-transactionTextBrand hover:bg-[#F0F0F0] transition-all">
        See All <FiArrowUpRight size={16} />
      </button>
    </div>
  );
};

export default ExpenseBreakDown;
