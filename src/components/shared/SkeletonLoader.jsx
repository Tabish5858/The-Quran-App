import React from "react";

const SkeletonLoader = ({ type = "content", count = 5 }) => {
  // Pulse animation class
  const pulseClass = "animate-pulse bg-gray-300 dark:bg-gray-700 rounded";

  // For sidebar list like surah list
  if (type === "sidebarList") {
    return (
      <div className="p-4 h-full">
        {/* Search input skeleton */}
        <div className="h-24 flex items-center px-4">
          <div className={`w-full h-12 ${pulseClass}`}></div>
        </div>

        {/* List items skeleton */}
        <div className="space-y-8">
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex gap-3">
                <div className={`h-6 w-6 rounded-full ${pulseClass}`}></div>
                <div className="flex-1 space-y-3">
                  <div className={`h-4 ${pulseClass} w-3/4`}></div>
                  <div className={`h-3 ${pulseClass} w-1/2`}></div>
                  <div className={`h-3 ${pulseClass} w-1/4`}></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  // For ayat content
  if (type === "content") {
    return (
      <div className="p-4 h-full">
        {/* Header skeleton */}
        <div className="h-20 flex justify-between items-center border-b border-gray-200 mb-8 px-8">
          <div>
            <div className={`h-8 w-48 ${pulseClass} mb-4`}></div>
            <div className={`h-5 w-24 ${pulseClass}`}></div>
          </div>
          <div className="flex gap-4">
            <div className={`h-8 w-8 rounded-full ${pulseClass}`}></div>
            <div className={`h-8 w-8 rounded-full ${pulseClass}`}></div>
            <div className={`h-8 w-8 rounded-full ${pulseClass}`}></div>
          </div>
        </div>

        {/* Ayat content skeleton */}
        <div className="space-y-16 px-8">
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                {/* Arabic text skeleton - right-aligned */}
                <div className="flex justify-end mb-4">
                  <div className={`h-6 ${pulseClass} w-3/4`}></div>
                </div>
                <div className="flex justify-end mb-8">
                  <div className={`h-4 ${pulseClass} w-1/2`}></div>
                </div>

                {/* Translation skeleton - left-aligned */}
                <div className="mb-8">
                  <div className={`h-4 ${pulseClass} w-full mb-2`}></div>
                  <div className={`h-4 ${pulseClass} w-5/6 mb-2`}></div>
                  <div className={`h-4 ${pulseClass} w-4/6`}></div>
                </div>

                {/* Ayat number skeleton */}
                <div className="flex justify-between">
                  <div className={`h-4 ${pulseClass} w-8`}></div>
                  <div className={`h-4 ${pulseClass} w-16`}></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  // Default simple skeleton
  return (
    <div className="p-4 space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={`h-4 ${pulseClass}`}></div>
        ))}
    </div>
  );
};

export default SkeletonLoader;
