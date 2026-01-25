import React from "react";
import { TransactionSummary } from "../../../../types";
import { useTransactionHook } from "./useTransactionHook";
import Card from "src/components/Card";

const TotalTransaction: React.FC = () => {
  const {
    totalTransaction: totalVolume,
    totalIncome: netIncome,
    totalExpense: rawExpense,
    totalComparison,
    expenseComparison,
    incomeComparison,
  } = useTransactionHook();

  const transactions: TransactionSummary[] = [
    {
      title: "Total Transaction",
      amount: `$${totalVolume.toFixed(2)}`,
      percentage: totalComparison.percentage,
      difference: totalComparison.difference,
      isPositive: totalComparison.isPositive,
      type: "total",
    },
    {
      title: "Incomes",
      amount: `$${netIncome.toFixed(2)}`,
      percentage: incomeComparison.percentage,
      difference: incomeComparison.difference,
      isPositive: incomeComparison.isPositive,
      type: "income",
    },
    {
      title: "Expenses",
      amount: `$${rawExpense.toFixed(2)}`,
      percentage: expenseComparison.percentage,
      difference: expenseComparison.difference,
      isPositive: expenseComparison.isPositive,
      type: "expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
      {transactions.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          amount={item.amount}
          percentage={item.percentage}
          difference={item.difference}
          isPositive={item.isPositive}
          type={item.type}
        />
      ))}
    </div>
  );
};

export default TotalTransaction;
