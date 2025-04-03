import {Toggle} from "../../components/ui/Toggle.tsx";
import HealthCard from "../../components/HealthCard.tsx";
import {useEffect, useState} from "react";
import {useTheme} from "../../hooks/useTheme.ts";
import {Cel} from "../../interfaces/cel/cel.ts";

const REFRESH_INTERVAL = 10;

export default function Index({cels}) {
    const [sortedCels, setSortedCels] = useState(cels);
    const { isDarkMode, toggleTheme } = useTheme();
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
            return [...prev.filter((item) => item.id !== cel.id), { ...cel, isOk }].sort(
                (a, b) => {
                    if (a.isOk === b.isOk) {
                        // Sort alphabetically by URL when status is the same
                        return a.url.localeCompare(b.url);
                    }
                    return a.isOk ? 1 : -1; // Not OK items first
                }
            );
        })
    };

    return (
        <>
            <header className="p-10 flex items-center gap-6">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 flex-1">
                    CEL3 Healthcheck
                </h1>
                <Toggle
                    label={`Auto-refresh (${refreshIntervalCountdown}s)`}
                    onToggle={handleAutoRefreshChange}
                ></Toggle>
                <button
                    className="theme-toggle p-2 rounded-lg bg-neutral-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                    onClick={toggleTheme}
                >
                    Switch to {isDarkMode ? "light mode" : "dark mode"}
                </button>
            </header>

            {sortedCels.map((cel) => (
                <HealthCard
                    key={cel.id}
                    cel={cel}
                    onStatusChange={(isOk) => handleStatusChange(cel, isOk)}
                    refreshInterval={autoRefresh ? REFRESH_INTERVAL : null}
                />
            ))}
        </>
    );
}