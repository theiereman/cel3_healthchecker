import HealthCard from "../../components/cels/HealthCard.tsx";
import { useTheme } from "../../hooks/useTheme.ts";
import { Cel } from "../../interfaces/cel/cel.ts";
import AutoRefreshToggle from "../../components/cels/AutoRefreshToggle.tsx";
import { useState } from "react";

function Index({ cels }: { cels: Cel[] }) {
  const [sortedCels, setSortedCels] = useState(cels);
  useTheme();

  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const handleRefresh = () => {
    console.log("refresh trigger");
    setRefreshTrigger((prev) => !prev);
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
      <AutoRefreshToggle onCountdownOver={handleRefresh} />
      <div className="flex flex-col gap-4">
        {sortedCels.map((cel) => (
          <HealthCard
            key={cel.id}
            cel={cel}
            onStatusChange={(isOk) => handleStatusChange(cel, isOk)}
            shouldRefresh={refreshTrigger}
          />
        ))}
      </div>
    </>
  );
}

export default Index;
