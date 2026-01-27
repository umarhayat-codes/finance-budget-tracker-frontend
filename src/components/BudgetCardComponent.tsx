import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from "react-icons/hi";
import { BudgetCardProps } from "../../types";

const BudgetCardComponent: React.FC<BudgetCardProps> = ({
  title,
  icon,
  amount,
  percentage,
  isPositive,
  difference,
  headerRight,
  children,
  bodyRightContent,
  showTrend = false,
  className = "",
}) => {
  return (
    <div
      className={`flex-1 bg-budgeBg border-[0.81px] border-budgeBorder rounded-[9px] p-5 flex flex-col justify-between h-[115px] ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon && <span className="text-budgeText text-[16px]">{icon}</span>}
          <h3 className="font-satoshi font-bold text-[12.94px] text-budgeText">
            {title}
          </h3>
        </div>
        {headerRight ? (
          headerRight
        ) : (
          <FiMoreVertical className="text-budgeText cursor-pointer text-lg" />
        )}
      </div>

      {showTrend ? (
        <div className="flex flex-col mt-2">
          <div className="flex items-center gap-2">
            <h1 className="font-satoshi font-medium text-[19px] text-budgeText">
              {Number(amount).toFixed(2)}
            </h1>
            {percentage && (
              <div className="flex items-center gap-0.5 bg-budgeBadgeBg px-1.5 py-0.5 rounded-[4px]">
                {isPositive ? (
                  <HiOutlineArrowSmUp className="text-transactionPositive text-[9px]" />
                ) : (
                  <HiOutlineArrowSmDown className="text-transactionNegative text-[9px]" />
                )}
                <span
                  className={`font-satoshi font-bold text-[7px] ${
                    isPositive
                      ? "text-transactionPositive"
                      : "text-transactionNegative"
                  }`}
                >
                  {percentage}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span
              className={`font-satoshi font-bold text-[9px] ${
                isPositive
                  ? "text-transactionPositive"
                  : "text-transactionNegative"
              }`}
            >
              {difference}
            </span>
            <span className="font-satoshi font-normal text-[9px] text-transactionTextMuted">
              from last month
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-end justify-between mt-1">
          <div>
            <h1 className="font-satoshi font-bold text-[22px] text-budgeText leading-tight">
              ${Number(amount).toFixed(2)}
            </h1>
            {children}
          </div>
          {bodyRightContent}
        </div>
      )}
    </div>
  );
};

export default BudgetCardComponent;
