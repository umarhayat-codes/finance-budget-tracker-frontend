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
        <AddBudge />
        <TotalBudge />
        <GraphBudget />
        <BudgetSpendBreakDown />
      </div>
    </Layout>
  );
};

export default BudgePage;
