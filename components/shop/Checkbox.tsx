
import React from "react";
import { CheckboxProps } from "@/types/shop";

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked = false,
  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center py-2 cursor-pointer group"
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="opacity-0 absolute h-5 w-5 cursor-pointer"
        />
        <div
          className={`border-2 rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-3 transition-all duration-200 
          ${
            checked
              ? "bg-pink-500 border-pink-500"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-pink-400"
          }`}
        >
          <svg
            className={`fill-current w-3 h-3 text-white pointer-events-none transition-opacity duration-200 ${
              checked ? "opacity-100" : "opacity-0"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors select-none">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;

    