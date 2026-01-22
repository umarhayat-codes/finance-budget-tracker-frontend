import React from "react";
import { useFinanceHook } from "./useFinanceHook";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const MonthlyFinancial: React.FC = () => {
  const { data, onDownload, onShare, startMonth, endMonth } = useFinanceHook();

  // Show loading state if no dates yet
  if (!startMonth || !endMonth) {
    return (
      <div className="bg-white rounded-[13px] border-[0.95px] border-monthlyCardBorder p-6 h-full flex items-center justify-center font-poppins">
        <p className="text-[#8A8A8A] text-sm">Loading financial data...</p>
      </div>
    );
  }

  // Show empty state if no data
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-[13px] border-[0.95px] border-monthlyCardBorder p-6 h-full flex flex-col font-poppins">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[17px] font-bold text-[#1F1F1F] font-poppins">
              Monthly Financial Trend
            </h2>
            <p className="text-[11px] font-medium text-[#8A8A8A] mt-1 font-poppins">
              Compare Your Income and Expenses
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#8A8A8A] text-sm">
            No financial data available. Create your first transaction to see
            the trend.
          </p>
        </div>
      </div>
    );
  }

  // Helper to determine max value for Y-axis scaling (assuming 20M is max as per image)
  const maxDataValue =
    data.length > 0
      ? Math.max(...data.map((d) => Math.max(d.income, d.expense, d.savings)))
      : 20;

  // Round up to nearest nice number
  const maxValue = maxDataValue > 0 ? Math.ceil(maxDataValue * 1.2) : 20;
  const tickStep = maxValue / 5;
  const yAxisTicks = [
    maxValue,
    maxValue - tickStep,
    maxValue - tickStep * 2,
    maxValue - tickStep * 3,
    maxValue - tickStep * 4,
  ].map((val) => Math.round(val * 10) / 10);

  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toString();
  };

  return (
    <div className="bg-white rounded-[13px] border-[0.95px] border-monthlyCardBorder p-6 h-full flex flex-col font-poppins">
      {/* Header and Controls code is unchanged... reusing existing lines if not selecting them */}
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[17px] font-bold text-[#1F1F1F] font-poppins">
            Monthly Financial Trend
          </h2>
          <p className="text-[11px] font-medium text-[#8A8A8A] mt-1 font-poppins">
            Compare Your Income and Expenses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-[450px] border-[0.95px] border-[#7B9069] bg-white text-[#7B9069] hover:bg-gray-50 transition-colors"
          >
            <FiDownload size={14} />
            <span className="text-[11px] font-semibold font-poppins">
              Download File
            </span>
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 rounded-[450px] border-[0.95px] border-[#353A30] bg-[#7B9069] text-white hover:opacity-90 transition-opacity"
          >
            <FiShare2 size={14} />
            <span className="text-[11px] font-semibold font-poppins">
              Share File
            </span>
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <BsThreeDotsVertical size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Controls & Legend */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1F1F1F] font-poppins">
          <span>Start from</span>
          <div className="flex items-center gap-1 bg-[#7B9069] border-[0.95px] border-[#353A30] rounded-[450px] px-3 py-1 text-white">
            <span>{startMonth}</span>
            <span className="text-[8px]">▼</span>
          </div>
          <span>to</span>
          <div className="flex items-center gap-1 bg-[#7B9069] border-[0.95px] border-[#353A30] rounded-[450px] px-3 py-1 text-white">
            <span>{endMonth}</span>
            <span className="text-[8px]">▼</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5CCC00]"></div>
            <span className="text-[9px] font-medium text-[#1F1F1F] font-poppins">
              Income
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2E6600]"></div>
            <span className="text-[9px] font-medium text-[#1F1F1F] font-poppins">
              Expense
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#050505]"></div>
            <span className="text-[9px] font-medium text-[#1F1F1F] font-poppins">
              Savings
            </span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[250px] relative key-chart-container">
        <div className="absolute inset-0 flex flex-col justify-between pb-8">
          {yAxisTicks.map((tick) => (
            <div key={tick} className="flex items-center w-full">
              <span className="w-16 text-[9px] font-normal text-[#8A8A8A] font-poppins uppercase">
                {formatValue(tick)}
              </span>
              <div className="flex-1 h-[0.95px] bg-[#E8E8E8] ml-2"></div>
            </div>
          ))}
          {/* Base line */}
          <div className="flex items-center w-full h-[0.95px] bg-[#E8E8E8]">
            <span className="w-16"></span>
            <div className="flex-1"></div>
          </div>
        </div>

        {/* Bars */}
        <div className="absolute inset-0 pl-16 pb-0 flex items-end justify-between pr-4 pt-4">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-end h-full gap-2 group flex-1 relative"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-white p-3 rounded-lg shadow-xl text-[10px] z-20 border border-gray-100 min-w-[100px]">
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <span className="text-[#8A8A8A]">Income</span>
                    <span className="font-bold text-[#5CCC00]">
                      {formatValue(item.income)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <span className="text-[#8A8A8A]">Expense</span>
                    <span className="font-bold text-[#2E6600]">
                      {formatValue(item.expense)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[#8A8A8A]">Savings</span>
                    <span className="font-bold text-[#050505]">
                      {formatValue(item.savings)}
                    </span>
                  </div>
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100"></div>
                </div>

                <div className="flex items-end gap-[4px] h-full pb-8">
                  {/* Income Bar */}
                  <div
                    className="w-[12px] bg-[#5CCC00] rounded-t-[4px] relative group-hover:opacity-90 transition-all"
                    style={{ height: `${(item.income / maxValue) * 100}%` }}
                  ></div>
                  {/* Expense Bar */}
                  <div
                    className="w-[12px] bg-[#2E6600] rounded-t-[4px] relative group-hover:opacity-90 transition-all"
                    style={{ height: `${(item.expense / maxValue) * 100}%` }}
                  ></div>
                  {/* Savings Bar */}
                  <div
                    className="w-[12px] bg-[#050505] rounded-t-[4px] relative group-hover:opacity-90 transition-all"
                    style={{ height: `${(item.savings / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="absolute bottom-0 text-[9px] font-normal text-[#8A8A8A] font-poppins">
                  {item.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlyFinancial;
