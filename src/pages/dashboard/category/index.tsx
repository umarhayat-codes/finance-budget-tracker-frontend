import React from "react";
import Layout from "../../../components/Layout";
import DashboardHeader from "../../../components/DashboardHeader";
import AddCategories from "./AddCategories";
import BreakDownCategories from "./BreakDownCategories";
import { useCategoryHook } from "./useCategoryHook";
import CategorySkeleton from "./CategorySkeleton";

const CategoriesPage: React.FC = () => {
  const { loading } = useCategoryHook();

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-screen">
        <DashboardHeader />

        {loading ? (
          <CategorySkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div className="lg:col-span-3">
              <AddCategories />
            </div>

            <div className="lg:col-span-1 h-full">
              <BreakDownCategories />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoriesPage;
