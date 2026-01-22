import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from "react-icons/hi";
import { PiWalletBold } from "react-icons/pi";
import { CardProps } from "../../types";

const Card: React.FC<CardProps> = ({
  title,
  amount,
  percentage,
  difference,
  isPositive,
  type,
  variant = "default",
  className = "",
  children,
}) => {
  const isBudget = variant === "budget";

  return (
    <div
      className={`${
        isBudget
          ? "bg-budgeBg border-budgeBorder"
          : "bg-transactionBg border-transactionBorder"
      } border-[0.95px] rounded-[11px] p-[20px] flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {(type === "income" || type === "expense") && (
            <PiWalletBold className="text-transactionTextBrand text-[18px]" />
          )}
          <h3
            className={`font-satoshi font-bold ${
              isBudget
                ? "text-budge-label text-budgeText"
                : "text-[15px] text-transactionTextBrand"
            }`}
          >
            {title}
          </h3>
        </div>
        <FiMoreVertical
          className={`${
            isBudget ? "text-budgeText" : "text-transactionTextBrand"
          } cursor-pointer`}
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h1
          className={`font-satoshi ${
            isBudget
              ? "font-bold text-budge-value text-budgeText"
              : "font-medium text-[22px] text-transactionTextBrand"
          } leading-none`}
        >
          {amount}
        </h1>

        <div
          className={`flex items-center gap-0.5 px-2 py-1 rounded-full ${
            isPositive
              ? "bg-transactionTagPositiveBg text-transactionPositive"
              : "bg-transactionTagNegativeBg text-transactionNegative"
          }`}
        >
          {isPositive ? (
            <HiOutlineArrowSmUp size={12} />
          ) : (
            <HiOutlineArrowSmDown size={12} />
          )}
          <span className="font-satoshi font-bold text-[11px]">
            {percentage}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <span
          className={`font-satoshi font-bold text-[11px] ${
            isPositive ? "text-transactionPositive" : "text-transactionNegative"
          }`}
        >
          {difference}
        </span>
        <span className="font-satoshi font-normal text-[11px] text-transactionTextMuted">
          from last month
        </span>
      </div>
      {children}
    </div>
  );
};

export default Card;
