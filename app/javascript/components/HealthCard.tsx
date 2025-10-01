import { capitalize } from "lodash";
import ServicePill from "./ServicePill.tsx";
import useHealthCheck from "../hooks/useHealthCheck.ts";
import { HealthCheckStatus } from "../interfaces/health/healthCheckStatus.ts";
import StatusIndicator from "./StatusIndicator.tsx";
import HealthCheckHeader from "./HealthCheckHeader.tsx";
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
            <svg
              viewBox="0 -960 960 960"
              className="size-8 fill-current hover:animate-spin cursor-pointer text-slate-900 dark:text-slate-100"
            >
              <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
            </svg>
          </button>
        </>
      ) : (
        <HealthCardSkeleton />
      )}
    </div>
  );
}
