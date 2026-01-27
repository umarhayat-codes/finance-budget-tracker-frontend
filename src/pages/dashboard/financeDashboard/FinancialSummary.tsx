import React from "react";
import { useFinanceHook } from "./useFinanceHook";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiShoppingCart, FiTarget } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";

const FinancialSummary: React.FC = () => {
  const { summaryCards, loading } = useFinanceHook();

  if (loading) {
    return (
      <div className="bg-white rounded-[13px] border-[0.95px] border-monthlyCardBorder p-6 h-auto xlg:h-1/2 flex items-center justify-center font-poppins">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-recentSortBg border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[11px] font-medium text-summarySubtitle font-poppins">
            Loading summary...
          </p>
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "income":
        return <MdOutlineAttachMoney size={16} />;
      case "spending":
        return <FiShoppingCart size={16} />;
      case "budget":
        return <FiTarget size={16} />;
      case "saving":
        return <IoWalletOutline size={16} />;
      default:
        return <MdOutlineAttachMoney size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-[13px] border-[0.95px] border-monthlyCardBorder p-6 h-auto xlg:h-1/2 flex flex-col font-poppins">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[17px] font-bold text-summaryTitle font-poppins">
            Financial Summary
          </h2>
          <p className="text-[11px] font-medium text-summarySubtitle mt-1 font-poppins">
            Quick Count by Categories
          </p>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <BsThreeDotsVertical size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            className={`rounded-[13px] border-[0.95px] ${card.borderColor} ${card.bgColor} p-3 mb-2 flex flex-col justify-between h-auto lg:min-h-[120px]`}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span
                  className={`text-[7px] font-medium font-poppins ${card.textColor}`}
                >
                  Total
                </span>
                <span
                  className={`text-[9px] font-semibold font-poppins ${card.textColor}`}
                >
                  {card.title.replace("Total ", "")}
                </span>
              </div>
              <div
                className={`p-1 rounded-full ${
                  card.type === "income" ? "bg-gray-100" : "bg-white/20"
                }`}
              >
                <div
                  className={
                    card.type === "income" ? "text-gray-600" : "text-white"
                  }
                >
                  <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                    $
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mt-2">
              <span className={`text-[12px] ${card.amountColor} opacity-70`}>
                IDR
              </span>
              <span
                className={`text-[25px] font-semibold font-poppins ${card.amountColor}`}
              >
                {card.amount}
              </span>
            </div>

            <div
              className={`text-[7px] italic font-poppins ${card.descColor} opacity-90 mt-auto border-l pl-2 border-current`}
            >
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialSummary;
