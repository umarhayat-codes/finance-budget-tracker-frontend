import React from "react";
import DashboardHeader from "src/components/DashboardHeader";
import BreakDownGoal from "./BreakDownGoal";
import AddGoal from "./AddGoal";
import CreateGoal from "./CreateGoal";
import Layout from "src/components/Layout";
import { Routes, Route } from "react-router-dom";

import { useGoalHook } from "./useGoalHook";
import GoalSkeleton from "./GoalSkeleton";

const GoalPage: React.FC = () => {
  const { loading } = useGoalHook();

  return (
    <Routes>
      <Route
        index
        element={
          <Layout>
            {loading ? (
              <GoalSkeleton />
            ) : (
              <>
                <DashboardHeader />
                <AddGoal />
                <BreakDownGoal />
              </>
            )}
          </Layout>
        }
      />
      <Route path="create" element={<CreateGoal />} />
    </Routes>
  );
};

export default GoalPage;
