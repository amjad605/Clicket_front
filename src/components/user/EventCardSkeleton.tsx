import React from "react";

const EventCardSkeleton = () => {
  return (
    <div className="w-[300px] h-[50%] p-4 bg-white dark:bg-gray-700 rounded-xl shadow animate-pulse">
      <div className="h-[180px] bg-gray-300  dark:bg-gray-800  rounded mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-4/5 mb-2"></div>
      <div className="h-4 bg-gray-300  dark:bg-gray-800  rounded w-3/5"></div>
    </div>
  );
};

export default EventCardSkeleton;
