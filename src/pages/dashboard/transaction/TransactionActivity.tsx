import React, { useState, useEffect } from "react";
import {
  FiMoreVertical,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { HiOutlineSelector } from "react-icons/hi";
import { TransactionActivityItem } from "../../../../types";
import { useTransactions, useAppDispatch } from "src/redux/useReduxHook";
import { loadTransactions } from "src/redux/slice/TransactionSlice";
import { IconType } from "react-icons";

const TransactionActivity: React.FC = () => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { transactions } = useTransactions();

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);

  const toggleMenu = (id: string) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="bg-transactionBg border-[0.85px] border-transactionBorder rounded-[10px] p-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="font-satoshi font-bold text-[13px] text-transactionTextBrand">
          Transaction Activity
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-grow md:flex-grow-0">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-transactionTextMuted text-[14px]" />
            <input
              type="text"
              placeholder="Search transaction"
              className="pl-9 pr-4 py-2 bg-[#F9F9F9] border border-transactionBorder rounded-[8px] text-[12px] font-satoshi w-full md:w-[220px] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-transactionBorder rounded-[8px] bg-white text-[12px] font-satoshi font-medium text-transactionTextBrand">
            <FiFilter />
            Filter
          </button>
          <button className="p-2 border border-transactionBorder rounded-[8px] bg-white text-transactionTextBrand">
            <FiMoreVertical />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-transactionTableHeaderBg">
              <th className="px-4 py-3 first:rounded-tl-[8px] border-y border-l border-transactionBorder font-satoshi font-medium text-[10px] text-transactionTextMuted uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 border-y border-transactionBorder font-satoshi font-medium text-[10px] text-transactionTextMuted uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer">
                  Date <HiOutlineSelector />
                </div>
              </th>
              <th className="px-4 py-3 border-y border-transactionBorder font-satoshi font-medium text-[10px] text-transactionTextMuted uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer">
                  Time <HiOutlineSelector />
                </div>
              </th>
              <th className="px-4 py-3 border-y border-transactionBorder font-satoshi font-medium text-[10px] text-transactionTextMuted uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 border-y border-transactionBorder font-satoshi font-medium text-[10px] text-transactionTextMuted uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 last:rounded-tr-[8px] border-y border-r border-transactionBorder font-satoshi font-medium text-[10px] text-transactionTextMuted uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map(
              (item) => (
                console.log("-------item------", item),
                (
                  <tr
                    key={item.id}
                    className="group hover:bg-[#FAFAFA] transition-colors"
                  >
                    <td className="px-4 py-4 border-b border-l border-transactionBorder">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F0F0F0] flex items-center justify-center">
                          <div className="w-4 h-4 rounded-sm bg-gray-300"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-satoshi font-medium text-[12px] text-transactionTextBrand">
                            {item.category}
                          </span>
                          {item.tag && (
                            <span className="px-2 py-0.5 bg-transactionTagPositiveBg/50 text-transactionTextMuted text-[10px] rounded-full font-satoshi">
                              {item.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-b border-transactionBorder font-satoshi font-medium text-[12px] text-transactionDateText">
                      {item.date}
                    </td>
                    <td className="px-4 py-4 border-b border-transactionBorder font-satoshi font-medium text-[12px] text-transactionDateText">
                      {item.time}
                    </td>
                    <td
                      className={`px-4 py-4 border-b border-transactionBorder font-satoshi font-bold text-[10px] ${
                        item.type === "income"
                          ? "text-transactionPositive"
                          : "text-transactionNegative"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}${item.amount}
                    </td>
                    <td className="px-4 py-4 border-b border-transactionBorder font-satoshi font-medium text-[12px] text-transactionTextBrand">
                      {item.method}
                    </td>
                    <td className="px-4 py-4 border-b border-r border-transactionBorder text-right relative">
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className="p-1 hover:bg-[#EBEBEB] rounded-full transition-colors text-transactionTextBrand"
                      >
                        <FiMoreVertical />
                      </button>
                      {activeMenuId === item.id && (
                        <div className="absolute right-4 top-12 z-10 bg-white border border-transactionBorder rounded-lg shadow-lg py-1 w-24 text-left">
                          <button className="w-full px-4 py-2 text-[12px] font-satoshi text-transactionTextBrand hover:bg-[#F8F8F8]">
                            Update
                          </button>
                          <button className="w-full px-4 py-2 text-[12px] font-satoshi text-transactionNegative hover:bg-[#F8F8F8]">
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-2 font-satoshi text-[12px] text-transactionTextBrand">
          <span>Show data</span>
          <div className="px-2 py-1 border border-transactionBorder rounded-md font-bold">
            20
          </div>
          <span className="text-transactionTextMuted">of 100</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-transactionBorder rounded-full text-transactionTextMuted hover:bg-[#F8F8F8] transition-colors">
            <FiChevronLeft />
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 9].map((page, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-full font-satoshi text-[12px] transition-colors ${
                  page === 1
                    ? "bg-[#2D4F4D] text-white"
                    : "text-transactionTextMuted hover:bg-[#F8F8F8]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-2 border border-transactionBorder rounded-full text-transactionTextMuted hover:bg-[#F8F8F8] transition-colors">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionActivity;
