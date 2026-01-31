import React from "react";

const ReminderSkeleton: React.FC = () => {
  return (
    <div className="bg-bgColor min-h-screen animate-pulse">
      <div className="p-6">
        <div className="h-8 bg-gray-200 rounded-md w-1/4 mb-6"></div>

        <div className="flex flex-col xlg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded-[10px] w-40"></div>
            </div>

            {/* Row 1 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-[4px] p-4 h-[160px] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-100 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="flex gap-1 items-end h-[30px]">
                        {[...Array(8)].map((_, j) => (
                          <div
                            key={j}
                            className="w-[8px] bg-gray-100 rounded-[2px]"
                            style={{ height: `${Math.random() * 80 + 20}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-[4px] p-4 h-[160px] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-100 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="flex gap-1 items-end h-[30px]">
                        {[...Array(8)].map((_, j) => (
                          <div
                            key={j}
                            className="w-[8px] bg-gray-100 rounded-[2px]"
                            style={{ height: `${Math.random() * 80 + 20}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-[4px] p-4 h-[160px] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-100 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="flex gap-1 items-end h-[30px]">
                        {[...Array(8)].map((_, j) => (
                          <div
                            key={j}
                            className="w-[8px] bg-gray-100 rounded-[2px]"
                            style={{ height: `${Math.random() * 80 + 20}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full xlg:w-[320px] flex flex-col gap-6 ">
            {/* Preferences Skeleton */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded-full w-2"></div>
              </div>
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-12"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Rate Skeleton */}
            <div className="bg-white border border-gray-100 rounded-[10px] p-6 h-[300px] flex flex-col items-center justify-center">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderSkeleton;
