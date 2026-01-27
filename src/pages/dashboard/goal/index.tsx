import React from "react";
import DashboardHeader from "src/components/DashboardHeader";
import BreakDownGoal from "./BreakDownGoal";
import AddGoal from "./AddGoal";
import CreateGoal from "./CreateGoal";
import Layout from "src/components/Layout";
import { Routes, Route } from "react-router-dom";

const GoalPage: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Layout>
            <DashboardHeader />

            <AddGoal />

            <BreakDownGoal />
          </Layout>
        }
      />
      <Route path="create" element={<CreateGoal />} />
    </Routes>
  );
};

export default GoalPage;
