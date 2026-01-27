import React from "react";
import { useFinanceHook } from "./useFinanceHook";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const MonthlyFinancial: React.FC = () => {
  const { data, onDownload, onShare, startMonth, endMonth, loading } =
    useFinanceHook();

  if (loading) {
    return (
      <div className="bg-white rounded-[13px] border-[0.95px] border-monthlyCardBorder p-6 h-full flex items-center justify-center font-poppins">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-recentSortBg border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[11px] font-medium text-recentTextSub font-poppins">
            Loading financial trend...
          </p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-textWhite rounded-[13px] border-[0.95px] border-monthlyCardBorder p-6 h-full flex flex-col font-poppins">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[17px] font-bold text-cardBorder font-poppins">
              Monthly Financial Trend
            </h2>
            <p className="text-[11px] font-medium text-recentTextSub mt-1 font-poppins">
              Compare Your Income and Expenses
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-recentTextSub text-sm">
            No financial data available. Create your first transaction to see
            the trend.
          </p>
        </div>
      </div>
    );
  }

  const maxDataValue =
    data.length > 0
      ? Math.max(...data.map((d) => Math.max(d.income, d.expense, d.savings)))
      : 20;
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
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[17px] font-bold text-cardBorder font-poppins">
            Monthly Financial Trend
          </h2>
          <p className="text-[11px] font-medium text-recentTextSub mt-1 font-poppins">
            Compare Your Income and Expenses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-[450px] border-[0.95px] border-recentSortBg bg-white text-recentSortBg hover:bg-gray-50 transition-colors"
          >
            <FiDownload size={14} />
            <span className="text-[11px] font-semibold font-poppins">
              Download File
            </span>
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 rounded-[450px] border-[0.95px] border-recentSortBorder bg-recentSortBg text-white hover:opacity-90 transition-opacity"
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

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-cardBorder font-poppins">
          <span>Start from</span>
          <div className="flex items-center gap-1 bg-recentSortBg border-[0.95px] border-recentSortBorder rounded-[450px] px-3 py-1 text-white">
            <span>{startMonth}</span>
            <span className="text-[8px]">▼</span>
          </div>
          <span>to</span>
          <div className="flex items-center gap-1 bg-recentSortBg border-[0.95px] border-recentSortBorder rounded-[450px] px-3 py-1 text-white">
            <span>{endMonth}</span>
            <span className="text-[8px]">▼</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-graphSpend"></div>
            <span className="text-[9px] font-medium text-cardBorder font-poppins">
              Income
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-graphBudget"></div>
            <span className="text-[9px] font-medium text-cardBorder font-poppins">
              Expense
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-buttonBg"></div>
            <span className="text-[9px] font-medium text-cardBorder font-poppins">
              Savings
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] relative key-chart-container">
        <div className="absolute inset-0 flex flex-col justify-between pb-8">
          {yAxisTicks.map((tick) => (
            <div key={tick} className="flex items-center w-full">
              <span className="w-16 text-[9px] font-normal text-recentTextSub font-poppins uppercase">
                {formatValue(tick)}
              </span>
              <div className="flex-1 h-[0.95px] bg-recentBorder ml-2"></div>
            </div>
          ))}
          <div className="flex items-center w-full h-[0.95px] bg-recentBorder">
            <span className="w-16"></span>
            <div className="flex-1"></div>
          </div>
        </div>

        <div className="absolute inset-0 pl-16 pb-0 flex items-end justify-between pr-4 pt-4">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-end h-full gap-2 group flex-1 relative"
              >
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-white p-3 rounded-lg shadow-xl text-[10px] z-20 border border-gray-100 min-w-[100px]">
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <span className="text-recentTextSub">Income</span>
                    <span className="font-bold text-graphSpend">
                      {formatValue(item.income)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <span className="text-recentTextSub">Expense</span>
                    <span className="font-bold text-graphBudget">
                      {formatValue(item.expense)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-recentTextSub">Savings</span>
                    <span className="font-bold text-buttonBg">
                      {formatValue(item.savings)}
                    </span>
                  </div>
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100"></div>
                </div>

                <div className="flex items-end gap-[4px] h-full pb-8">
                  <div
                    className="w-[12px] bg-graphSpend rounded-t-[4px] relative group-hover:opacity-90 transition-all"
                    style={{ height: `${(item.income / maxValue) * 100}%` }}
                  ></div>
                  <div
                    className="w-[12px] bg-graphBudget rounded-t-[4px] relative group-hover:opacity-90 transition-all"
                    style={{ height: `${(item.expense / maxValue) * 100}%` }}
                  ></div>
                  <div
                    className="w-[12px] bg-buttonBg rounded-t-[4px] relative group-hover:opacity-90 transition-all"
                    style={{ height: `${(item.savings / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="absolute bottom-0 text-[9px] font-normal text-recentTextSub font-poppins">
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
