import { Cel } from "../interfaces/cel/cel.ts";

export default function HealthCheckHeader({
  cel,
  error,
}: {
  cel: Cel;
  error: string | null;
}) {
  return (
    <div className="flex flex-col">
      <h2>{cel.name}</h2>
      <a
        className="text-sm color-gray underline"
        href={cel.url}
        target="_blank"
      >
        {cel.url}
      </a>
      {error && <span className="text-red-400 font-bold">Error : {error}</span>}
    </div>
  );
}
