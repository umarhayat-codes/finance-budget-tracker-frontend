import React from "react";
import Layout from "../../../components/Layout";
import DashboardHeader from "../../../components/DashboardHeader";

import MonthlyFinancial from "./MonthlyFinancial";
import FinancialSummary from "./FinancialSummary";
import BudgetGoal from "./BudgetGoal";
import ExpenseDistribute from "./ExpenseDistribute";
import RecentTransaction from "./RecentTransaction";

const FinanceDashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6 ">
        <DashboardHeader />

        <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6">
          {/* Top Row: Monthly Trend and Financial Summary side-by-side */}
          <div className="desktop:col-span-2">
            <MonthlyFinancial />
          </div>
          <div className="desktop:col-span-2">
            <FinancialSummary />
          </div>

          {/* Bottom Row: Goals and Transactions */}
          <div className="desktop:col-span-1">
            <BudgetGoal />
          </div>
          <div className="desktop:col-span-1">
            <ExpenseDistribute />
          </div>
          <div className="desktop:col-span-2">
            <RecentTransaction />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinanceDashboardPage;
