import { useCallback, useEffect, useState } from "react";
import {
  CheckerInfo,
  HealthCheckInfo,
} from "../interfaces/health/healthCheckInfo";
import { HealthCheckStatus } from "../interfaces/health/healthCheckStatus";
import { HealthCheckerBase } from "../interfaces/health/healthCheckResponse";
import { Cel } from "../interfaces/cel/cel.ts";

export default function useHealthCheck({ cel }: { cel: Cel }) {
  const [health, setHealth] = useState<HealthCheckInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`cels/${cel.id}/healthcheck`);
      const data = await response.json();
      const formattedCheckers: CheckerInfo[] = Object.entries(data)
        .filter(
          ([, value]) =>
            typeof (value as HealthCheckerBase).healthy === "boolean"
        )
        .map(([name, value]) => {
          const { healthy, message, checker_disabled } =
            value as HealthCheckerBase;
          return {
            name,
            status: checker_disabled
              ? HealthCheckStatus.Disabled
              : healthy
                ? HealthCheckStatus.Healthy
                : HealthCheckStatus.Unhealthy,
            message,
          } as CheckerInfo;
        });

      const formattedData: HealthCheckInfo = {
        message: data.message,
        status: data.healthy
          ? HealthCheckStatus.Healthy
          : HealthCheckStatus.Unhealthy,
        checkers: formattedCheckers,
      };

      setHealth(formattedData);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [cel]);

  useEffect(() => {
    let active = true;
    if (active) refresh();
    return () => {
      active = false;
    };
  }, [cel, refresh]);

  return { health, loading, error, refresh };
}
