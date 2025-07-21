"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Droplets, Eye, Sun, Heart } from "lucide-react";

import PriceFilter from "./PriceFilter";
import SectionHeader from "./SectionHeader";
import Checkbox from "./Checkbox";
import SortDropdown from "./SortDropdown";
import { Category, SideBarProps } from "@/types";

const SideBar: React.FC<SideBarProps> = ({ onFilterChange, activeFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    categories: true,
    priceRange: true,
    rating: true,
    sale: false,
  });

  const categories: Category[] = [
    { icon: <Droplets size={16} />, label: "Serum", count: 127 },
    { icon: <Sun size={16} />, label: "Moisturizers", count: 84 },
    { icon: <Eye size={16} />, label: "Eyes", count: 93 },
    { icon: <Heart size={16} />, label: "Skincare", count: 216 },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category: string) => {
    const current = activeFilters.categories || [];
    const newCategories = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category];
    onFilterChange("categories", newCategories);
  };

  const handleRatingChange = (rating: number) => {
    const current = activeFilters.ratings || [];
    const newRatings = current.includes(rating)
      ? current.filter(r => r !== rating)
      : [rating]; // Single selection for rating
    onFilterChange("ratings", newRatings);
  };

  return (
    <div className="space-y-6">
      <div>
        <SectionHeader
          title="Sort By"
          isExpanded={expandedSections.sort}
          onToggle={() => toggleSection("sort")}
        />
        {expandedSections.sort && (
          <div className="mt-4">
            <SortDropdown
              onChange={(value) => onFilterChange("sort", value)}
              currentSort={activeFilters.sort || "newest"}
            />
          </div>
        )}
      </div>

      <div>
        <SectionHeader
          title="Categories"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection("categories")}
        />
        {expandedSections.categories && (
          <div className="space-y-2 mt-2">
            {categories.map((category) => (
              <Checkbox
                key={category.label}
                id={`cat-${category.label}`}
                label={
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    {category.icon}
                    <span>{category.label}</span>
                  </div>
                }
                checked={(activeFilters.categories || []).includes(category.label)}
                onChange={() => handleCategoryChange(category.label)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <SectionHeader
          title="Price Range"
          isExpanded={expandedSections.priceRange}
          onToggle={() => toggleSection("priceRange")}
        />
        {expandedSections.priceRange && (
          <PriceFilter
            min={0}
            max={500}
            value={activeFilters.priceRange || [0, 300]}
            onChange={(value) => onFilterChange("priceRange", value)}
          />
        )}
      </div>

      <div>
        <SectionHeader
          title="Rating"
          isExpanded={expandedSections.rating}
          onToggle={() => toggleSection("rating")}
        />
        {expandedSections.rating && (
          <div className="space-y-2 mt-2">
            {[5, 4, 3].map((rating) => (
              <Checkbox
                key={rating}
                id={`rating-${rating}`}
                label={
                  <div className="flex items-center">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">& up</span>
                  </div>
                }
                checked={(activeFilters.ratings || []).includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
            ))}
          </div>
        )}
      </div>
      
       <div>
        <SectionHeader
          title="Promotions"
          isExpanded={expandedSections.sale}
          onToggle={() => toggleSection("sale")}
        />
        {expandedSections.sale && (
            <div className="space-y-2 mt-2">
                 <Checkbox
                    id="sale"
                    label="On Sale"
                    checked={activeFilters.onSale}
                    onChange={() => onFilterChange("onSale", !activeFilters.onSale)}
                />
            </div>
        )}
      </div>

      <button
        onClick={() => onFilterChange("resetAll", null)}
        className="w-full text-center text-sm py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default SideBar;
