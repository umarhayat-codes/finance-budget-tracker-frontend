import React from "react";
import { useReportHook } from "./useReportHook";

const ReportBreakDown: React.FC = () => {
  const { reportData } = useReportHook();

  return (
    <div className="w-full mt-6">
      <h2 className="text-recentTransactionTitle text-[17px] font-inter font-bold mb-4">
        Recent Transaction
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-recentTransactionHeaderBg">
              <th className="px-4 py-3 text-left text-recentTransactionHeaderText text-[15px] font-inter font-bold first:rounded-l-[4px]">
                Date
              </th>
              <th className="px-4 py-3 text-left text-recentTransactionHeaderText text-[15px] font-inter font-bold">
                Description
              </th>
              <th className="px-4 py-3 text-left text-recentTransactionHeaderText text-[15px] font-inter font-bold">
                Description
              </th>
              <th className="px-4 py-3 text-left text-recentTransactionHeaderText text-[15px] font-inter font-bold">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-recentTransactionHeaderText text-[15px] font-inter font-bold last:rounded-r-[4px]">
                status
              </th>
            </tr>
          </thead>
          <tbody className="bg-clarioIconBg">
            {reportData.recentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-4 text-recentTransactionRowText text-[13px] font-inter font-bold">
                  {transaction.date}
                </td>
                <td className="px-4 py-4 text-recentTransactionRowText text-[13px] font-inter font-bold">
                  {transaction.description}
                </td>
                <td className="px-4 py-4 text-recentTransactionRowText text-[13px] font-inter font-bold">
                  {transaction.category}
                </td>
                <td className="px-4 py-4">
                  <button className="bg-statusCompletedBg border border-statusCompletedBorder rounded-[2px] px-4 py-1.5 text-[12px] font-inter font-bold text-statusCompletedText min-w-[90px]">
                    {transaction.amountStatus}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button
                    className={`border rounded-[2px] px-4 py-1.5 text-[12px] font-inter font-bold min-w-[90px] ${
                      transaction.status === "Received"
                        ? "bg-statusReceivedBg border-statusReceivedBorder text-statusReceivedText"
                        : "bg-statusCompletedBg border-statusCompletedBorder text-statusCompletedText"
                    }`}
                  >
                    {transaction.status}
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

export default ReportBreakDown;
