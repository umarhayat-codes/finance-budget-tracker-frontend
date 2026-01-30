import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from "recharts";
import { useBudgeHook } from "./useBudgeHook";
import {
  GraphDataPoint,
  BudgetTooltipProps,
  BarChartItem,
} from "../../../../types";
import { HiOutlineDotsVertical } from "react-icons/hi";

const CustomTooltip = ({ active, payload }: BudgetTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as GraphDataPoint;
    return (
      <div className="bg-exportBg border border-exportBorder rounded-[6px] p-2 shadow-sm min-w-[100px]">
        <p className="font-satoshi font-medium text-[9px] text-transactionTitle mb-2">
          {data.month} {data.year}
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-graphBudget"></div>
              <span className="font-satoshi font-medium text-[8px] text-transactionSub">
                Budget
              </span>
            </div>
            <span className="font-satoshi font-bold text-[9px] text-transactionTitle">
              ${data.budget.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5CCC00]"></div>
              <span className="font-satoshi font-medium text-[8px] text-transactionSub">
                Spent
              </span>
            </div>
            <span className="font-satoshi font-bold text-[9px] text-transactionTitle">
              ${data.spent.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const GraphBudget = () => {
  const { graphData } = useBudgeHook();
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const [activeMonth, setActiveMonth] = useState<string>(currentMonth);

  return (
    <div className="bg-exportBg border border-exportBorder rounded-[9px] w-full p-4 h-full flex flex-col">
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="font-satoshi font-bold text-[12.94px] text-transactionTitle">
          Budget Spending Flow
        </h2>

        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-[#F0F0F0] rounded-[6px] p-0.5">
            <button className="px-3 py-1 text-[9px] text-[#A5A5A5] font-satoshi font-regular">
              Daily
            </button>
            <button className="px-3 py-1 text-[9px] text-transactionTitle font-satoshi font-bold bg-exportBg rounded-[4px] shadow-sm">
              Monthly
            </button>
            <button className="px-3 py-1 text-[9px] text-[#A5A5A5] font-satoshi font-regular">
              Yearly
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#F0F0F0] rounded-[6px] px-2 py-1 cursor-pointer">
            <span className="text-[12px]">📅</span>
            <span className="text-[9px] font-satoshi font-regular text-transactionTitle">
              {new Date().getFullYear()}
            </span>
          </div>

          <button className="p-1 border border-[#F0F0F0] rounded-[6px] bg-white">
            <HiOutlineDotsVertical className="text-transactionTitle w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="w-full h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={graphData}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: 5,
            }}
            barGap={2}
          >
            <CartesianGrid
              vertical={false}
              stroke="#F0F0F0"
              strokeWidth={0.81}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#A5A5A5",
                fontSize: 9,
                fontFamily: "Satoshi",
                fontWeight: 400,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#A5A5A5",
                fontSize: 9,
                fontFamily: "Satoshi",
                fontWeight: 400,
              }}
              tickFormatter={(value) =>
                `$${value >= 1000 ? (value / 1000).toFixed(1) + "K" : value}`
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="budget"
              radius={[4, 4, 4, 4]}
              barSize={25}
              isAnimationActive={false}
              onMouseEnter={(data: unknown) =>
                setActiveMonth(
                  (data as BarChartItem).month ||
                    (data as BarChartItem).payload?.month ||
                    "",
                )
              }
              onMouseLeave={() => setActiveMonth(currentMonth)}
            >
              {graphData.map((entry, index) => (
                <Cell
                  key={`cell-budget-${index}`}
                  fill={entry.month === activeMonth ? "#2E6600" : "#2E660033"}
                  stroke={entry.month === activeMonth ? "none" : "#C2D0D2"}
                  strokeWidth={entry.month === activeMonth ? 0 : 0.81}
                />
              ))}
            </Bar>

            <Bar
              dataKey="spent"
              radius={[4, 4, 4, 4]}
              barSize={25}
              isAnimationActive={false}
              onMouseEnter={(data: unknown) =>
                setActiveMonth(
                  (data as BarChartItem).month ||
                    (data as BarChartItem).payload?.month ||
                    "",
                )
              }
              onMouseLeave={() => setActiveMonth(currentMonth)}
            >
              {graphData.map((entry, index) => (
                <Cell
                  key={`cell-spent-${index}`}
                  fill={entry.month === activeMonth ? "#5CCC00" : "#5CCC0033"}
                  stroke={entry.month === activeMonth ? "none" : "#C2D0D6"}
                  strokeWidth={entry.month === activeMonth ? 0 : 0.81}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphBudget;
