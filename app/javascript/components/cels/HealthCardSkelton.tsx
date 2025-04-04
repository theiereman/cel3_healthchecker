import React from "react";

export default function HealthCardSkeleton() {
  return (
    <>
      <div
        id="health-card-skeleton__header"
        className="flex gap-2 items-stretch h-full flex-1"
      >
        {/* Status indicator skeleton */}
        <div className="w-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>

        {/* Health check header skeleton */}
        <div className="flex flex-col gap-1">
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {/* Service pills skeleton */}
        <div
          id="health-card-skeleton__checkers"
          className="flex gap-2 flex-wrap"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"
            ></div>
          ))}
        </div>
      </div>

      {/* Refresh button skeleton */}
      <button className="size-8 bg-gray-300 dark:bg-gray-600 rounded-full"></button>
    </>
  );
}
