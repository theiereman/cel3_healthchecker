import { useEffect, useState } from "react";
import { Toggle } from "./ui/Toggle";
import { TimeUnitEnum } from "../enums/TimeUnitEnum";
import { TimeHelper } from "../lib/helpers/timeHelper";

interface AutoRefreshToggleProps {
  onCountdownOver: () => void;
  defaultInterval?: number;
  defaultUnit?: TimeUnitEnum;
}

export default function AutoRefreshToggle({
  onCountdownOver,
  defaultInterval = 60,
  defaultUnit = TimeUnitEnum.SEC,
}: AutoRefreshToggleProps) {
  const [duration, setDuration] = useState(defaultInterval);
  const [timeUnit, setTimeUnit] = useState(defaultUnit);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    TimeHelper.convertIntervalToSeconds(duration, timeUnit)
  );

  const handleDurationChange = (value: number) => {
    setDuration(value);
    setRemainingSeconds(TimeHelper.convertIntervalToSeconds(value, timeUnit));
  };

  // enable/disable auto-refresh
  // if disabled, reset the countdown to the initial value
  const onToggle = (enabled: boolean) => {
    if (!enabled) {
      setDuration(duration);
      setRemainingSeconds(
        TimeHelper.convertIntervalToSeconds(duration, timeUnit)
      );
    }
    setIsAutoRefreshEnabled(enabled);
  };

  //time left in seconds update
  useEffect(() => {
    setRemainingSeconds(
      TimeHelper.convertIntervalToSeconds(duration, timeUnit)
    );
  }, [duration, timeUnit]);

  // countdown interval update
  useEffect(() => {
    if (!isAutoRefreshEnabled) return;

    const countdown = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === 1) {
          onCountdownOver();
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [isAutoRefreshEnabled]);

  return (
    <div className="flex items-center gap-2 my-2 text-gray-700 dark:text-gray-300">
      <Toggle onToggle={onToggle} label="Mettre à jour toutes les " />
      <input
        type="text"
        value={duration}
        onChange={(e) => handleDurationChange(Number(e.target.value))}
        className={`w-16 py-0 px-1 ${
          isAutoRefreshEnabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:text-gray-400"
            : "text-gray-700 bg-white dark:bg-slate-800 dark:text-white"
        }`}
        disabled={isAutoRefreshEnabled}
      />
      <div>
        <button
          className={`${timeUnit === TimeUnitEnum.SEC ? "bg-neutral-200 dark:bg-slate-700" : "bg-neutral-100 dark:bg-slate-800"} p-1 px-2 rounded-tl-lg rounded-bl-lg ${isAutoRefreshEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setTimeUnit(TimeUnitEnum.SEC)}
          disabled={isAutoRefreshEnabled}
        >
          sec
        </button>
        <button
          className={`${timeUnit === TimeUnitEnum.MIN ? "bg-neutral-200 dark:bg-slate-700" : "bg-neutral-100 dark:bg-slate-800"} p-1 px-2 ${isAutoRefreshEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setTimeUnit(TimeUnitEnum.MIN)}
          disabled={isAutoRefreshEnabled}
        >
          min
        </button>
        <button
          className={`${timeUnit === TimeUnitEnum.H ? "bg-neutral-200 dark:bg-slate-700" : "bg-neutral-100 dark:bg-slate-800"} p-1 px-2 rounded-tr-lg rounded-br-lg ${isAutoRefreshEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setTimeUnit(TimeUnitEnum.H)}
          disabled={isAutoRefreshEnabled}
        >
          h
        </button>
      </div>
      <span>{TimeHelper.convertSecondsToTimeString(remainingSeconds)}</span>
    </div>
  );
}
