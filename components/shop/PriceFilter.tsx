
import React from "react";
import { PriceFilterProps } from "@/types/shop";

const PriceFilter: React.FC<PriceFilterProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseInt(e.target.value, 10), value[1] - 1);
    if (onChange) onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseInt(e.target.value, 10), value[0] + 1);
    if (onChange) onChange([value[0], newMax]);
  };

  const minPos = ((value[0] - min) / (max - min)) * 100;
  const maxPos = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="pt-4 pb-2 space-y-4">
      <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className="absolute h-1 bg-pink-500 rounded-full"
          style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
        />
        <div
          className="absolute h-4 w-4 bg-white dark:bg-gray-300 border-2 border-pink-500 rounded-full -top-1.5 shadow-md cursor-pointer"
          style={{ left: `calc(${minPos}% - 8px)` }}
        />
        <div
          className="absolute h-4 w-4 bg-white dark:bg-gray-300 border-2 border-pink-500 rounded-full -top-1.5 shadow-md cursor-pointer"
          style={{ left: `calc(${maxPos}% - 8px)` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMinChange}
          className="absolute w-full h-1 opacity-0 cursor-pointer"
          style={{ top: 0 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-1 opacity-0 cursor-pointer"
          style={{ top: 0 }}
        />
      </div>
      <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
        <span>LKR {value[0]}</span>
        <span>LKR {value[1]}</span>
      </div>
    </div>
  );
};

export default PriceFilter;

    