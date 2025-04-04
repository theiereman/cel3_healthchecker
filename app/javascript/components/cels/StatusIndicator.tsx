import React from "react";

export default function StatusIndicator({ isOk }: { isOk: boolean }) {
  return (
    <div
      id="health-icon"
      className={`min-h-2 min-w-2 rounded-full ${
        isOk ? "bg-green-400" : "bg-red-400"
      }`}
    ></div>
  );
}
