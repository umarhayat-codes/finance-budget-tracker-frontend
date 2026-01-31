import React from "react";

const CategorySkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 min-h-screen animate-pulse">
      <div className="h-8 bg-gray-200 rounded-md w-1/4"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Main Content Skeleton (AddCategories) */}
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-200 rounded w-40"></div>
              <div className="flex items-center gap-3">
                <div className="h-12 bg-gray-200 rounded-[10px] w-32"></div>
                <div className="h-12 bg-gray-200 rounded-[10px] w-40"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-[10px] border border-gray-100 bg-white p-5 h-[200px]"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                    <div className="h-3 bg-gray-100 rounded w-16"></div>
                  </div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-100 rounded w-12"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="flex gap-1 items-end h-[30px]">
                      {[...Array(5)].map((_, j) => (
                        <div
                          key={j}
                          className="w-4 bg-gray-100 rounded-t"
                          style={{ height: `${Math.random() * 80 + 20}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton (BreakDownCategories) */}
        <div className="lg:col-span-1 h-full">
          <div className="flex flex-col gap-6 rounded-[10px] border border-gray-100 bg-white p-6 h-full">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-5 bg-gray-200 rounded w-2"></div>
            </div>

            <div className="h-[250px] w-full flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-[15px] border-gray-100"></div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-100 rounded w-12"></div>
                    <div className="h-2 bg-gray-100 rounded w-16"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                  <div className="h-2 bg-gray-100 rounded w-8"></div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
