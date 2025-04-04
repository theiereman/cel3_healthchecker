import React from "react";

export default function ServicePill({
  name,
  healthy,
  disabled,
}: {
  name: string;
  healthy: boolean;
  disabled: boolean;
}) {
  return (
    <div
      className={`rounded-full px-4 py-1 text-black ${
        disabled
          ? "bg-gray-300 text-gray-400"
          : healthy
          ? "bg-green-400"
          : "bg-red-400"
      }`}
    >
      <span>{name}</span>
    </div>
  );
}
