import React from "react";
import FinancialReport from "./FinancialReport";
import ReportSkeleton from "./ReportSkeleton";
import { useReportHook } from "./useReportHook";
import Layout from "src/components/Layout";

const ReportPage: React.FC = () => {
  const { loading } = useReportHook();

  return (
    <>
      <Layout>{loading ? <ReportSkeleton /> : <FinancialReport />}</Layout>
    </>
  );
};

export default ReportPage;
