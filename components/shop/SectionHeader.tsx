"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeaderProps } from "@/types";

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, isExpanded, onToggle }) => {
  return (
    <button onClick={onToggle} className="flex justify-between items-center w-full py-2 group transition-colors">
      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{title}</h3>
      <ChevronDown
        size={18}
        className={`text-gray-500 group-hover:text-pink-600 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
      />
    </button>
  );
};

export default SectionHeader;
