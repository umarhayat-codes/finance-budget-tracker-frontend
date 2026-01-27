import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useBudgeHook } from "./useBudgeHook";

const BudgetSpendBreakDown = () => {
  const { breakdownData: data } = useBudgeHook();

  return (
    <div className="bg-exportBg border border-exportBorder rounded-[11px] p-6 w-full shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-satoshi font-bold text-[14px] text-transactionTitle">
          Budget Spending Breakdown
        </h2>
        <div className="flex items-center gap-2 bg-white border border-transactionTableHeaderBg rounded-[6px] px-2 py-1 cursor-pointer">
          <span className="text-[12px]">📅</span>
          <span className="text-[9px] font-satoshi font-regular text-transactionTitle">
            2024
          </span>
        </div>
        <button className="p-1 border border-transactionTableHeaderBg rounded-[6px] bg-white">
          <HiOutlineDotsVertical className="text-transactionTitle w-3 h-3" />
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-exportBorder rounded-[8px] overflow-hidden">
          <thead>
            <tr className="bg-transactionTableHeaderBg text-left">
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-breakdownTextLight">
                Category
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-breakdownTextLight">
                Budgeted
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-breakdownTextLight">
                Spent
              </th>
              <th className="py-3 px-4 w-1/3 font-satoshi font-medium text-[11px] text-breakdownTextLight">
                Progress Bar
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-breakdownTextLight">
                Used
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-breakdownTextLight text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`bg-exportBg ${
                  index !== data.length - 1
                    ? "border-b border-exportBorder"
                    : ""
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-[8px] bg-profileSubTierBorder"></div>
                    <span className="font-satoshi font-medium text-[12px] text-transactionTitle">
                      {item.category}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4 font-satoshi font-medium text-[11px] text-transactionSub">
                  $
                  {item.budgeted.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="py-4 px-4 font-satoshi font-medium text-[11px] text-transactionSub">
                  $
                  {item.spent.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>

                <td className="py-4 px-4">
                  <div className="w-full h-[6px] bg-transparent border border-exportBorder rounded-[7px] relative overflow-hidden">
                    <div
                      className="h-full rounded-[7px]"
                      style={{
                        width: `${item.percentage}%`,
                        background: `linear-gradient(90deg, #588D73 0%, #3B6064 100%)`,
                        border: "1px solid #809B9E",
                      }}
                    ></div>
                  </div>
                </td>

                <td className="py-4 px-4 font-satoshi font-bold text-[11px] text-progressBarEnd">
                  {item.percentage}%
                </td>

                <td className="py-4 px-4 text-right">
                  <button className="p-1 border border-exportBorder rounded-[6px] bg-white hover:bg-gray-50">
                    <HiOutlineDotsVertical className="text-transactionTitle w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetSpendBreakDown;
