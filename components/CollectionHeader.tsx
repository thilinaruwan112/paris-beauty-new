"use client";

import React from "react";

interface CollectionHeaderProps {
  title: string;
  description: string;
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="text-start ">
      <div className="inline-block">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
      </div>
      <p className="text-md text-gray-600 dark:text-gray-300 mt-6 max-w-2xl">
        {description}
      </p>
    </div>
  );
};

export default CollectionHeader;
