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
      className={`rounded-full px-4 py-1 text-white ${
        disabled
          ? "bg-gray-300 text-gray-400"
          : healthy
            ? "bg-green-500"
            : "bg-red-500"
      }`}
    >
      <span>{name}</span>
    </div>
  );
}
