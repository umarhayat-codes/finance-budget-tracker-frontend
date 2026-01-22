import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useBudgeHook } from "./useBudgeHook";

const BudgetSpendBreakDown = () => {
  const { breakdownData: data } = useBudgeHook();

  return (
    <div className="bg-[#F8F8F8] border border-[#EBEBEB] rounded-[11px] p-6 w-full shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-satoshi font-bold text-[14px] text-[#060F0D]">
          Budget Spending Breakdown
        </h2>
        <div className="flex items-center gap-2 bg-white border border-[#F0F0F0] rounded-[6px] px-2 py-1 cursor-pointer">
          <span className="text-[12px]">📅</span>
          <span className="text-[9px] font-satoshi font-regular text-[#060F0D]">
            2024
          </span>
        </div>
        <button className="p-1 border border-[#F0F0F0] rounded-[6px] bg-white">
          <HiOutlineDotsVertical className="text-[#060F0D] w-3 h-3" />
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-[#EBEBEB] rounded-[8px] overflow-hidden">
          <thead>
            <tr className="bg-[#F0F0F0] text-left">
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-[#A5A5A5]">
                Category
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-[#A5A5A5]">
                Budgeted
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-[#A5A5A5]">
                Spent
              </th>
              <th className="py-3 px-4 w-1/3 font-satoshi font-medium text-[11px] text-[#A5A5A5]">
                Progress Bar
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-[#A5A5A5]">
                Used
              </th>
              <th className="py-3 px-4 font-satoshi font-medium text-[11px] text-[#A5A5A5] text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`bg-[#F8F8F8] ${
                  index !== data.length - 1 ? "border-b border-[#EBEBEB]" : ""
                }`}
              >
                {/* Category with Icon Placeholder */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-[8px] bg-[#F4F4F4]"></div>
                    <span className="font-satoshi font-medium text-[12px] text-[#060F0D]">
                      {item.category}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4 font-satoshi font-medium text-[11px] text-[#727272]">
                  $
                  {item.budgeted.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="py-4 px-4 font-satoshi font-medium text-[11px] text-[#727272]">
                  $
                  {item.spent.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>

                {/* Progress Bar */}
                <td className="py-4 px-4">
                  <div className="w-full h-[6px] bg-transparent border border-[#EBEBEB] rounded-[7px] relative overflow-hidden">
                    {/* The track border mentioned in requirements "border:#809B9E" seems to refer to the filled part or the container. 
                         The requirement says "below underline of progresss: border:#809B9E". 
                         I will interpret this as the filled part having a specific style or a border around the track.
                         Given "linear-gradient-color:#588D73,#3B6064", I apply that to the fill.
                      */}
                    <div
                      className="h-full rounded-[7px]"
                      style={{
                        width: `${item.percentage}%`,
                        background: `linear-gradient(90deg, #588D73 0%, #3B6064 100%)`,
                        border: "1px solid #809B9E", // applied based on "border:#809B9E" requirement
                      }}
                    ></div>
                  </div>
                </td>

                <td className="py-4 px-4 font-satoshi font-bold text-[11px] text-[#3B6064]">
                  {item.percentage}%
                </td>

                {/* Action */}
                <td className="py-4 px-4 text-right">
                  <button className="p-1 border border-[#EBEBEB] rounded-[6px] bg-white hover:bg-gray-50">
                    <HiOutlineDotsVertical className="text-[#060F0D] w-3 h-3" />
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
