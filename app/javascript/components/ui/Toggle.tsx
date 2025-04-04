import { useState } from "react";
interface ToggleProps {
  onToggle: (isOn: boolean) => void;
  className?: string;
  label?: string;
}

export const Toggle = ({ className, onToggle, label }: ToggleProps) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onToggle(!isToggled);
  };

  return (
    <div
      className={`flex items-center gap-2 my-2 text-gray-700 dark:text-gray-300 ${className}`}
    >
      <button
        onClick={handleToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none dark:focus:ring-blue-400 bg-gray-200 dark:bg-gray-700"
        role="switch"
        aria-checked={isToggled}
      >
        <span
          className={`${
            isToggled
              ? "translate-x-6 bg-blue-600 dark:bg-blue-400"
              : "translate-x-1 bg-white"
          } inline-block h-4 w-4 transform rounded-full transition-transform duration-200 ease-in-out`}
        />
        <span className="sr-only">{isToggled ? "ON" : "OFF"}</span>
      </button>
      {label && <label className="text-sm font-medium">{label}</label>}
    </div>
  );
};
