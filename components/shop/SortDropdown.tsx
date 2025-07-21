
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { SortDropdownProps } from "@/types/Sidebar";

const SortDropdown: React.FC<SortDropdownProps> = ({ onChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "oldest", label: "Oldest" },
  ];

  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSort)?.label || "Sort By";

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-400 dark:hover:border-pink-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <span className="text-sm text-gray-800 dark:text-gray-200">{currentSortLabel}</span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <ul className="py-1">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                    currentSort === option.value
                      ? "bg-pink-50 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

    