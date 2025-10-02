import { capitalize } from "lodash";
import ServicePill from "./ServicePill.tsx";
import useHealthCheck from "../hooks/useHealthCheck.ts";
import { HealthCheckStatus } from "../interfaces/health/healthCheckStatus.ts";
import StatusIndicator from "./StatusIndicator.tsx";
import HealthCheckHeader from "./HealthCheckPill.tsx";
import { useEffect } from "react";
import HealthCardSkeleton from "./HealthCardSkelton.tsx";
import { Cel } from "../interfaces/cel/cel.ts";

export default function HealthCard({
  cel,
  onStatusChange,
  shouldRefresh,
}: {
  cel: Cel;
  onStatusChange?: (isOk: boolean) => void;
  shouldRefresh?: boolean;
}) {
  const { health, loading, error, refresh } = useHealthCheck({ cel });

  const isOk = error === null && health?.status === HealthCheckStatus.Healthy;
  const hasCheckerErrors = health?.checkers?.some(
    (checker) => checker.status === HealthCheckStatus.Unhealthy
  );

  useEffect(() => {
    refresh();
  }, [shouldRefresh]);

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(isOk);
    }
  }, [isOk]);

  return (
    <div
      id="health-card"
      className="border p-4 rounded-lg flex gap-6 items-center bg-neutral-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
    >
      {!loading ? (
        <>
          <div
            id="health-card__header"
            className="flex gap-2 items-stretch h-full flex-1"
          >
            <StatusIndicator isOk={isOk} />
            <HealthCheckHeader cel={cel} error={error} />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div id="health-card__checkers" className="flex gap-2 flex-wrap">
              {health?.checkers.map((checker) => (
                <ServicePill
                  key={checker.name}
                  name={capitalize(checker.name)}
                  healthy={checker.status === HealthCheckStatus.Healthy}
                  disabled={checker.status === HealthCheckStatus.Disabled}
                />
              ))}
            </div>
            {hasCheckerErrors && (
              <span
                id="health-card__checkers__errors"
                className="text-red-500 dark:text-red-400 text-xs italic"
              >
                {health?.checkers.reduce((acc, checker) => {
                  if (
                    checker.status === HealthCheckStatus.Unhealthy &&
                    checker.message
                  ) {
                    return acc
                      ? `${acc}, ${checker.name}: ${checker.message}`
                      : `Checker errors : ${checker.name}: ${checker.message}`;
                  }
                  return acc;
                }, "")}
              </span>
            )}
          </div>
          <button onClick={refresh}>
            <span className="material-symbols-outlined hover:animate-spin cursor-pointer">
              refresh
            </span>
          </button>
        </>
      ) : (
        <HealthCardSkeleton />
      )}
    </div>
  );
}
