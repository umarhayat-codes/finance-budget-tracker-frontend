import React from "react";
import Layout from "../../../components/Layout";
import AddBudge from "./AddBudge";
import TotalBudge from "./TotalBudge";
import GraphBudget from "./GraphBudget";
import BudgetSpendBreakDown from "./BudgetSpendBreakDown";

const BudgePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6 ">
        {/* Top Header Section */}

        {/* Action Section (Title + Buttons) */}
        <AddBudge />
        <TotalBudge />
        {/* Overview Stats (Total, Incomes, Expenses) */}
        <GraphBudget />
        <BudgetSpendBreakDown />
        {/* Main Content Grid */}
      </div>
    </Layout>
  );
};

export default BudgePage;
