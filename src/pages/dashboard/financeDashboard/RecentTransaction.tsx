import React from "react";
import {
  FiMoreVertical,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  HiOutlineClipboardList,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import {
  MdOutlineRestaurant,
  MdOutlineAccountBalanceWallet,
  MdOutlineLanguage,
  MdOutlinePower,
  MdOutlineHomeWork,
} from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useFinanceHook } from "./useFinanceHook";

const RecentTransaction: React.FC = () => {
  const {
    transactions,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    selectedMonth,
    handleMonthChange,
    totalPages,
    isLoading,
    availableMonths,
  } = useFinanceHook();

  const [showMonthDropdown, setShowMonthDropdown] = React.useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "food":
        return <MdOutlineRestaurant className="text-recentTextSub text-xl" />;
      case "wallet":
        return (
          <MdOutlineAccountBalanceWallet className="text-recentTextSub text-xl" />
        );
      case "globe":
        return <MdOutlineLanguage className="text-recentTextSub text-xl" />;
      case "power":
        return <MdOutlinePower className="text-recentTextSub text-xl" />;
      case "home":
        return <MdOutlineHomeWork className="text-recentTextSub text-xl" />;
      default:
        return <MdOutlineRestaurant className="text-recentTextSub text-xl" />;
    }
  };

  return (
    <div className="bg-white border-[0.95px] border-recentBorder rounded-[13px] p-6 font-poppins shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[17px] font-bold text-recentTextTitle leading-tight">
            Recent Transactions
          </h2>
          <p className="text-[11px] font-medium text-recentTextSub mt-1">
            Displaying The Latest User Transactions style
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border-[0.95px] border-recentMutationBorder rounded-full hover:bg-gray-50 transition-colors">
            <HiOutlineClipboardList className="text-lg" />
            <span className="text-[11px] font-medium">Mutation</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-recentGreen to-recentDark text-white rounded-[450px] hover:opacity-90 transition-opacity">
            <HiOutlineExclamationCircle className="text-lg" />
            <span className="text-[11px] font-medium">Report</span>
          </button>
          <FiMoreVertical className="text-recentTextSub cursor-pointer ml-1" />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button
          onClick={() => {
            handleMonthChange("all");
          }}
          className="flex items-center justify-between w-[160px] px-5 py-3 bg-gradient-to-r from-recentGreen to-recentDark text-white rounded-[450px] hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col items-start leading-none">
            <span className="text-[9px] font-extralight opacity-80 uppercase">
              Transactions
            </span>
            <span className="text-[11px] font-semibold mt-0.5">
              All Transactions
            </span>
          </div>
          <span className="text-xs">▼</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-recentSortBg/10 border-[0.95px] border-recentSortBorder rounded-[450px] hover:bg-recentSortBg/20 transition-colors"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] font-extralight text-recentTextTitle uppercase">
                Filter by
              </span>
              <span className="text-[11px] font-semibold text-recentSortBorder mt-0.5">
                {availableMonths.find((m) => m.value === selectedMonth)
                  ?.label || "All Months"}
              </span>
            </div>
            <span className="text-xs text-recentSortBorder ml-1">▼</span>
          </button>

          {showMonthDropdown && (
            <div className="absolute top-full left-0 mt-2 w-[200px] bg-white border-[0.95px] border-recentBorder rounded-[13px] shadow-lg z-10 max-h-[300px] overflow-y-auto">
              {availableMonths.map((month) => (
                <button
                  key={month.value}
                  onClick={() => {
                    handleMonthChange(month.value);
                    setShowMonthDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[11px] font-medium hover:bg-gray-50 transition-colors ${
                    selectedMonth === month.value
                      ? "bg-recentGreen/10 text-recentGreen"
                      : "text-recentTextTitle"
                  }`}
                >
                  {month.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-recentSortBg/10 border-[0.95px] border-recentSortBorder rounded-[450px]">
          <div className="flex flex-col items-start leading-none">
            <span className="text-[9px] font-extralight text-recentTextTitle uppercase">
              From
            </span>
            <span className="text-[11px] font-semibold text-recentSortBorder mt-0.5">
              Latest
            </span>
          </div>
          <span className="text-xs text-recentSortBorder ml-1">▼</span>
        </div>

        <div className="relative flex-grow max-w-md ml-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-recentTextSub" />
          <input
            type="text"
            placeholder="Search Transaction ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border-[0.95px] border-recentBorder rounded-[450px] text-[9px] font-light text-recentTextSub focus:outline-none focus:border-recentGreen transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-[0.95px] border-recentBorder">
              <th className="pb-4 pt-1 text-[11px] font-medium text-recentTextSub w-12">
                #
              </th>
              <th className="pb-4 pt-1 text-[11px] font-medium text-recentTextSub">
                Description
              </th>
              <th className="pb-4 pt-1 text-[11px] font-medium text-recentTextSub">
                Amount
              </th>
              <th className="pb-4 pt-1 text-[11px] font-medium text-recentTextSub">
                Payment
              </th>
              <th className="pb-4 pt-1 text-[11px] font-medium text-recentTextSub">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-recentBorder">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-recentGreen border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-recentTextSub">
                      Loading transactions...
                    </span>
                  </div>
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <span className="text-[11px] text-recentTextSub">
                    No transactions found
                  </span>
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 align-middle">
                    <div className="w-10 h-10 rounded-full bg-[#f4f7f2] flex items-center justify-center">
                      {getIcon(transaction.iconType)}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-normal text-recentTextSub leading-none">
                        {transaction.category}
                      </span>
                      <span className="text-[13px] font-semibold text-recentTableTitle mt-1">
                        {transaction.subCategory}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-normal text-recentTextSub leading-none">
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                      <span
                        className={`text-[13px] font-semibold mt-1 ${
                          transaction.type === "expense"
                            ? "text-recentTableNegative"
                            : "text-recentTableTitle"
                        }`}
                      >
                        {transaction.amount}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-normal text-recentTextSub leading-none">
                        {transaction.date}
                      </span>
                      <span className="text-[13px] font-semibold text-recentTableTitle mt-1">
                        {transaction.paymentMethod}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <button
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full ${
                        transaction.status === "Pending"
                          ? "bg-gradient-to-r from-recentPendingBg to-recentPendingEnd border-[0.95px] border-recentBorder"
                          : "bg-gradient-to-r from-recentGreen to-recentDark text-white shadow-sm"
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full flex items-center justify-center bg-white/20">
                        {transaction.status === "Pending" ? (
                          <div className="w-1.5 h-1.5 bg-recentTextTitle rounded-full" />
                        ) : (
                          <span className="text-[8px]">✓</span>
                        )}
                      </div>
                      <span
                        className={`text-[9px] italic font-medium ${
                          transaction.status === "Pending"
                            ? "text-recentTextTitle"
                            : "text-white"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-8 gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <HiChevronDoubleLeft className="text-xl" />
        </button>
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="text-xl" />
        </button>

        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`min-w-[70px] h-8 rounded-full text-[9px] font-semibold transition-all ${
                currentPage === pageNum
                  ? "bg-gradient-to-r from-recentGreen to-recentDark text-white"
                  : "border-[0.95px] border-recentMutationBorder text-recentTextTitle hover:bg-recentMutationBorder hover:text-white"
              }`}
            >
              {currentPage === pageNum
                ? `Page ${String(pageNum).padStart(2, "0")}`
                : String(pageNum).padStart(2, "0")}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronRight className="text-xl" />
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <HiChevronDoubleRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default RecentTransaction;
