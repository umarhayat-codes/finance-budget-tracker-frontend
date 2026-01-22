import React from "react";
import { TransactionSummary } from "../../../../types";
import { useTransactionHook } from "./useTransactionHook";
import Card from "src/components/Card";

const TotalTransaction: React.FC = () => {
  const {
    totalTransaction: totalVolume,
    totalIncome: netIncome,
    totalExpense: rawExpense,
  } = useTransactionHook();

  const transactions: TransactionSummary[] = [
    {
      title: "Total Transaction",
      amount: `$${totalVolume.toFixed(2)}`,
      percentage: "6.4%",
      difference: `+$${(totalVolume * 0.05).toFixed(2)}`,
      isPositive: totalVolume >= 0,
      type: "total",
    },
    {
      title: "Incomes",
      amount: `$${netIncome.toFixed(2)}`,
      percentage: "10.5%",
      difference: netIncome >= 0 ? "+$487.00" : "-$487.00",
      isPositive: netIncome >= 0,
      type: "income",
    },
    {
      title: "Expenses",
      amount: `$${rawExpense.toFixed(2)}`,
      percentage: "8.35%",
      difference: "-$194.00",
      isPositive: false,
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
