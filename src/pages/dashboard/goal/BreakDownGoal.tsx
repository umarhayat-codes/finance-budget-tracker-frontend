import React from "react";
import { useGoalHook } from "./useGoalHook";

const BreakDownGoal = () => {
  const { history } = useGoalHook();

  return (
    <div className="w-full mt-8">
      <h2 className="text-[17px] font-bold text-black font-inter mb-4">
        Goal History
      </h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-goalHistoryHeaderBg">
              <th className="py-3 px-4 text-[15px] font-bold text-goalHistoryHeaderText font-inter whitespace-nowrap">
                Date
              </th>
              <th className="py-3 px-4 text-[15px] font-bold text-goalHistoryHeaderText font-inter whitespace-nowrap">
                Goal
              </th>
              <th className="py-3 px-4 text-[15px] font-bold text-goalHistoryHeaderText font-inter whitespace-nowrap">
                Status
              </th>
              <th className="py-3 px-4 text-[15px] font-bold text-goalHistoryHeaderText font-inter whitespace-nowrap">
                Status
              </th>
              <th className="py-3 px-4 text-[15px] font-bold text-goalHistoryHeaderText font-inter whitespace-nowrap">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {history.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 px-4 text-[13px] font-bold text-goalSubtitle font-inter whitespace-nowrap">
                  {item.date}
                </td>
                <td className="py-4 px-4 text-[13px] font-bold text-goalSubtitle font-inter whitespace-nowrap">
                  {item.goalName}
                </td>
                <td className="py-4 px-4 text-[13px] font-bold text-goalSubtitle font-inter whitespace-nowrap">
                  {item.trackStatus}
                </td>
                <td className="py-4 px-4 text-[13px] font-bold text-goalSubtitle font-inter whitespace-nowrap">
                  {item.processStatus}
                </td>
                <td className="py-4 px-4 text-[13px] font-bold text-goalSubtitle font-inter whitespace-nowrap">
                  {item.amountStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreakDownGoal;
