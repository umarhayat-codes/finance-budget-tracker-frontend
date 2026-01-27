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

        <div className="flex flex-col desktop:flex-row gap-6">
          <div className="contents desktop:flex desktop:flex-col desktop:w-1/2 gap-6">
            <div className="order-1">
              <MonthlyFinancial />
            </div>
            <div className="contents desktop:grid desktop:grid-cols-2 gap-6 order-3">
              <div className="order-3">
                <BudgetGoal />
              </div>
              <div className="order-4">
                <ExpenseDistribute />
              </div>
            </div>
          </div>
          <div className="contents desktop:flex desktop:flex-col desktop:w-1/2 gap-6">
            <div className="order-2">
              <FinancialSummary />
            </div>
            <div className="order-5">
              <RecentTransaction />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinanceDashboardPage;
