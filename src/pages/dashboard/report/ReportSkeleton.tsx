import React from "react";

const ReportSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 min-h-screen animate-pulse">
      <div className="h-10 bg-gray-200 rounded-md w-1/4"></div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="h-6 bg-gray-200 rounded w-40"></div>
          <div className="h-4 bg-gray-100 rounded w-20"></div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-[45px] w-48 bg-gray-200 rounded-[1px]"></div>
            <div className="h-[45px] w-32 bg-gray-200 rounded-[10px]"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[45px] w-24 bg-gray-200 rounded-[15px]"></div>
            <div className="h-[45px] w-28 bg-gray-200 rounded-[15px]"></div>
            <div className="h-[45px] w-36 bg-gray-200 rounded-[10px]"></div>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart Card Skeleton */}
          <div className="bg-white p-6 rounded-[20px] border border-gray-100 h-[350px] flex flex-col">
            <div className="mb-8">
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            </div>
            <div className="flex flex-1 items-center justify-around">
              <div className="flex flex-col gap-2">
                <div className="h-3 bg-gray-100 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="w-40 h-40 rounded-full border-[15px] border-gray-100"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-gray-200"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Area Chart Card Skeleton */}
          <div className="bg-white p-6 rounded-[20px] border border-gray-100 h-[350px]">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-[200px] w-full bg-gray-50 rounded relative overflow-hidden">
              <div className="absolute inset-0 flex items-end">
                <div className="w-full h-1/2 bg-gray-100 clip-path-trend"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="w-full mt-6">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-50">
                  {[...Array(5)].map((_, i) => (
                    <th key={i} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-4 py-4">
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSkeleton;
