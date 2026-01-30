import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFinanceHook } from "./useFinanceHook";
import { ExpenseDistributionItem } from "../../../../types";

const RADIAN = Math.PI / 180;

const ExpenseDistribute: React.FC = () => {
  const { expenseDistribution, renderCustomizedLabel } = useFinanceHook();

  return (
    <div className="bg-white border-[0.95px] border-budgetGoalBorder rounded-[13px] font-poppins shadow-sm h-full flex flex-col justify-between overflow-hidden">
      <div className="flex items-start justify-between p-6 pb-0">
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

      <>
        <div className="relative flex justify-center items-center  px-6">
          <div className="w-full h-[280px] xlg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius="100%"
                  paddingAngle={0}
                  dataKey="percentage"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  stroke="none"
                >
                  {expenseDistribution.map(
                    (entry: ExpenseDistributionItem, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ),
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t-[0.95px] border-budgetGoalBorder mx-6 pt-3">
          {expenseDistribution.map((item: ExpenseDistributionItem) => (
            <div key={item.id} className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] font-semibold text-budgetGoalTextMain">
                  {item.category}
                </span>
              </div>
              <div className="pl-5 flex flex-col">
                <span className="text-[11px] font-medium text-gray-800">
                  {item.amount}
                </span>
                <span className="text-[10px] text-gray-500">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </>

      <p className="text-[9px] font-normal text-budgetGoalTextSub leading-relaxed px-6 pb-6 mt-3">
        Shows the breakdown of your expenses across different categories.
      </p>
    </div>
  );
};

export default ExpenseDistribute;
