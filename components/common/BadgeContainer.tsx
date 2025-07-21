import React from 'react';
import { Product } from '@/types';

interface BadgeListProps {
  skinType: string;
  benefitsArray: string[];
  product: Product;
}

const BadgeList: React.FC<BadgeListProps> = ({ skinType, benefitsArray, product }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide -mx-1 px-1 mb-3 sm:mb-2">
      <div className="inline-flex gap-2">
        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full whitespace-nowrap">
          {skinType}
        </span>

        {benefitsArray.length > 0 && (
          <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full whitespace-nowrap">
            {benefitsArray[0]}
          </span>
        )}

        {product.measurement && (
          <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full whitespace-nowrap">
            {product.measurement}
          </span>
        )}
      </div>
    </div>
  );
};

export default BadgeList;
