import { Toggle } from "../../components/ui/Toggle.tsx";
import HealthCard from "../../components/cels/HealthCard.tsx";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme.ts";
import { Cel } from "../../interfaces/cel/cel.ts";

const REFRESH_INTERVAL = 10;

function Index({ cels }) {
  const [sortedCels, setSortedCels] = useState(cels);
  useTheme();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshIntervalCountdown, setRefreshIntervalCountdown] =
    useState(REFRESH_INTERVAL);

  useEffect(() => {
    if (!autoRefresh) {
      setRefreshIntervalCountdown(REFRESH_INTERVAL);
      return;
    }

    const interval = setInterval(async () => {
      setRefreshIntervalCountdown((prev) => {
        if (prev === 1) {
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleAutoRefreshChange = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handleStatusChange = (cel: Cel, isOk: boolean) => {
    setSortedCels((prev) => {
      return [
        ...prev.filter((item) => item.id !== cel.id),
        { ...cel, isOk },
      ].sort((a, b) => {
        if (a.isOk === b.isOk) {
          // Sort alphabetically by URL when status is the same
          return a.url.localeCompare(b.url);
        }
        return a.isOk ? 1 : -1; // Not OK items first
      });
    });
  };

  return (
    <>
      <Toggle
        label={`Auto-refresh (${refreshIntervalCountdown}s)`}
        onToggle={handleAutoRefreshChange}
      ></Toggle>

      <div className="flex flex-col gap-4">
        {sortedCels.map((cel) => (
          <HealthCard
            key={cel.id}
            cel={cel}
            onStatusChange={(isOk) => handleStatusChange(cel, isOk)}
            refreshInterval={autoRefresh ? REFRESH_INTERVAL : null}
          />
        ))}
      </div>
    </>
  );
}

export default Index;
