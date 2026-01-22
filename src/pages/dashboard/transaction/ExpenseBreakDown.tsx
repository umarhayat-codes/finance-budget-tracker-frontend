import React from "react";
import { FiMoreVertical, FiArrowUpRight } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ExpenseItem } from "../../../../types";

const ExpenseBreakDown: React.FC = () => {
  const mainCategories: ExpenseItem[] = [
    { id: "1", category: "Savings", percentage: 62, color: "#000000" },
    { id: "2", category: "Groceries", percentage: 18, color: "#1A2E05" },
    { id: "3", category: "Transport", percentage: 12, color: "#44920E" },
    { id: "4", category: "Others", percentage: 8, color: "#99FF33" },
  ];

  const otherCategories: ExpenseItem[] = [
    { id: "5", category: "Utilities", percentage: 1.2, color: "#F0F0F0" },
    { id: "6", category: "Dining", percentage: 1.05, color: "#F0F0F0" },
    { id: "7", category: "Entertainment", percentage: 0.92, color: "#F0F0F0" },
    { id: "8", category: "Miscellaneous", percentage: 0.84, color: "#F0F0F0" },
  ];

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
      <div className="h-[240px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mainCategories}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="percentage"
            >
              {mainCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ fontFamily: "Satoshi", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Custom Bubble-style labels (simplified for Recharts) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className="block font-satoshi font-bold text-[24px] text-transactionTextBrand leading-none">
              62%
            </span>
            <span className="block font-satoshi font-normal text-[12px] text-transactionTextMuted">
              Savings
            </span>
          </div>
        </div>
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
