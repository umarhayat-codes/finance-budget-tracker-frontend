import React from "react";
import Layout from "src/components/Layout";
import DashboardHeader from "src/components/DashboardHeader";
import { useReportHook } from "./useReportHook";
import ReportBreakDown from "./ReportBreakDown";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { FiFilter, FiDownload, FiShare2 } from "react-icons/fi";

const FinancialReport: React.FC = () => {
  const { reportData, loading, error } = useReportHook();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(reportData.monthlyBreakdown.totalIncome);
  console.log(reportData.monthlyBreakdown.totalExpense);

  return (
    <Layout>
      <div className="flex flex-col gap-8 bg-reportBg min-h-full">
        <DashboardHeader />

        <div className="flex flex-col gap-6">
          {/* Title Section */}
          <div className="flex flex-col gap-1">
            <h1 className="text-reportTitle text-[20px] font-inter font-bold">
              Financial Reports
            </h1>
            <p className="text-reportSubtitle text-[15px] font-inter font-bold">
              Start from
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="h-[45px] px-6 rounded-[1px] bg-reportButtonDateBg border border-reportButtonDateBorder text-reportButtonDateText text-[15px] font-inter font-bold">
                {reportData.startDate && reportData.endDate
                  ? `${new Date(reportData.startDate).toLocaleString(
                      "default",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )}-${new Date(reportData.endDate).toLocaleString(
                      "default",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )}`
                  : "No data"}
              </button>
              <button className="h-[45px] px-6 rounded-[10px] bg-reportCominloadBg border border-reportCominloadBorder text-reportCominloadText text-[15px] font-inter font-bold">
                Cominload
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 h-[45px] px-6 rounded-[15px] bg-reportFilterBg border border-reportFilterBorder text-reportFilterText text-[15px] font-inter font-bold">
                <FiFilter className="text-[18px]" />
                Filter
              </button>
              <button className="flex items-center gap-2 h-[45px] px-6 rounded-[15px] bg-reportDownloadBg border border-reportDownloadBorder text-reportDownloadText text-[15px] font-inter font-bold">
                Download
              </button>
              <button className="flex items-center gap-2 h-[45px] px-6 rounded-[10px] bg-reportShareBg text-reportShareText text-[15px] font-inter font-bold">
                <FiShare2 className="text-[18px]" />
                Share Report
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-[17px] font-bold text-[#8A8989] mb-4">
              Key Metrics
            </h2>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Expense Breakdown Card */}
            <div className="bg-reportCardBg p-6 rounded-[20px] shadow-sm border border-[#F8F8F8]">
              <div className="mb-8">
                <h3 className="text-reportCardTitle text-[17px] font-inter font-bold">
                  Monthly Expense Breakdwwn
                </h3>
                <p className="text-reportCardSubtitle text-[15px] font-inter font-bold">
                  Total Income and Total Expense
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-reportCardSubtitle text-[14px] font-inter font-bold">
                    Total Income
                  </span>
                  <span className="text-reportIncomeText text-[25px] font-inter font-bold">
                    {reportData.monthlyBreakdown.totalIncome}
                  </span>
                </div>
                <div className="relative w-[200px] h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reportData.monthlyBreakdown.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {reportData.monthlyBreakdown.data.map(
                          (entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ),
                        )}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-6 flex-1">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-reportCardSubtitle text-[14px] font-inter font-bold flex items-center gap-2">
                          <div className="w-2 h-2 rounded-sm bg-clarioGreen"></div>
                          Total Expengss
                        </span>
                        <span className="text-reportExpenseText text-[25px] font-inter font-bold">
                          {reportData.monthlyBreakdown.totalExpense}
                        </span>
                      </div>
                    </div>
                    {reportData.monthlyBreakdown.data.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-sm"
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-reportCardSubtitle text-[14px] font-inter font-bold">
                          {entry.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Income vs Expense Trend Card */}
            <div className="bg-reportCardBg p-6 rounded-[20px] shadow-sm border-[2px] border-[#F8F8F8]">
              <div className="mb-8">
                <h3 className="text-reportTrendTitle text-[17px] font-inter font-bold">
                  Income vs Expense Trend
                </h3>
              </div>

              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={reportData.trend.labels.map((label, index) => ({
                      name: label,
                      income: reportData.trend.incomeData[index],
                      expense: reportData.trend.expenseData[index],
                    }))}
                  >
                    <defs>
                      <linearGradient
                        id="colorIncome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8CFF2E"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8CFF2E"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#F0F1F1" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#BFBFBF", fontSize: 13, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#B5B4B5", fontSize: 13, fontWeight: 700 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip formatter={(value: number) => [`$${value}`, ""]} />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#8CFF2E"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      stroke="#8C8C8C"
                      strokeWidth={3}
                      fill="transparent"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <ReportBreakDown />
        </div>
      </div>
    </Layout>
  );
};

export default FinancialReport;
