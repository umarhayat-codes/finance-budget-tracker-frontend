import React from "react";

const GoalSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-8 bg-gray-200 rounded-md w-48"></div>{" "}
        {/* Financial Goals Title */}
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>{" "}
            {/* Total Goals */}
            <div className="h-1 bg-gray-200 rounded-full w-24"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>{" "}
            {/* Completed */}
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>{" "}
            {/* Pending Goals */}
          </div>
          <div className="flex flex-col ml-4 gap-1">
            <div className="h-4 bg-gray-200 rounded w-32"></div>{" "}
            {/* Spent Savings Label */}
            <div className="h-6 bg-gray-200 rounded w-28"></div>{" "}
            {/* Spent Savings Value */}
          </div>
          <div className="ml-auto h-12 bg-gray-200 rounded-[10px] w-40"></div>{" "}
          {/* Create Button */}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="h-6 bg-gray-200 rounded w-32"></div>{" "}
        {/* Current Goals Subtitle */}
        {/* Goal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 place-items-center gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 border border-gray-200 h-[244px] w-[200px] rounded-[5px] p-6 flex flex-col items-start gap-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full self-center"></div>{" "}
              {/* Icon */}
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>{" "}
              {/* Goal Name */}
              <div className="h-3 bg-gray-200 rounded w-full"></div>{" "}
              {/* Target Amount */}
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>{" "}
              {/* Status Badge */}
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-auto"></div>{" "}
              {/* Date */}
            </div>
          ))}
        </div>
      </div>

      {/* Goal History Table Skeleton */}
      <div className="w-full mt-12">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>{" "}
        {/* Goal History Title */}
        <div className="w-full overflow-x-auto">
          <div className="w-full min-w-full">
            <div className="h-12 bg-gray-100 rounded-t-md mb-2"></div>{" "}
            {/* Table Header */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-14 bg-white border-b border-gray-50 flex items-center px-4 gap-4"
              >
                <div className="h-3 bg-gray-100 rounded w-20"></div>
                <div className="h-3 bg-gray-100 rounded w-32"></div>
                <div className="h-3 bg-gray-100 rounded w-24"></div>
                <div className="h-3 bg-gray-100 rounded w-24"></div>
                <div className="h-3 bg-gray-100 rounded w-28"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSkeleton;
