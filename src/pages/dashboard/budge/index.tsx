import React from "react";
import Layout from "../../../components/Layout";
import AddBudge from "./AddBudge";
import TotalBudge from "./TotalBudge";
import GraphBudget from "./GraphBudget";
import BudgetSpendBreakDown from "./BudgetSpendBreakDown";
import LastSixMonthSpent from "./LastSixMonthSpent";

const BudgePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6 ">
        <AddBudge />
        <TotalBudge />
        <GraphBudget />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <LastSixMonthSpent />
          </div>
          <div className="lg:col-span-2">
            <BudgetSpendBreakDown />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BudgePage;
