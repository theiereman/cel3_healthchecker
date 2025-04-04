import { TimeUnitEnum } from "../../enums/TimeUnitEnum";

export const TimeHelper = {
  convertIntervalToSeconds: (interval: number, unit: TimeUnitEnum) => {
    switch (unit) {
      case TimeUnitEnum.SEC:
        return interval;
      case TimeUnitEnum.MIN:
        return interval * 60;
      case TimeUnitEnum.H:
        return interval * 3600;
      default:
        return interval;
    }
  },

  convertSecondsToTimeString: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format the time string
    if (hours === 0 && minutes === 0) {
      return `${remainingSeconds}s`;
    }
    if (hours === 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  },
};

TimeHelper.convertSecondsToTimeString(1);
