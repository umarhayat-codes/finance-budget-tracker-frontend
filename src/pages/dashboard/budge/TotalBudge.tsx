import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from "react-icons/hi";
import { PiWalletBold } from "react-icons/pi";
import { useBudgeHook } from "./useBudgeHook";

const TotalBudge: React.FC = () => {
  const { totalBudget, totalIncome, totalExpense } = useBudgeHook();

  const usedPercentage =
    totalBudget > 0 ? ((totalExpense / totalBudget) * 100).toFixed(1) : "0";

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full">
      {/* Card 1: Budget Total */}
      <div className="flex-1 bg-budgeBg border border-budgeBorder rounded-[9px] p-5 flex flex-col justify-between h-[115px]">
        <div className="flex justify-between items-start">
          <h3 className="font-satoshi font-bold text-[12.94px] text-budgeText">
            Budget Total
          </h3>
          <div className="flex items-center">
            {/* Mock Dropdown tabs */}
            <div className="hidden sm:flex bg-transparent rounded-lg p-0.5 mr-2">
              <span className="text-[10px] text-gray-400 px-2 cursor-pointer">
                This Day
              </span>
              <span className="text-[10px] text-budgeText font-bold bg-white shadow-sm rounded px-2 py-0.5 cursor-pointer">
                This Month
              </span>
              <span className="text-[10px] text-gray-400 px-2 cursor-pointer">
                This Year
              </span>
            </div>
            <FiMoreVertical className="text-budgeText cursor-pointer text-lg" />
          </div>
        </div>

        <div className="flex items-end justify-between mt-1">
          <div>
            <h1 className="font-satoshi font-bold text-[22px] text-budgeText leading-tight">
              ${totalBudget.toFixed(2)}
            </h1>
            <div className="mt-1 flex items-center gap-1">
              <span className="font-satoshi font-normal text-[9px] text-[#A5A5A5]">
                used from
              </span>
              <span className="font-satoshi font-bold text-[9px] text-[#A5A5A5]">
                Total
              </span>
            </div>
          </div>

          {/* Progress Bars Mock - dynamic logic could go here */}
          <div className="flex gap-1.5 h-3 md:w-1/3 w-[100px]">
            {/* Visual placeholder */}
            <div className="h-full w-[15%] bg-[#CCFF99] rounded-sm"></div>
            <div className="h-full w-[25%] bg-[#1A2E05] rounded-sm"></div>
            <div className="h-full w-[35%] bg-[#44920E] rounded-sm"></div>
            <div className="h-full w-[45%] bg-[#99FF33] rounded-sm"></div>
            <div className="h-full w-[15%] bg-[#8CFF2E] rounded-sm"></div>
            <div className="h-full w-[15%] bg-[#44920E] rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Card 2: Incomes */}
      <div className="flex-1 bg-budgeBg border-[0.81px] border-budgeBorder rounded-[9px] p-5 flex flex-col justify-between h-[115px] ">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <PiWalletBold className="text-budgeText text-[16px]" />
            <h3 className="font-satoshi font-bold text-[12.94px] text-budgeText">
              Incomes
            </h3>
          </div>
          <FiMoreVertical className="text-budgeText cursor-pointer text-lg" />
        </div>

        <div className="flex flex-col mt-2">
          <div className="flex items-center gap-2">
            <h1 className="font-satoshi font-medium text-[19px] text-budgeText">
              {totalIncome.toFixed(2)}
            </h1>
            <div className="flex items-center gap-0.5 bg-budgeBadgeBg px-1.5 py-0.5 rounded-[4px]">
              <HiOutlineArrowSmUp className="text-[#588D73] text-[9px]" />
              <span className="font-satoshi font-bold text-[7px] text-[#588D73]">
                10.5%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-satoshi font-bold text-[9px] text-[#588D73]">
              +$487.00
            </span>
            <span className="font-satoshi font-normal text-[9px] text-[#A5A5A5]">
              from last month
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Expenses */}
      <div className="flex-1 bg-budgeBg border-[0.81px] border-budgeBorder rounded-[9px] p-5 flex flex-col justify-between h-[115px]">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <PiWalletBold className="text-budgeText text-[16px]" />
            <h3 className="font-satoshi font-bold text-[12.94px] text-budgeText">
              Expenses
            </h3>
          </div>
          <FiMoreVertical className="text-budgeText cursor-pointer text-lg" />
        </div>

        <div className="flex flex-col mt-2">
          <div className="flex items-center gap-2">
            <h1 className="font-satoshi font-medium text-[19px] text-budgeText">
              {totalExpense.toFixed(2)}
            </h1>
            <div className="flex items-center gap-0.5 bg-budgeBadgeBg px-1.5 py-0.5 rounded-[4px]">
              <HiOutlineArrowSmDown className="text-[#C32F27] text-[9px]" />
              <span className="font-satoshi font-bold text-[7px] text-[#C32F27]">
                8.35%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-satoshi font-bold text-[9px] text-[#C32F27]">
              -$194.00
            </span>
            <span className="font-satoshi font-normal text-[9px] text-[#A5A5A5]">
              from last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBudge;
