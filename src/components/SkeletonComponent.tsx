import React from "react";

const SkeletonComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      <div className="flex flex-col desktop:flex-row gap-6">
        {/* Left Column */}
        <div className="flex flex-col desktop:w-[55%] gap-6">
          {/* Monthly Financial Chart Skeleton */}
          <div className="bg-white rounded-[13px] border border-gray-100 p-6 h-[400px]">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
            <div className="flex items-end justify-between h-[250px] gap-2 px-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex gap-1 items-end h-full w-full">
                  <div
                    className="bg-gray-200 w-full rounded-t"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  ></div>
                  <div
                    className="bg-gray-300 w-full rounded-t"
                    style={{ height: `${Math.random() * 40 + 10}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
            {/* Budget Goal Skeleton */}
            <div className="bg-white rounded-[13px] border border-gray-100 p-6 h-[300px]">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-6 mt-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Expense Distribute Skeleton */}
            <div className="bg-white rounded-[13px] border border-gray-100 p-6 h-[300px] flex flex-col items-center justify-center">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-auto self-start"></div>
              <div className="w-32 h-32 rounded-full border-8 border-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col desktop:w-[45%] gap-6">
          {/* Financial Summary Skeleton */}
          <div className="bg-white rounded-[13px] border border-gray-100 p-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-50 rounded-[13px] border border-gray-100 p-3"
                >
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions Skeleton */}
          <div className="bg-white rounded-[13px] border border-gray-100 p-6 flex-1">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonComponent;
