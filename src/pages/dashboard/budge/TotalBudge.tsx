import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { PiWalletBold } from "react-icons/pi";
import { useBudgeHook } from "./useBudgeHook";
import BudgetCardComponent from "../../../components/BudgetCardComponent";
import { useTransactionHook } from "../transaction/useTransactionHook";

const TotalBudge: React.FC = () => {
  const { totalBudget, totalIncome, totalExpense } = useBudgeHook();

  const usedPercentage =
    totalBudget > 0 ? ((totalExpense / totalBudget) * 100).toFixed(1) : "0";
  const { expenseComparison, incomeComparison } = useTransactionHook();

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full">
      <BudgetCardComponent
        title="Budget Total"
        amount={totalBudget}
        headerRight={
          <div className="flex items-center">
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
        }
        bodyRightContent={
          <div className="flex gap-1.5 h-3 md:w-1/3 w-[100px]">
            <div className="h-[12px] w-[19px] bg-budgetTotal rounded-sm"></div>
            <div className="h-[12px] w-[32px] bg-budgetGoalManageStart rounded-sm"></div>
            <div className="h-[12px] w-[48px] bg-graphBudget rounded-sm"></div>
            <div className="h-[12px] w-[64px] bg-budgetValue rounded-sm"></div>
            <div className="h-[12px] w-[33px] bg-primary rounded-sm"></div>
            <div className="h-[12px] w-[29px] bg-graphSpend rounded-sm"></div>
          </div>
        }
      >
        <div className="mt-1 flex items-center gap-1">
          <span className="font-satoshi font-normal text-[9px] text-transactionTextMuted">
            used from
          </span>
          <span className="font-satoshi font-bold text-[9px] text-transactionTextMuted">
            Total
          </span>
        </div>
      </BudgetCardComponent>

      <BudgetCardComponent
        title="Incomes"
        amount={totalIncome}
        icon={<PiWalletBold className="text-budgeText text-[16px]" />}
        showTrend={true}
        percentage={incomeComparison.percentage}
        difference={incomeComparison.difference}
        isPositive={incomeComparison.isPositive}
      />

      <BudgetCardComponent
        title="Expenses"
        amount={totalExpense}
        icon={<PiWalletBold className="text-budgeText text-[16px]" />}
        showTrend={true}
        percentage={expenseComparison.percentage}
        difference={expenseComparison.difference}
        isPositive={expenseComparison.isPositive}
      />
    </div>
  );
};

export default TotalBudge;
