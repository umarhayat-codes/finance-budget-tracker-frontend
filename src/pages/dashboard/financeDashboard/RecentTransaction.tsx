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
  } = useFinanceHook();

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
        <button className="flex items-center justify-between w-[160px] px-5 py-3 bg-gradient-to-r from-recentGreen to-recentDark text-white rounded-[450px]">
          <div className="flex flex-col items-start leading-none">
            <span className="text-[9px] font-extralight opacity-80 uppercase">
              Transactions
            </span>
            <span className="text-[11px] font-semibold mt-0.5">
              All Categories
            </span>
          </div>
          <span className="text-xs">▼</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-recentSortBg/10 border-[0.95px] border-recentSortBorder rounded-[450px]">
          <div className="flex flex-col items-start leading-none">
            <span className="text-[9px] font-extralight text-recentTextTitle uppercase">
              Sort by
            </span>
            <span className="text-[11px] font-semibold text-recentSortBorder mt-0.5">
              Date Time
            </span>
          </div>
          <span className="text-xs text-recentSortBorder ml-1">▼</span>
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
            {transactions.map((transaction, index) => (
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
                      className={`text-[13px] font-semibold mt-1 ${transaction.amount.includes("-IDR 100K") ? "text-recentTableNegative" : "text-recentTableTitle"}`}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-8 gap-2">
        <button className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors">
          <HiChevronDoubleLeft className="text-xl" />
        </button>
        <button className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors">
          <FiChevronLeft className="text-xl" />
        </button>

        <button className="min-w-[70px] h-8 bg-gradient-to-r from-recentGreen to-recentDark text-white rounded-full text-[9px] font-semibold">
          Page 01
        </button>

        <button className="w-8 h-8 border-[0.95px] border-recentMutationBorder rounded-full text-[9px] font-semibold text-recentTextTitle hover:bg-recentMutationBorder hover:text-white transition-all">
          02
        </button>

        <button className="w-8 h-8 border-[0.95px] border-recentMutationBorder rounded-full text-[9px] font-semibold text-recentTextTitle hover:bg-recentMutationBorder hover:text-white transition-all">
          03
        </button>

        <button className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors">
          <FiChevronRight className="text-xl" />
        </button>
        <button className="p-2 text-recentTextTitle hover:text-recentGreen transition-colors">
          <HiChevronDoubleRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default RecentTransaction;
